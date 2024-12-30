import { useState } from 'react';
import { BarcodeScanner } from './components/BarcodeScanner';
import { ProductDetails } from './components/ProductDetails';
import { parseUrunlerData } from './utils/parseData';
import type { Urun } from './types';

export default function App() {
  const [urun, setUrun] = useState<Urun | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScanSuccess = async (decodedText: string) => {
    try {
      const response = await fetch('/urunler.json');
      const data = await response.text();
      const urunler = parseUrunlerData(data);
      const bulunanUrun = urunler.find(u => u.barkod === decodedText);
      
      if (bulunanUrun) {
        setUrun(bulunanUrun);
        setError(null);
      } else {
        setError('Ürün bulunamadı!');
      }
    } catch (err) {
      setError('Veri yükleme hatası oluştu!');
      console.error('Veri yükleme hatası:', err);
    }
  };

  const handleScanError = (error: string) => {
    setError(error);
  };

  const handleYeniTarama = () => {
    setUrun(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-pink-500">
          Barkod Sorgulama
        </h1>

        <div className="max-w-md mx-auto">
          {error && (
            <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
              {error}
            </div>
          )}

          {!urun ? (
            <BarcodeScanner 
              onScanSuccess={handleScanSuccess}
              onScanError={handleScanError}
            />
          ) : (
            <ProductDetails 
              urun={urun}
              onYeniTarama={handleYeniTarama}
            />
          )}
        </div>
      </div>
    </div>
  );
}