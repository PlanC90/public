import { useZxing } from "react-zxing";

interface BarcodeScannerProps {
  onResult: (barcode: string) => void;
}

export const BarcodeScanner = ({ onResult }: BarcodeScannerProps) => {
  const { ref } = useZxing({
    onResult(result) {
      onResult(result.getText());
    },
  });

  return (
    <div className="relative">
      <video ref={ref} className="rounded-lg" />
      <div className="absolute inset-0 border-2 border-pink-500 rounded-lg pointer-events-none"></div>
    </div>
  );
};