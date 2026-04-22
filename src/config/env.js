// src/config/env.js
// IMPORTANTE: Nunca subas credenciales directamente aquí. Usa variables de entorno (.env).
// Cuando tus compañeros desplieguen el Backend en AWS API Gateway, cambia esta URL.

export const API_CONFIG = {
  // Actualmente usando mocks locales. Cambiar a true cuando el backend esté listo.
  USE_MOCKS: true,
  
  // URL base del API Gateway (Ej: https://x8y9z0a1b2.execute-api.us-east-1.amazonaws.com/prod)
  BASE_URL: import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8000/api',

  // Endpoints específicos por microservicio (Por si el Gateway enruta por paths)
  ENDPOINTS: {
    PRODUCTS: '/products',     // Microservicio 1 (MongoDB)
    ORDERS: '/orders',         // Microservicio 2 (PostgreSQL)
    USERS: '/users',           // Microservicio 3 (MySQL)
    CHECKOUT: '/checkout',     // Microservicio 4 (Sin BD - Orquestador)
    ANALYTICS: '/analytics'    // Microservicio 5 (Athena - Consultas SQL Analíticas)
  }
};
