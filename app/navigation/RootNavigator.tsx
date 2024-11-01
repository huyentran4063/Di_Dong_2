import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import MainTabsNavigator from './MainTabsNavigator';

const Stack = createStackNavigator();

const RootNavigator: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { isLoggedIn } = authContext;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        // Hiển thị AuthNavigator nếu chưa đăng nhập (Login là màn hình mặc định của AuthNavigator)
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        // Hiển thị các tab chính khi đã đăng nhập
        <Stack.Screen name="MainTabs" component={MainTabsNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
