// src/config/env.js

// IP Pública de la Máquina 1 (VM Producción)
const EC2_IP = import.meta.env.VITE_EC2_IP || '52.91.40.58';

export const API_CONFIG = {
  USE_MOCKS: false,

  // URLs individuales por microservicio (cada uno en su puerto)
  USERS_URL: import.meta.env.VITE_USERS_URL || `http://${EC2_IP}:8000`,
  PRODUCTS_URL: import.meta.env.VITE_PRODUCTS_URL || `http://${EC2_IP}:4000`,
  ORDERS_URL: import.meta.env.VITE_ORDERS_URL || `http://${EC2_IP}:8083/api`,
};
