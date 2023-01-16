export const email = 'zebirita@email.com';
export const password = '$#zebirita#$';
export const baseUrl = 'http://localhost:3001';
export const loginResponse = {
  id: 3,
  name: 'Cliente Zé Birita',
  email,
  role: 'customer',
  token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC
  J9.eyJpZCI6MywiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5j
  b20iLCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwi
  cm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjcwODg3MjQ
  0LCJleHAiOjE2NzI5NjA4NDR9.5jfqWJI__xg7NcXMbAP3XGmZHB4wLWP0BlhXYI6uU7o`,
};
export const loginResponseAdm = {
  id: 3,
  name: 'Delivery App Admin',
  email: 'admin@deliveryapp.com',
  role: 'administrator',
  token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV
  CJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBkZWxpdmVyeWFwcC5jb20iLCJuYW1lIjo
  iRGVsaXZlcnkgQXBwIEFkbWluIiwicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYX
  QiOjE2NzM3MjEwOTcsImV4cCI6MTY3NTc5NDY5N30.8fhPMD4xqw2XpHXLxEONFF6mrYE6XMp3pXrl_RAVLCE`,
};

export const loginResponseSeller = {
  id: 2,
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  role: 'seller',
  token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e
  yJpZCI6MiwiZW1haWwiOiJmdWxhbmFAZGVsaXZlcnlhcH
  AuY29tIiwibmFtZSI6IkZ1bGFuYSBQZXJlaXJhIiwicm9s
  ZSI6InNlbGxlciIsImlhdCI6MTY3MzgxMjcyMywiZXhwIj
  oxNjc1ODg2MzIzfQ.g4qLgg9Wp0kop6ABP6z7MgMjfHt3Sv1BTSesXxnGkbQ`,
};

export const registerUser = {
  email: 'joaozin@gmail.com',
  name: 'Joaozin cabra da peste',
  password: 'joaozin123',
  role: 'consumer',
};

export const products = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: '2.20',
    urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
    quantity: 0,
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: '7.50',
    urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
    quantity: 0,
  },
  {
    id: 3,
    name: 'Antarctica Pilsen 300ml',
    price: '2.49',
    urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
    quantity: 0,
  },
  {
    id: 4,
    name: 'Brahma 600ml',
    price: '7.50',
    urlImage: 'http://localhost:3001/images/brahma_600ml.jpg',
    quantity: 0,
  },
  {
    id: 5,
    name: 'Skol 269ml',
    price: '2.19',
    urlImage: 'http://localhost:3001/images/skol_269ml.jpg',
    quantity: 0,
  },
  {
    id: 6,
    name: 'Skol Beats Senses 313ml',
    price: '4.49',
    urlImage: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg',
    quantity: 0,
  },
  {
    id: 7,
    name: 'Becks 330ml',
    price: '4.99',
    urlImage: 'http://localhost:3001/images/becks_330ml.jpg',
    quantity: 0,
  },
  {
    id: 8,
    name: 'Brahma Duplo Malte 350ml',
    price: '2.79',
    urlImage: 'http://localhost:3001/images/brahma_duplo_malte_350ml.jpg',
    quantity: 0,
  },
  {
    id: 9,
    name: 'Becks 600ml',
    price: '8.89',
    urlImage: 'http://localhost:3001/images/becks_600ml.jpg',
    quantity: 0,
  },
  {
    id: 10,
    name: 'Skol Beats Senses 269ml',
    price: '3.57',
    urlImage: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
    quantity: 0,
  },
  {
    id: 11,
    name: 'Stella Artois 275ml',
    price: '3.49',
    urlImage: 'http://localhost:3001/images/stella_artois_275ml.jpg',
    quantity: 0,
  },
];

export const cart = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: '2.20',
    urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
    quantity: 2,
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: '7.50',
    urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
    quantity: 2,
  },
  {
    id: 3,
    name: 'Antarctica Pilsen 300ml',
    price: '2.49',
    urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
    quantity: 0,
  },
  {
    id: 4,
    name: 'Brahma 600ml',
    price: '7.50',
    urlImage: 'http://localhost:3001/images/brahma_600ml.jpg',
    quantity: 0,
  },
  {
    id: 5,
    name: 'Skol 269ml',
    price: '2.19',
    urlImage: 'http://localhost:3001/images/skol_269ml.jpg',
    quantity: 0,
  },
  {
    id: 6,
    name: 'Skol Beats Senses 313ml',
    price: '4.49',
    urlImage: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg',
    quantity: 0,
  },
  {
    id: 7,
    name: 'Becks 330ml',
    price: '4.99',
    urlImage: 'http://localhost:3001/images/becks_330ml.jpg',
    quantity: 0,
  },
  {
    id: 8,
    name: 'Brahma Duplo Malte 350ml',
    price: '2.79',
    urlImage: 'http://localhost:3001/images/brahma_duplo_malte_350ml.jpg',
    quantity: 0,
  },
  {
    id: 9,
    name: 'Becks 600ml',
    price: '8.89',
    urlImage: 'http://localhost:3001/images/becks_600ml.jpg',
    quantity: 0,
  },
  {
    id: 10,
    name: 'Skol Beats Senses 269ml',
    price: '3.57',
    urlImage: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
    quantity: 0,
  },
  {
    id: 11,
    name: 'Stella Artois 275ml',
    price: '3.49',
    urlImage: 'http://localhost:3001/images/stella_artois_275ml.jpg',
    quantity: 0,
  },
];

export const usersAdm = [
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller',
  },
  {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '1c37466c159755ce1fa181bd247cb925',
    role: 'customer',
  },
];
