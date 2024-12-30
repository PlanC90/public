import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';
import { Camera } from 'lucide-react';

interface BarcodeScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError: (error: string) => void;
}

export function BarcodeScanner({ onScanSuccess, onScanError }: BarcodeScannerProps) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 10,
        rememberLastUsedCamera: true,
      },
      false
    );

    scanner.render(onScanSuccess, (error) => onScanError(error?.message || 'Tarama hatası'));

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [onScanSuccess, onScanError]);

  return (
    <div className="space-y-4">
      <div id="reader" className="mx-auto"></div>
      <div className="text-center">
        <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center gap-2">
          <Camera size={24} />
          Barkod Tara
        </button>
      </div>
    </div>
  );
}