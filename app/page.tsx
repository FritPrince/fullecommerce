/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Star, Truck, Shield, Users, Search, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/layout/Header';
import { ProductCard } from '@/components/products/ProductCard';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full opacity-20 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

// Promotion banner
const PromotionBanner = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white py-2 overflow-hidden">
      <div className="animate-pulse">
        <div className="whitespace-nowrap animate-marquee">
          <span className="mx-8">🎉 SOLDES D ÉTÉ - Jusqu à 70% de réduction sur une sélection d articles</span>
          <span className="mx-8">🚚 Livraison gratuite à partir de 50€</span>
          <span className="mx-8">✨ Nouveautés chaque semaine</span>
          <span className="mx-8">🎁 Offre spéciale : 2 articles achetés = 1 offert</span>
        </div>
      </div>
    </div>
  );
};

// Hero section
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Collection Été 2024",
      subtitle: "Découvrez les tendances qui vous feront briller",
      image: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      discount: "50%"
    },
    {
      title: "Luxe & Élégance",
      subtitle: "Des pièces d'exception pour un style unique",
      image: "https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      discount: "30%"
    },
    {
      title: "Nouveautés Exclusives",
      subtitle: "En avant-première pour nos membres privilégiés",
      image: "https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      discount: "40%"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      <FloatingParticles />
      
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={slides[currentSlide].image}
          alt="Hero background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-pink-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <Badge className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-4 py-2 text-lg animate-pulse">
              -{slides[currentSlide].discount} DE RÉDUCTION
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-pulse">
            {slides[currentSlide].title}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            {slides[currentSlide].subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Découvrir la Collection
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 px-8 py-6 text-lg font-semibold rounded-full"
            >
              Voir les Promotions
            </Button>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-yellow-400 scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

// Trust stats section
const TrustStats = () => {
  const stats = [
    { icon: Users, value: "100K+", label: "Clients satisfaits", color: "from-blue-500 to-purple-600" },
    { icon: Star, value: "4.9/5", label: "Note moyenne", color: "from-yellow-400 to-orange-500" },
    { icon: Truck, value: "24h", label: "Livraison rapide", color: "from-green-500 to-blue-500" },
    { icon: Shield, value: "100%", label: "Paiement sécurisé", color: "from-purple-500 to-pink-500" }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-0">
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Categories section
const CategoriesSection = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .limit(6);

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const defaultCategories = [
    { id: '1', name: "Mode Femme", image_url: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1", products: 1245, color: "from-pink-500 to-purple-600" },
    { id: '2', name: "Mode Homme", image_url: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1", products: 892, color: "from-blue-500 to-indigo-600" },
    { id: '3', name: "Accessoires", image_url: "https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1", products: 567, color: "from-yellow-400 to-orange-500" },
    { id: '4', name: "Chaussures", image_url: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1", products: 723, color: "from-green-500 to-teal-600" },
    { id: '5', name: "Bijoux", image_url: "https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1", products: 345, color: "from-purple-500 to-pink-600" },
    { id: '6', name: "Maroquinerie", image_url: "https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1", products: 456, color: "from-red-500 to-pink-500" }
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Catégories Populaires
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection soigneusement choisie dans chaque catégorie
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCategories.map((category, index) => (
            <Card key={category.id} className="group overflow-hidden bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <CardContent className="p-0 relative">
                <div className="relative overflow-hidden">
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  <div className="absolute top-4 right-4">
                    <Badge className={`bg-gradient-to-r ${category.color || 'from-purple-500 to-pink-600'} text-white px-3 py-1 text-sm font-semibold`}>
                      {category.products || Math.floor(Math.random() * 1000) + 100} produits
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-purple-600 transition-colors">
                    {category.name}
                  </h3>
                  <Link href="/products">
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white group-hover:border-transparent transition-all duration-300"
                    >
                      Explorer
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Featured products section
const FeaturedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .eq('is_active', true)
        .limit(4);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultProducts = [
    {
      id: '1',
      name: "Robe Élégante Premium",
      price: 129.99,
      original_price: 199.99,
      image_url: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1",
      rating: 4.9,
      reviews_count: 156,
      is_featured: true,
      stock: 25,
      description: "Une robe élégante pour toutes les occasions"
    },
    {
      id: '2',
      name: "Costume Homme Luxe",
      price: 299.99,
      original_price: 449.99,
      image_url: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1",
      rating: 4.8,
      reviews_count: 89,
      is_featured: true,
      stock: 15,
      description: "Costume homme de luxe pour un style impeccable"
    },
    {
      id: '3',
      name: "Sac à Main Designer",
      price: 89.99,
      original_price: 149.99,
      image_url: "https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1",
      rating: 4.7,
      reviews_count: 234,
      is_featured: true,
      stock: 30,
      description: "Sac à main designer de haute qualité"
    },
    {
      id: '4',
      name: "Montre Connectée Elite",
      price: 199.99,
      original_price: 299.99,
      image_url: "https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1",
      rating: 4.9,
      reviews_count: 312,
      is_featured: true,
      stock: 20,
      description: "Montre connectée avec toutes les fonctionnalités premium"
    }
  ];

  const displayProducts = products.length > 0 ? products : defaultProducts;

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Produits Vedettes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/70 rounded-lg p-4 animate-pulse">
                <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Produits Vedettes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nos coups de cœur sélectionnés avec amour par notre équipe
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/products">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Voir Tous les Produits
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Newsletter section
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
    setEmail('');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <FloatingParticles />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Restez à la Pointe de la Mode
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Recevez en exclusivité nos nouveautés, offres spéciales et conseils mode directement dans votre boîte mail
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-300 focus:border-pink-500 focus:ring-pink-500"
              required
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white px-8 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isSubscribed ? 'Merci !' : "S'abonner"}
            </Button>
          </form>
          
          <p className="text-sm text-gray-400 mt-4">
            Pas de spam, désabonnement en un clic. Vos données sont protégées.
          </p>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                LuxeMarket
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Votre destination premium pour la mode et les accessoires de luxe.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <span className="text-white text-sm">f</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <span className="text-white text-sm">@</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <span className="text-white text-sm">in</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Boutique</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/products" className="hover:text-white transition-colors">Nouveautés</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Femmes</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Hommes</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Accessoires</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Promotions</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Service Client</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Livraison</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Retours</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Guide des tailles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">À Propos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Notre histoire</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Durabilité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Presse</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partenaires</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 LuxeMarket. Tous droits réservés. Conçu avec ❤️ pour l élégance.</p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <PromotionBanner />
      <HeroSection />
      <TrustStats />
      <CategoriesSection />
      <FeaturedProducts />
      <NewsletterSection />
      <Footer />
    </div>
  );
}