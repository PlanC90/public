import { useState } from 'react';
import { BarcodeScanner } from './components/BarcodeScanner';
import { UrunDetay } from './components/UrunDetay';
import { parseUrunlerData, type Urun } from './utils/parseData';

function App() {
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState<Urun | null>(null);

  const handleScanSuccess = async (barkod: string) => {
    try {
      const response = await fetch('/urunler.json');
      const data = await response.text();
      const urunler = parseUrunlerData(data);
      const bulunanUrun = urunler.find(urun => urun.barkod === barkod);
      
      if (bulunanUrun) {
        setResult(bulunanUrun);
        setScanning(false);
      } else {
        alert('Ürün bulunamadı!');
      }
    } catch (error) {
      console.error('Veri yükleme hatası:', error);
      alert('Veri yükleme hatası oluştu!');
    }
  };

  const handleScanError = (error: any) => {
    console.error(error);
  };

  const handleYeniTarama = () => {
    setScanning(true);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-pink-500">
          Barkod Tarayıcı
        </h1>

        {scanning && !result && (
          <BarcodeScanner 
            onScanSuccess={handleScanSuccess}
            onScanError={handleScanError}
          />
        )}

        {result && (
          <UrunDetay 
            urun={result}
            onYeniTarama={handleYeniTarama}
          />
        )}
      </div>
    </div>
  );
}

export default App;