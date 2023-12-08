# GAWK-Frame-BE
Please Geb me KOK

# Penjelasan Service
Bagian Back-End dari layanan GAWK-Frame memberikan API berikut:
<br>
Pembayaran:
- method: post, url: '/api/transaksi', query: userID
- method: get, url: '/api/transaksi', body: pembelian_baju
<br>
InquiryBaju:
- method: get, url: '/api/chat/:userId',
- method: post, url: '/api/chat/:userId', body: sender, message
- method: delete, url: '/api/chat/:userId', body: messageId
<br>
PenampilanData:
- method: get, url: 'api/pakaian'
- method: get, url: 'api/pakaian/:id'
- method: get, url: 'api/riwayat/:id'
- method: get, url: '/api/keranjang/:id'
- method: post, url: '/api/keranjang/:id', body: bajuId, jumlah
- method: delete, url: '/api/keranjang/:id', body: id_item
- method: get, url: '/api/pelanggan'
- method: get, url: '/api/pelanggan/:id'
- method: post, url: '/api/pelanggan', body: nama
- method: delete, url: '/api/pelanggan/:id'