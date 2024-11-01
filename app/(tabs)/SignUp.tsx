import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { registerUser } from '../services/ApiService';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUp = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
  
    setLoading(true);
    try {
      const response = await registerUser({
        name,
        username,
        email,
        phone, // Ensure the phone number is a number
        password,
      });
  
      if (response.success) {
        Alert.alert('Success', 'Registration successful', [
          { text: 'OK', onPress: () => {
              // Clear fields and navigate to login screen
              setName('');
              setUserName('');
              setEmail('');
              setPhone('');
              setPassword('');
              setConfirmPassword('');
              navigation.navigate('Login');
            } },
        ]);
      } else {
        Alert.alert('Error', response.message || 'Registration failed.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ThemedView style={styles.container}>
        {/* <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <FontAwesome name="camera" size={40} color="#666" />
          )}
        </TouchableOpacity> */}
        <Image source={require('../../assets/images/logo.jpg')} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUserName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(prev => !prev)} style={styles.eyeIcon}>
            <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(prev => !prev)} style={styles.eyeIcon}>
            <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton} disabled={loading}>
          <ThemedText style={styles.signUpButtonText}>{loading ? 'Signing up...' : 'Sign Up'}</ThemedText>
        </TouchableOpacity>
        <View style={styles.switchModeContainer}>
              <ThemedText style={styles.switchModeText}>Don't have an account?
              <TouchableOpacity onPress={() => navigation.navigate('Login') }>
                <ThemedText style={styles.switchModeLink}> Login</ThemedText>
                </TouchableOpacity>
              </ThemedText>
          </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
    position: 'relative',  // Needed for absolute positioning of eye icon
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  signUpButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  switchModeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchModeText: {
    fontSize: 16,
    color: '#000',
    top: 20,
  },
  switchModeLink: {
    fontSize: 16,
    color: '#007BFF',
    top:5,
  },
  // imageContainer: {
  //   width: 100,
  //   height: 100,
  //   borderRadius: 50,
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginBottom: 20,
  //   backgroundColor: '#eee',
  //   overflow: 'hidden',
  //   alignSelf: 'center',
  // },
  // image: {
  //   width: '100%',
  //   height: '100%',
  // },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 40,
    alignSelf: 'center',
  },
  login: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
});

export default SignUp;
