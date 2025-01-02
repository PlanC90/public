export function setupCountdown(updateCountdownText) {
  const countdownEndDate = new Date();
  countdownEndDate.setDate(countdownEndDate.getDate() + 30);

  function updateCountdown() {
    const now = new Date();
    const timeRemaining = countdownEndDate - now;

    if (timeRemaining <= 0) {
      updateCountdownText("Token distribution has started!");
      return false;
    } else {
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      updateCountdownText(`Token distribution will occur in ${days} days ${hours}:${minutes}:${seconds}.`);
      return true;
    }
  }

  const countdownInterval = setInterval(() => {
    if (!updateCountdown()) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  return countdownInterval;
}