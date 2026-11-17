// SOAL GENERATOR Pemrograman Web Dinamis — setiap pemanggilan membuat variasi baru.
// Kunci jawaban dihitung oleh kode, jadi selalu benar.
(function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  // susun 5 opsi unik: jawaban benar + pengecoh
  function opts(correct, distract) {
    const s = [String(correct)];
    for (const d of distract) { const v = String(d); if (!s.includes(v)) s.push(v); if (s.length === 5) break; }
    const m = String(correct).match(/^(-?\d+(?:\.\d+)?)(.*)$/); let k = 1;
    const extra = ["Tidak ada yang benar", "Error", "undefined", "null"];
    while (s.length < 5) { const v = m ? String(+m[1] + [5, -5, 10, 15, -10, 20, 25][k % 7] * (k > 6 ? 2 : 1)) + m[2] : extra[(k - 1) % 4]; if (!s.includes(v) && !(m && +v.replace(m[2], '') < 0)) s.push(v); k++; if (k > 40) break; }
    return { opts: s, ans: 0 }; // urutan diacak oleh aplikasi
  }
  const G = [
    { p: "P04", tag: "box-sizing", make() {
      const w = R(10, 40) * 10, pd = R(1, 6) * 5, b = R(1, 5);
      const t = w + 2 * pd + 2 * b;
      return { q: "Lebar total elemen (tanpa margin) dengan box-sizing default (content-box) adalah…", code: `.box {\n  width: ${w}px;\n  padding: ${pd}px;\n  border: ${b}px solid #333;\n}`,
        ...opts(t + "px", [w + "px", w + pd + b + "px", w + 2 * pd + "px", w + pd * 2 + b + "px", w + 2 * b + "px"]),
        why: `content-box: ${w} + 2×${pd} (padding) + 2×${b} (border) = ${t}px.` }; } },
    { p: "P04", tag: "box-sizing", make() {
      const w = R(10, 40) * 10, pd = R(1, 6) * 5, b = R(1, 5);
      return { q: "Lebar total elemen (tanpa margin) adalah…", code: `.box {\n  width: ${w}px;\n  padding: ${pd}px;\n  border: ${b}px solid;\n  box-sizing: border-box;\n}`,
        ...opts(w + "px", [w + 2 * pd + 2 * b + "px", w - 2 * pd - 2 * b + "px", w + 2 * pd + "px", w - 2 * pd + "px"]),
        why: `border-box: width ${w}px SUDAH termasuk padding & border, jadi total tetap ${w}px (konten menyusut menjadi ${w - 2 * pd - 2 * b}px).` }; } },
    { p: "P04", tag: "box-model", make() {
      const v = [R(1, 9) * 5, R(1, 9) * 5, R(1, 9) * 5, R(1, 9) * 5]; const sides = ["atas", "kanan", "bawah", "kiri"]; const i = R(0, 3);
      return { q: `Berapa nilai margin ${sides[i]}?`, code: `margin: ${v.join("px ")}px;`, ...opts(v[i] + "px", v.filter((_, j) => j !== i).map(x => x + "px").concat(["0px", v[i] * 2 + "px"])),
        why: `Empat nilai dibaca searah jarum jam: atas ${v[0]}, kanan ${v[1]}, bawah ${v[2]}, kiri ${v[3]}.` }; } },
    { p: "P04", tag: "box-model", make() {
      const a = R(1, 9) * 5, b = R(1, 9) * 5; const i = R(0, 3); const sides = ["atas", "kanan", "bawah", "kiri"]; const val = i % 2 === 0 ? a : b;
      return { q: `Berapa padding ${sides[i]}?`, code: `padding: ${a}px ${b}px;`, ...opts(val + "px", [(i % 2 === 0 ? b : a) + "px", a + b + "px", "0px", a * 2 + "px"]),
        why: `Dua nilai: pertama atas & bawah (${a}px), kedua kanan & kiri (${b}px).` }; } },
    { p: "P05", tag: "unit", make() {
      const root = pick([10, 12, 14, 16, 18, 20]), k = pick([0.5, 1.25, 1.5, 2, 2.5, 3]); const v = root * k;
      return { q: "Ukuran font p dalam px adalah…", code: `html { font-size: ${root}px; }\np { font-size: ${k}rem; }`, ...opts(v + "px", [16 * k + "px", root + "px", k + "px", root + k + "px"]),
        why: `rem relatif ke font root (html): ${k} × ${root}px = ${v}px.` }; } },
    { p: "P05", tag: "unit", make() {
      const par = pick([12, 14, 16, 18, 20, 24]), k = pick([0.5, 1, 1.5, 2]); const v = par * k;
      return { q: "Padding tombol dalam px adalah…", code: `.induk { font-size: ${par}px; }\n.induk .btn { padding: ${k}em; }`, ...opts(v + "px", [16 * k + "px", par + "px", k + "px", par / k + "px"]),
        why: `em relatif ke font elemen induk: ${k} × ${par}px = ${v}px (font tombol diwarisi dari induk).` }; } },
    { p: "P05", tag: "unit", make() {
      const vw = pick([360, 768, 1024, 1280, 1920]), k = pick([10, 25, 50, 80]); const unit = pick(["vw", "%"]);
      return { q: `Lebar viewport ${vw}px dan elemen langsung di dalam <body> (lebar penuh). Lebar .box…`, code: `.box { width: ${k}${unit}; }`, ...opts(vw * k / 100 + "px", [k + "px", vw + "px", vw / k + "px", vw * k + "px"]),
        why: `${k}${unit} dari ${vw}px = ${vw * k / 100}px.` }; } },
    { p: "P05", tag: "media-query", make() {
      const bp = pick([480, 600, 768, 1024]), typ = pick(["max", "min"]), w = pick([360, 414, 600, 768, 1024, 1280]);
      const on = typ === "max" ? w <= bp : w >= bp;
      return { q: `Lebar layar ${w}px. Apakah warna latar menjadi merah?`, code: `@media (${typ}-width: ${bp}px) {\n  body { background: red; }\n}`,
        ...opts(on ? "Ya, berlaku" : "Tidak berlaku", [on ? "Tidak berlaku" : "Ya, berlaku", "Hanya saat dicetak", "Hanya mode landscape", "Error sintaks"]),
        why: `${typ}-width: ${bp}px berlaku jika lebar ${typ === "max" ? "≤" : "≥"} ${bp}px. ${w}px ${on ? "memenuhi" : "tidak memenuhi"}.` }; } },
    { p: "P06", tag: "js-operator", make() {
      const a = R(7, 60), b = R(2, 9);
      return { q: "Hasil ekspresi berikut…", code: `${a} % ${b}`, ...opts(a % b, [Math.floor(a / b), (a / b).toFixed(2), b - (a % b), 0, a % (b + 1)]),
        why: `% = sisa bagi. ${a} = ${Math.floor(a / b)} × ${b} + ${a % b}.` }; } },
    { p: "P06", tag: "js-operator", make() {
      const a = R(1, 9), b = R(2, 9), c = R(2, 9); const v = a + b * c;
      return { q: "Hasil ekspresi berikut…", code: `${a} + ${b} * ${c}`, ...opts(v, [(a + b) * c, a + b + c, a * b + c, "" + a + b * c]),
        why: `Perkalian lebih dulu: ${b}×${c}=${b * c}, lalu + ${a} = ${v}.` }; } },
    { p: "P06", tag: "js-tipe", make() {
      const a = R(1, 9), b = R(1, 9); const op = pick(["+", "-", "*"]); const s = `"${a}" ${op} ${b}`;
      const v = op === "+" ? `"${a}${b}"` : String(op === "-" ? a - b : a * b);
      return { q: "Hasil ekspresi JavaScript berikut…", code: s, ...opts(v, [String(a + b), `"${a}${b}"`, "NaN", String(a - b), String(a * b), "Error"]),
        why: op === "+" ? "Jika salah satu operand string, + menggabungkan teks." : `Operator ${op} mengonversi string ke angka.` }; } },
    { p: "P06", tag: "js-operator", make() {
      const pairs = [["5", "5", "=="], ["5", '"5"', "=="], ["5", '"5"', "==="], ["0", "false", "=="], ["0", "false", "==="], ["1", '"1"', "!=="], ["null", "undefined", "=="], ["null", "undefined", "==="]];
      const [x, y, op] = pick(pairs); const v = String(eval(`${x} ${op} ${y}`));
      return { q: "Hasil perbandingan berikut…", code: `${x} ${op} ${y}`, ...opts(v, [v === "true" ? "false" : "true", "undefined", "Error", "NaN"]),
        why: op.length === 3 ? "=== / !== membandingkan nilai DAN tipe." : "== / != membandingkan nilai setelah konversi tipe." }; } },
    { p: "P06", tag: "js-kontrol", make() {
      const s = R(0, 3), e = R(4, 10), st = pick([1, 1, 2, 3]), le = pick(["<", "<="]);
      let n = 0; for (let i = s; le === "<" ? i < e : i <= e; i += st) n++;
      return { q: "Berapa kali console.log dijalankan?", code: `for (let i = ${s}; i ${le} ${e}; i${st === 1 ? "++" : " += " + st}) {\n  console.log(i);\n}`,
        ...opts(n, [n + 1, n - 1, e - s, e, Math.max(0, n + 2)]), why: `i bernilai ${s}, ${s + st}, … selama i ${le} ${e} → ${n} kali.` }; } },
    { p: "P06", tag: "js-kontrol", make() {
      const lim = R(2, 6) * 10, n = R(lim - 15, lim + 15); const ok = n >= lim;
      return { q: "Apa yang ditampilkan?", code: `let nilai = ${n};\nif (nilai >= ${lim}) {\n  alert("Lulus");\n} else {\n  alert("Tidak lulus");\n}`,
        ...opts(ok ? "Lulus" : "Tidak lulus", [ok ? "Tidak lulus" : "Lulus", "Error", "Tidak muncul apa-apa", "Lulus lalu Tidak lulus"]), why: `${n} ${ok ? "≥" : "<"} ${lim}, jadi masuk blok ${ok ? "if" : "else"}.` }; } },
    { p: "P06", tag: "js-tipe", make() {
      const arr = ["Ahmad", "Budi", "Citra", "Dewi", "Eka"].slice(0, R(3, 5)); const i = R(0, arr.length - 1);
      return { q: "Hasil kode berikut…", code: `let mhs = [${arr.map(x => `"${x}"`).join(", ")}];\nconsole.log(mhs[${i}]);`, ...opts(arr[i], [arr[(i + 1) % arr.length], i > 0 ? arr[i - 1] : "undefined", "undefined", String(arr.length)]),
        why: `Indeks array mulai dari 0, jadi mhs[${i}] adalah elemen ke-${i + 1}: "${arr[i]}".` }; } },
    { p: "P06", tag: "js-tipe", make() {
      const n = R(2, 6); const arr = Array.from({ length: n }, () => R(1, 20));
      return { q: "Nilai mhs.length adalah…", code: `let mhs = [${arr.join(", ")}];`, ...opts(n, [n - 1, n + 1, arr[n - 1], 0]), why: `.length = jumlah elemen (${n}); indeks terakhir ${n - 1}.` }; } },
    { p: "P03", tag: "warna", make() {
      const c = pick([["#FF0000", "rgb(255, 0, 0)", "merah"], ["#00FF00", "rgb(0, 255, 0)", "hijau"], ["#0000FF", "rgb(0, 0, 255)", "biru"], ["#FFFFFF", "rgb(255, 255, 255)", "putih"], ["#000000", "rgb(0, 0, 0)", "hitam"], ["#FFFF00", "rgb(255, 255, 0)", "kuning"], ["#00FFFF", "rgb(0, 255, 255)", "cyan"], ["#FF00FF", "rgb(255, 0, 255)", "magenta"]]);
      const all = ["merah", "hijau", "biru", "putih", "hitam", "kuning", "cyan", "magenta"];
      return pick([
        { q: `Kode ${c[0]} adalah warna…`, code: null, ...opts(c[2], all.filter(x => x !== c[2]).sort(() => Math.random() - .5)), why: `${c[0]} = ${c[1]} → ${c[2]}. Format #RRGGBB (FF = 255).` },
        { q: `${c[1]} sama dengan kode HEX…`, code: null, ...opts(c[0], ["#FF0000", "#00FF00", "#0000FF", "#FFFFFF", "#000000", "#FFFF00"].filter(x => x !== c[0]).sort(() => Math.random() - .5)), why: `255 = FF, 0 = 00 → ${c[0]}.` }]); } },
    { p: "P10", tag: "php-string", make() {
      const a = pick(["Si", "Web", "Data", "PHP"]), b = pick(["berMu", "Dinamis", "Base", "Dasar"]); const sp = pick([true, false]);
      const v = sp ? a + " " + b : a + b;
      return { q: "Output kode PHP berikut…", code: `<?php\n$a = "${a}";\n$b = "${b}";\necho $a ${sp ? '. " " ' : ""}. $b;\n?>`, ...opts(v, [sp ? a + b : a + " " + b, "$a$b", a + "." + b, "Error"]),
        why: "Titik (.) menggabungkan string di PHP." }; } },
    { p: "P10", tag: "php-string", make() {
      const h = R(1, 9) * 5000, j = R(2, 9);
      return { q: "Output kode PHP berikut…", code: `<?php\n$harga = ${h};\n$jumlah = ${j};\necho "Total: " . $harga * $jumlah;\n?>`, ...opts("Total: " + h * j, ["Total: " + h + j, "Total: " + (h + j), "Total: $harga * $jumlah", "Error"]),
        why: `Perkalian dihitung dulu (${h} × ${j} = ${h * j}), lalu digabung dengan teks.` }; } },
    { p: "P10", tag: "php-string", make() {
      const n = pick(["Rina", "Ahmad", "Citra"]); const q = pick(['"', "'"]);
      return { q: "Output kode PHP berikut…", code: `<?php\n$nama = "${n}";\necho ${q}Halo $nama${q};\n?>`, ...opts(q === '"' ? "Halo " + n : "Halo $nama", [q === '"' ? "Halo $nama" : "Halo " + n, "Halo", "Error", "$nama"]),
        why: q === '"' ? "Kutip ganda mengganti variabel dengan nilainya." : "Kutip tunggal menampilkan teks apa adanya." }; } },
    { p: "P13", tag: "sql", make() {
      const rows = ["Ahmad", "Budi", "Citra", "Dewi", "Eka", "Fajar"].map(n => [n, R(50, 95)]); const x = pick([60, 70, 75, 80]); const op = pick([">", ">=", "<"]);
      const cnt = rows.filter(r => op === ">" ? r[1] > x : op === ">=" ? r[1] >= x : r[1] < x).length;
      return { q: "Berapa baris yang dihasilkan query berikut?", code: `Tabel nilai:\n${rows.map(r => r[0].padEnd(7) + r[1]).join("\n")}\n\nSELECT nama FROM nilai WHERE skor ${op} ${x};`,
        ...opts(cnt, [rows.length - cnt, cnt + 1, Math.max(0, cnt - 1), rows.length]), why: `Baris dengan skor ${op} ${x}: ${rows.filter(r => op === ">" ? r[1] > x : op === ">=" ? r[1] >= x : r[1] < x).map(r => r[0]).join(", ") || "tidak ada"} → ${cnt}.` }; } },
    { p: "P13", tag: "sql", make() {
      const t = pick(["mahasiswa", "user", "barang"]), k = pick(["nama", "email", "alamat"]); const id = R(1, 20);
      const ops = [["UPDATE", `UPDATE ${t} SET ${k} = 'baru' WHERE id = ${id};`, "Update"], ["DELETE", `DELETE FROM ${t} WHERE id = ${id};`, "Delete"], ["SELECT", `SELECT ${k} FROM ${t} WHERE id = ${id};`, "Read"], ["INSERT", `INSERT INTO ${t} (${k}) VALUES ('baru');`, "Create"]];
      const o = pick(ops);
      return { q: "Query berikut termasuk operasi CRUD…", code: o[1], ...opts(o[2], ["Create", "Read", "Update", "Delete", "Drop"].filter(x => x !== o[2])), why: `${o[0]} = ${o[2]}.` }; } },
    { p: "P02", tag: "tabel", make() {
      const c = R(2, 5);
      return { q: `Tabel punya ${c} kolom. Agar satu sel judul membentang selebar tabel, gunakan…`, code: null, ...opts(`<th colspan="${c}">`, [`<th rowspan="${c}">`, `<th colspan="${c - 1}">`, `<th span="${c}">`, `<tr colspan="${c}">`]),
        why: `colspan="${c}" menggabungkan ${c} kolom pada satu baris.` }; } },
  ];
  window.GENERATORS = (window.GENERATORS || []).concat(G.map(g => Object.assign(g, { kode: "SIF004" })));
})();
