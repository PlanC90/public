# Barkod Sorgulama Uygulaması

Bu proje, web tabanlı basit bir barkod sorgulama uygulamasıdır. Kullanıcılar barkod numarasını girerek ürün bilgilerini görüntüleyebilirler.

## Özellikler

- Barkod numarası ile ürün sorgulama
- Basit ve kullanıcı dostu arayüz
- Responsive tasarım
- Siyah ve pembe tonlarında modern görünüm

## Glitch'e Yükleme Adımları

1. GitHub reponuzu Glitch'e import edin:
   - Glitch'de "New Project" butonuna tıklayın
   - "Import from GitHub" seçeneğini seçin
   - GitHub repo URL'nizi yapıştırın

2. Glitch otomatik olarak:
   - Bağımlılıkları yükleyecek
   - Projeyi derleyecek
   - Uygulamayı başlatacak

3. Eğer otomatik başlatma gerçekleşmezse:
   - package.json dosyasındaki scripts kısmında "start" komutunun olduğundan emin olun
   - Glitch konsolunda manuel olarak `npm start` komutunu çalıştırın

## Veri Formatı

Urunler.json dosyası aşağıdaki formatta olmalıdır:

```
barkod;urunAdi;fiyat;stok
121231212121213;cezve;14,99TL;200
123456789012;Türk Kahvesi;89,90TL;150
987654321098;Fincan Seti;299,90TL;50
```

## Gereksinimler

- Modern bir web tarayıcısı (Chrome, Firefox, Safari)
- İnternet bağlantısı

## Teknik Detaylar

- React ve TypeScript ile geliştirilmiştir
- Tailwind CSS ile stillendirilmiştir
- Veri kaynağı olarak JSON dosyası kullanılmaktadır