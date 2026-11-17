// Akun sederhana: progres tiap orang tersimpan di server dan ikut ke perangkat lain.
// Tanpa masuk (tamu), progres tetap tersimpan di browser seperti sebelumnya.
(function () {
  'use strict';
  const SESI = 'akun_sesi_v1', API = '/api/akun';
  const ls = {
    get(k) { try { return localStorage.getItem(k) } catch (e) { return null } },
    set(k, v) { try { localStorage.setItem(k, v) } catch (e) {} },
    del(k) { try { localStorage.removeItem(k) } catch (e) {} }
  };
  let sesi = null; try { sesi = JSON.parse(ls.get(SESI)) } catch (e) {}
  if (!sesi || !sesi.token || !sesi.nama) sesi = null;
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const call = async (aksi, opt = {}, q = '') => {
    const h = { 'Content-Type': 'application/json' };
    if (sesi) h.Authorization = 'Bearer ' + sesi.token;
    const r = await fetch(API + '?aksi=' + aksi + q, { method: opt.body ? 'POST' : (opt.method || 'GET'), headers: h, body: opt.body ? JSON.stringify(opt.body) : undefined, keepalive: !!opt.keepalive });
    let j = {}; try { j = await r.json() } catch (e) {}
    if (!r.ok) { const er = new Error(j.pesan || 'Tidak bisa terhubung ke server.'); er.kode = r.status; throw er }
    return j;
  };
  const kunciT = k => 'akun_t:' + k;
  let app = null, base = null, ambil = null, tunda = null, aktif = false;

  const A = window.AKUN = {
    get nama() { return sesi && sesi.nama },
    // kunci localStorage: tamu = kunci lama, akun = kunci@nama (beberapa orang bisa berbagi satu perangkat)
    key(b) { return sesi ? b + '@' + sesi.nama : b },
    // dipanggil sekali oleh halaman: nama aplikasi, kunci dasar, fungsi pengambil state
    async mulai(namaApp, kunciDasar, getState) {
      app = namaApp; base = kunciDasar; ambil = getState;
      addEventListener('pagehide', () => A.kirim(true));
      addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') A.kirim(true) });
      try {
        let st = null; try { st = JSON.parse(sessionStorage.getItem('akun_status')) } catch (e) {}
        if (st === null) { st = (await call('status')).aktif; try { sessionStorage.setItem('akun_status', JSON.stringify(st)) } catch (e) {} }
        aktif = !!st;
      } catch (e) { aktif = false }
      A.chip();
      if (!sesi || !aktif) return;
      try {
        const r = await call('progres', {}, '&app=' + app), p = r.progres, k = A.key(base), lt = +ls.get(kunciT(k)) || 0;
        if (p && p.t > lt && p.data) { ls.set(k, JSON.stringify(p.data)); ls.set(kunciT(k), String(p.t)); location.reload(); return }
        if (!p || lt > p.t) A.kirim();
      } catch (e) { if (e.kode === 401) A.lepas('Sesi berakhir. Silakan masuk lagi.') }
    },
    // dipanggil setiap kali halaman menyimpan progres
    simpan() {
      if (!sesi) return;
      ls.set(kunciT(A.key(base)), String(Date.now()));
      clearTimeout(tunda); tunda = setTimeout(() => A.kirim(), 2500);
    },
    async kirim(akhir) {
      if (!sesi || !aktif || !ambil) return;
      const lt = +ls.get(kunciT(A.key(base))) || 0;
      if (akhir && !tunda) return;
      clearTimeout(tunda); tunda = null;
      const body = { t: lt || Date.now(), data: ambil() };
      try { await call('simpan', { body, keepalive: akhir && JSON.stringify(body).length < 60000 }, '&app=' + app); A.chip('Tersimpan di akun') }
      catch (e) { if (e.kode === 401) A.lepas('Sesi berakhir. Silakan masuk lagi.'); else A.chip('Belum tersinkron') }
    },
    lepas(pesan) { sesi = null; ls.del(SESI); A.chip(); if (pesan) A.toast(pesan) },
    toast(m) { const d = document.createElement('div'); d.className = 'ak-toast'; d.textContent = m; document.body.appendChild(d); setTimeout(() => d.remove(), 3000) },
    chip(ket) {
      const c = document.getElementById('akunChip'); if (!c) return;
      if (!aktif) { c.hidden = true; return }
      c.hidden = false;
      c.innerHTML = sesi ? `<span class="ak-dot"></span><span class="ak-n">${esc(sesi.nama)}</span>` : 'Masuk';
      c.title = sesi ? (ket || 'Progres tersimpan di akun') : 'Masuk agar progres tersimpan di akun';
      c.onclick = () => A.buka();
    },
    buka(mode) {
      const m = document.createElement('div'); m.className = 'ak-modal'; m.id = 'akModal';
      const tutup = () => m.remove();
      m.onclick = e => { if (e.target === m) tutup() };
      if (sesi) {
        m.innerHTML = `<div class="ak-panel" role="dialog" aria-label="Akun"><h2>Akun</h2><p>Masuk sebagai <b>${esc(sesi.nama)}</b>. Progres latihan dan koding tersimpan di akun ini dan ikut ke perangkat lain.</p>
          <div class="ak-btns"><button class="ak-btn" data-x>Tutup</button><button class="ak-btn ak-red" data-out>Keluar</button></div></div>`;
        m.querySelector('[data-x]').onclick = tutup;
        m.querySelector('[data-out]').onclick = async () => {
          await A.kirim(); try { await call('keluar', { body: {} }) } catch (e) {}
          for (const kb of ['latihan_s1_si_v3', 'latihan_koding_v1']) { const k = kb + '@' + sesi.nama; ls.del(k); ls.del(kunciT(k)) } ls.del(SESI); location.reload();
        };
      } else {
        const daftar = mode === 'daftar';
        m.innerHTML = `<form class="ak-panel" role="dialog" aria-label="${daftar ? 'Daftar' : 'Masuk'}"><h2>${daftar ? 'Buat akun' : 'Masuk'}</h2>
          <p>${daftar ? 'Cukup nama pengguna dan kata sandi. Tidak perlu email.' : 'Masuk agar progresmu tersimpan dan bisa dilanjutkan di perangkat lain.'}</p>
          <label>Nama pengguna<input name="nama" autocomplete="username" autocapitalize="none" spellcheck="false" required minlength="3" maxlength="20" pattern="[a-zA-Z0-9_.]{3,20}" placeholder="misal: rina.si"></label>
          <label>Kata sandi<input name="sandi" type="password" autocomplete="${daftar ? 'new-password' : 'current-password'}" required minlength="6" maxlength="72"></label>
          ${daftar ? '<p class="ak-small">Simpan kata sandimu baik-baik. Belum ada fitur lupa kata sandi.</p>' : ''}
          <p class="ak-err" role="alert"></p>
          <div class="ak-btns"><button type="button" class="ak-btn" data-x>Batal</button><button class="ak-btn ak-red">${daftar ? 'Daftar' : 'Masuk'}</button></div>
          <p class="ak-small">${daftar ? 'Sudah punya akun? <a href="#" data-sw>Masuk</a>' : 'Belum punya akun? <a href="#" data-sw>Daftar</a>'}</p></form>`;
        m.querySelector('[data-x]').onclick = tutup;
        m.querySelector('[data-sw]').onclick = e => { e.preventDefault(); tutup(); A.buka(daftar ? 'masuk' : 'daftar') };
        const f = m.querySelector('form');
        f.onsubmit = async e => {
          e.preventDefault();
          const btn = f.querySelector('.ak-red'), err = f.querySelector('.ak-err');
          btn.disabled = true; err.textContent = '';
          try {
            const r = await call(daftar ? 'daftar' : 'masuk', { body: { nama: f.nama.value, sandi: f.sandi.value } });
            sesi = { nama: r.nama, token: r.token }; ls.set(SESI, JSON.stringify(sesi));
            // pindahkan data ke akun: data server menang; jika server kosong, bawa progres tamu di perangkat ini
            for (const [a, kb] of [['latihan', 'latihan_s1_si_v3'], ['koding', 'latihan_koding_v1']]) {
              const p = (await call('progres', {}, '&app=' + a)).progres, k = kb + '@' + r.nama;
              if (p && p.data) { ls.set(k, JSON.stringify(p.data)); ls.set(kunciT(k), String(p.t)) }
              else if (!ls.get(k) && ls.get(kb)) {
                const t = Date.now(); ls.set(k, ls.get(kb)); ls.set(kunciT(k), String(t));
                await call('simpan', { body: { t, data: JSON.parse(ls.get(kb)) } }, '&app=' + a);
              }
            }
            location.reload();
          } catch (x) { err.textContent = x.message; btn.disabled = false }
        };
      }
      document.body.appendChild(m);
      const i = m.querySelector('input,button'); if (i) i.focus();
    }
  };
  const css = document.createElement('style');
  css.textContent = `.ak-chip{display:inline-flex;align-items:center;gap:7px;height:36px;padding:0 12px;border-radius:4px;border:1.5px solid var(--line2,#cfd4da);background:var(--paper,#fff);font:inherit;font-weight:700;font-size:14px;color:var(--ink,#1c2026);cursor:pointer;white-space:nowrap;max-width:170px}
.ak-chip:hover{border-color:var(--ink,#1c2026)}.ak-chip[hidden]{display:none}.ak-n{overflow:hidden;text-overflow:ellipsis}
.ak-dot{width:9px;height:9px;border-radius:50%;background:var(--green,#1b8a3a);flex:none}
.ak-modal{position:fixed;inset:0;background:rgba(28,32,38,.45);display:grid;place-items:center;z-index:60;padding:16px}
.ak-panel{background:var(--paper,#fff);border-radius:8px;padding:22px;width:min(100%,400px);color:var(--ink,#1c2026);font-size:15px}
.ak-panel h2{margin:0 0 6px;font-size:22px}.ak-panel p{margin:6px 0 12px;color:var(--steel,#5b6470)}.ak-panel p b{color:var(--ink,#1c2026)}
.ak-panel label{display:block;font-weight:600;font-size:14px;margin:12px 0 0}
.ak-panel input{display:block;width:100%;margin-top:5px;border:1.5px solid var(--line2,#cfd4da);border-radius:8px;padding:11px 12px;font:inherit;background:var(--paper,#fff);color:inherit}
.ak-small{font-size:13px}.ak-err{color:var(--red-d,#a30015)!important;font-weight:600;min-height:1em;margin:10px 0 0!important}
.ak-btns{display:flex;gap:10px;justify-content:flex-end;margin-top:14px}
.ak-btn{padding:10px 18px;border-radius:4px;font:inherit;font-weight:700;border:1.5px solid var(--line2,#cfd4da);background:var(--paper,#fff);color:inherit;cursor:pointer}
.ak-btn.ak-red{background:var(--red,#d0021b);border-color:var(--red,#d0021b);color:#fff}.ak-btn:disabled{opacity:.6}
@media (max-width:900px){.bar .in .ak-chip{max-width:104px;padding:0 9px;font-size:13px}.bar .in .meter{min-width:64px}.bar .in{gap:10px!important}}
.ak-toast{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:var(--ink,#1c2026);color:#fff;padding:11px 18px;border-radius:4px;z-index:70;font-size:14.5px;max-width:92vw}`;
  document.head.appendChild(css);
})();
