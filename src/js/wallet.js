export function setupWalletValidation() {
  const walletInput = document.getElementById('wallet');
  const walletError = document.getElementById('walletError');
  const claimButton = document.getElementById('claimButton');

  function validateWallet(address) {
    return address && address.startsWith('x') && address.length > 1;
  }

  walletInput.addEventListener('input', (e) => {
    const isValid = validateWallet(e.target.value);
    walletError.style.display = isValid ? 'none' : 'block';
    claimButton.disabled = !isValid;
  });
}