// Shared shop + product data used by shops.html and product.html
const shops = {
  boluwatife: {
    name: 'Boluwatife Textiles',
    category: 'fabrics',
    tagline: 'Quality Fabrics, Quality Life',
    location: 'Oshodi Main Market, Block A, Row 12',
    followers: '1.2K+ Followers',
    heroBg: 'https://picsum.photos/1200/400?random=101',
    thumb: 'https://picsum.photos/200/200?random=102',
    categories: ['Ankara Fabrics', 'Lace Fabrics', 'Voile Fabrics', 'Polished Cotton', 'Senator Materials', 'Aso Oke', 'Plain Fabrics', 'More Categories'],
    products: [
      { name: 'Ankara Fabric (6 Yards)', price: 'NGN 4,500', score: '4.8', count: '35', image: 'https://picsum.photos/300/300?random=1' },
      { name: 'Lace Fabric (5 Yards)', price: 'NGN 8,500', score: '4.7', count: '27', image: 'https://picsum.photos/300/300?random=2' },
      { name: 'Voile Fabric (6 Yards)', price: 'NGN 3,200', score: '4.9', count: '19', image: 'https://picsum.photos/300/300?random=3' },
      { name: 'Polished Cotton (6 Yards)', price: 'NGN 5,000', score: '4.8', count: '31', image: 'https://picsum.photos/300/300?random=4' },
      { name: 'Senator Material (4 Yards)', price: 'NGN 6,000', score: '4.6', count: '14', image: 'https://picsum.photos/300/300?random=5' },
      { name: 'Aso Oke (4 Yards)', price: 'NGN 7,500', score: '4.8', count: '21', image: 'https://picsum.photos/300/300?random=6' },
      { name: 'Cashmere Wool Fabric', price: 'NGN 12,000', score: '4.9', count: '18', image: 'https://picsum.photos/300/300?random=7' },
      { name: 'Brocade Damask Fabric', price: 'NGN 15,500', score: '4.7', count: '22', image: 'https://picsum.photos/300/300?random=8' },
      { name: 'Organza Silk Print', price: 'NGN 8,200', score: '4.8', count: '15', image: 'https://picsum.photos/300/300?random=9' },
      { name: 'Velvet Embellished Lace', price: 'NGN 18,000', score: '5.0', count: '30', image: 'https://picsum.photos/300/300?random=10' },
      { name: 'Guipure Heavy Lace', price: 'NGN 22,000', score: '4.9', count: '12', image: 'https://picsum.photos/300/300?random=11' },
      { name: 'Cotton Linen Blend', price: 'NGN 6,500', score: '4.6', count: '19', image: 'https://picsum.photos/300/300?random=12' }
    ]
  },
  ayomide: {
    name: 'Ayomide Fabrics',
    category: 'fabrics',
    tagline: 'Wholesale & Retail Premium Textiles',
    location: 'Oshodi Main Market, Block B, Shop 45',
    followers: '980+ Followers',
    heroBg: 'https://picsum.photos/1200/400?random=201',
    thumb: 'https://picsum.photos/200/200?random=202',
    categories: ['Polished Cotton', 'Lace Fabrics', 'Senator', 'Voile', 'Plain Cotton'],
    products: [
      { name: 'Polished Cotton (6 Yards)', price: 'NGN 5,200', score: '4.6', count: '28', image: 'https://picsum.photos/300/300?random=13' },
      { name: 'Swiss Voile Lace', price: 'NGN 11,500', score: '4.8', count: '32', image: 'https://picsum.photos/300/300?random=14' },
      { name: 'Senator Material', price: 'NGN 6,500', score: '4.7', count: '19', image: 'https://picsum.photos/300/300?random=15' },
      { name: 'Dry Lace Fabric', price: 'NGN 9,000', score: '4.5', count: '14', image: 'https://picsum.photos/300/300?random=16' },
      { name: 'Atiku Cotton Fabric', price: 'NGN 8,500', score: '4.8', count: '22', image: 'https://picsum.photos/300/300?random=17' },
      { name: 'Jacquard Silk', price: 'NGN 14,000', score: '4.9', count: '11', image: 'https://picsum.photos/300/300?random=18' }
    ]
  },
  taiwo: {
    name: 'Taiwo Textiles',
    category: 'fabrics',
    tagline: 'Your trusted fabric plug in Oshodi',
    location: 'New Oko-Oba Market, Line 7, Shop 18',
    followers: '850+ Followers',
    heroBg: 'https://picsum.photos/1200/400?random=301',
    thumb: 'https://picsum.photos/200/200?random=302',
    categories: ['Ankara', 'Lace', 'George', 'Linen'],
    products: [
      { name: 'Ankara Premium Print', price: 'NGN 4,800', score: '4.7', count: '24', image: 'https://picsum.photos/300/300?random=19' },
      { name: 'George Fabric (5 Yards)', price: 'NGN 16,000', score: '4.8', count: '18', image: 'https://picsum.photos/300/300?random=20' },
      { name: 'Soft Linen Material', price: 'NGN 5,500', score: '4.6', count: '15', image: 'https://picsum.photos/300/300?random=21' },
      { name: 'Cord Lace Fabric', price: 'NGN 10,200', score: '4.9', count: '29', image: 'https://picsum.photos/300/300?random=22' }
    ]
  },
  bigsam: {
    name: 'Bigsam Fabrics',
    category: 'fabrics',
    tagline: 'Quality fabric you can trust',
    location: 'Oshodi Main Market, Block C, Row 8',
    followers: '720+ Followers',
    heroBg: 'https://picsum.photos/1200/400?random=401',
    thumb: 'https://picsum.photos/200/200?random=402',
    categories: ['Voile', 'Lace', 'Polished Cotton', 'Aso Oke'],
    products: [
      { name: 'Voile Fabric', price: 'NGN 3,500', score: '4.5', count: '20', image: 'https://picsum.photos/300/300?random=23' },
      { name: 'Classic French Lace', price: 'NGN 13,500', score: '4.8', count: '17', image: 'https://picsum.photos/300/300?random=24' },
      { name: 'Polished Cotton', price: 'NGN 5,000', score: '4.6', count: '23', image: 'https://picsum.photos/300/300?random=25' }
    ]
  },
  gadgetworld: {
    name: 'Oshodi Gadget World',
    category: 'electronics',
    tagline: 'Your one-stop shop for smartphones and tablets',
    location: 'Oshodi Market, Block E, Shop 8',
    phone: '08123456789',
    followers: '1.1K+ Followers',
    heroBg: '../assets(shops)/oshodigadgetworld.png',
    thumb: '../assets(shops)/oshodigadgetworld.png',
    categories: ['Smartphones', 'Tablets', 'Powerbanks', 'Accessories', 'More Categories'],
    products: [
      { name: 'Android Smartphone 128GB', price: 'NGN 185,000', score: '4.7', count: '42', image: '../assets(items) /androidsmartphone.png' },
      { name: '10-inch Android Tablet', price: 'NGN 145,000', score: '4.6', count: '25', image: '../assets(items) /10-inchAndroidTablet.png' },
      { name: '20000mAh Powerbank', price: 'NGN 18,500', score: '4.8', count: '61', image: '../assets(items) /20000mAh Powerbank.png' },
      { name: 'Wireless Earbuds', price: 'NGN 22,000', score: '4.5', count: '38', image: 'https://picsum.photos/300/300?random=54' },
      { name: 'Phone Screen Protector Pack', price: 'NGN 3,500', score: '4.4', count: '54', image: 'https://picsum.photos/300/300?random=55' },
      { name: 'Fast Charger (65W)', price: 'NGN 12,000', score: '4.7', count: '33', image: 'https://picsum.photos/300/300?random=56' }
    ]
  },
  vibestech: {
    name: 'Vibes Tech Hub',
    category: 'electronics',
    tagline: 'Laptops, audio and smartwatches you can trust',
    location: 'Oshodi Main Market, Block B, Shop 108',
    phone: '08023456789',
    followers: '1.5K+ Followers',
    heroBg: '../assets(shops)/vibestechhub.png',
    thumb: '../assets(shops)/vibestechhub.png',
    categories: ['Laptops', 'Audio', 'Smartwatches', 'Accessories'],
    products: [
      { name: 'Core i5 Laptop 8GB/256GB', price: 'NGN 420,000', score: '4.8', count: '29', image: 'https://picsum.photos/300/300?random=61' },
      { name: 'Bluetooth Speaker', price: 'NGN 25,000', score: '4.6', count: '47', image: 'https://picsum.photos/300/300?random=62' },
      { name: 'Smartwatch Fitness Tracker', price: 'NGN 32,000', score: '4.7', count: '35', image: 'https://picsum.photos/300/300?random=63' },
      { name: 'Over-Ear Headphones', price: 'NGN 28,500', score: '4.8', count: '40', image: 'https://picsum.photos/300/300?random=64' },
      { name: 'Laptop Bag', price: 'NGN 9,500', score: '4.5', count: '22', image: 'https://picsum.photos/300/300?random=65' }
    ]
  },
  streetsmart: {
    name: 'StreetSmart Gadgets',
    category: 'electronics',
    tagline: 'Affordable accessories, earbuds and cables',
    location: 'New Oko-Oba Market, Line 6, Shop 41',
    phone: '08031234567',
    followers: '980+ Followers',
    heroBg: '../assets(shops)/streetsmartsgadgets.png',
    thumb: '../assets(shops)/streetsmartsgadgets.png',
    categories: ['Accessories', 'Earbuds', 'Cables', 'Chargers'],
    products: [
      { name: 'Wired Earphones', price: 'NGN 4,500', score: '4.5', count: '58', image: 'https://picsum.photos/300/300?random=71' },
      { name: 'USB-C Charging Cable', price: 'NGN 3,200', score: '4.6', count: '66', image: 'https://picsum.photos/300/300?random=72' },
      { name: 'Phone Case & Cover', price: 'NGN 5,000', score: '4.4', count: '49', image: 'https://picsum.photos/300/300?random=73' },
      { name: 'Car Charger (Dual Port)', price: 'NGN 6,500', score: '4.7', count: '31', image: 'https://picsum.photos/300/300?random=74' },
      { name: 'Bluetooth Earbuds', price: 'NGN 15,000', score: '4.6', count: '44', image: 'https://picsum.photos/300/300?random=75' }
    ]
  },
  phonelink: {
    name: 'PhoneLink Store',
    category: 'electronics',
    tagline: 'iPhones, Android devices and phone repairs',
    location: 'Oshodi Main Market, Block H, Shop 14',
    phone: '08012345678',
    followers: '760+ Followers',
    heroBg: '../assets(shops)/phonelink.png',
    thumb: '../assets(shops)/phonelink.png',
    categories: ['iPhones', 'Android', 'Repairs', 'Accessories'],
    products: [
      { name: 'iPhone 128GB (UK Used)', price: 'NGN 380,000', score: '4.7', count: '52', image: 'https://picsum.photos/300/300?random=81' },
      { name: 'Android Flagship 256GB', price: 'NGN 310,000', score: '4.6', count: '37', image: 'https://picsum.photos/300/300?random=82' },
      { name: 'Screen Replacement Service', price: 'NGN 25,000', score: '4.8', count: '64', image: 'https://picsum.photos/300/300?random=83' },
      { name: 'Battery Replacement Service', price: 'NGN 15,000', score: '4.7', count: '48', image: 'https://picsum.photos/300/300?random=84' },
      { name: 'Phone Charger & Cable Set', price: 'NGN 7,500', score: '4.5', count: '30', image: 'https://picsum.photos/300/300?random=85' }
    ]
  }
};

const categoryMeta = {
  fabrics: { label: 'Fabrics & Textiles', href: '../pages/fabrics.html' },
  clothing: { label: 'Clothing & Fashion', href: '../pages/clothing-fashion.html' },
  electronics: { label: 'Electronics & Gadgets', href: '../pages/electronics-gadgets.html' },
  foodstuffs: { label: 'Foodstuffs & Oils', href: '../pages/foodstuffs-oils.html' },
  accessories: { label: 'Accessories', href: '../pages/accessories.html' }
};
