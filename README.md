# Barkod Tarama Uygulaması

Bu proje, web tabanlı bir barkod tarama uygulamasıdır. Mobil cihazların kamerasını kullanarak barkod okuma ve ürün bilgilerini görüntüleme imkanı sağlar.

## Özellikler

- Mobil kamera ile barkod tarama
- Gerçek zamanlı barkod okuma
- Ürün bilgilerini JSON dosyasından sorgulama
- Modern ve kullanıcı dostu arayüz
- Responsive tasarım

## Kurulum

1. Projeyi GitHub'dan klonlayın
2. Proje dizinine gidin
3. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## Glitch'e Yükleme

1. GitHub reponuzu Glitch'e import edin:
   - Glitch'de "New Project" butonuna tıklayın
   - "Import from GitHub" seçeneğini seçin
   - GitHub repo URL'nizi yapıştırın

2. Glitch otomatik olarak:
   - Bağımlılıkları yükleyecek
   - Projeyi derleyecek
   - Uygulamayı başlatacak

## Kullanım

1. Uygulamayı mobil cihazınızda açın
2. Kamera izni isteğini onaylayın
3. "Barkod Tara" butonuna tıklayın
4. Barkodu kamera ile tarayın
5. Ürün bilgilerini görüntüleyin
6. Yeni barkod taramak için "Yeni Barkod Tara" butonunu kullanın

## Teknik Detaylar

- React ve TypeScript ile geliştirilmiştir
- HTML5 QR Code Scanner API kullanılmaktadır
- Tailwind CSS ile stillendirilmiştir
- Veri kaynağı olarak JSON dosyası kullanılmaktadır

## Gereksinimler

- Modern bir web tarayıcısı (Chrome, Firefox, Safari)
- Kamera erişimi olan mobil cihaz
- İnternet bağlantısı