import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView'; // Your custom themed component

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD'); // Default to Cash on Delivery (COD)

  const cartItems = [
    {
      id: '1',
      name: 'Giày Nike Jordan Panda Low',
      price: 3900000,
      quantity: 1,
      image_url: 'https://cf.shopee.vn/file/8b1e07e24d620e3bd7619c417d8c4fb9',
    },
    {
      id: '2',
      name: 'Giày Nike Air Max',
      price: 4500000,
      quantity: 1,
      image_url: 'https://example.com/image2.jpg',
    },
  ];

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        {/* Shipping Details */}
        <View style={styles.sectionadd}>
          <Text style={styles.sectionTitle}>Thông tin giao hàng</Text>
          <View style={styles.shippingContainer}>
            <Text style={styles.shippingText}>Tên người nhận: John Doe</Text>
            <Text style={styles.shippingText}>Địa chỉ: 123 ABC, District 1, HCMC</Text>
            <Text style={styles.shippingText}>Số điện thoại: 0901234567</Text>
          </View>
        </View>

        {/* Product Summary */}
        <View style={styles.sectionsp}>
          <Text style={styles.sectionTitle}>Sản phẩm</Text>
          {cartItems.map(item => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image_url }} style={styles.productImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price.toLocaleString()} VND</Text>
                <Text style={styles.productQuantity}>x{item.quantity}</Text>
              </View>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Tổng cộng: </Text>
            <Text style={styles.totalPrice}>đ{totalPrice.toLocaleString()}</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.sectionpay}>
          <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          <TouchableOpacity
            style={[styles.paymentMethod, selectedPaymentMethod === 'COD' && styles.selectedMethod]}
            onPress={() => setSelectedPaymentMethod('COD')}
          >
            <Text style={styles.paymentText}>Thanh toán khi nhận hàng (COD)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.paymentMethod, selectedPaymentMethod === 'CreditCard' && styles.selectedMethod]}
            onPress={() => setSelectedPaymentMethod('CreditCard')}
          >
            <Text style={styles.paymentText}>Thẻ tín dụng/ghi nợ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.paymentMethod, selectedPaymentMethod === 'EWallet' && styles.selectedMethod]}
            onPress={() => setSelectedPaymentMethod('EWallet')}
          >
            <Text style={styles.paymentText}>Ví điện tử Momo, ZaloPay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Tổng cộng:</Text>
        <Text style={styles.footerPrice}>đ{totalPrice.toLocaleString()}</Text>
        <TouchableOpacity style={styles.placeOrderButton}>
          <Text style={styles.placeOrderText}>Đặt hàng</Text>
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
  sectionadd: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 10,
    top:25
  },
  sectionsp: {
    backgroundColor: 'white',
    padding: 16,
  },
  sectionpay: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  shippingContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  shippingText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
  productQuantity: {
    fontSize: 14,
    color: '#888',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  paymentMethod: {
    padding: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedMethod: {
    borderColor: '#f23030',
  },
  paymentText: {
    fontSize: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red', // Giá màu đỏ trong footer
  },
  placeOrderButton: {
    backgroundColor: '#f23030',
    padding: 15,
    borderRadius: 8,
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Payment;
