// Akun sederhana: nama pengguna + kata sandi, progres disimpan di Upstash Redis (Vercel Storage).
// Variabel lingkungan dari integrasi Upstash/Vercel KV: KV_REST_API_URL + KV_REST_API_TOKEN
// (atau UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN).
const crypto = require('crypto');

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const SESI_DETIK = 90 * 24 * 3600;
const APPS = ['latihan', 'koding'];
const MAKS_DATA = 1500000;

async function kv(...cmd) {
  const r = await fetch(URL_, { method: 'POST', headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' }, body: JSON.stringify(cmd) });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}
const hash = (sandi, salt) => crypto.scryptSync(sandi, salt, 32).toString('hex');
const balas = (res, kode, isi) => { res.statusCode = kode; res.setHeader('Content-Type', 'application/json'); res.setHeader('Cache-Control', 'no-store'); res.end(JSON.stringify(isi)); };
const ip = req => String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();

async function batas(kunci, maks, detik) {
  const n = await kv('INCR', kunci);
  if (n === 1) await kv('EXPIRE', kunci, detik);
  return n > maks;
}
async function sesi(req) {
  const t = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!/^[a-f0-9]{64}$/.test(t)) return null;
  return await kv('GET', 's:' + t);
}
async function buatSesi(nama) {
  const t = crypto.randomBytes(32).toString('hex');
  await kv('SET', 's:' + t, nama, 'EX', SESI_DETIK);
  return t;
}
async function bodyOf(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  let s = ''; for await (const c of req) { s += c; if (s.length > MAKS_DATA + 10000) break; }
  try { return JSON.parse(s || '{}'); } catch (e) { return {}; }
}

module.exports = async function handler(req, res) {
  const q = new URL(req.url, 'http://x').searchParams, aksi = q.get('aksi');
  if (aksi === 'status') return balas(res, 200, { aktif: !!(URL_ && TOKEN) });
  if (!URL_ || !TOKEN) return balas(res, 503, { pesan: 'Penyimpanan akun belum diaktifkan.' });
  try {
    if (req.method === 'POST' && (aksi === 'daftar' || aksi === 'masuk')) {
      const b = await bodyOf(req);
      const nama = String(b.nama || '').trim().toLowerCase(), sandi = String(b.sandi || '');
      if (!/^[a-z0-9_.]{3,20}$/.test(nama)) return balas(res, 400, { pesan: 'Nama pengguna 3–20 karakter: huruf kecil, angka, titik, atau garis bawah.' });
      if (sandi.length < 6 || sandi.length > 72) return balas(res, 400, { pesan: 'Kata sandi minimal 6 karakter.' });
      if (aksi === 'daftar') {
        if (await batas('rl:daftar:' + ip(req), 20, 3600)) return balas(res, 429, { pesan: 'Terlalu banyak pendaftaran. Coba lagi nanti.' });
        const salt = crypto.randomBytes(16).toString('hex');
        const ok = await kv('SET', 'u:' + nama, JSON.stringify({ salt, hash: hash(sandi, salt), dibuat: Date.now() }), 'NX');
        if (!ok) return balas(res, 409, { pesan: 'Nama pengguna sudah dipakai. Pilih nama lain.' });
        return balas(res, 200, { nama, token: await buatSesi(nama) });
      }
      if (await batas('rl:masuk:' + nama, 10, 900)) return balas(res, 429, { pesan: 'Terlalu banyak percobaan. Tunggu 15 menit.' });
      const u = await kv('GET', 'u:' + nama);
      const d = u && JSON.parse(u);
      const cocok = d && crypto.timingSafeEqual(Buffer.from(hash(sandi, d.salt), 'hex'), Buffer.from(d.hash, 'hex'));
      if (!cocok) return balas(res, 401, { pesan: 'Nama pengguna atau kata sandi salah.' });
      await kv('DEL', 'rl:masuk:' + nama);
      return balas(res, 200, { nama, token: await buatSesi(nama) });
    }
    const nama = await sesi(req);
    if (!nama) return balas(res, 401, { pesan: 'Sesi berakhir. Silakan masuk lagi.' });
    if (aksi === 'keluar' && req.method === 'POST') {
      await kv('DEL', 's:' + String(req.headers.authorization).replace(/^Bearer\s+/i, ''));
      return balas(res, 200, { ok: true });
    }
    const app = q.get('app');
    if (!APPS.includes(app)) return balas(res, 400, { pesan: 'Aplikasi tidak dikenal.' });
    if (aksi === 'progres' && req.method === 'GET') {
      const v = await kv('GET', 'p:' + nama + ':' + app);
      return balas(res, 200, { nama, progres: v ? JSON.parse(v) : null });
    }
    if (aksi === 'simpan' && req.method === 'POST') {
      const b = await bodyOf(req);
      const isi = JSON.stringify({ t: Number(b.t) || Date.now(), data: b.data ?? null });
      if (isi.length > MAKS_DATA) return balas(res, 413, { pesan: 'Data progres terlalu besar.' });
      await kv('SET', 'p:' + nama + ':' + app, isi);
      return balas(res, 200, { ok: true });
    }
    return balas(res, 404, { pesan: 'Tidak ditemukan.' });
  } catch (e) {
    return balas(res, 500, { pesan: 'Server sedang bermasalah. Progres tetap tersimpan di perangkat ini.' });
  }
};
