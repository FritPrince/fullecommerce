/*
  # Données d'exemple pour LuxeMarket

  1. Catégories
    - Mode Femme, Mode Homme, Accessoires, etc.

  2. Produits
    - Produits variés avec images, prix, stocks
    - Certains produits en vedette
    - Prix originaux pour les promotions

  3. Utilisateur admin
    - Compte admin pour tester le tableau de bord
*/

-- Insert sample categories
INSERT INTO categories (id, name, description, image_url) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Mode Femme', 'Collection élégante pour femmes', 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Mode Homme', 'Style sophistiqué pour hommes', 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Accessoires', 'Accessoires de mode premium', 'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Chaussures', 'Chaussures de qualité supérieure', 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1'),
  ('550e8400-e29b-41d4-a716-446655440005', 'Bijoux', 'Bijoux élégants et raffinés', 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1'),
  ('550e8400-e29b-41d4-a716-446655440006', 'Maroquinerie', 'Sacs et accessoires en cuir', 'https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1');

-- Insert sample products
INSERT INTO products (name, description, price, original_price, image_url, category_id, stock, rating, reviews_count, is_featured, is_active) VALUES
  -- Mode Femme
  ('Robe Élégante Premium', 'Une robe sophistiquée parfaite pour toutes les occasions spéciales. Coupe flatteuse et tissu de qualité supérieure.', 129.99, 199.99, 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1', '550e8400-e29b-41d4-a716-446655440001', 25, 4.9, 156, true, true),
  ('Blouse Soie Naturelle', 'Blouse en soie naturelle avec finitions délicates. Confort et élégance réunis.', 89.99, 129.99, 'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1', '550e8400-e29b-41d4-a716-446655440001', 30, 4.7, 89, false, true),
  ('Jupe Plissée Moderne', 'Jupe plissée au design contemporain, idéale pour un look professionnel chic.', 69.99, 99.99, 'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1', '550e8400-e29b-41d4-a716-446655440001', 40, 4.5, 67, true, true),
  
  -- Mode Homme
  ('Costume Homme Luxe', 'Costume trois pièces en laine mérinos. Coupe ajustée et finitions impeccables.', 299.99, 449.99, 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1', '550e8400-e29b-41d4-a716-446655440002', 15, 4.8, 89, true, true),
  ('Chemise Business Premium', 'Chemise en coton égyptien avec col français. Parfaite pour le bureau.', 79.99, 119.99, 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1', '550e8400-e29b-41d4-a716-446655440002', 50, 4.6, 123, false, true),
  ('Pantalon Chino Élégant', 'Pantalon chino en coton stretch. Confort et style pour toutes les occasions.', 59.99, 89.99, 'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1', '550e8400-e29b-41d4-a716-446655440002', 35, 4.4, 78, false, true),
  
  -- Accessoires
  ('Montre Connectée Elite', 'Montre connectée avec toutes les fonctionnalités premium. Design sophistiqué.', 199.99, 299.99, 'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1', '550e8400-e29b-41d4-a716-446655440003', 20, 4.9, 312, true, true),
  ('Lunettes de Soleil Designer', 'Lunettes de soleil avec verres polarisés et monture titanium.', 149.99, 219.99, 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1', '550e8400-e29b-41d4-a716-446655440003', 45, 4.7, 189, false, true),
  ('Écharpe Cachemire', 'Écharpe en cachemire pur, douce et chaude. Accessoire indispensable.', 89.99, 139.99, 'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1', '550e8400-e29b-41d4-a716-446655440003', 60, 4.8, 145, false, true),
  
  -- Chaussures
  ('Escarpins Cuir Italien', 'Escarpins en cuir italien véritable. Élégance et confort réunis.', 179.99, 249.99, 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1', '550e8400-e29b-41d4-a716-446655440004', 28, 4.6, 94, false, true),
  ('Baskets Premium Homme', 'Baskets haut de gamme en cuir et textile technique. Style urbain.', 159.99, 229.99, 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1', '550e8400-e29b-41d4-a716-446655440004', 42, 4.7, 167, true, true),
  
  -- Bijoux
  ('Collier Perles Naturelles', 'Collier en perles naturelles avec fermoir en or 18k. Pièce d''exception.', 299.99, 449.99, 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1', '550e8400-e29b-41d4-a716-446655440005', 12, 4.9, 78, true, true),
  ('Boucles d''Oreilles Diamant', 'Boucles d''oreilles serties de diamants véritables. Éclat incomparable.', 599.99, 899.99, 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1', '550e8400-e29b-41d4-a716-446655440005', 8, 5.0, 45, false, true),
  
  -- Maroquinerie
  ('Sac à Main Designer', 'Sac à main en cuir italien avec finitions dorées. Design intemporel.', 89.99, 149.99, 'https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1', '550e8400-e29b-41d4-a716-446655440006', 30, 4.7, 234, true, true),
  ('Portefeuille Cuir Premium', 'Portefeuille en cuir de veau avec compartiments multiples. Élégance masculine.', 79.99, 119.99, 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1', '550e8400-e29b-41d4-a716-446655440006', 55, 4.5, 156, false, true),
  ('Sac de Voyage Luxe', 'Sac de voyage en cuir avec doublure en soie. Pour les voyageurs exigeants.', 349.99, 499.99, 'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1', '550e8400-e29b-41d4-a716-446655440006', 18, 4.8, 89, false, true);