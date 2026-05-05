import { products, orders, users, analyticsData } from './mockData';
import { API_CONFIG } from '../config/env';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper genérico para llamadas a la API
const fetchAPI = async (baseUrl, endpoint, options = {}) => {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};

/* =========================================================
   MS 1: USUARIOS (Persona 1 - Python/MySQL) - Puerto 8000
========================================================= */
export const getUserProfile = async (userId) => {
  if (API_CONFIG.USE_MOCKS) { await delay(500); return users.find(u => u.id === userId); }
  return fetchAPI(API_CONFIG.USERS_URL, `/users/${userId}`);
};

export const getUsers = async () => {
  if (API_CONFIG.USE_MOCKS) { await delay(500); return users; }
  return fetchAPI(API_CONFIG.USERS_URL, '/users');
};

export const updateUserProfile = async (userId, updateData) => {
  if (API_CONFIG.USE_MOCKS) { await delay(700); return { ...users[0], ...updateData }; }
  return fetchAPI(API_CONFIG.USERS_URL, `/users/${userId}`, { method: 'PUT', body: JSON.stringify(updateData) });
};

/* =========================================================
   MS 2: PRODUCTOS (Persona 2 - Node.js/MongoDB) - Puerto 4000
========================================================= */
export const getProducts = async () => {
  if (API_CONFIG.USE_MOCKS) { await delay(600); return products; }
  return fetchAPI(API_CONFIG.PRODUCTS_URL, '/products');
};

export const getProductById = async (id) => {
  if (API_CONFIG.USE_MOCKS) { await delay(400); return products.find(p => p._id === id); }
  return fetchAPI(API_CONFIG.PRODUCTS_URL, `/products/${id}`);
};

/* =========================================================
   MS 3: ÓRDENES (Persona 3 - Java/PostgreSQL) - Puerto 8083
========================================================= */
export const createOrder = async (orderData) => {
  if (API_CONFIG.USE_MOCKS) { await delay(1000); return { id: Date.now(), ...orderData }; }
  return fetchAPI(API_CONFIG.ORDERS_URL, '/orders', { method: 'POST', body: JSON.stringify(orderData) });
};

export const getOrderStatus = async (orderId) => {
  if (API_CONFIG.USE_MOCKS) { await delay(300); return { id: orderId, status: 'Processing' }; }
  return fetchAPI(API_CONFIG.ORDERS_URL, `/orders/${orderId}/status`);
};

/* =========================================================
   MS 4: AGREGADOR DE HISTORIAL (Persona 4 - Tú / Python)
   Este servicio consume datos de Usuarios y Órdenes.
========================================================= */
export const getFullUserHistory = async (userId) => {
  if (API_CONFIG.USE_MOCKS) { await delay(800); return orders.filter(order => order.user_id === userId); }
  // Redirigido temporalmente al microservicio de Órdenes
  return fetchAPI(API_CONFIG.ORDERS_URL, `/orders?userId=${userId}`);
};

export const getHistorySummary = async (userId) => {
  if (API_CONFIG.USE_MOCKS) { await delay(400); return { total_spent: 1779.49, order_count: 2 }; }
  return fetchAPI(API_CONFIG.ORDERS_URL, `/orders?userId=${userId}`);
};

/* =========================================================
   MS 5: ANALÍTICA (Persona 5 - Python/Athena)
========================================================= */
export const getSalesByCategory = async () => {
  // if (API_CONFIG.USE_MOCKS) { await delay(900); return analyticsData.salesByCategory; }
  await delay(900);
  return analyticsData.salesByCategory;
};

export const getMonthlyRevenue = async () => {
  // if (API_CONFIG.USE_MOCKS) { await delay(1200); return analyticsData.monthlyRevenue; }
  await delay(1200);
  return analyticsData.monthlyRevenue;
};
