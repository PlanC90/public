import React, { useState } from "react";
import { BarcodeScanner } from "./components/BarcodeScanner";
import { ProductDisplay } from "./components/ProductDisplay";
import { products, Product } from "./data/products";

function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState("Barkod taramak için butona tıklayın");

  const handleScan = (barcode: string) => {
    const foundProduct = products.find(p => p.barcode === barcode);
    if (foundProduct) {
      setProduct(foundProduct);
      setMessage("Ürün bulundu");
    } else {
      setProduct(null);
      setMessage("Ürün bulunamadı");
    }
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Barkod Okuyucu</h1>
      
      <div className="max-w-md mx-auto">
        <button
          onClick={() => setIsScanning(true)}
          className="w-full bg-pink-500 text-white font-bold py-4 rounded-lg mb-4"
        >
          Barkod Tara
        </button>

        <p className="text-lg text-center mb-4">{message}</p>
        
        {isScanning && (
          <div className="mb-4">
            <BarcodeScanner onResult={handleScan} />
            <button
              onClick={() => setIsScanning(false)}
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