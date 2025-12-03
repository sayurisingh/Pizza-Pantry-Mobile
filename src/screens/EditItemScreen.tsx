import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import api from '../api/client';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';

type EditItemRoute = RouteProp<RootStackParamList, 'EditItem'>;

interface Props {
  route: EditItemRoute;
}

export default function EditItemScreen({ route }: Props) {
  const navigation = useNavigation();
  const { id, name: initialName, quantity: initialQty } = route.params;

  const [name, setName] = useState(initialName);
  const [quantity, setQuantity] = useState(String(initialQty));

  const saveChanges = async () => {
    try {
      await api.put(`/items/${id}`, {
        name,
        quantity: Number(quantity),
      });
      navigation.goBack(); // return to list
    } catch (err) {
      console.log('Update error', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      <Button title="Save Changes" onPress={saveChanges} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginBottom: 5, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
