// Shared subcategory + fallback product data for the category product-browsing page

// (pages/category-products.html). For 'fabrics' and 'electronics', the actual product

// grid is built dynamically from ../shops/shops-data.js so this file only supplies the

// subcategory sidebar definitions + keyword matchers for those two. For categories that

// don't yet have shop entries in shops-data.js (clothing, foodstuffs, accessories) this

// file also supplies a static list of demo products.



const categoryPageMeta = {

  fabrics: {

    title: 'Fabrics and Textiles',

    subtitle: 'Shop the best fabrics and textiles from trusted shops in Oshodi.',

    icon: '🧵',

    subcategories: [

      { key: 'ankara', label: 'Ankara Fabrics', icon: '🧵', match: ['ankara'] },

      { key: 'jonkoso', label: 'Jonkoso', icon: '🪢', match: ['jonkoso'] },

      { key: 'lana', label: 'Big & Small Lana', icon: '🧵', match: ['lana'] },

      { key: '7star', label: '7 Star', icon: '⭐', match: ['7-star', '7 star'] },

      { key: 'brushmouth', label: 'Brushmouth', icon: '🖌️', match: ['brushmouth'] },

      { key: 'checkers', label: 'Checkers', icon: '🏁', match: ['checkers'] },

      { key: 'white', label: 'White', icon: '⚪', match: ['white senator'] },

      { key: 'silk', label: 'Silk & Damask', icon: '✨', match: ['silk', 'damask', 'jacquard', 'brocade'] },

      { key: 'italianpigal', label: 'Italian Pigal', icon: '🇮🇹', match: ['italian pigal', 'pigal'] },

      { key: 'senator', label: 'Senator Materials', icon: '👔', match: ['senator'] }

    ]

  },

  clothing: {

    title: 'Clothing and Fashion',

    subtitle: 'Shop the best clothing and fashion pieces from trusted shops in Oshodi.',

    icon: '👗',

    subcategories: [

      { key: 'women', label: "Women's Wear", icon: '👗', match: ['women', 'gown'] },

      { key: 'men', label: "Men's Wear", icon: '👔', match: ['men'] },

      { key: 'unisex', label: 'Unisex Wear', icon: '👕', match: ['unisex', 'top', 'jean'] },

      { key: 'shoes', label: 'Shoes & Bags', icon: '👜', match: ['shoe', 'bag'] },

      { key: 'traditional', label: 'Traditional Wear', icon: '🥻', match: ['native', 'traditional', 'ankara'] },

      { key: 'kids', label: 'Kids Wear', icon: '🧒', match: ['kid', 'children'] },

      { key: 'jewelry', label: 'Jewelry & Accessories', icon: '💍', match: ['jewelry', 'accessor'] },

      { key: 'sport', label: 'Sportswear', icon: '👟', match: ['sport'] }

    ],

    products: [

      { name: 'Ankara Gown (Ready to Wear)', price: 'NGN 22,000', score: '4.7', count: '58', image: 'https://picsum.photos/300/300?random=501', shop: 'Naija Chic Boutique', location: 'Oshodi Market, Block F, Shop 30', tag: 'women' },

      { name: "Men's Native Senator Wear", price: 'NGN 28,000', score: '4.6', count: '41', image: 'https://picsum.photos/300/300?random=502', shop: 'Luna Fashion Hub', location: 'Oshodi Main Market, Block G, Shop 9', tag: 'traditional' },

      { name: 'Unisex Denim Jeans', price: 'NGN 12,500', score: '4.5', count: '63', image: 'https://picsum.photos/300/300?random=503', shop: 'Luna Fashion Hub', location: 'Oshodi Main Market, Block G, Shop 9', tag: 'unisex' },

      { name: 'Ladies Handbag (Leather)', price: 'NGN 15,000', score: '4.8', count: '35', image: 'https://picsum.photos/300/300?random=504', shop: 'Naija Chic Boutique', location: 'Oshodi Market, Block F, Shop 30', tag: 'shoes' },

      { name: "Kids Party Outfit", price: 'NGN 9,500', score: '4.7', count: '27', image: 'https://picsum.photos/300/300?random=505', shop: 'Naija Chic Boutique', location: 'Oshodi Market, Block F, Shop 30', tag: 'kids' },

      { name: 'Beaded Jewelry Set', price: 'NGN 6,500', score: '4.6', count: '44', image: 'https://picsum.photos/300/300?random=506', shop: 'Luna Fashion Hub', location: 'Oshodi Main Market, Block G, Shop 9', tag: 'jewelry' },

      { name: 'Sports Tracksuit', price: 'NGN 14,000', score: '4.5', count: '19', image: 'https://picsum.photos/300/300?random=507', shop: 'Naija Chic Boutique', location: 'Oshodi Market, Block F, Shop 30', tag: 'sport' },

      { name: "Women's Office Blazer", price: 'NGN 19,500', score: '4.8', count: '30', image: 'https://picsum.photos/300/300?random=508', shop: 'Luna Fashion Hub', location: 'Oshodi Main Market, Block G, Shop 9', tag: 'women' },

      { name: 'Casual Sneakers', price: 'NGN 17,000', score: '4.6', count: '38', image: 'https://picsum.photos/300/300?random=509', shop: 'Naija Chic Boutique', location: 'Oshodi Market, Block F, Shop 30', tag: 'shoes' },

      { name: "Men's Agbada Set", price: 'NGN 35,000', score: '4.9', count: '22', image: 'https://picsum.photos/300/300?random=510', shop: 'Luna Fashion Hub', location: 'Oshodi Main Market, Block G, Shop 9', tag: 'traditional' }

    ]

  },

  electronics: {

    title: 'Electronics and Gadgets',

    subtitle: 'Shop the best electronics and gadgets from trusted shops in Oshodi.',

    icon: '📱',

    subcategories: [

      { key: 'phones', label: 'Mobile Phones', icon: '📱', match: ['phone', 'iphone', 'android smartphone'] },

      { key: 'laptops', label: 'Laptop & Computers', icon: '💻', match: ['laptop', 'core i5'] },

      { key: 'tablets', label: 'Tablets', icon: '📟', match: ['tablet'] },

      { key: 'accessories', label: 'Accessories', icon: '🔌', match: ['case', 'charger', 'cable', 'screen protector', 'powerbank'] },

      { key: 'audio', label: 'Audio & Music', icon: '🎧', match: ['earbud', 'earphone', 'headphone', 'speaker'] },

      { key: 'cameras', label: 'Cameras & Photography', icon: '📷', match: ['camera'] },

      { key: 'gaming', label: 'Gaming', icon: '🎮', match: ['gaming', 'console'] },

      { key: 'watches', label: 'Smart Watches', icon: '⌚', match: ['watch', 'fitness tracker'] }

    ]

  },

  foodstuffs: {

    title: 'Foodstuffs and Oils',

    subtitle: 'Shop the best foodstuffs and oils from trusted shops in Oshodi.',

    icon: '🫒',

    subcategories: [

      { key: 'grains', label: 'Grains & Cereals', icon: '🌾', match: ['rice', 'beans', 'grain'] },

      { key: 'oils', label: 'Oils & Spices', icon: '🫙', match: ['oil', 'spice'] },

      { key: 'snacks', label: 'Snacks & Beverages', icon: '🍪', match: ['snack', 'drink', 'beverage'] },

      { key: 'produce', label: 'Fresh Produce', icon: '🥬', match: ['vegetable', 'fresh', 'produce'] },

      { key: 'frozen', label: 'Frozen Foods', icon: '🧊', match: ['frozen', 'fish', 'meat'] },

      { key: 'provisions', label: 'Provisions', icon: '🛒', match: ['provision'] },

      { key: 'bakery', label: 'Bakery Items', icon: '🍞', match: ['bread', 'bakery'] },

      { key: 'drinks', label: 'Drinks', icon: '🥤', match: ['juice', 'drink'] }

    ],

    products: [

      { name: 'Premium Rice (50kg Bag)', price: 'NGN 68,000', score: '4.7', count: '54', image: 'https://picsum.photos/300/300?random=601', shop: 'Fresh Basket Hub', location: 'Oshodi Main Market, Block J, Shop 6', tag: 'grains' },

      { name: 'Vegetable Oil (25L Keg)', price: 'NGN 42,000', score: '4.8', count: '61', image: 'https://picsum.photos/300/300?random=602', shop: 'Oshodi Food Mart', location: 'Oshodi Market, Block K, Shop 12', tag: 'oils' },

      { name: 'Assorted Spices Pack', price: 'NGN 5,500', score: '4.6', count: '38', image: 'https://picsum.photos/300/300?random=603', shop: 'Oshodi Food Mart', location: 'Oshodi Market, Block K, Shop 12', tag: 'oils' },

      { name: 'Brown Beans (10kg)', price: 'NGN 15,000', score: '4.7', count: '29', image: 'https://picsum.photos/300/300?random=604', shop: 'Fresh Basket Hub', location: 'Oshodi Main Market, Block J, Shop 6', tag: 'grains' },

      { name: 'Fresh Tomatoes (Basket)', price: 'NGN 8,000', score: '4.5', count: '22', image: 'https://picsum.photos/300/300?random=605', shop: 'Fresh Basket Hub', location: 'Oshodi Main Market, Block J, Shop 6', tag: 'produce' },

      { name: 'Frozen Chicken (Carton)', price: 'NGN 32,000', score: '4.8', count: '46', image: 'https://picsum.photos/300/300?random=606', shop: 'Oshodi Food Mart', location: 'Oshodi Market, Block K, Shop 12', tag: 'frozen' },

      { name: 'Assorted Snack Pack', price: 'NGN 4,500', score: '4.6', count: '33', image: 'https://picsum.photos/300/300?random=607', shop: 'Fresh Basket Hub', location: 'Oshodi Main Market, Block J, Shop 6', tag: 'snacks' },

      { name: 'Bottled Fruit Juice (Crate)', price: 'NGN 9,000', score: '4.7', count: '27', image: 'https://picsum.photos/300/300?random=608', shop: 'Oshodi Food Mart', location: 'Oshodi Market, Block K, Shop 12', tag: 'drinks' }

    ]

  },

  accessories: {

    title: 'Accessories',

    subtitle: 'Shop the best fashion accessories from trusted shops in Oshodi.',

    icon: '👜',

    subcategories: [

      { key: 'jewelry', label: 'Jewelry', icon: '💍', match: ['earring', 'necklace', 'ring', 'jewelry'] },

      { key: 'bags', label: 'Bags & Wallets', icon: '👜', match: ['bag', 'wallet'] },

      { key: 'belts', label: 'Belts', icon: '🎗️', match: ['belt'] },

      { key: 'sunglasses', label: 'Sunglasses', icon: '🕶️', match: ['sunglass', 'glasses'] },

      { key: 'watches', label: 'Watches', icon: '⌚', match: ['watch'] },

      { key: 'hair', label: 'Hair Accessories', icon: '🎀', match: ['hair'] },

      { key: 'scarves', label: 'Scarves', icon: '🧣', match: ['scarf', 'scarves'] },

      { key: 'perfumes', label: 'Perfumes', icon: '🧴', match: ['perfume'] }

    ],

    products: [

      { name: 'Gold Plated Earrings', price: 'NGN 6,500', score: '4.7', count: '48', image: 'https://picsum.photos/300/300?random=701', shop: 'Glitzglow Accessories', location: 'Oshodi Market, Block O, Shop 11', tag: 'jewelry' },

      { name: 'Beaded Necklace Set', price: 'NGN 8,000', score: '4.6', count: '35', image: 'https://picsum.photos/300/300?random=702', shop: 'Glitzglow Accessories', location: 'Oshodi Market, Block O, Shop 11', tag: 'jewelry' },

      { name: 'Leather Wallet', price: 'NGN 7,500', score: '4.8', count: '29', image: 'https://picsum.photos/300/300?random=703', shop: 'Pearl Addons', location: 'Oshodi Main Market, Block P, Shop 3', tag: 'bags' },

      { name: 'Designer Sunglasses', price: 'NGN 11,000', score: '4.5', count: '21', image: 'https://picsum.photos/300/300?random=704', shop: 'Pearl Addons', location: 'Oshodi Main Market, Block P, Shop 3', tag: 'sunglasses' },

      { name: "Women's Analog Watch", price: 'NGN 18,500', score: '4.7', count: '33', image: 'https://picsum.photos/300/300?random=705', shop: 'Glitzglow Accessories', location: 'Oshodi Market, Block O, Shop 11', tag: 'watches' },

      { name: 'Silk Scarf', price: 'NGN 5,000', score: '4.6', count: '18', image: 'https://picsum.photos/300/300?random=706', shop: 'Pearl Addons', location: 'Oshodi Main Market, Block P, Shop 3', tag: 'scarves' },

      { name: 'Leather Belt', price: 'NGN 4,500', score: '4.5', count: '24', image: 'https://picsum.photos/300/300?random=707', shop: 'Glitzglow Accessories', location: 'Oshodi Market, Block O, Shop 11', tag: 'belts' },

      { name: 'Unisex Perfume (50ml)', price: 'NGN 13,000', score: '4.8', count: '40', image: 'https://picsum.photos/300/300?random=708', shop: 'Pearl Addons', location: 'Oshodi Main Market, Block P, Shop 3', tag: 'perfumes' }

    ]

  }

};

