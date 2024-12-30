import { RefreshCw } from 'lucide-react';
import type { Urun } from '../utils/parseData';

interface UrunDetayProps {
  urun: Urun;
  onYeniTarama: () => void;
}

export function UrunDetay({ urun, onYeniTarama }: UrunDetayProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg max-w-md mx-auto">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-pink-500 text-center">{urun.urunAdi}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400">Barkod</p>
            <p className="font-semibold">{urun.barkod}</p>
          </div>
          <div>
            <p className="text-gray-400">Fiyat</p>
            <p className="font-semibold text-green-500">{urun.fiyat}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-400">Stok</p>
            <p className="font-semibold">{urun.stok} adet</p>
          </div>
        </div>
        <button
          onClick={onYeniTarama}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <RefreshCw size={24} />
          Yeni Barkod Tara
        </button>
      </div>
    </div>
  );
}