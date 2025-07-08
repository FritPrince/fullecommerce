/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { toast } from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  image_url: string;
  stock: number;
  rating: number;
  reviews_count: number;
  is_featured: boolean;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useStore();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const discount = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    addToCart({
      id: `cart-${product.id}`,
      product_id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      stock: product.stock,
    });
    
    toast.success('Produit ajouté au panier !');
    
    setTimeout(() => setIsAddingToCart(false), 500);
  };

  const handleToggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      toast.success('Retiré des favoris');
    } else {
      addToFavorites(product.id);
      toast.success('Ajouté aux favoris');
    }
  };

  return (
    <Card className="group overflow-hidden bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <CardContent className="p-0 relative">
        <div className="relative overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {discount > 0 && (
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 text-xs font-bold">
                -{discount}%
              </Badge>
            )}
            {product.is_featured && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 text-xs font-bold">
                VEDETTE
              </Badge>
            )}
          </div>
          
          {/* Favorite button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleFavorite}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite(product.id)
                  ? 'fill-red-500 text-red-500' 
                  : 'text-gray-600'
              }`}
            />
          </Button>
          
          {/* Quick action overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button 
              onClick={handleAddToCart}
              disabled={isAddingToCart || product.stock === 0}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              {isAddingToCart ? (
                'Ajout...'
              ) : product.stock === 0 ? (
                'Rupture de stock'
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Ajouter au panier
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              {product.rating} ({product.reviews_count} avis)
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-purple-600">
                {product.price.toFixed(2)}€
              </span>
              {product.original_price && (
                <span className="text-sm text-gray-500 line-through">
                  {product.original_price.toFixed(2)}€
                </span>
              )}
            </div>
            <Badge 
              variant={product.stock > 0 ? "outline" : "destructive"} 
              className={product.stock > 0 ? "text-green-600 border-green-600" : ""}
            >
              {product.stock > 0 ? `${product.stock} en stock` : 'Rupture'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}