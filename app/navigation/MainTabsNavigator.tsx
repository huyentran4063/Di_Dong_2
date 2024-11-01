import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import index from '../(tabs)/index';
import Category from '../(tabs)/Category';
import Cart from '../(tabs)/Cart';
import Account from '../(tabs)/Account';

const Tab = createBottomTabNavigator();

const MainTabsNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={index} />
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default MainTabsNavigator;
