import React, { useState } from 'react';
import { Text, Image, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';


const Cart: React.FC = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Giày Nike Jordan Panda Low',
      price: 3900000,
      quantity: 1,
      image_url: 'https://cf.shopee.vn/file/8b1e07e24d620e3bd7619c417d8c4fb9',
      checked: false,
    },
    {
      id: '2',
      name: 'Giày Nike Air Max',
      price: 4500000,
      quantity: 1,
      image_url: 'https://cf.shopee.vn/file/8b1e07e24d620e3bd7619c417d8c4fb9',
      checked: false,
    },
    {
      id: '3',
      name: 'Giày Adidas Superstar',
      price: 3000000,
      quantity: 1,
      image_url: 'https://cf.shopee.vn/file/8b1e07e24d620e3bd7619c417d8c4fb9',
      checked: false,
    },
    {
      id: '4',
      name: 'Giày Puma RS-X',
      price: 4200000,
      quantity: 1,
      image_url: 'https://cf.shopee.vn/file/8b1e07e24d620e3bd7619c417d8c4fb9',
      checked: false,
    },
    {
      id: '5',
      name: 'Giày New Balance 574',
      price: 3700000,
      quantity: 1,
      image_url: 'https://cf.shopee.vn/file/8b1e07e24d620e3bd7619c417d8c4fb9',
      checked: false,
    },
  ]);

  const increaseQuantity = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const toggleCheckbox = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const toggleSelectAll = () => {
    const allSelected = cartItems.every(item => item.checked);
    setCartItems(prevItems =>
      prevItems.map(item => ({ ...item, checked: !allSelected }))
    );
  };

  const totalPrice = cartItems.reduce((total, item) => total + (item.checked ? item.price * item.quantity : 0), 0);

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>My Cart</Text>
        {cartItems.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <TouchableOpacity
              style={[styles.checkbox, item.checked && styles.checkedCheckbox]}
              onPress={() => toggleCheckbox(item.id)}
            />
            <Image source={{ uri: item.image_url }} style={styles.productImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton} onPress={() => decreaseQuantity(item.id)}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(item.id)}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.productPrice}>{(item.price * item.quantity).toLocaleString()} VND</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.selectAllContainer}>
          <TouchableOpacity
            style={[styles.checkbox, cartItems.every(item => item.checked) && styles.checkedCheckbox]}
            onPress={toggleSelectAll}
          />
          <Text style={styles.selectAllText}>Chọn tất cả</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Tổng tiền:</Text>
          <Text style={styles.totalText}>đ{totalPrice.toLocaleString()}</Text>
        </View>
        
        <TouchableOpacity style={styles.paymentButton} onPress={() => navigation.navigate('Payment')}>
          <Text style={styles.paymentButtonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color:"red"
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    top: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: 'green',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 5,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllText: {
    fontSize: 16,
  },
  quantityButton: {
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;
