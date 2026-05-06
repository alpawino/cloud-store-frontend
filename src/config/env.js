// src/config/env.js

// API Gateway (HTTPS) - Para producción (Amplify)
const GATEWAY_URL = 'https://pnctadexgj.execute-api.us-east-1.amazonaws.com';

export const API_CONFIG = {
  USE_MOCKS: false,

  // Cada microservicio tiene su ruta en el Gateway
  USERS_URL: import.meta.env.VITE_USERS_URL || `${GATEWAY_URL}`,
  PRODUCTS_URL: import.meta.env.VITE_PRODUCTS_URL || `${GATEWAY_URL}`,
  ORDERS_URL: import.meta.env.VITE_ORDERS_URL || `${GATEWAY_URL}/api`,
  HISTORY_URL: import.meta.env.VITE_HISTORY_URL || `${GATEWAY_URL}`,
};
