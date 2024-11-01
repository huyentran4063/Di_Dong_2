import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { fetchProducts } from '../services/ProductService';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
}

const ProductDetail: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
  const { productId } = route.params || {};

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProductData = async () => {
      try {
        const result = await fetchProducts();
        if (result.success) {
          const currentProduct = result.data.find((p: Product) => p.id === productId);
          setProduct(currentProduct || null);

          const related = result.data.filter((p: Product) => p.id !== productId).slice(0, 9);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error fetching product data', error);
      }
    };

    loadProductData();
  }, [productId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (!product) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading product details...</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: product.image_url }} style={styles.productImage} />
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <View style={styles.cartContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity((prev) => Math.max(prev - 1, 1))}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity((prev) => prev + 1)}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate('Cart', {
              cartItem: {
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
                quantity: quantity,
              },
            })}
          >
            <View style={styles.cartIconContainer}>
              <Ionicons name="cart" size={30} style={styles.cartIcon} />
              <Text style={styles.cartText}>Add to Cart</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.buyContainer}>
          <TouchableOpacity style={styles.buyNowButton} onPress={() => navigation.navigate('Payment')}>
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.relatedContainer}>
          <Text style={styles.relatedTitle}>Related Products</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {relatedProducts.map((relatedProduct) => (
              <TouchableOpacity
                key={relatedProduct.id}
                style={styles.relatedItem}
                onPress={() => navigation.navigate('ProductDetail', { productId: relatedProduct.id })}
              >
                <Image source={{ uri: relatedProduct.image_url }} style={styles.productRelatedImage} />
                <Text style={styles.relatedItemName}>{relatedProduct.name}</Text>
                <Text style={styles.relatedItemPrice}>{formatPrice(relatedProduct.price)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  scrollContainer: {
    alignItems: 'flex-start',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  productPrice: {
    fontSize: 20,
    color: 'red',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 32,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 5,
  },
  quantityButtonText: {
    fontSize: 25,
    color: 'black',
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 16,
  },
  cartButton: {
    borderRadius: 5,
  },
  cartIcon: {
    color: 'green',
  },
  cartIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  cartText: {
    fontSize: 18,
    marginLeft: 10,
    color: 'black',
  },
  buyContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  buyNowButton: {
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: 'red',
  },
  buyNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  relatedContainer: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 16,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  relatedItem: {
    marginRight: 15,
    width: 100,
  },
  productRelatedImage: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  relatedItemName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  relatedItemPrice: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
  },
});

export default ProductDetail;
