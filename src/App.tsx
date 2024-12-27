import React from "react";
import { BarcodeScanner } from "./components/BarcodeScanner";
import { ProductDisplay } from "./components/ProductDisplay";
import { useScanner } from "./hooks/useScanner";

function App() {
  const {
    isScanning,
    product,
    message,
    handleScan,
    startScanning,
    stopScanning
  } = useScanner();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Barkod Okuyucu</h1>
      
      <div className="max-w-md mx-auto">
        <button
          onClick={startScanning}
          className="w-full bg-pink-500 text-white font-bold py-4 rounded-lg mb-4"
        >
          Barkod Tara
        </button>

        <p className="text-lg text-center mb-4">{message}</p>
        
        {isScanning && (
          <div className="mb-4">
            <BarcodeScanner onResult={handleScan} />
            <button
              onClick={stopScanning}
              className="w-full bg-blue-500 text-white font-bold py-4 rounded-lg mt-4"
            >
              Barkod Taramayı Kapat
            </button>
          </div>
        )}
        
        <ProductDisplay product={product} />
      </div>
    </div>
  );
}

export default App;