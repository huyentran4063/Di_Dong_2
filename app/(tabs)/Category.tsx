import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Text, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedView } from '@/components/ThemedView'; 
import axios from 'axios'; 
import { useNavigation, NavigationProp } from '@react-navigation/native'; 
import { RootStackParamList } from '../navigation/types';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
  categoryName: string; // Ensure this is the correct key
}

export default function Home() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = 'https://66ea84d455ad32cda4793809.mockapi.io';

  // Fetch product list
  const fetchProducts = async () => {
    setIsLoading(true);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
      setFilteredProducts(response.data); // Initially show all products
      console.log(response.data); // Log fetched data
    } catch (error) {
      console.error('Error fetching products:', error);
      Alert.alert('Error', 'Failed to load products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to filter products by category
  const filterProductsByCategory = (categoryName: string) => {
    const filtered = products.filter(product => product.categoryName === categoryName);
    console.log(filtered); // Log filtered products
    setFilteredProducts(filtered);
  };

  const handleSearch = () => {
    Alert.alert('Search', `You searched for: ${searchQuery}`);
  };

  const handleMenuPress = () => {
    Alert.alert('Menu', 'Menu pressed');
  };

  const handleCartPress = () => {
    Alert.alert('Cart', 'Cart pressed');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={handleMenuPress}>
          <Ionicons name="menu" size={40} style={styles.menu} />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchBar} onPress={handleSearch}>
            <Ionicons name="search" size={20} style={styles.iconSearch} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={handleCartPress}>
          <Ionicons name="cart" size={35} style={styles.cart} />
        </TouchableOpacity>
      </View>

      <View style={styles.banner}>
        <Image source={require('../../../assets/images/banner.png')} style={styles.bannerImage} />
      </View>

      {/* Categories */}
      <View style={styles.categoryContainer}>
        <TouchableOpacity onPress={() => filterProductsByCategory('Electronics')}>
          <Text style={styles.category}>Electronics</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterProductsByCategory('Fashion')}>
          <Text style={styles.category}>Fashion</Text>
        </TouchableOpacity>
      </View>

      {/* Display filtered products */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={{ uri: item.image_url }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No products found</Text>} // Add this line
      />
      
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menu: {
    padding: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchBar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSearch: {
    padding: 5,
  },
  cart: {
    padding: 10,
  },
  banner: {
    marginVertical: 10,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  productItem: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
});
