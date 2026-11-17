# Latihan SiberMu · Sistem Informasi

Aplikasi latihan mandiri untuk mata kuliah S1 Sistem Informasi SiberMu (saat ini semester 1; semester berikutnya menyusul): rangkuman per pertemuan, soal pilihan ganda dengan pembahasan, kartu hafalan berjeda, soal variasi hitungan, simulasi UTS/UAS, dan peta konsep yang masih lemah.

**Buka aplikasi:** https://latihan-sibermu-si.vercel.app
**Cara pakai:** https://latihan-sibermu-si.vercel.app/panduan

## Isi
| File | Fungsi |
|---|---|
| `index.html` | Aplikasi (satu halaman, tanpa server) |
| `panduan.html` + `panduan/` | Panduan bergambar untuk pengguna baru |
| `bank_*.js` | Bank soal per mata kuliah (SIF004 Pemrograman Web Dinamis, SIF001 Algoritma dan Pemrograman, …) |
| `gen_*.js` | Pembuat soal variasi hitungan/kode (kunci dihitung otomatis) |
| `fakta_*.js` | Fakta materi; aplikasi mengembangkannya jadi soal 5W1H yang diacak tiap latihan |
| `koding.html`, `tantangan.js` | Editor koding ala OnlineGDB (C++, PHP, Python via Wandbox; HTML/JS & SQL di browser) dengan tantangan dari latihan dosen |

## Menambah soal
Setiap soal di `bank_*.js` berformat:
```js
{"p":"P04","tag":"box-model","type":"mcq","q":"Teks soal","opts":["A","B","C","D","E"],"ans":1,"why":"Penjelasan","lvl":1,"code":null,"id":"P04-999"}
```

## Catatan
Proyek belajar mandiri, bukan aplikasi resmi kampus. Soal disusun dari modul dan video perkuliahan. Temukan kunci yang keliru? Buka *Issue* di repositori ini.

## Akun (progres per orang)
- Tombol **Masuk** di bilah atas: daftar cukup nama pengguna + kata sandi (tanpa email). Progres latihan dan koding tersimpan di akun dan ikut ke perangkat lain. Tanpa masuk, progres tetap di browser seperti biasa.
- Server: `api/akun.js` (Vercel Function) + Upstash Redis dari Vercel Storage. Butuh env `KV_REST_API_URL` dan `KV_REST_API_TOKEN` (otomatis terisi saat database Upstash dihubungkan ke proyek). Selama belum diatur, tombol Masuk disembunyikan.
- Kata sandi disimpan sebagai hash scrypt; sesi berlaku 90 hari; percobaan masuk dibatasi 10 kali per 15 menit.
