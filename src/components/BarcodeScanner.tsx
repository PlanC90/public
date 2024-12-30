import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';
import { Scan } from 'lucide-react';

interface BarcodeScannerProps {
  onScanSuccess: (result: string) => void;
  onScanError: (error: any) => void;
}

export function BarcodeScanner({ onScanSuccess, onScanError }: BarcodeScannerProps) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(onScanSuccess, onScanError);

    return () => {
      scanner.clear();
    };
  }, [onScanSuccess, onScanError]);

  return (
    <div className="space-y-4">
      <div id="reader"></div>
      <div className="text-center">
        <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center gap-2 transition-colors">
          <Scan size={24} />
          Barkod Tara
        </button>
      </div>
    </div>
  );
}