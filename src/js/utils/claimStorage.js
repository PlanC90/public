// Utility functions for claim data storage
export function saveClaimData(walletAddress) {
  const claimData = {
    recipient: walletAddress,
    pid: 199,
    amount: 2000000
  };

  // Load existing claims
  let claims = [];
  try {
    const existingData = localStorage.getItem('claims');
    if (existingData) {
      claims = JSON.parse(existingData);
    }
  } catch (error) {
    console.error('Error loading existing claims:', error);
  }

  // Add new claim
  claims.push(claimData);

  // Save updated claims
  try {
    localStorage.setItem('claims', JSON.stringify(claims, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving claim:', error);
    return false;
  }
}