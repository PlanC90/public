# Memex P2P Token Trade Platform

    Bu proje, Telegram tabanlı bir P2P token ticaret platformudur. Kullanıcılar, kendi Telegram kullanıcı adlarını, satmak istedikleri token adedini ve almak istedikleri token adedini belirleyerek bir fiyatla emir oluşturabilirler.

    ## Projeyi GitHub'a Yükleme

    1.  Projenizi bir Git deposu olarak başlatın:

        ```bash
        git init
        git add .
        git commit -m "Initial commit"
        ```

    2.  GitHub'da yeni bir depo oluşturun.
    3.  Yerel deponuzu GitHub'daki deponuza bağlayın:

        ```bash
        git remote add origin <github_repo_url>
        ```

        *   `<github_repo_url>` yerine kendi GitHub depo URL'nizi yazın.

    4.  Projenizi GitHub'a yükleyin:

        ```bash
        git push -u origin main
        ```

    ## Projeyi Replit'e Import Etme

    1.  Replit'e gidin ve yeni bir repl oluşturun.
    2.  "Import from GitHub" seçeneğini seçin.
    3.  GitHub depo URL'nizi girin ve projeyi import edin.

    ## Replit'te Yapılması Gerekenler

    1.  **Bağımlılıkları Yükleme:**
        *   Replit'teki terminali açın.
        *   Proje dizinine gidin (genellikle otomatik olarak açılır).
        *   Aşağıdaki komutu çalıştırarak bağımlılıkları yükleyin:

            ```bash
            npm install
            ```

    2.  **Veritabanı Oluşturma (SQLite):**
        *   Replit'teki terminali açın.
        *   Aşağıdaki komutu çalıştırarak `your_database.db` adında bir SQLite veritabanı dosyası oluşturun:

            ```bash
            sqlite3 your_database.db
            ```

        *   Aşağıdaki SQL kodlarını kopyalayıp yapıştırın ve çalıştırın:

            ```sql
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                telegram_username TEXT UNIQUE NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                price REAL NOT NULL,
                amount INTEGER NOT NULL,
                type TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
            ```

        *   `.exit` komutunu kullanarak SQLite komut satırı aracından çıkın.

    3.  **Uygulamayı Çalıştırma:**
        *   Replit'teki terminalde aşağıdaki komutu çalıştırarak uygulamayı başlatın:

            ```bash
            npm run dev
            ```

        *   Bu komut, Vite geliştirme sunucusunu başlatır ve size bir önizleme URL'si sunar.

    ## Ek Bilgiler

    *   Bu proje, frontend (React) ve backend (PHP) bileşenlerinden oluşur.
    *   Veritabanı işlemleri için SQLite kullanılmıştır.
    *   Telegram API entegrasyonu ve diğer dinamik işlemler için PHP kodunu sunucu tarafında çalıştırmanız gerekmektedir.
    *   Bu `README.md` dosyası, projenizi GitHub'a yüklemenize, Replit'e import etmenize ve çalıştırmanıza yardımcı olacaktır.
    *   Sunucu tarafı kodlama ve Telegram API entegrasyonu gibi işlemleri ayrı olarak yapmanız gerekmektedir.
    *   Veritabanı şifrenizi (`Ceyhun8387@@@`) güvenli bir şekilde saklayın.
    *   API'nizi yetkisiz erişime karşı korumak için gerekli güvenlik önlemlerini alın.
    *   CORS sorunlarıyla karşılaşırsanız, sunucu tarafında CORS başlıklarını ayarlamanız gerekecektir.
