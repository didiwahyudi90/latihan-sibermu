# Latihan SiberMu · Sistem Informasi

Aplikasi latihan mandiri untuk mata kuliah S1 Sistem Informasi SiberMu (saat ini semester 1; semester berikutnya menyusul): rangkuman per pertemuan, soal pilihan ganda dengan pembahasan, kartu hafalan berjeda, soal variasi hitungan, simulasi UTS/UAS, dan peta konsep yang masih lemah.

**Buka aplikasi:** https://latihan-sibermu-si.vercel.app
**Cara pakai:** https://latihan-sibermu-si.vercel.app/panduan

## Isi
| File | Fungsi |
|---|---|
| `index.html` | Aplikasi (satu halaman, tanpa server) |
| `panduan.html` + `panduan/` | Panduan bergambar untuk pengguna baru |
| `bank_SIF004.js` | Bank soal Pemrograman Web Dinamis |
| `gen_SIF004.js` | Pembuat soal variasi (kunci dihitung otomatis) |

## Menambah soal
Setiap soal di `bank_*.js` berformat:
```js
{"p":"P04","tag":"box-model","type":"mcq","q":"Teks soal","opts":["A","B","C","D","E"],"ans":1,"why":"Penjelasan","lvl":1,"code":null,"id":"P04-999"}
```

## Catatan
Proyek belajar mandiri, bukan aplikasi resmi kampus. Soal disusun dari modul dan video perkuliahan. Temukan kunci yang keliru? Buka *Issue* di repositori ini.
