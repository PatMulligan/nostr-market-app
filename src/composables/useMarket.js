import { useStorage } from './useStorage';
import { useMarketConfig } from './useMarketConfig';

export function useMarket() {
  const storage = useStorage();
  const marketConfig = useMarketConfig();

  const getFilteredProducts = (searchText, filterCategories, allProducts) => {
    if (!searchText && (!filterCategories || !filterCategories.length)) {
      return allProducts;
    }

    return allProducts.filter((product) => {
      const matchesSearch = !searchText ||
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase());

      const matchesCategory = !filterCategories?.length ||
        filterCategories.includes(product.category);

      return matchesSearch && matchesCategory;
    });
  };

  const getAllCategories = (products) => {
    const categories = new Set();
    products.forEach(product => {
      if (product.category) {
        categories.add(product.category);
      }
    });
    return Array.from(categories);
  };

  const sortProducts = (products, field, order) => {
    return [...products].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (typeof aValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return order === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    });
  };

  const saveSortPreference = (field, order) => {
    storage.setItem('nostrmarket.sort', { field, order });
  };

  const getSortPreference = () => {
    return storage.getItem('nostrmarket.sort', { field: 'name', order: 'asc' });
  };

  return {
    getFilteredProducts,
    getAllCategories,
    sortProducts,
    saveSortPreference,
    getSortPreference
  };
}
