// SOAL VARIASI Dasar-dasar SI: kasus diacak dari kumpulan contoh, pilihan jawaban diacak dari kategori yang setara.
(function () {
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const shuf = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]);
  // setiap pool: {p, tag, q (template), why, kat: {Kategori: [kasus,...]}}
  const P = [
    { p: "P01", tag: "karakteristik", q: k => `Pada sistem informasi akademik, "${k}" termasuk karakteristik sistem…`, why: (a) => `Ini contoh ${a}.`, kat: {
      "Input": ["data KRS yang diisi mahasiswa", "nilai yang diunggah dosen", "data pembayaran UKT dari bank"],
      "Output": ["transkrip nilai yang dicetak", "laporan IPK per semester", "kartu hasil studi"],
      "Processing": ["menghitung IPK dari nilai dan SKS", "memvalidasi jumlah SKS maksimal"],
      "Boundary": ["sistem hanya mengurus akademik, bukan keuangan kampus"],
      "Control": ["pengawasan hak akses agar mahasiswa tidak bisa mengubah nilai"],
      "Feedback": ["peringatan otomatis saat SKS melebihi batas sehingga mahasiswa memperbaiki KRS"] } },
    { p: "P02", tag: "informasi", q: k => `"${k}" Kondisi ini menunjukkan informasi tidak memenuhi karakteristik…`, why: a => `Kasus ini berkaitan dengan karakteristik ${a}.`, kat: {
      "Timely": ["Laporan penjualan Januari baru diterima manajer di bulan Juni", "Jadwal ujian diumumkan setelah ujian selesai"],
      "Accurate": ["Laporan stok menulis 500 unit padahal di gudang 50 unit", "IPK di transkrip salah hitung"],
      "Relevant": ["Manajer keuangan menerima laporan jumlah tanaman hias di lobi untuk keputusan anggaran"],
      "Secure": ["Data gaji seluruh pegawai bisa dibuka oleh siapa saja tanpa login"],
      "Simple": ["Direktur menerima laporan 300 halaman berisi tabel mentah untuk keputusan cepat"],
      "Accessible": ["Dosen wali tidak dapat membuka data nilai mahasiswa bimbingannya saat diperlukan"],
      "Verifiable": ["Angka penjualan di laporan tidak dapat dicocokkan dengan bukti transaksi mana pun"] } },
    { p: "P02", tag: "data", q: k => `Proses "${k}" dalam mengubah data menjadi informasi disebut…`, why: a => `${a} adalah salah satu dari 5C pengolahan data.`, kat: {
      "Kondensasi": ["meringkas ribuan baris transaksi menjadi total per hari", "membuang kolom yang tidak dibutuhkan laporan"],
      "Kontekstualisasi": ["memahami bahwa data kehadiran dikumpulkan untuk syarat ikut UAS"],
      "Kalkulasi": ["menghitung rata-rata nilai kelas", "menganalisis tren penjualan per bulan"],
      "Kategorisasi": ["mengelompokkan mahasiswa menjadi predikat cum laude, sangat memuaskan, memuaskan"],
      "Koreksi": ["menghapus data ganda dan salah ketik sebelum dianalisis"] } },
    { p: "P04", tag: "mss", q: k => `"${k}" paling tepat menggunakan…`, why: a => `Kasus ini sesuai fungsi ${a}.`, kat: {
      "Transaction Processing System": ["Mencatat ribuan transaksi kasir setiap hari", "Memproses penggajian seluruh pegawai tiap bulan", "Mencatat pembayaran UKT mahasiswa"],
      "Management Information System": ["Laporan rutin barang masuk-keluar per minggu dengan format tetap", "Rekap kehadiran pegawai bulanan untuk kepala bagian"],
      "Decision Support System": ["Memilih lokasi cabang baru berdasarkan simulasi beberapa skenario", "Memprediksi penjualan produk baru"],
      "Executive Information System": ["Dasbor grafik ringkas kinerja seluruh cabang untuk direktur utama"],
      "Sistem pakar": ["Mendiagnosis penyakit ternak berdasarkan gejala seperti seorang dokter hewan", "Memberi saran perawatan tanaman berdasarkan pengetahuan ahli pertanian"],
      "Enterprise Collaboration System": ["Tim proyek berbagi dokumen, email, dan rapat video"],
      "Process Control System": ["Mengendalikan suhu mesin produksi secara otomatis di pabrik"] } },
    { p: "P05", tag: "elemen", q: k => `Dalam CBIS, "${k}" termasuk elemen…`, why: a => `Itu bagian dari elemen ${a}.`, kat: {
      "People": ["programmer", "system analyst", "operator data entry", "manajer pengguna sistem"],
      "Hardware": ["server", "printer", "hard disk", "komputer kasir"],
      "Software": ["sistem operasi", "DBMS", "aplikasi akuntansi"],
      "Data": ["file transaksi penjualan", "database pelanggan"],
      "Telecommunication": ["jaringan internet kantor", "router dan kabel jaringan"] } },
    { p: "P06", tag: "hardware", q: k => `${k} termasuk…`, why: a => `Kategori: ${a}.`, kat: {
      "Perangkat input": ["Keyboard", "Mouse", "Scanner", "Mikrofon", "Webcam"],
      "Perangkat output": ["Monitor", "Printer", "Speaker", "Proyektor"],
      "Perangkat proses": ["CPU", "GPU"],
      "Software": ["Sistem operasi Windows", "Aplikasi pengolah kata"],
      "Brainware": ["Operator komputer", "Programmer"] } },
    { p: "P06", tag: "generasi", q: k => `Komputer yang ${k} termasuk generasi…`, why: a => `Ciri tersebut milik komputer ${a}.`, kat: {
      "Pertama": ["memakai tabung hampa seperti ENIAC", "berukuran sangat besar dan sering gagal setiap beberapa menit"],
      "Kedua": ["mulai memakai transistor", "1000 kali lebih cepat dari generasi tabung hampa"],
      "Ketiga": ["memakai IC berupa silicon chip"],
      "Keempat": ["memakai mikroprosesor sehingga lahir komputer pribadi (PC)"] } },
    { p: "P09", tag: "jaringan", q: k => `Jaringan yang ${k} disebut…`, why: a => `Cakupan tersebut sesuai ${a}.`, kat: {
      "LAN": ["menghubungkan komputer di satu laboratorium kampus", "menghubungkan ruangan dalam satu gedung kantor"],
      "MAN": ["menghubungkan kantor-kantor cabang dalam satu kota"],
      "WAN": ["menghubungkan kantor pusat Jakarta dengan kantor di Tokyo", "mencakup antarnegara memakai fiber optic"],
      "Intranet": ["hanya dapat diakses karyawan untuk portal internal perusahaan"],
      "Extranet": ["membuka sebagian portal internal agar pemasok bisa melihat pesanan"] } },
    { p: "P09", tag: "layanan", q: k => `Layanan internet untuk ${k} adalah…`, why: a => `Fungsi itu dilayani oleh ${a}.`, kat: {
      "FTP": ["memindahkan berkas dari satu komputer ke komputer lain"],
      "E-mail": ["mengirim pesan teks dan lampiran ke pengguna lain"],
      "Telnet": ["log-on ke komputer lain dari jarak jauh"],
      "VoIP": ["percakapan telepon melalui internet"],
      "VPN": ["koneksi aman ke jaringan kantor melalui internet"],
      "Video conferencing": ["rapat tatap muka jarak jauh dengan gambar dan suara"],
      "Content streaming": ["menonton video yang langsung diputar tanpa mengunduh penuh"] } },
    { p: "P10", tag: "klasifikasi", q: k => `${k} Klasifikasi e-commerce yang tepat adalah…`, why: a => `Pihak yang bertransaksi menunjukkan jenis ${a}.`, kat: {
      "B2B": ["Pabrik memesan bahan baku dari pemasok melalui portal online.", "Dell memesan sparepart dari pemasok lewat aplikasi."],
      "B2C": ["Mahasiswa membeli laptop di toko online resmi milik produsen.", "Pembeli memesan buku di amazon.com."],
      "C2C": ["Seorang mahasiswa menjual sepeda bekas kepada mahasiswa lain lewat marketplace.", "Barang bekas dilelang antarindividu di eBay."],
      "B2E": ["Perusahaan menyediakan portal penjualan produk dengan harga khusus untuk karyawannya."],
      "C2B": ["Seorang fotografer lepas menjual foto karyanya kepada perusahaan media lewat internet."],
      "G2C": ["Warga membayar pajak kendaraan melalui aplikasi resmi pemerintah."],
      "G2B": ["Pemerintah membuka lelang pengadaan barang secara elektronik untuk perusahaan."] } },
    { p: "P12", tag: "business", q: k => `"${k}" dalam pengembangan SI termasuk…`, why: a => `Termasuk ${a}.`, kat: {
      "Tangible cost": ["Biaya membeli 20 komputer baru", "Biaya lisensi software", "Biaya listrik server per bulan"],
      "Intangible cost": ["Turunnya semangat kerja karyawan saat transisi ke sistem baru"],
      "Tangible benefit": ["Biaya kertas berkurang Rp5 juta per bulan", "Waktu proses pesanan turun dari 3 hari menjadi 1 hari"],
      "Intangible benefit": ["Kepuasan pelanggan meningkat", "Citra perusahaan menjadi lebih modern"] } },
    { p: "P12", tag: "requirement", q: k => `Kebutuhan "${k}" termasuk…`, why: a => `${a === 'Functional requirement' ? 'Fitur yang diharapkan dari sistem' : 'Batasan/kualitas sistem, bukan fitur'}.`, kat: {
      "Functional requirement": ["sistem dapat mencetak kartu anggota", "pengguna dapat mencari buku berdasarkan judul", "admin dapat menambah data mahasiswa"],
      "Non-functional requirement": ["halaman harus terbuka kurang dari 2 detik", "sistem dapat dipakai 500 pengguna sekaligus", "data harus dienkripsi"] } },
    { p: "P13", tag: "testing", q: k => `${k} disebut…`, why: a => `Itu definisi ${a}.`, kat: {
      "Unit testing": ["Menguji satu fungsi hitung IPK secara terpisah"],
      "Integration testing": ["Menguji modul KRS, nilai, dan keuangan setelah digabungkan"],
      "Volume/stress testing": ["Menguji sistem dengan 10.000 data dan ribuan pengguna sekaligus"],
      "Acceptance test": ["Pengguna akhir mencoba sistem untuk menyatakan sistem diterima sebelum dipakai"] } },
    { p: "P14", tag: "implementasi", q: k => `${k} Tipe implementasi ini adalah…`, why: a => `Ciri tersebut milik ${a}.`, kat: {
      "Direct conversion": ["Mulai besok sistem lama dimatikan dan semua bagian langsung memakai sistem baru.", "Sistem baru menggantikan seluruh sistem lama sekaligus tanpa masa transisi."],
      "Parallel implementation": ["Selama satu bulan transaksi dicatat di sistem lama dan sistem baru bersamaan."],
      "Hybrid implementation": ["Modul gudang diganti bulan ini, modul keuangan bulan depan, modul SDM berikutnya."] } },
    { p: "P14", tag: "maintenance", q: k => `${k} Ini termasuk…`, why: a => `Tujuan perbaikan tersebut sesuai ${a}.`, kat: {
      "Corrective maintenance": ["Tombol simpan error sehingga data hilang, lalu diperbaiki.", "Bug perhitungan diskon diperbaiki."],
      "Adaptive maintenance": ["Sistem pajak diubah karena tarif PPN dari pemerintah berubah.", "Aplikasi disesuaikan dengan prosedur kerja baru."],
      "Perfective maintenance": ["Tampilan laporan dipercantik dan dipercepat walau tidak ada error."],
      "Preventive maintenance": ["Dokumentasi kode dilengkapi agar sistem mudah dirawat ke depan."] } },
    { p: "P15", tag: "knowledge", q: k => `${k} termasuk…`, why: a => `Itu contoh ${a}.`, kat: {
      "Explicit knowledge": ["SOP pelayanan pelanggan yang tertulis", "Manual penggunaan aplikasi"],
      "Tacit knowledge": ["Keahlian teknisi senior mengenali kerusakan mesin dari bunyinya", "Intuisi negosiasi seorang manajer berpengalaman"],
      "Procedural knowledge (know how)": ["Pengetahuan langkah-langkah memasang server"],
      "Declarative knowledge (know what)": ["Pengetahuan bahwa server kampus berada di gedung B"] } },
  ];
  const G = P.map(pool => ({ p: pool.p, tag: pool.tag, make() {
    const ks = Object.keys(pool.kat); const a = pick(ks); const kasus = pick(pool.kat[a]);
    const others = shuf(ks.filter(k => k !== a)).slice(0, 4);
    return { q: pool.q(kasus), opts: [a, ...others], ans: 0, why: pool.why(a) };
  } }));
  (window.GENERATORS = window.GENERATORS || []).push(...G.map(g => ({ kode: "SIF003", ...g })));
})();
