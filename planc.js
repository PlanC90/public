document.addEventListener('DOMContentLoaded', function () {
    const countdownEndDate = new Date();
    countdownEndDate.setDate(countdownEndDate.getDate() + 30);

    fetch('translations.json')
        .then(response => response.json())
        .then(data => {
            const languageSelector = document.getElementById('languageSelector');
            for (const lang in data) {
                const option = document.createElement('option');
                option.value = lang;
                option.textContent = lang.toUpperCase();
                languageSelector.appendChild(option);
            }

            let selectedLanguage = 'en'; 
            languageSelector.addEventListener('change', function () {
                selectedLanguage = this.value;
                updateLanguage(data, selectedLanguage);
            });

            updateLanguage(data, selectedLanguage);
        });

    function updateCountdown() {
        const now = new Date();
        const timeRemaining = countdownEndDate - now;

        if (timeRemaining <= 0) {
            document.getElementById('countdownText').textContent = "Token distribution has started!";
            clearInterval(countdownInterval);
        } else {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            document.getElementById('countdownText').textContent = `Token distribution will occur in ${days} days ${hours}:${minutes}:${seconds}.`;
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);

    function updateLanguage(data, selectedLanguage) {
        const langData = data[selectedLanguage];

        document.getElementById('pageTitle').textContent = langData.title;
        document.getElementById('claimButton').textContent = langData.claimButtonText;
        document.getElementById('telegramButton').textContent = langData.telegramButtonText;
        document.getElementById('walletLabel').textContent = langData.walletLabel;
        document.getElementById('walletError').textContent = langData.walletError;
        document.getElementById('telegramText').innerHTML = langData.telegramText;
        document.getElementById('downloadButton').textContent = langData.downloadButtonText;
        document.getElementById('countdownText').textContent = langData.countdownText.replace("{countdown}", "30 days");
        document.getElementById('fastestToken').textContent = langData.fastestToken;
        document.getElementById('electraProtocol').innerHTML = `${langData.electraProtocol} <a href="${langData.electraLink}" target="_blank">Electraprotocol</a>`;
        document.getElementById('moreMemeX').innerHTML = `${langData.moreMemeX} <a href="${langData.moreMemeXLink}" target="_blank">More MemeX</a>`;
    }
});
