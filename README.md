```markdown
# Memex P2P Token Trade Platform - cPanel Deployment Guide

Bu README dosyası, projeyi cPanel'li bir web hosting ortamında nasıl çalıştıracağınızı adım adım anlatmaktadır.

## Gereksinimler

*   cPanel erişimi olan bir web hosting hesabı
*   PHP 7.0 veya üzeri

## Kurulum Adımları

1.  **Proje Dosyalarını Yükleme:**
    *   cPanel'e giriş yapın.
    *   "Dosya Yöneticisi"ne gidin.
    *   `public_html` veya benzeri web kök dizinine gidin.
    *   Proje dosyalarınızı (örneğin, `telegram_p2p_token_trade_platform_2_pphhf9` klasörünü) bu dizine yükleyin.

2.  **Veritabanı Oluşturma (Gerekli Değil):**
    *   Bu proje JSON dosyalarını kullandığı için veritabanı oluşturmanıza gerek yoktur.

3.  **Veritabanı Ayarlarını Yapılandırma (Gerekli Değil):**
    *   Bu proje JSON dosyalarını kullandığı için veritabanı ayarlarını yapılandırmanıza gerek yoktur.

4.  **.htaccess Dosyası (Gerekirse):**
    *   Eğer projenizde `.htaccess` dosyası varsa ve URL yönlendirmesi veya diğer Apache ayarları gerekiyorsa, bu dosyanın doğru şekilde yapılandırıldığından emin olun.
    *   `mod_rewrite` modülünün etkin olduğundan emin olun.

5.  **CORS Ayarları (Gerekirse):**
    *   Eğer CORS sorunları yaşıyorsanız, PHP dosyalarınızda gerekli CORS başlıklarını ayarlamanız gerekebilir. Örneğin:

        ```php
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        ```

6.  **Proje URL'sini Ziyaret Etme:**
    *   Tarayıcınızda proje URL'sini ziyaret edin (örneğin, `http://www.example.com/telegram_p2p_token_trade_platform_2_pphhf9/`).
    *   Projeniz çalışmalıdır.

## Ek Bilgiler

*   Bu proje, frontend (React) ve backend (PHP) bileşenlerinden oluşur.
*   Veritabanı işlemleri yerine JSON dosyaları kullanılmıştır.
*   Telegram API entegrasyonu ve diğer dinamik işlemler için PHP kodunu sunucu tarafında çalıştırmanız gerekmektedir.
*   Sunucu tarafı kodlama ve Telegram API entegrasyonu gibi işlemleri ayrı olarak yapmanız gerekmektedir.
*   API'nizi yetkisiz erişime karşı korumak için gerekli güvenlik önlemlerini alın.
*   CORS sorunlarıyla karşılaşırsanız, sunucu tarafında CORS başlıklarını ayarlamanız gerekecektir.
```
