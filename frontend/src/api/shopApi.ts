import { httpClient } from './httpClient';

export const fetchShopItems = async () => {
  const { data } = await httpClient.get('/shop/items');
  return data;
};

export const buyShopItem = async (itemId: string) => {
  const { data } = await httpClient.post(`/shop/items/${itemId}/buy`);
  return data;
};

export const fetchCases = async () => {
  const { data } = await httpClient.get('/shop/cases');
  return data;
};

export const openCase = async (caseId: string) => {
  const { data } = await httpClient.post(`/shop/cases/${caseId}/open`);
  return data;
};
