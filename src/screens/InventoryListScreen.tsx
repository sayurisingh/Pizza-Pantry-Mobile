import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  Button,
  TextInput,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type InventoryScreenNav = NativeStackNavigationProp<RootStackParamList, 'InventoryList'>;

interface Item {
  _id: string;
  name: string;
  quantity: number;
}

export default function InventoryListScreen({ navigation }: { navigation: InventoryScreenNav }) {
  const { data, isLoading, refetch, isFetching } = useQuery<Item[]>({
    queryKey: ['items'],
    queryFn: async () => {
      const res = await api.get('/items');
      return res.data;
    },
  });

  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/items/${id}`);
      refetch();
    } catch (err) {
      console.log('Delete failed', err);
    }
  };

  if (isLoading) return <ActivityIndicator style={styles.center} size="large" />;

  // Filter and sort items
  const filteredAndSortedItems = (data ?? [])
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortOrder === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity
    );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Header: Search + Sort + Add Button */}
      <View style={{ marginBottom: 10 }}>
        {/* Search Bar */}
        <View style={{ marginBottom: 10 }}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search items..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
        
        {/* Sort Button */}
        <View style={{ marginBottom: 10 }}>
          <Button
            title={`Sort by Qty: ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
            onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          />
        </View>

        {/* Add Button */}
        <View>
          <Button title="Add Item" onPress={() => navigation.navigate('AddItem')} />
        </View>
      </View>

      {/* Items List */}
      {filteredAndSortedItems.length === 0 ? (
        <Text style={styles.center}>No items found</Text>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={filteredAndSortedItems}
          keyExtractor={(item) => item._id}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Qty: {item.quantity}</Text>
              <View style={styles.buttons}>
                <Button
                  title="Edit"
                  onPress={() =>
                    navigation.navigate('EditItem', {
                      id: item._id,
                      name: item.name,
                      quantity: item.quantity,
                    })
                  }
                />
                <Button title="Delete" color="red" onPress={() => handleDelete(item._id)} />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
  },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  name: { fontSize: 16, fontWeight: 'bold' },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});
