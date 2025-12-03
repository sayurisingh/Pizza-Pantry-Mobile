import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import InventoryListScreen from '../screens/InventoryListScreen';
import AddItemScreen from '../screens/AddItemScreen';
import EditItemScreen from '../screens/EditItemScreen';

enableScreens(); 

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  InventoryList: undefined;
  AddItem: undefined; 
  EditItem: { id: string; name: string; quantity: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="InventoryList" component={InventoryListScreen} />
        <Stack.Screen name="AddItem" component={AddItemScreen} />
        <Stack.Screen name="EditItem" component={EditItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
