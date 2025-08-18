import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { StyledButton } from '@/components/ui/StyledButton';
import { useThemeColor } from '@/hooks/useThemeColor';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../contexts/AuthContext';

const { width } = Dimensions.get('window');

// Product type definition
type Product = {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
  rating: number;
};

// Category type definition
type Category = {
  id: string;
  name: string;
  image: string;
  color: string;
};

// Mock product data
const featuredProducts: Product[] = [
  {
    id: '1',
    title: 'Black Soap Premium',
    price: '€24.99',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop',
    category: 'Cosmetics',
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Wireless Earbuds Pro',
    price: '€89.99',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
    category: 'Electronics',
    rating: 4.9,
  },
  {
    id: '3',
    title: 'Luxury Perfume Set',
    price: '€149.99',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop',
    category: 'Fragrances',
    rating: 4.7,
  },
  {
    id: '4',
    title: 'Skincare Bundle',
    price: '€69.99',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop',
    category: 'Skincare',
    rating: 4.6,
  },
];

// All products data
const allProducts: Product[] = [
  {
    id: '1',
    title: 'Black Soap Premium',
    price: '€24.99',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop',
    category: 'Cosmetics',
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Wireless Earbuds Pro',
    price: '€89.99',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
    category: 'Electronics',
    rating: 4.9,
  },
  {
    id: '3',
    title: 'Luxury Perfume Set',
    price: '€149.99',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop',
    category: 'Fragrances',
    rating: 4.7,
  },
  {
    id: '4',
    title: 'Skincare Bundle',
    price: '€69.99',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop',
    category: 'Skincare',
    rating: 4.6,
  },
  {
    id: '5',
    title: 'Smart Watch',
    price: '€199.99',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    category: 'Electronics',
    rating: 4.5,
  },
  {
    id: '6',
    title: 'Face Cream Set',
    price: '€45.99',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=300&h=300&fit=crop',
    category: 'Skincare',
    rating: 4.4,
  },
  {
    id: '7',
    title: 'Rose Gold Perfume',
    price: '€79.99',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=300&h=300&fit=crop',
    category: 'Fragrances',
    rating: 4.6,
  },
  {
    id: '8',
    title: 'Makeup Palette',
    price: '€39.99',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
    category: 'Cosmetics',
    rating: 4.3,
  },
];

const categories: Category[] = [
  { 
    id: '1', 
    name: 'Nos Créations', 
    image: require('../../assets/images/Creation Mamed.webp'), 
    color: '#FFD93D' 
  },
  { 
    id: '2', 
    name: 'Cosmétique', 
    image: require('../../assets/images/Cosmetics.webp'), 
    color: '#FF6B6B' 
  },
  { 
    id: '3', 
    name: 'Électronique', 
    image: require('../../assets/images/electronique.webp'), 
    color: '#4ECDC4' 
  },
  { 
    id: '4', 
    name: 'Parfum & Spray', 
    image: require('../../assets/images/Parfum & Spray.webp'), 
    color: '#45B7D1' 
  },
  { 
    id: '5', 
    name: 'Vêtement', 
    image: require('../../assets/images/Vetement.webp'), 
    color: '#A8E6CF' 
  },
  { 
    id: '6', 
    name: 'Skincare Coréenne', 
    image: require('../../assets/images/soins.webp'), 
    color: '#96CEB4' 
  },
];

