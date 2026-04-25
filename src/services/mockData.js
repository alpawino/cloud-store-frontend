// src/services/mockData.js

// Microservicio 1: PRODUCTOS (MongoDB)
export const products = [
  { _id: "101", name: "Auriculares Inalámbricos Noise Cancelling", price: 299.99, seller_id: "sel_001", category: "Electrónica", stock: 45, status: "available", image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", created_at: new Date("2023-01-15T10:00:00Z") },
  { _id: "102", name: "Teclado Mecánico RGB Switch Red", price: 129.50, seller_id: "sel_002", category: "Computación", stock: 12, status: "available", image_url: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80", created_at: new Date("2023-03-22T14:30:00Z") },
  { _id: "103", name: "Monitor UltraWide 34 pulgadas 144Hz", price: 450.00, seller_id: "sel_001", category: "Computación", stock: 5, status: "available", image_url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80", created_at: new Date("2023-05-10T09:15:00Z") },
  { _id: "104", name: "Silla Gamer Ergonómica Premium", price: 249.90, seller_id: "sel_003", category: "Mobiliario", stock: 0, status: "sold", image_url: "https://images.unsplash.com/photo-1598331668908-144c1071d025?w=500&q=80", created_at: new Date("2023-06-01T11:45:00Z") },
  { _id: "105", name: "Ratón Inalámbrico Ultraligero", price: 89.99, seller_id: "sel_002", category: "Computación", stock: 30, status: "available", image_url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80", created_at: new Date("2023-07-20T16:20:00Z") },
  { _id: "106", name: "Micrófono de Condensador USB", price: 110.00, seller_id: "sel_004", category: "Audio", stock: 18, status: "available", image_url: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80", created_at: new Date("2023-08-05T08:10:00Z") }
];

// Microservicio 2: ÓRDENES (PostgreSQL)
export const orders = [
  {
    id: 10001, user_id: 1, status: "Delivered", total: 429.49, created_at: new Date("2023-09-15T10:30:00Z"),
    order_details: [
      { id: 1, order_id: 10001, product_id: "60d21b4667d0d8992e610c81", quantity: 1, unit_price: 299.99, line_total: 299.99 },
      { id: 2, order_id: 10001, product_id: "60d21b4667d0d8992e610c82", quantity: 1, unit_price: 129.50, line_total: 129.50 }
    ]
  },
  {
    id: 10002, user_id: 1, status: "Processing", total: 1350.00, created_at: new Date("2023-10-25T14:45:00Z"),
    order_details: [
      { id: 3, order_id: 10002, product_id: "60d21b4667d0d8992e610c83", quantity: 3, unit_price: 450.00, line_total: 1350.00 }
    ]
  }
];

// Microservicio 3: USUARIOS (MySQL) - Nuevo
export const users = [
  {
    id: 1,
    username: "josephc",
    email: "joseph.cabanillas@example.com",
    role: "customer",
    address: "Av. La Marina 123, Lima",
    created_at: new Date("2022-12-01T08:00:00Z")
  }
];

// Microservicio 4: PAGOS/CHECKOUT (Sin BD - Orquestador) - Nuevo
export const paymentStatuses = [
  { transaction_id: "txn_987654321", order_id: 10001, status: "SUCCESS", payment_method: "Credit Card" },
  { transaction_id: "txn_123456789", order_id: 10002, status: "PENDING", payment_method: "PayPal" }
];

// Microservicio 5: ANALÍTICA (AWS Athena) - Nuevo (Datos agregados)
export const analyticsData = {
  salesByCategory: [
    { name: "Computación", value: 18000 },
    { name: "Electrónica", value: 12500 },
    { name: "Mobiliario", value: 8900 },
    { name: "Audio", value: 4200 }
  ],
  monthlyRevenue: [
    { month: "Ene", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 2000 },
    { month: "Abr", revenue: 2780 },
    { month: "May", revenue: 1890 },
    { month: "Jun", revenue: 2390 },
    { month: "Jul", revenue: 3490 },
  ]
};
