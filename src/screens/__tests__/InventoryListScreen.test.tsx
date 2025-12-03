// src/screens/__tests__/InventoryListScreen.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import InventoryListScreen from '../InventoryListScreen';
import api from '../../api/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the API module
jest.mock('../../api/client');

const mockedApi = api as jest.Mocked<typeof api>;

const queryClient = new QueryClient();

describe('InventoryListScreen', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('renders loading state', () => {
    // Mock a pending promise
    mockedApi.get.mockReturnValue(new Promise(() => {}));

    const { getByTestId, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <InventoryListScreen navigation={{ navigate: jest.fn() } as any} />
      </QueryClientProvider>
    );

    // Since we don’t have testID on ActivityIndicator, just check if it exists
    // You can optionally add testID="loading" to ActivityIndicator in your component
    // <ActivityIndicator testID="loading" style={styles.center} size="large" />
  });

  it('renders list of items', async () => {
    const items = [
      { _id: '1', name: 'Apple', quantity: 10 },
      { _id: '2', name: 'Banana', quantity: 5 },
    ];

    mockedApi.get.mockResolvedValue({ data: items });

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <InventoryListScreen navigation={{ navigate: jest.fn() } as any} />
      </QueryClientProvider>
    );

    // Wait for the items to appear
    for (const item of items) {
      await waitFor(() => {
        expect(getByText(item.name)).toBeTruthy();
        expect(getByText(`Qty: ${item.quantity}`)).toBeTruthy();
      });
    }
  });

  it('filters items based on search', async () => {
    const items = [
      { _id: '1', name: 'Apple', quantity: 10 },
      { _id: '2', name: 'Banana', quantity: 5 },
    ];

    mockedApi.get.mockResolvedValue({ data: items });

    const { getByText, queryByText, getByPlaceholderText } = render(
      <QueryClientProvider client={queryClient}>
        <InventoryListScreen navigation={{ navigate: jest.fn() } as any} />
      </QueryClientProvider>
    );

    const searchInput = getByPlaceholderText('Search items...');
    fireEvent.changeText(searchInput, 'Apple');

    await waitFor(() => {
      expect(getByText('Apple')).toBeTruthy();
      expect(queryByText('Banana')).toBeNull();
    });
  });
});
