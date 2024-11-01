import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, Image, Text, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedView } from '@/components/ThemedView'; 
import axios from 'axios'; 
import { useNavigation, NavigationProp } from '@react-navigation/native'; // Import NavigationProp

// Import the type definition for your navigation parameters
import { RootStackParamList } from '../navigation/types';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
}

export default function Home() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Type the navigation prop
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const API_BASE_URL = 'https://66ea84d455ad32cda4793809.mockapi.io';

  // Fetch product list
  const fetchProducts = async (pageNumber: number) => {
    setIsLoading(true);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/products`, {
        params: {
          page: pageNumber,
          limit: 10,
        },
      });
      
      setProducts(prev => [...prev, ...response.data]);
    } catch (error) {
      console.error('Error fetching products:', error);
      Alert.alert('Error', 'Failed to load products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleSearch = () => {
    Alert.alert('Search', `You searched for: ${searchQuery}`);
  };

  const handleMenuPress = () => {
    Alert.alert('Menu', 'Menu pressed');
  };

  const handleCartPress = () => {
    Alert.alert('Cart', 'Cart pressed');
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} 
    >
      <Image source={{ uri: item.image_url }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price} VND</Text>
      <Text style={styles.productDescription}>{item.description}</Text>

    </TouchableOpacity>
  );

  const loadMoreProducts = () => {
    if (!loadingMore && !isLoading) {
      setLoadingMore(true);
      setPage(prev => prev + 1);
    }
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

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2} 
        columnWrapperStyle={styles.row} 
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.3} 
        ListFooterComponent={
          loadingMore ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : !isLoading && products.length > 0 ? (
            <Text style={styles.loadingText}>Đã hiển thị hết sản phẩm!</Text>
          ) : null
        }
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false} 
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    justifyContent: 'flex-start',
  },
  banner: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bannerImage: {
    width: "100%",
    height: 200,
    resizeMode: 'cover',
  },
  navigationContainer: {
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10, // Thêm padding để cải thiện UX
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderColor: '#ccc', 
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 40, // Adjust height to fit better
  },
  searchBar: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%', 
  },
  iconSearch: {
    color: '#000',
  },
  menu: {
    padding: 10,
    color: '#000',
  },
  cart: {
    padding: 10,
    color: '#000',
  },
  productList: {
    paddingBottom: 20, // Space at the bottom for the banner
  },
  row: {
    justifyContent: 'space-between',
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  productItem: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 130,
    height: 130,
    borderRadius: 5,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  loadingText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16, // Adjust the font size
    fontWeight: 'bold', // Make it bold
    color: '#000', // Change the text color
  },
});
