// src/config/env.js

// API Gateway (HTTPS) - Para producción (Amplify)
const GATEWAY_URL = 'https://pnctadexgj.execute-api.us-east-1.amazonaws.com';

// IP Pública de la Máquina 1 - Para desarrollo local
const EC2_IP = '52.91.40.58';

export const API_CONFIG = {
  USE_MOCKS: false,

  // En producción usa el Gateway (HTTPS), en local usa la IP directa (HTTP)
  USERS_URL: import.meta.env.VITE_USERS_URL || `${GATEWAY_URL}/users`,
  PRODUCTS_URL: import.meta.env.VITE_PRODUCTS_URL || `${GATEWAY_URL}/products`,
  ORDERS_URL: import.meta.env.VITE_ORDERS_URL || `${GATEWAY_URL}`,
};
