// src/config/env.js
// IMPORTANTE: Nunca subas credenciales directamente aquí. Usa variables de entorno (.env).


export const API_CONFIG = {

  USE_MOCKS: false,


  BASE_URL: import.meta.env.VITE_API_GATEWAY_URL || 'http://3.87.171.243:8083/api',

  // Endpoints específicos por microservicio (Por si el Gateway enruta por paths)
  ENDPOINTS: {
    PRODUCTS: '/products',     // Microservicio 1 (MongoDB)
    ORDERS: '/orders',         // Microservicio 2 (PostgreSQL)
    USERS: '/users',           // Microservicio 3 (MySQL)
    CHECKOUT: '/checkout',     // Microservicio 4 (Sin BD - Orquestador)
    ANALYTICS: '/analytics'    // Microservicio 5 (Athena - Consultas SQL Analíticas)
  }
};
