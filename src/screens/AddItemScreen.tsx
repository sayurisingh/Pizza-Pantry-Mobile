import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/client';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type InventoryScreenNav = NativeStackNavigationProp<
  RootStackParamList,
  'InventoryList'
>;

export default function InventoryListScreen({
  navigation,
}: {
  navigation: InventoryScreenNav;
}) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const queryClient = useQueryClient();

  // Mutation to add an item
  const addItem = useMutation({
    mutationFn: async () => {
      return await api.post('/items', {
        name,
        quantity: Number(quantity),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      Alert.alert('Success', 'Item added');
      navigation.goBack();
    },
    onError: () => {
      Alert.alert('Error', 'Could not add item');
    },
  });

  const handleAddItem = () => {
    if (name.trim().length === 0) {
      Alert.alert('Invalid Name', 'Item name cannot be empty.');
      return;
    }

    const qty = Number(quantity);
    if (isNaN(qty) || qty <= 0) {
      Alert.alert('Invalid Quantity', 'Quantity must be a positive number.');
      return;
    }

    addItem.mutate();
  };

  const handleNameChange = (text: string) => {
    // Remove any character that is not a letter or space
    const lettersOnly = text.replace(/[^A-Za-z\s]/g, '');
    setName(lettersOnly);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={handleNameChange}
        placeholder="e.g. Pepperoni"
      />

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        placeholder="e.g. 20"
        keyboardType="numeric"
      />

      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginTop: 15, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
