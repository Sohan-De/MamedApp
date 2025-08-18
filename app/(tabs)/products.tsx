import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

const { width } = Dimensions.get('window');

// Product type definition
type Product = {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
  rating: number;
  description: string;
  discount?: number;
  isNew?: boolean;
};

// Mock product data with more details
const products: Product[] = [
  {
    id: '1',
    title: 'Black Soap Premium',
    price: '€24.99',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop',
    category: 'Cosmétique',
    rating: 4.8,
    description: 'Premium black soap made with natural ingredients for deep cleansing.',
    discount: 15,
    isNew: true,
  },
  {
    id: '2',
    title: 'Huile d\'Argan Bio',
    price: '€19.99',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&h=300&fit=crop',
    category: 'Cosmétique',
    rating: 4.9,
    description: 'Organic argan oil for hair and skin care.',
  },
  {
    id: '3',
    title: 'Parfum Oriental',
    price: '€89.99',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop',
    category: 'Parfum & Spray',
    rating: 4.7,
    description: 'Luxurious oriental fragrance with long-lasting scent.',
    isNew: true,
  },
  {
    id: '4',
    title: 'Masque Visage Coréen',
    price: '€12.99',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop',
    category: 'Skincare Coréenne',
    rating: 4.6,
    description: 'Korean face mask with hydrating properties.',
    discount: 20,
  },
  {
    id: '5',
    title: 'Hijab Premium',
    price: '€29.99',
    image: 'https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=300&h=300&fit=crop',
    category: 'Vêtement',
    rating: 4.8,
    description: 'Premium quality hijab made from soft, breathable fabric.',
  },
  {
    id: '6',
    title: 'Dates Gift Box',
    price: '€34.99',
    image: 'https://images.unsplash.com/photo-1593059183481-b132438d8f7a?w=300&h=300&fit=crop',
    category: 'Ramadan',
    rating: 4.9,
    description: 'Luxury gift box with premium dates for Ramadan.',
    isNew: true,
  },
  {
    id: '7',
    title: 'Diffuseur d\'Huiles',
    price: '€49.99',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&h=300&fit=crop',
    category: 'Maison',
    rating: 4.7,
    description: 'Essential oil diffuser for home aromatherapy.',
    discount: 10,
  },
  {
    id: '8',
    title: 'Bracelet Argent',
    price: '€19.99',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop',
    category: 'Accessoire',
    rating: 4.5,
    description: 'Elegant silver bracelet with traditional design.',
  },
];

// Filter categories
const filterCategories = [
  { id: 'all', name: 'Tous' },
  { id: 'cosmétique', name: 'Cosmétique' },
  { id: 'parfum', name: 'Parfum' },
  { id: 'skincare', name: 'Skincare' },
  { id: 'vêtement', name: 'Vêtement' },
  { id: 'accessoire', name: 'Accessoire' },
];

export default function ProductsScreen() {
  const backgroundColor = 'rgb(3, 17, 63)';
  const secondaryColor = useThemeColor({}, 'secondary');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const scrollY = useRef(new Animated.Value(0)).current;

  // Filter products by category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return parseFloat(a.price.replace('€', '')) - parseFloat(b.price.replace('€', ''));
    } else if (sortBy === 'price-high') {
      return parseFloat(b.price.replace('€', '')) - parseFloat(a.price.replace('€', ''));
    } else {
      // Default sort by popularity (rating)
      return b.rating - a.rating;
    }
  });

  // Header animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 80],
    extrapolate: 'clamp',
  });

  // Render product card
  const renderProductCard = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productCard}
      activeOpacity={0.8}
    >
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          contentFit="cover"
        />
        {item.discount && (
          <View style={styles.discountTag}>
            <Text style={styles.discountText}>-{item.discount}%</Text>
          </View>
        )}
        {item.isNew && (
          <View style={[styles.newTag, { backgroundColor: secondaryColor }]}>
            <Text style={styles.newText}>NEW</Text>
          </View>
        )}
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={20} color={secondaryColor} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons 
              key={star}
              name={star <= Math.floor(item.rating) ? "star" : "star-outline"} 
              size={12} 
              color={secondaryColor} 
              style={{ marginRight: 2 }}
            />
          ))}
          <Text style={styles.ratingText}>({item.rating})</Text>
        </View>
        <Text style={[styles.productPrice, { color: secondaryColor }]}>{item.price}</Text>
      </View>
      
      <TouchableOpacity 
        style={[styles.addButton, { backgroundColor: secondaryColor }]}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={20} color={backgroundColor} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      {/* Animated Header */}
      <Animated.View style={[
        styles.header, 
        { 
          height: headerHeight, 
          opacity: headerOpacity,
          backgroundColor
        }
      ]}>
        <View style={styles.headerContent}>
          <ThemedText style={styles.headerTitle}>Nos Produits</ThemedText>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="search" size={24} color={secondaryColor} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="options-outline" size={24} color={secondaryColor} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      {/* Filter Categories */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {filterCategories.map((category) => (
            <TouchableOpacity 
              key={category.id}
              style={[
                styles.filterButton,
                selectedCategory === category.id && { 
                  backgroundColor: 'rgba(241, 227, 164, 0.15)',
                  borderColor: secondaryColor
                }
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text 
                style={[
                  styles.filterButtonText,
                  selectedCategory === category.id && { color: secondaryColor }
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.resultCount}>{sortedProducts.length} produits</Text>
        <TouchableOpacity 
          style={styles.sortButton}
          onPress={() => {
            // Toggle between sort options
            if (sortBy === 'popularity') setSortBy('price-low');
            else if (sortBy === 'price-low') setSortBy('price-high');
            else setSortBy('popularity');
          }}
        >
          <Text style={styles.sortButtonText}>
            {sortBy === 'popularity' ? 'Populaire' : 
             sortBy === 'price-low' ? 'Prix: Bas à Élevé' : 'Prix: Élevé à Bas'}
          </Text>
          <Ionicons name="chevron-down" size={16} color={secondaryColor} />
        </TouchableOpacity>
      </View>

      {/* Product Grid */}
      <Animated.FlatList
        data={sortedProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productGrid}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        columnWrapperStyle={styles.productRow}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 10,
  },
  filterContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterScrollContent: {
    paddingHorizontal: 15,
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginRight: 8,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  resultCount: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#fff',
    marginRight: 5,
  },
  productGrid: {
    padding: 10,
    paddingBottom: 30,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 50) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  productImageContainer: {
    position: 'relative',
    height: 180,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  newTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  newText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 12,
  },
  productCategory: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.7,
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.7,
    marginLeft: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 