'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useStore } from '@/lib/store';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Commande passée avec succès !');
    clearCart();
    onClose();
    setIsProcessing(false);
  };

  if (cartItems.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg bg-white/95 backdrop-blur-xl">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Votre Panier
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Votre panier est vide</h3>
            <p className="text-gray-500 mb-6">Découvrez nos produits et ajoutez-les à votre panier</p>
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              Continuer mes achats
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg bg-white/95 backdrop-blur-xl flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Votre Panier ({cartItems.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.product_id} className="flex items-center space-x-4 p-4 bg-white/70 rounded-lg border border-gray-200">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                  <p className="text-purple-600 font-bold">{item.price.toFixed(2)}€</p>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <Badge variant="outline" className="px-3 py-1">
                      {item.quantity}
                    </Badge>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-gray-800 mb-2">
                    {(item.price * item.quantity).toFixed(2)}€
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeFromCart(item.product_id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 space-y-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span className="text-purple-600">{getTotalPrice().toFixed(2)}€</span>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isProcessing ? 'Traitement...' : 'Passer la commande'}
            </Button>
            
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full"
            >
              Continuer mes achats
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}