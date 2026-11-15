# Latihan Semester 1 · Sistem Informasi

Aplikasi latihan mandiri untuk mata kuliah semester 1 S1 Sistem Informasi: rangkuman per pertemuan, soal pilihan ganda dengan pembahasan, kartu hafalan berjeda, soal variasi hitungan, simulasi UTS/UAS, dan peta konsep yang masih lemah.

**Buka aplikasi:** https://didiwahyudi90.github.io/latihan-semester-1/
**Cara pakai:** https://didiwahyudi90.github.io/latihan-semester-1/panduan.html

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