export default function HomeScreen() {
  const { signOut, user } = useAuth();
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const featuredScrollRef = useRef<ScrollView>(null);
  const categoriesScrollRef = useRef<ScrollView>(null);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  // Function to scroll to the next item
  const scrollToNext = () => {
    if (featuredScrollRef.current) {
      const nextIndex = Math.min(activeDotIndex + 1, featuredProducts.length - 1);
      featuredScrollRef.current.scrollTo({ x: nextIndex * 195, animated: true });
      setActiveDotIndex(nextIndex);
    }
  };

  // Function to scroll to the previous item
  const scrollToPrevious = () => {
    if (featuredScrollRef.current) {
      const prevIndex = Math.max(activeDotIndex - 1, 0);
      featuredScrollRef.current.scrollTo({ x: prevIndex * 195, animated: true });
      setActiveDotIndex(prevIndex);
    }
  };

  // Handle scroll event to update active dot
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / 195);
    if (currentIndex !== activeDotIndex) {
      setActiveDotIndex(currentIndex);
    }
  };
  
  // Function to scroll to the next category
  const scrollToNextCategory = () => {
    if (categoriesScrollRef.current) {
      const nextIndex = Math.min(activeCategoryIndex + 1, totalCategoryPages - 1);
      categoriesScrollRef.current.scrollTo({ x: nextIndex * 195, animated: true });
      setActiveCategoryIndex(nextIndex);
    }
  };

  // Function to scroll to the previous category
  const scrollToPreviousCategory = () => {
    if (categoriesScrollRef.current) {
      const prevIndex = Math.max(activeCategoryIndex - 1, 0);
      categoriesScrollRef.current.scrollTo({ x: prevIndex * 195, animated: true });
      setActiveCategoryIndex(prevIndex);
    }
  };

  // Calculate how many categories are visible per page based on screen width
  const categoriesPerPage = 1; // Showing 1 category per page
  const totalCategoryPages = Math.ceil(categories.length / categoriesPerPage);
  
  // Handle scroll event to update active category
  const handleCategoryScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / 195);
    if (currentIndex !== activeCategoryIndex) {
      setActiveCategoryIndex(currentIndex);
    }
  };

  const renderProductCard = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={[styles.productCard, { 
        backgroundColor: 'transparent'
      }]}
      activeOpacity={0.8}
    >
      {/* Rest of the card content */}
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          contentFit="cover"
        />
      </View>
      
      <View style={styles.productInfo}>
        <Text style={[styles.productTitle, { color: secondaryColor }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.productPrice, { color: secondaryColor }]}>
          {item.price}
        </Text>
      </View>
      
      {/* Add to Cart button */}
      <View style={styles.addToCartContainer}>
        <TouchableOpacity 
          style={[styles.addToCartButton, { 
            backgroundColor: 'transparent',
            borderColor: secondaryColor,
            borderWidth: 1,
            borderRadius: 0
          }]}
          activeOpacity={0.7}
        >
          <Text style={[styles.addToCartText, { color: secondaryColor, fontSize: 12 }]}>
            Ajouter au panier
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderGridProductCard = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={[styles.gridProductCard, { 
        backgroundColor: 'transparent'
      }]}
      activeOpacity={0.8}
    >
      <View style={styles.gridProductImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.gridProductImage}
          contentFit="cover"
        />
      </View>
      
      <View style={styles.gridProductInfo}>
        <Text style={[styles.gridProductTitle, { color: secondaryColor }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.gridProductPrice, { color: secondaryColor }]}>
          {item.price}
        </Text>
      </View>
      
      {/* Add to Cart button */}
      <View style={styles.addToCartContainer}>
        <TouchableOpacity 
          style={[styles.addToCartButton, { 
            backgroundColor: 'transparent',
            borderColor: secondaryColor,
            borderWidth: 1,
            borderRadius: 0
          }]}
          activeOpacity={0.7}
        >
          <Text style={[styles.addToCartText, { color: secondaryColor, fontSize: 12 }]}>
            Ajouter au panier
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryCard = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={[styles.categoryCard, { backgroundColor: 'transparent' }]}
      activeOpacity={0.8}
    >
      <View style={styles.categoryImageContainer}>
        <Image
          source={item.image}
          style={styles.categoryImage}
          contentFit="cover"
        />
      </View>
      <View style={[styles.categoryNameContainer, { backgroundColor: 'transparent' }]}>
        <View style={styles.categoryNameWithIcon}>
          <Text style={[styles.categoryName, { color: secondaryColor }]}>{item.name}</Text>
          <Ionicons name="arrow-forward" size={14} color={secondaryColor} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(23, 27, 121, 1)', 'rgba(3, 9, 16, 1)', 'rgba(6, 38, 106, 1)']}
        locations={[0, 0.6, 1]}
        style={styles.backgroundGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <ThemedText style={styles.greeting}>Hello, {user?.name || 'User'}!</ThemedText>
              <ThemedText style={[styles.subtitle, { color: secondaryColor }]}>
                Discover amazing products
              </ThemedText>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <Ionicons name="person-circle" size={40} color={secondaryColor} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { borderColor: secondaryColor + '30' }]}>
            <Ionicons name="search" size={20} color={secondaryColor + '80'} />
            <Text style={[styles.searchPlaceholder, { color: secondaryColor + '60' }]}>
              Search products...
            </Text>
          </View>
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: secondaryColor }]}>
            <Ionicons name="options" size={20} color="rgb(3, 17, 63)" />
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <View style={styles.categoryHeader}>
            <ThemedText style={[styles.sectionTitle, { color: secondaryColor }]}>
              Catégories
            </ThemedText>
          </View>
          <View style={styles.sliderContainer}>
            <ScrollView
              ref={categoriesScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
              pagingEnabled={false}
              snapToInterval={195}
              decelerationRate="fast"
              onScroll={handleCategoryScroll}
              scrollEventThrottle={16}
            >
              {categories.map(item => (
                <View key={item.id}>
                  {renderCategoryCard({ item })}
                </View>
              ))}
            </ScrollView>
          </View>
          
          {/* Category Pagination */}
          <View style={styles.paginationContainer}>
            <TouchableOpacity 
              style={styles.paginationArrow} 
              onPress={scrollToPreviousCategory}
              disabled={activeCategoryIndex === 0}
            >
              <Ionicons 
                name="chevron-back" 
                size={20} 
                color={activeCategoryIndex === 0 ? 'rgba(241, 227, 164, 0.3)' : secondaryColor} 
              />
            </TouchableOpacity>
            
            <Text style={[styles.paginationText, { color: secondaryColor }]}>
              {activeCategoryIndex + 1}/{totalCategoryPages}
            </Text>
            
            <TouchableOpacity 
              style={styles.paginationArrow} 
              onPress={scrollToNextCategory}
              disabled={activeCategoryIndex === totalCategoryPages - 1}
            >
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={activeCategoryIndex === totalCategoryPages - 1 ? 'rgba(241, 227, 164, 0.3)' : secondaryColor} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Products Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={[styles.sectionTitle, { color: secondaryColor }]}>
              Nos Meilleures Ventes
            </ThemedText>
          </View>
          
          <View style={styles.sliderContainer}>
            <ScrollView
              ref={featuredScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredProductsContainer}
              pagingEnabled={false}
              snapToInterval={195} // Card width + margin
              decelerationRate="fast"
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {featuredProducts.map((item) => (
                <View key={item.id} style={styles.featuredProductCardWrapper}>
                  {renderProductCard({ item })}
                </View>
              ))}
            </ScrollView>
          </View>
          
          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            <TouchableOpacity 
              style={styles.paginationArrow} 
              onPress={scrollToPrevious}
              disabled={activeDotIndex === 0}
            >
              <Ionicons 
                name="chevron-back" 
                size={20} 
                color={activeDotIndex === 0 ? 'rgba(241, 227, 164, 0.3)' : secondaryColor} 
              />
            </TouchableOpacity>
            
            <Text style={[styles.paginationText, { color: secondaryColor }]}>
              {activeDotIndex + 1}/{featuredProducts.length}
            </Text>
            
            <TouchableOpacity 
              style={styles.paginationArrow} 
              onPress={scrollToNext}
              disabled={activeDotIndex === featuredProducts.length - 1}
            >
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={activeDotIndex === featuredProducts.length - 1 ? 'rgba(241, 227, 164, 0.3)' : secondaryColor} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* All Products Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={[styles.sectionTitle, { color: secondaryColor }]}>
              Tous Les Produits
            </ThemedText>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: secondaryColor + '80' }]}>
                Voir Plus
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.gridProductsContainer}>
            {allProducts.map((item) => (
              <View key={item.id} style={styles.productCardWrapper}>
                {renderGridProductCard({ item })}
              </View>
            ))}
          </View>
        </View>

        {/* Sign Out Button */}
        <View style={styles.signOutContainer}>
          <StyledButton 
            title="Sign Out" 
            variant="outline" 
            size="medium"
            onPress={signOut}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  profileButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
  },
  searchPlaceholder: {
    marginLeft: 12,
    fontSize: 16,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoriesContainer: {
    paddingLeft: 20,
    paddingRight: 5,
    flexDirection: 'row',
  },
  categoryCard: {
    width: 180,
    height: 250,
    borderRadius: 0,
    overflow: 'hidden',
    marginRight: 15,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  categoryImageContainer: {
    width: '100%',
    height: 210,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(241, 227, 164, 0.1)',
    boxSizing: 'border-box',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryNameContainer: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  categoryNameWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    width: '100%',
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ECEDEE',
    textAlign: 'center',
    letterSpacing: 0.3,
    marginRight: 2,
  },
  categoryAccent: {
    width: '80%',
    height: 3,
    borderRadius: 2,
    marginTop: 10,
    opacity: 0.8,
  },
  productsContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featuredProductsContainer: {
    paddingHorizontal: 20,
    paddingRight: 5,
    flexDirection: 'row',
  },
  featuredProductCardWrapper: {
    width: 180,
    marginRight: 15,
  },
  sliderContainer: {
    position: 'relative',
    width: '100%',
  },
  sliderButton: {
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(3, 17, 63, 0.8)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderButtonLeft: {
    left: 5,
  },
  sliderButtonRight: {
    right: 5,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  paginationText: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 10,
  },
  paginationArrow: {
    padding: 5,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  productCardWrapper: {
    width: '48%',
    marginBottom: 16,
  },
  productCard: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 0,
    padding: 0,
    borderWidth: 0,
    position: 'relative',
    overflow: 'hidden',
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  ornamentBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 5,
    borderRadius: 0,
    borderColor: 'rgb(241, 227, 164)',
    margin: 0,
    zIndex: 1,
    pointerEvents: 'none',
  },
  productImageContainer: {
    position: 'relative',
    marginBottom: 0,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 180,
  },
  productInfo: {
    padding: 15,
    paddingBottom: 10,
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    lineHeight: 18,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Old addToCartButton style removed
  signOutContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  gridProductsContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  gridProductCard: {
    width: '100%', // Changed to 100% to fill the wrapper
    backgroundColor: 'transparent',
    borderRadius: 0,
    padding: 0,
    borderWidth: 0,
    position: 'relative',
    overflow: 'hidden',
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  gridProductImageContainer: {
    position: 'relative',
    marginBottom: 0,
    overflow: 'hidden',
  },
  gridProductImage: {
    width: '100%',
    height: 120,
  },
  gridAddToCartButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridProductInfo: {
    padding: 10,
    paddingBottom: 8,
    alignItems: 'center',
  },
  gridProductCategory: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  gridProductTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    lineHeight: 18,
    textAlign: 'center',
  },
  gridProductPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categoryHeader: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  creationText: {
    fontSize: 13,
    fontWeight: '600',
    marginRight: 6,
    letterSpacing: 0.5,
  },
  creationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  arrowContainer: {
    paddingRight: 5,
  },
  addToCartContainer: {
    paddingHorizontal: 0,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 0,
    width: '100%',
  },
  addToCartText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
  },
});
