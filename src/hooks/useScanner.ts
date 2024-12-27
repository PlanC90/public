import { useState } from 'react';
import { Product } from '../types/product';
import { findProductByBarcode } from '../utils/productUtils';

export const useScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState("Barkod taramak için butona tıklayın");

  const handleScan = (barcode: string) => {
    const foundProduct = findProductByBarcode(barcode);
    setProduct(foundProduct);
    setMessage(foundProduct ? "Ürün bulundu" : "Ürün bulunamadı");
    setIsScanning(false);
  };

  const startScanning = () => setIsScanning(true);
  const stopScanning = () => setIsScanning(false);

  return {
    isScanning,
    product,
    message,
    handleScan,
    startScanning,
    stopScanning
  };
};