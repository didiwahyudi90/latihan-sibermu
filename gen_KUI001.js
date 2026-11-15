// SOAL VARIASI Bahasa Indonesia: pasangan bentuk benar/salah diacak dari bank kaidah EYD V & KBBI.
(function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const shuf = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]);
  const take = (a, n) => shuf(a).slice(0, n);
  // [baku, tidak baku]
  const BAKU = [["kreativitas","kreatifitas"],["teknologi","tehnologi"],["modern","moderen"],["miliar","milyar"],["kuitansi","kwitansi"],["analisis","analisa"],["praktik","praktek"],["sistem","sistim"],["risiko","resiko"],["nasihat","nasehat"],["izin","ijin"],["jadwal","jadual"],["apotek","apotik"],["ekstrem","ekstrim"],["frekuensi","frekwensi"],["kualitas","kwalitas"],["aktivitas","aktifitas"],["efektif","efektip"],["hierarki","hirarki"],["karier","karir"],["cenderamata","cinderamata"],["silakan","silahkan"],["sekadar","sekedar"],["mengubah","merubah"],["memengaruhi","mempengaruhi"],["terampil","trampil"],["objek","obyek"],["subjek","subyek"],["napas","nafas"],["standardisasi","standarisasi"],["detail","detil"],["ijazah","ijasah"],["jenazah","jenasah"],["konkret","kongkrit"],["lembap","lembab"],["provinsi","propinsi"],["zaman","jaman"],["utang","hutang"],["sistematis","sistimatis"],["kategori","katagori"],["Februari","Pebruari"],["November","Nopember"],["rapor","raport"],["tim","team"],["varietas","varitas"],["andal","handal"],["antre","antri"],["atlet","atlit"],["imbau","himbau"],["saksama","seksama"],["sintesis","sintesa"],["telantar","terlantar"],["kedaluwarsa","kadaluarsa"],["persentase","prosentase"],["ubah","rubah"],["cabai","cabe"],["dipersilakan","dipersilahkan"]];
  // [benar, salah...]
  const KAPITAL = [
    ["Kami berlibur ke Danau Toba pada bulan Juli.", "Kami berlibur ke danau Toba pada bulan juli.", "Kami Berlibur ke Danau Toba pada Bulan Juli.", "kami berlibur ke Danau toba pada bulan Juli."],
    ["Rapat dipimpin oleh Rektor Universitas Siber Muhammadiyah.", "Rapat dipimpin oleh rektor universitas siber muhammadiyah.", "Rapat Dipimpin oleh Rektor Universitas Siber Muhammadiyah.", "Rapat dipimpin oleh Rektor universitas Siber muhammadiyah."],
    ["Dia diangkat menjadi gubernur tahun lalu.", "Dia diangkat menjadi Gubernur tahun lalu.", "Dia Diangkat Menjadi Gubernur tahun lalu.", "dia diangkat menjadi gubernur Tahun Lalu."],
    ["Umat Islam merayakan Idulfitri setelah Ramadan.", "Umat islam merayakan idul fitri setelah ramadhan.", "Umat Islam merayakan idul Fitri setelah ramadan.", "umat Islam Merayakan Idulfitri setelah Ramadan."],
    ["Candi itu terletak di lereng barat Gunung Lawu.", "Candi itu terletak di Lereng Barat Gunung Lawu.", "Candi itu terletak di lereng barat gunung lawu.", "Candi itu terletak di Lereng barat gunung Lawu."],
    ["Saya membaca buku Laskar Pelangi karya Andrea Hirata.", "Saya membaca buku laskar pelangi karya andrea hirata.", "Saya Membaca Buku Laskar Pelangi karya Andrea Hirata.", "saya membaca buku Laskar pelangi karya Andrea hirata."],
    ["Presiden Soekarno membacakan teks Proklamasi.", "presiden soekarno membacakan teks proklamasi.", "Presiden soekarno membacakan Teks proklamasi.", "Presiden Soekarno Membacakan Teks Proklamasi."],
    ["Mahasiswa Prodi Sistem Informasi mengikuti seminar di Jakarta Selatan.", "Mahasiswa prodi sistem informasi mengikuti seminar di jakarta selatan.", "Mahasiswa Prodi Sistem Informasi mengikuti Seminar di Jakarta selatan.", "mahasiswa Prodi Sistem informasi mengikuti seminar di Jakarta Selatan."],
  ];
  const DIDEPAN = { prefix: ["ditulis","dibaca","diambil","dikirim","dibangun","diunggah","dipelajari","ditaruh","dijual","dipilih"], prep: ["di rumah","di atas","di kampus","di bawah","di dalam","di luar","di sana","di Jakarta","di depan","di samping"] };
  const PUN = { pisah: ["apa pun","siapa pun","di mana pun","kapan pun","satu kali pun"], padu: ["walaupun","meskipun","adapun","kalaupun","sekalipun","bagaimanapun","maupun","biarpun"] };
  const PLEO = [["naik ke atas","naik"],["turun ke bawah","turun"],["mundur ke belakang","mundur"],["maju ke depan","maju"],["adalah merupakan","merupakan"],["agar supaya","agar"],["demi untuk","demi"],["sejak dari","sejak"],["disebabkan karena","disebabkan oleh"],["sangat indah sekali","sangat indah"],["para mahasiswa-mahasiswa","para mahasiswa"],["saling pukul-memukul","saling memukul"],["zaman dahulu kala","dahulu kala"],["menurut pendapat saya","menurut saya"],["banyak buku-buku","banyak buku"],["amat sangat penting","sangat penting"],["kemudian lalu","kemudian"],["sesuai dengan","sesuai"]];
  const KALIMAT_PLEO = ["Para peserta diminta {x} panggung.","{x} memperoleh nilai baik, ia belajar setiap malam.","Hasil diskusi itu {x} keputusan bersama.","Pemandangan di puncak gunung itu {x}.","Kecelakaan itu {x} jalan licin."];
  const ANGKA = [
    ["Lima belas mahasiswa mengikuti ujian ulang.", "15 mahasiswa mengikuti ujian ulang.", "Limabelas mahasiswa mengikuti ujian ulang.", "Lima-belas mahasiswa mengikuti ujian ulang."],
    ["Kerajaan itu berjaya pada abad ke-14.", "Kerajaan itu berjaya pada abad ke 14.", "Kerajaan itu berjaya pada abad ke-XIV.", "Kerajaan itu berjaya pada abad keempatbelas."],
    ["Uang yang tertulis di kuitansi itu dua miliar rupiah.", "Uang yang tertulis di kwitansi itu dua milyar rupiah.", "Uang yang tertulis di kuitansi itu dua milyar rupiah.", "Uang yang tertulis di kwitansi itu dua miliar rupiah."],
    ["Harga laptop itu Rp7.500.000,00.", "Harga laptop itu Rp. 7.500.000,-", "Harga laptop itu Rp 7,500,000.00", "Harga laptop itu 7.500.000 Rp."],
    ["Pada tahun 1990-an internet mulai dikenal luas.", "Pada tahun 1990an internet mulai dikenal luas.", "Pada tahun 1990 an internet mulai dikenal luas.", "Pada tahun sembilan belas sembilan puluhan internet mulai dikenal luas."],
    ["Acara itu dihadiri oleh pejabat se-Jawa Tengah.", "Acara itu dihadiri oleh pejabat se Jawa Tengah.", "Acara itu dihadiri oleh pejabat seJawa Tengah.", "Acara itu dihadiri oleh pejabat se-jawa tengah."],
  ];
  const SINGKAT = [
    ["Yth. Bapak Dekan", "Yth Bapak Dekan", "YTH. Bapak Dekan", "Y.th. Bapak Dekan"],
    ["Ahmad Fauzi, S.Kom., M.T.", "Ahmad Fauzi S.Kom, M.T", "Ahmad Fauzi, S.Kom, MT", "Ahmad Fauzi. S.Kom. M.T."],
    ["Bawalah buku, pena, laptop, dsb.", "Bawalah buku, pena, laptop, dsb", "Bawalah buku, pena, laptop dan sebagainya-nya.", "Bawalah buku, pena, laptop, d.s.b"],
    ["Surat itu ditandatangani a.n. Kepala Bagian.", "Surat itu ditandatangani an. Kepala Bagian.", "Surat itu ditandatangani a/n Kepala Bagian.", "Surat itu ditandatangani A.N Kepala Bagian."],
    ["Ia membuat KTP di kantor kecamatan.", "Ia membuat K.T.P. di kantor kecamatan.", "Ia membuat Ktp di kantor kecamatan.", "Ia membuat ktp. di kantor kecamatan."],
  ];
  const KOMA = [
    ["Saya ingin ikut, tetapi tugas belum selesai.", "Saya ingin ikut tetapi, tugas belum selesai.", "Saya, ingin ikut tetapi tugas belum selesai.", "Saya ingin ikut tetapi tugas, belum selesai."],
    ["Karena hujan deras, kuliah tatap muka ditunda.", "Kuliah tatap muka ditunda, karena hujan deras.", "Karena, hujan deras kuliah tatap muka ditunda.", "Karena hujan deras kuliah, tatap muka ditunda."],
    ["Ia membeli buku, pensil, dan penghapus.", "Ia membeli buku pensil, dan penghapus.", "Ia membeli, buku, pensil, dan penghapus.", "Ia membeli buku, pensil, dan, penghapus."],
    ["Dia bukan dosen, melainkan tutor.", "Dia bukan dosen melainkan, tutor.", "Dia, bukan dosen melainkan tutor.", "Dia bukan, dosen melainkan tutor."],
    ["Seminar internasional akan digelar di Qingdao, Tiongkok, 22–29 Mei 2026.", "Seminar internasional, akan digelar di Qingdao Tiongkok 22–29 Mei 2026.", "Seminar internasional akan digelar, di Qingdao, Tiongkok 22–29 Mei 2026.", "Seminar, internasional akan digelar di Qingdao Tiongkok, 22–29 Mei 2026."],
  ];
  const KONJ = [
    ["Ia rajin belajar, ... nilainya selalu baik.", "sehingga", ["tetapi","walaupun","atau"], "Hubungan akibat memakai 'sehingga'."],
    ["Tujuan pendidikan tidak untuk bekerja, ... untuk membentuk manusia berkualitas.", "melainkan", ["tetapi juga","dan","sehingga"], "'Tidak/bukan … melainkan' untuk pembetulan."],
    ["Andi pergi ke perpustakaan, ... Budi pulang ke rumah.", "sedangkan", ["sehingga","karena","agar"], "Pertentangan dua klausa setara: 'sedangkan'."],
    ["Kamu boleh memilih kuliah pagi ... kuliah malam.", "atau", ["dan","sehingga","karena"], "Pilihan memakai 'atau'."],
    ["... sudah berusaha keras, ia belum berhasil.", "Meskipun", ["Karena","Sehingga","Agar"], "Hubungan konsesif: 'meskipun/walaupun'."],
    ["Bacalah materi terlebih dahulu ... mudah memahami kuis.", "agar", ["tetapi","atau","meskipun"], "Hubungan tujuan: 'agar/supaya'."],
  ];
  const PARAGRAF = [
    { s: "Kalimat utama di awal, diikuti kalimat-kalimat penjelas.", a: "Deduktif" },
    { s: "Rincian dan contoh disebut lebih dulu, kalimat utama sebagai simpulan di akhir.", a: "Induktif" },
    { s: "Kalimat utama ada di awal dan ditegaskan lagi di akhir paragraf.", a: "Campuran (deduktif-induktif)" },
    { s: "Paragraf berisi ajakan agar pembaca menjaga kebersihan kampus.", a: "Persuasi" },
    { s: "Paragraf menjelaskan langkah-langkah mendaftar ulang secara daring.", a: "Eksposisi" },
    { s: "Paragraf menggambarkan suasana pantai: pasir putih, ombak tenang, angin sejuk.", a: "Deskripsi" },
    { s: "Paragraf menceritakan pengalaman penulis dari berangkat hingga tiba di kampus.", a: "Narasi" },
    { s: "Paragraf menyampaikan pendapat bahwa kuliah daring efektif disertai data survei.", a: "Argumentasi" },
  ];
  const mk = (q, ok, bad, why) => ({ q, opts: [ok, ...take(bad, 4)], ans: 0, why });
  const G = [
    { p: "P04", tag: "serapan", make() { const s = take(BAKU, 4); const t = pick([1, 2]); if (t === 1) return mk("Penulisan kata baku yang benar adalah…", s[0][0], [s[0][1], s[1][1], s[2][1], s[3][1]], `Bentuk baku: ${s[0][0]} (bukan ${s[0][1]}).`); return mk("Kata berikut yang TIDAK baku adalah…", s[0][1], [s[0][0], s[1][0], s[2][0], s[3][0]], `${s[0][1]} tidak baku; bentuk bakunya ${s[0][0]}.`); } },
    { p: "P04", tag: "serapan", make() { const s = take(BAKU, 3); const ok = s.map(x => x[0]).join(", "); const bad = [s.map((x, i) => i === 0 ? x[1] : x[0]).join(", "), s.map((x, i) => i === 1 ? x[1] : x[0]).join(", "), s.map((x, i) => i === 2 ? x[1] : x[0]).join(", "), s.map(x => x[1]).join(", ")]; return mk("Kelompok kata yang semuanya baku adalah…", ok, bad, `Bentuk baku: ${ok}.`); } },
    { p: "P02", tag: "kapital", make() { const s = pick(KAPITAL); return mk("Penulisan huruf kapital yang benar adalah…", s[0], s.slice(1), "Kapital pada awal kalimat, nama diri, geografi, lembaga, hari raya, judul, dan gelar yang diikuti nama; kata arah/jabatan tanpa nama ditulis kecil."); } },
    { p: "P02", tag: "kata", make() { const a = pick(DIDEPAN.prefix), b = pick(DIDEPAN.prep); const okS = `Laporan itu ${a} ${b}.`; return mk("Penulisan di- dan di yang benar adalah…", okS, [`Laporan itu di ${a.slice(2)} ${b.replace(' ', '')}.`, `Laporan itu ${a} ${b.replace(' ', '')}.`, `Laporan itu di ${a.slice(2)} ${b}.`, `Laporan itu di-${a.slice(2)} di-${b.slice(3)}.`], `Awalan di- serangkai (${a}); kata depan di terpisah (${b}).`); } },
    { p: "P02", tag: "kata", make() { const pisah = pick(PUN.pisah), padu = pick(PUN.padu); const ok = `${pisah[0].toUpperCase() + pisah.slice(1)} kendalanya, ia tetap datang ${padu} terlambat.`; const j = s => s.replace(' pun', 'pun'), sp = s => s.replace('pun', ' pun'); return mk("Penulisan partikel pun yang benar adalah…", ok, [`${j(pisah)[0].toUpperCase() + j(pisah).slice(1)} kendalanya, ia tetap datang ${padu} terlambat.`, `${pisah[0].toUpperCase() + pisah.slice(1)} kendalanya, ia tetap datang ${sp(padu)} terlambat.`, `${j(pisah)[0].toUpperCase() + j(pisah).slice(1)} kendalanya, ia tetap datang ${sp(padu)} terlambat.`], `'${pisah}' ditulis terpisah, '${padu}' ditulis serangkai karena sudah padu.`); } },
    { p: "P02", tag: "angka", make() { const s = pick(ANGKA); return mk("Penulisan angka dan bilangan yang benar adalah…", s[0], s.slice(1), "Awal kalimat dengan huruf; abad ke-; miliar/kuitansi baku; Rp tanpa titik; tanda hubung pada -an dan se- + kapital."); } },
    { p: "P02", tag: "angka", make() { const s = pick(SINGKAT); return mk("Penulisan singkatan/gelar yang benar adalah…", s[0], s.slice(1), "Singkatan umum diakhiri titik (Yth., dsb., a.n.); gelar setelah koma dan diakhiri titik; singkatan nama lembaga/dokumen huruf kapital tanpa titik (KTP)."); } },
    { p: "P02", tag: "tandabaca", make() { const s = pick(KOMA); return mk("Penggunaan tanda koma yang benar adalah…", s[0], s.slice(1), "Koma sebelum tetapi/melainkan, setelah anak kalimat di awal, di antara rincian, dan di antara nama tempat-wilayah."); } },
    { p: "P05", tag: "hemat", make() { const [pl, ok] = pick(PLEO); const others = take(PLEO.filter(x => x[0] !== pl), 3).map(x => x[1]); return mk(`Bentuk yang efektif (hemat) sebagai pengganti "${pl}" adalah…`, ok, [pl, ...others.filter(x => x !== ok)], `"${pl}" pleonasme (berlebihan); cukup "${ok}".`); } },
    { p: "P05", tag: "hemat", make() { const s = take(PLEO, 4); const ok = `Mahasiswa diminta ${s[0][1]} sebelum kuis dimulai.`; return mk("Kalimat berikut yang paling efektif (tanpa pleonasme) adalah…", `Kami ${pick(['harus','perlu'])} hadir agar tugas selesai.`, [`Kami harus hadir agar supaya tugas selesai.`, `Kami harus hadir demi untuk menyelesaikan tugas.`, `Para mahasiswa-mahasiswa harus hadir.`, `Hal itu adalah merupakan tugas kami.`], "Hindari agar supaya, demi untuk, para … berulang, adalah merupakan."); } },
    { p: "P06", tag: "majemuk", make() { const [k, ok, bad, why] = pick(KONJ); return mk(`Konjungsi yang tepat untuk melengkapi kalimat: "${k}"`, ok, bad, why); } },
    { p: "P07", tag: "letak", make() { const x = pick(PARAGRAF); const pool = x.a.match(/Deduktif|Induktif|Campuran/) ? ["Deduktif", "Induktif", "Campuran (deduktif-induktif)", "Deskripsi", "Narasi"] : ["Persuasi", "Eksposisi", "Deskripsi", "Narasi", "Argumentasi"]; return mk(`${x.s} Jenis paragraf ini adalah…`, x.a, pool.filter(p => p !== x.a), `Ciri tersebut sesuai paragraf ${x.a.toLowerCase()}.`); } },
    { p: "P04", tag: "imbuhan", make() { const L = [["tulis","menulis"],["sapu","menyapu"],["pukul","memukul"],["kirim","mengirim"],["tanam","menanam"],["sajikan","menyajikan"],["produksi","memproduksi"],["protes","memprotes"],["kritik","mengkritik"],["traktir","mentraktir"],["kelola","mengelola"],["tebang","menebang"]]; const [d, ok] = pick(L); const c = d[0]; const wrong = [`me${d}`, `men${d}`, `mem${d}`, `meng${d}`, `meny${d.slice(1)}`, `mem${d.slice(1)}`, `men${d.slice(1)}`, `meng${d.slice(1)}`].filter(x => x !== ok); return mk(`Bentuk yang benar dari me- + ${d} adalah…`, ok, wrong, /^(pr|tr|kr|pl|kl)/.test(d) ? `Gugus konsonan (${d.slice(0, 2)}-) tidak luluh: ${ok}.` : 'kpts'.includes(c) ? `Huruf ${c} luluh: ${ok}.` : `Kata dasar berawal ${c}: ${ok}.`); } },
  ];
  (window.GENERATORS = window.GENERATORS || []).push(...G.map(g => ({ kode: "KUI001", ...g })));
})();
