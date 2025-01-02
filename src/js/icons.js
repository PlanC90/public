// Add decorative icons to the interface
export function addIcons() {
  const title = document.getElementById('pageTitle');
  const downloadButton = document.getElementById('downloadButton');
  
  // Add rocket icon to title
  title.innerHTML = `🚀 ${title.textContent}`;
  
  // Add wallet icon to download button
  downloadButton.innerHTML = `💼 ${downloadButton.textContent}`;
}