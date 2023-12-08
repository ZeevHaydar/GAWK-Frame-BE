# GAWKFrame - Backend
Selamat datang di bagian Backend untuk GAWKFrame!<br>
GAWKFrame adalah sebuah sistem yang digagas oleh kelompok 12, Tugas Besar Layanan STI (II3120), untuk mendukung e-commerce dari perusahaan yang memakai layanan kami, yakni WovenWears. <br>

# Penjelasan Service
Bagian Backend dari layanan GAWKFrame memberikan layanan API sebagai berikut:
<br>
Pembayaran:
<ul>
<li> method: post, url: '/api/transaksi', query: userID
<li> method: get, url: '/api/transaksi', body: pembelian_baju
</ul>

InquiryBaju:
<ul>
<li> method: get, url: '/api/chat/:userId',
<li> method: post, url: '/api/chat/:userId', body: sender, message
<li> method: delete, url: '/api/chat/:userId', body: messageId
</ul>

PenampilanData:
<ul>
<li> method: get, url: 'api/pakaian'
<li> method: get, url: 'api/pakaian/:id'
<li> method: get, url: 'api/riwayat/:id'
<li> method: get, url: '/api/keranjang/:id'
<li> method: post, url: '/api/keranjang/:id', body: bajuId, jumlah
<li> method: delete, url: '/api/keranjang/:id', body: id_item
<li> method: get, url: '/api/pelanggan'
<li> method: get, url: '/api/pelanggan/:id'
<li> method: post, url: '/api/pelanggan', body: nama
<li> method: delete, url: '/api/pelanggan/:id'
</ul>

# Anggota Kelompok
1. Ivan Aldy Ganesen (NIM 18221045)
2. Laurentia Kayleen Christopher (NIM 18221053)
3. Nazhif Haidar Putra Wibowo (NIM 18221083)
4. Christopher Febrian Nugraha (NIM 18221115)
5. Ferdinand Refrandt (NIM 18221169)