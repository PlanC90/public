export interface Urun {
  barkod: string;
  urunAdi: string;
  fiyat: string;
  stok: number;
}

export const parseUrunlerData = (data: string): Urun[] => {
  const lines = data.trim().split('\n');
  const headers = lines[0].split(';');
  
  return lines.slice(1).map(line => {
    const values = line.split(';');
    return {
      barkod: values[0],
      urunAdi: values[1],
      fiyat: values[2],
      stok: parseInt(values[3], 10)
    };
  });
};