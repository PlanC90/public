## XAMPP Kurulum ve Proje Çalıştırma Talimatları

1.  **XAMPP Kurulumu:**

    *   Eğer XAMPP kurulu değilse, [Apache Friends](https://www.apachefriends.org/index.html) adresinden XAMPP'ı indirin ve kurun.
    *   XAMPP'ı kurarken Apache ve MySQL modüllerini seçtiğinizden emin olun.

2.  **Proje Dosyalarını XAMPP Klasörüne Kopyalama:**

    *   Proje dosyalarınızı (örneğin, `telegram_p2p_token_trade_platform_2_pphhf9` klasörünü) XAMPP'ın `htdocs` klasörüne kopyalayın.
        *   Varsayılan olarak, `htdocs` klasörü genellikle `C:\xampp\htdocs` dizinindedir.

3.  **XAMPP Kontrol Panelini Açma:**

    *   XAMPP Kontrol Panelini açın.
    *   Apache ve MySQL servislerini başlatın.

4.  **Veritabanı Oluşturma:**

    *   Tarayıcınızda `http://localhost/phpmyadmin` adresine gidin.
    *   Yeni bir veritabanı oluşturun (örneğin, `your_db_name`).
    *   Veritabanı kullanıcı adı ve şifresini not alın (varsayılan olarak kullanıcı adı `root` ve şifre boştur).

5.  **Veritabanı Tablolarını Oluşturma:**

    *   Oluşturduğunuz veritabanını seçin.
    *   SQL sekmesine tıklayın.
    *   Aşağıdaki SQL kodlarını kopyalayıp yapıştırın ve çalıştırın:

        ```sql
        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            telegram_username VARCHAR(255) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            amount INT NOT NULL,
            type VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        ```

6.  **Veritabanı Ayarlarını Yapılandırma:**

    *   Proje klasörünüzdeki `config.php` dosyasını açın.
    *   Veritabanı ayarlarını kendi XAMPP kurulumunuza göre düzenleyin:

        ```php
        <?php
        return [
            'db_host' => 'localhost', // Veritabanı sunucu adresi
            'db_user' => 'root', // Veritabanı kullanıcı adı
            'db_password' => '', // Veritabanı şifresi
            'db_name' => 'your_db_name', // Veritabanı adı
        ];
        ?>
        ```

7.  **Proje URL'sini Ziyaret Etme:**

    *   Tarayıcınızda `http://localhost/telegram_p2p_token_trade_platform_2_pphhf9/` adresine gidin.
    *   Projeniz çalışmalıdır.

8.  **Ek Yapılandırmalar (Gerekirse):**

    *   Eğer projenizde `.htaccess` dosyası varsa ve Apache'de `mod_rewrite` etkin değilse, etkinleştirmeniz gerekebilir.
    *   CORS sorunlarıyla karşılaşırsanız, PHP dosyalarınızda gerekli CORS başlıklarını ayarlamanız gerekebilir.
