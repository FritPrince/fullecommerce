'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Filter, Grid, List, Package, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  product_count?: number;
}

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
  category_id: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data: categoriesData, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;

      // Fetch product count for each category
      const categoriesWithCount = await Promise.all(
        (categoriesData || []).map(async (category) => {
          const { count } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', category.id)
            .eq('is_active', true);

          return {
            ...category,
            product_count: count || 0,
          };
        })
      );

      setCategories(categoriesWithCount);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryProducts = async (categoryId: string) => {
    setProductsLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCategoryProducts(data || []);
    } catch (error) {
      console.error('Error fetching category products:', error);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    fetchCategoryProducts(category.id);
  };

  const filteredProducts = categoryProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Header />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/70 rounded-lg p-4 animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {selectedCategory ? selectedCategory.name : 'Nos Catégories'}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {selectedCategory 
                ? selectedCategory.description || `Découvrez tous nos produits ${selectedCategory.name.toLowerCase()}`
                : 'Explorez notre collection organisée par catégories'
              }
            </p>
            
            {selectedCategory && (
              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory(null);
                    setCategoryProducts([]);
                    setSearchQuery('');
                  }}
                  className="bg-white/70 backdrop-blur-sm hover:bg-white/90"
                >
                  ← Retour aux catégories
                </Button>
              </div>
            )}
          </div>

          {!selectedCategory ? (
            /* Categories Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Card 
                  key={category.id} 
                  className="group overflow-hidden bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  onClick={() => handleCategorySelect(category)}
                >
                  <CardContent className="p-0 relative">
                    <div className="relative overflow-hidden">
                      <img
                        src={category.image_url || 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1'}
                        alt={category.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-1 text-sm font-semibold">
                          {category.product_count} produit{category.product_count !== 1 ? 's' : ''}
                        </Badge>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-gray-200 text-sm line-clamp-2">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Package className="w-5 h-5 text-purple-600" />
                          <span className="text-gray-600 font-medium">
                            {category.product_count} articles disponibles
                          </span>
                        </div>
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Category Products */
            <div>
              {/* Search and Filters */}
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 mb-8 shadow-lg">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex-1 max-w-md">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Rechercher dans cette catégorie..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white/70"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-purple-600 border-purple-600">
                      {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
                    </Badge>
                    {searchQuery && (
                      <Badge variant="outline">
                        Recherche: "{searchQuery}"
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {productsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white/70 rounded-lg p-4 animate-pulse">
                      <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                      <div className="bg-gray-300 h-4 rounded mb-2"></div>
                      <div className="bg-gray-300 h-4 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Aucun produit trouvé
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {searchQuery 
                      ? `Aucun produit ne correspond à "${searchQuery}" dans cette catégorie`
                      : 'Cette catégorie ne contient aucun produit pour le moment'
                    }
                  </p>
                  {searchQuery && (
                    <Button
                      onClick={() => setSearchQuery('')}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Voir tous les produits de cette catégorie
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Call to Action */}
          {!selectedCategory && (
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-pink-500/10 to-purple-600/10"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Vous ne trouvez pas ce que vous cherchez ?
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Explorez tous nos produits ou contactez notre équipe pour des recommandations personnalisées
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/products">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Voir Tous les Produits
                      </Button>
                    </Link>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 px-8 py-3 rounded-full text-lg font-semibold"
                    >
                      Nous Contacter
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}