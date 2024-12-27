import { Product } from "../data/products";

interface ProductDisplayProps {
  product: Product | null;
}

export const ProductDisplay = ({ product }: ProductDisplayProps) => {
  if (!product) return null;

  return (
    <div className="bg-gray-800 rounded-lg p-4 mt-4">
      <div className="mb-2">
        <span className="text-gray-400">Ürün Adı:</span>
        <span className="text-white text-lg ml-2">{product.name}</span>
      </div>
      <div>
        <span className="text-gray-400">Fiyat:</span>
        <span className="text-white text-lg ml-2">{product.price}</span>
      </div>
    </div>
  );
};