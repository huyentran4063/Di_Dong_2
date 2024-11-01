import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../(tabs)/Login';
import SignUp from '../(tabs)/SignUp';
import ForgotPassword from '../(tabs)/ForgotPassword';

const Stack = createStackNavigator();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
