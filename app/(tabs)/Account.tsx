import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

const Account: React.FC = () => {
  

  const [user, setUser] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@gmail.com',
    phone: '0123456789',
  });

  const [purchaseHistory] = useState([
    { id: '1', name: 'Giày Nike Jordan Panda Low', price: 3900000, date: '01/09/2024' },
    { id: '2', name: 'Giày Adidas Superstar', price: 3000000, date: '10/08/2024' },
  ]);

  const handleUpdateInfo = () => {
    // Handle updating user info logic here
    console.log('Updated info:', user);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.avatarContainer}>
          <Image source={require('../../../assets/images/banner.png')} style={styles.avatar} />
        </View>

        <Text style={styles.label}>Tên</Text>
        <TextInput
          style={styles.input}
          value={user.name}
          onChangeText={name => setUser(prev => ({ ...prev, name }))}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={user.email}
          onChangeText={email => setUser(prev => ({ ...prev, email }))}
        />

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          value={user.phone}
          onChangeText={phone => setUser(prev => ({ ...prev, phone }))}
        />

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateInfo}>
          <Text style={styles.updateButtonText}>Cập nhật thông tin</Text>
        </TouchableOpacity>

        <View style={styles.purchaseHistoryContainer}>
          <Text style={styles.historyTitle}>Lịch sử mua hàng</Text>
          {purchaseHistory.map(item => (
            <View key={item.id} style={styles.purchaseItem}>
              <Text>{item.name}</Text>
              <Text>{item.price.toLocaleString()} VND</Text>
              <Text>{item.date}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContainer: {
    padding: 16,
  },
  avatarContainer: {
    marginBottom: 30,
    alignItems: 'center',
    top:20
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  updateButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  purchaseHistoryContainer: {
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  purchaseItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default Account;
