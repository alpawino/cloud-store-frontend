import { products, orders, users, analyticsData } from './mockData';
import { API_CONFIG } from '../config/env';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchAPI = async (endpoint, options = {}) => {
  if (API_CONFIG.USE_MOCKS) return null;
  const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers }
  });
  return response.json();
};

/* =========================================================
   MS 1: USUARIOS (Persona 1 - Python/MySQL)
========================================================= */
export const getUserProfile = async (userId) => {
  if (!API_CONFIG.USE_MOCKS) return fetchAPI(`${API_CONFIG.ENDPOINTS.USERS}/${userId}`);
  await delay(500);
  return users.find(u => u.id === userId);
};

export const updateUserProfile = async (userId, updateData) => {
  if (!API_CONFIG.USE_MOCKS) return fetchAPI(`${API_CONFIG.ENDPOINTS.USERS}/${userId}`, { method: 'PUT', body: JSON.stringify(updateData) });
  await delay(700);
  return { ...users[0], ...updateData };
};

/* =========================================================
   MS 2: PRODUCTOS (Persona 2 - Node.js/MongoDB)
========================================================= */
export const getProducts = async () => {
  if (!API_CONFIG.USE_MOCKS) return fetchAPI(API_CONFIG.ENDPOINTS.PRODUCTS);
  await delay(600);
  return products;
};

export const getProductById = async (id) => {
  if (!API_CONFIG.USE_MOCKS) return fetchAPI(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`);
  await delay(400);
  return products.find(p => p._id === id);
};

/* =========================================================
   MS 3: ÓRDENES (Persona 3 - Java/PostgreSQL)
========================================================= */
export const createOrder = async (orderData) => {
  if (!API_CONFIG.USE_MOCKS) return fetchAPI(API_CONFIG.ENDPOINTS.ORDERS, { method: 'POST', body: JSON.stringify(orderData) });
  await delay(1000);
  return { id: Date.now(), ...orderData };
};

export const getOrderStatus = async (orderId) => {
  if (!API_CONFIG.USE_MOCKS) return fetchAPI(`${API_CONFIG.ENDPOINTS.ORDERS}/${orderId}/status`);
  await delay(300);
  return { id: orderId, status: 'Processing' };
};

/* =========================================================
   MS 4: AGREGADOR DE HISTORIAL (Persona 4 - Tú / Python)
   Este servicio consume datos de Usuarios y Órdenes.
========================================================= */
export const getFullUserHistory = async (userId) => {
  if (!API_CONFIG.USE_MOCKS) return fetchAPI(`${API_CONFIG.ENDPOINTS.HISTORY}/user/${userId}`);
  await delay(800);
  // Simula la agregación: Órdenes + información del perfil
  return orders.filter(order => order.user_id === userId);
};

export const getHistorySummary = async (userId) => {
  if (!API_CONFIG.USE_MOCKS) return fetchAPI(`${API_CONFIG.ENDPOINTS.HISTORY}/summary/${userId}`);
  await delay(400);
  return { total_spent: 1779.49, order_count: 2 };
};

/* =========================================================
   MS 5: ANALÍTICA (Persona 5 - Python/Athena)
========================================================= */
export const getSalesByCategory = async () => {
  if (!API_CONFIG.USE_MOCKS) return fetchAPI(`${API_CONFIG.ENDPOINTS.ANALYTICS}/sales-by-category`);
  await delay(900);
  return analyticsData.salesByCategory;
};

export const getMonthlyRevenue = async () => {
  if (!API_CONFIG.USE_MOCKS) return fetchAPI(`${API_CONFIG.ENDPOINTS.ANALYTICS}/monthly-revenue`);
  await delay(1200);
  return analyticsData.monthlyRevenue;
};
