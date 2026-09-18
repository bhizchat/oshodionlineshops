// Shared subcategory + fallback product data for the category product-browsing page

// (pages/category-products.html). For 'fabrics' and 'electronics', the actual product

// grid is built dynamically from ../shops/shops-data.js so this file only supplies the

// subcategory sidebar definitions + keyword matchers for those two. For categories that

// don't yet have shop entries in shops-data.js (clothing, foodstuffs, accessories) this

// file also supplies a static list of demo products.

//

// IMPORTANT: for clothing/foodstuffs/accessories, the `products` array below is the

// SINGLE SOURCE OF TRUTH used by category-products.html, shops/shops.html, and

// shops/product.html (which read it via categoryPageMeta at runtime). To add a new

// product for one of these categories, add it to the relevant array here only — it

// will automatically show up everywhere and get a stable index so its reviews persist

// correctly.



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

      { name: 'Unisex Denim Jeans', price: 'NGN 12,500', score: '4.5', count: '3', image: '../assets(items) /Clothing/unisexdeminjeans.jpeg', shop: 'Luna Fashion Hub', location: 'Oshodi Main Market, Block G, Shop 9', tag: 'unisex' },

      { name: 'Ladies Handbag (Leather)', price: 'NGN 15,000', score: '4.8', count: '4', image: '../assets(items) /Clothing/ladieshandbag.jpeg', shop: 'Naija Chic Boutique', location: 'Oshodi Market, Block F, Shop 30', tag: 'shoes' },

      { name: 'Beaded Jewelry Set', price: 'NGN 6,500', score: '4.6', count: '5', image: '../assets(items) /Clothing/beadedjewelryset.jpeg', shop: 'Luna Fashion Hub', location: 'Oshodi Main Market, Block G, Shop 9', tag: 'jewelry' },

      { name: 'Sports Tracksuit', price: 'NGN 14,000', score: '4.5', count: '3', image: '../assets(items) /Clothing/sportstracksuit.jpeg', shop: 'Naija Chic Boutique', location: 'Oshodi Market, Block F, Shop 30', tag: 'sport' },

      { name: 'Casual Sneakers', price: 'NGN 17,000', score: '4.6', count: '4', image: '../assets(items) /Clothing/casualsneakers.jpeg', shop: 'Naija Chic Boutique', location: 'Oshodi Market, Block F, Shop 30', tag: 'shoes' }

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

      { name: 'Premium Rice (50kg Bag)', price: 'NGN 68,000', score: '4.7', count: '5', image: '../assets(items) /Foodstuffs/PremiumRice (50kg Bag).jpeg', shop: 'Fresh Basket Hub', location: 'Oshodi Main Market, Block J, Shop 6', tag: 'grains' },

      { name: 'Vegetable Oil (25L Keg)', price: 'NGN 42,000', score: '4.8', count: '3', image: '../assets(items) /Foodstuffs/VegetableOil (25L Keg).jpeg', shop: 'Oshodi Food Mart', location: 'Oshodi Market, Block K, Shop 12', tag: 'oils' },

      { name: 'Assorted Spices Pack', price: 'NGN 5,500', score: '4.6', count: '4', image: '../assets(items) /Foodstuffs/assortedspicespack.jpeg', shop: 'Oshodi Food Mart', location: 'Oshodi Market, Block K, Shop 12', tag: 'oils' },

      { name: 'Brown Beans (10kg)', price: 'NGN 15,000', score: '4.7', count: '5', image: '../assets(items) /Foodstuffs/brownbeans(10kg).jpeg', shop: 'Fresh Basket Hub', location: 'Oshodi Main Market, Block J, Shop 6', tag: 'grains' },

      { name: 'Bottled Fruit Juice', price: 'NGN 9,000', score: '4.7', count: '3', image: '../assets(items) /Foodstuffs/BottledFruitJuice.jpeg', shop: 'Oshodi Food Mart', location: 'Oshodi Market, Block K, Shop 12', tag: 'drinks' }

    ]

  },

  accessories: {

    title: 'Clothing Accessories',

    subtitle: 'Shop the best clothing accessories, fashion add-ons, and sewing & tailoring supplies from trusted shops in Oshodi.',

    icon: '👜',

    subcategories: [

      { key: 'jewelry', label: 'Jewelry', icon: '💍', match: ['earring', 'necklace', 'ring', 'jewelry'] },

      { key: 'bags', label: 'Bags & Wallets', icon: '👜', match: ['bag', 'wallet'] },

      { key: 'belts', label: 'Belts', icon: '🎗️', match: ['belt'] },

      { key: 'sunglasses', label: 'Sunglasses', icon: '🕶️', match: ['sunglass', 'glasses'] },

      { key: 'watches', label: 'Watches', icon: '⌚', match: ['watch'] },

      { key: 'hair', label: 'Hair Accessories', icon: '🎀', match: ['hair'] },

      { key: 'scarves', label: 'Scarves', icon: '🧣', match: ['scarf', 'scarves'] },

      { key: 'perfumes', label: 'Perfumes', icon: '🧴', match: ['perfume'] },

      { key: 'sewing', label: 'Sewing & Tailoring Supplies', icon: '🧵', match: ['thread', 'needle', 'zipper', 'button', 'interfacing', 'lining', 'sewing', 'tailoring', 'measuring tape', 'pin', 'scissors'] }

    ],

    products: [

      { name: 'Gold Plated Earrings', price: 'NGN 6,500', score: '4.7', count: '4', image: '../assets(items) /Accessories/goldplatedearrings.jpeg', shop: 'Glitzglow Accessories', location: 'Oshodi Market, Block O, Shop 11', tag: 'jewelry' },

      { name: 'Leather Wallet', price: 'NGN 7,500', score: '4.8', count: '5', image: '../assets(items) /Accessories/leatherwallet.jpeg', shop: 'Pearl Addons', location: 'Oshodi Main Market, Block P, Shop 3', tag: 'bags' },

      { name: 'Designer Sunglasses', price: 'NGN 11,000', score: '4.5', count: '3', image: '../assets(items) /Accessories/desigersunglasses.jpeg', shop: 'Pearl Addons', location: 'Oshodi Main Market, Block P, Shop 3', tag: 'sunglasses' },

      { name: 'Silk Scarf', price: 'NGN 5,000', score: '4.6', count: '4', image: '../assets(items) /Accessories/silkscarf.jpeg', shop: 'Pearl Addons', location: 'Oshodi Main Market, Block P, Shop 3', tag: 'scarves' },

      { name: 'Leather Belt', price: 'NGN 4,500', score: '4.5', count: '5', image: '../assets(items) /Accessories/leatherbelt.jpeg', shop: 'Glitzglow Accessories', location: 'Oshodi Market, Block O, Shop 11', tag: 'belts' },

      { name: 'Unisex Perfume (50ml)', price: 'NGN 13,000', score: '4.8', count: '3', image: '../assets(items) /Accessories/unisexperfume.jpeg', shop: 'Pearl Addons', location: 'Oshodi Main Market, Block P, Shop 3', tag: 'perfumes' }

    ]

  },

  shoesbags: {

    title: 'Shoes and Bags',

    subtitle: 'Shop the best shoes and bags from trusted shops in Oshodi.',

    icon: '👞',

    subcategories: [

      { key: 'mens-shoes', label: "Men's Shoes", icon: '👞', match: ['men shoe', "men's shoe"] },

      { key: 'womens-shoes', label: "Women's Shoes", icon: '👠', match: ['women shoe', "women's shoe", 'heels'] },

      { key: 'sneakers', label: 'Sneakers', icon: '👟', match: ['sneaker'] },

      { key: 'handbags', label: 'Handbags', icon: '👜', match: ['handbag'] },

      { key: 'backpacks', label: 'Backpacks & Luggage', icon: '🎒', match: ['backpack', 'luggage', 'travel bag'] },

      { key: 'slippers', label: 'Slippers & Sandals', icon: '🩴', match: ['slipper', 'sandal'] }

    ]

  },

  beauty: {

    title: 'Beauty and Cosmetics',

    subtitle: 'Shop the best beauty and cosmetics products from trusted shops in Oshodi.',

    icon: '💄',

    subcategories: [

      { key: 'skincare', label: 'Skincare', icon: '🧴', match: ['skincare', 'cream', 'lotion'] },

      { key: 'makeup', label: 'Makeup', icon: '💄', match: ['makeup', 'lipstick', 'foundation'] },

      { key: 'haircare', label: 'Haircare & Wigs', icon: '💇🏾‍♀️', match: ['hair', 'wig', 'weave'] },

      { key: 'fragrances', label: 'Fragrances', icon: '🌸', match: ['perfume', 'fragrance', 'cologne'] },

      { key: 'soaps', label: 'Soaps & Body Care', icon: '🧼', match: ['soap', 'body care'] },

      { key: 'tools', label: 'Beauty Tools', icon: '🪞', match: ['brush', 'mirror', 'tool'] }

    ]

  },

  home: {

    title: 'Home and Kitchenware',

    subtitle: 'Shop the best home and kitchenware items from trusted shops in Oshodi.',

    icon: '🍳',

    subcategories: [

      { key: 'cookware', label: 'Cookware & Pots', icon: '🍳', match: ['pot', 'pan', 'cookware'] },

      { key: 'cutlery', label: 'Cutlery & Utensils', icon: '🍽️', match: ['cutlery', 'utensil', 'spoon', 'plate'] },

      { key: 'storage', label: 'Storage & Containers', icon: '🧺', match: ['storage', 'container'] },

      { key: 'decor', label: 'Home Decor', icon: '🖼️', match: ['decor', 'curtain', 'rug'] },

      { key: 'cleaning', label: 'Cleaning Supplies', icon: '🧹', match: ['cleaning', 'detergent', 'broom'] },

      { key: 'appliances', label: 'Small Appliances', icon: '🔌', match: ['blender', 'kettle', 'appliance'] }

    ]

  },

  furniture: {

    title: 'Furniture and Decor',

    subtitle: 'Shop the best furniture and decor pieces from trusted shops in Oshodi.',

    icon: '🛋️',

    subcategories: [

      { key: 'sofas', label: 'Sofas & Chairs', icon: '🛋️', match: ['sofa', 'chair'] },

      { key: 'tables', label: 'Tables & Desks', icon: '🪑', match: ['table', 'desk'] },

      { key: 'beds', label: 'Beds & Mattresses', icon: '🛏️', match: ['bed', 'mattress'] },

      { key: 'wardrobes', label: 'Wardrobes & Shelves', icon: '🗄️', match: ['wardrobe', 'shelf', 'cabinet'] },

      { key: 'decor', label: 'Decor & Art', icon: '🖼️', match: ['decor', 'art', 'mirror'] }

    ]

  },

  building: {

    title: 'Building Materials & Accessories',

    subtitle: 'Shop the best building materials, construction supplies and building accessories from trusted shops in Oshodi.',

    icon: '🧱',

    subcategories: [

      { key: 'cement', label: 'Cement & Blocks', icon: '🧱', match: ['cement', 'block'] },

      { key: 'tools', label: 'Tools & Hardware', icon: '🔨', match: ['tool', 'hardware', 'hammer'] },

      { key: 'plumbing', label: 'Plumbing & Pipes', icon: '🚰', match: ['pipe', 'plumbing'] },

      { key: 'electrical', label: 'Electrical Supplies', icon: '💡', match: ['wire', 'cable', 'electrical'] },

      { key: 'paint', label: 'Paints & Finishes', icon: '🎨', match: ['paint'] },

      { key: 'fasteners', label: 'Fasteners & Fittings', icon: '🔩', match: ['nail', 'bolt', 'nut', 'screw', 'fastener', 'fitting'] },

      { key: 'locks', label: 'Locks & Hinges', icon: '🔒', match: ['lock', 'hinge', 'padlock', 'handle'] },

      { key: 'ladders', label: 'Ladders & Wheelbarrows', icon: '🪜', match: ['ladder', 'wheelbarrow', 'scaffold'] },

      { key: 'safety', label: 'Safety Equipment', icon: '🦺', match: ['safety', 'helmet', 'glove', 'goggle'] }

    ]

  },

  babykids: {

    title: 'Baby and Kids',

    subtitle: 'Shop the best baby and kids products from trusted shops in Oshodi.',

    icon: '🍼',

    subcategories: [

      { key: 'clothing', label: "Baby & Kids Clothing", icon: '👶', match: ['baby cloth', 'kid cloth'] },

      { key: 'feeding', label: 'Feeding & Nursing', icon: '🍼', match: ['feeding', 'bottle', 'nursing'] },

      { key: 'diapers', label: 'Diapers & Wipes', icon: '🧷', match: ['diaper', 'wipe'] },

      { key: 'toys', label: 'Baby Toys', icon: '🧸', match: ['toy'] },

      { key: 'strollers', label: 'Strollers & Carriers', icon: '👶', match: ['stroller', 'carrier'] }

    ]

  },

  automotive: {

    title: 'Automotive Parts',

    subtitle: 'Shop the best automotive parts and accessories from trusted shops in Oshodi.',

    icon: '🚗',

    subcategories: [

      { key: 'engine', label: 'Engine Parts', icon: '⚙️', match: ['engine', 'part'] },

      { key: 'tyres', label: 'Tyres & Wheels', icon: '🛞', match: ['tyre', 'tire', 'wheel'] },

      { key: 'batteries', label: 'Batteries', icon: '🔋', match: ['battery'] },

      { key: 'accessories', label: 'Car Accessories', icon: '🚙', match: ['car accessor'] },

      { key: 'lubricants', label: 'Oils & Lubricants', icon: '🛢️', match: ['lubricant', 'engine oil'] }

    ]

  },

  booksstationery: {

    title: 'Books and Stationery',

    subtitle: 'Shop the best books and stationery items from trusted shops in Oshodi.',

    icon: '📚',

    subcategories: [

      { key: 'textbooks', label: 'Textbooks', icon: '📖', match: ['textbook', 'book'] },

      { key: 'notebooks', label: 'Notebooks & Paper', icon: '📓', match: ['notebook', 'paper'] },

      { key: 'writing', label: 'Pens & Writing', icon: '🖊️', match: ['pen', 'pencil'] },

      { key: 'office', label: 'Office Stationery', icon: '📎', match: ['stationery', 'office'] },

      { key: 'art', label: 'Art Supplies', icon: '🎨', match: ['art', 'craft'] }

    ]

  },

  toysgames: {

    title: 'Toys and Games',

    subtitle: 'Shop the best toys and games from trusted shops in Oshodi.',

    icon: '🧸',

    subcategories: [

      { key: 'action', label: 'Action Figures', icon: '🤖', match: ['action figure', 'figure'] },

      { key: 'dolls', label: 'Dolls & Playsets', icon: '🪆', match: ['doll', 'playset'] },

      { key: 'board', label: 'Board Games & Puzzles', icon: '🧩', match: ['board game', 'puzzle'] },

      { key: 'outdoor', label: 'Outdoor Toys', icon: '🪁', match: ['outdoor toy', 'kite'] },

      { key: 'educational', label: 'Educational Toys', icon: '🧮', match: ['educational'] }

    ]

  },

  health: {

    title: 'Health and Wellness',

    subtitle: 'Shop the best health and wellness products from trusted shops in Oshodi.',

    icon: '💊',

    subcategories: [

      { key: 'supplements', label: 'Supplements & Vitamins', icon: '💊', match: ['supplement', 'vitamin'] },

      { key: 'firstaid', label: 'First Aid', icon: '🩹', match: ['first aid', 'bandage'] },

      { key: 'fitness', label: 'Fitness & Wellness', icon: '🧘🏾‍♀️', match: ['fitness', 'wellness', 'yoga'] },

      { key: 'personalcare', label: 'Personal Care', icon: '🧴', match: ['personal care'] },

      { key: 'medical', label: 'Medical Devices', icon: '🩺', match: ['medical', 'thermometer'] }

    ]

  },

  sports: {

    title: 'Sports and Fitness',

    subtitle: 'Shop the best sports and fitness gear from trusted shops in Oshodi.',

    icon: '🏋️',

    subcategories: [

      { key: 'gymequipment', label: 'Gym Equipment', icon: '🏋️', match: ['gym', 'weight', 'dumbbell'] },

      { key: 'teamsports', label: 'Team Sports', icon: '⚽', match: ['football', 'basketball', 'jersey'] },

      { key: 'fitnessgear', label: 'Fitness Gear', icon: '🤸🏾', match: ['fitness gear', 'resistance band'] },

      { key: 'outdoorsports', label: 'Outdoor & Camping', icon: '🏕️', match: ['camping', 'outdoor'] },

      { key: 'sportswear', label: 'Sportswear', icon: '👟', match: ['sportswear', 'jersey'] }

    ]

  },

  petsupplies: {

    title: 'Pet Supplies',

    subtitle: 'Shop the best pet food and supplies from trusted shops in Oshodi.',

    icon: '🐾',

    subcategories: [

      { key: 'petfood', label: 'Pet Food', icon: '🥫', match: ['pet food', 'dog food', 'cat food'] },

      { key: 'accessories', label: 'Pet Accessories', icon: '🦴', match: ['leash', 'collar', 'pet accessor'] },

      { key: 'grooming', label: 'Pet Grooming', icon: '🧼', match: ['grooming'] },

      { key: 'housing', label: 'Cages & Housing', icon: '🏠', match: ['cage', 'housing'] }

    ]

  },

  officesupplies: {

    title: 'Office Supplies',

    subtitle: 'Shop the best office supplies and equipment from trusted shops in Oshodi.',

    icon: '🖇️',

    subcategories: [

      { key: 'stationery', label: 'Stationery', icon: '📎', match: ['stationery'] },

      { key: 'furniture', label: 'Office Furniture', icon: '🪑', match: ['office chair', 'office desk'] },

      { key: 'equipment', label: 'Printers & Equipment', icon: '🖨️', match: ['printer', 'equipment'] },

      { key: 'storage', label: 'Filing & Storage', icon: '🗄️', match: ['filing', 'storage'] }

    ]

  },

  partyevents: {

    title: 'Party and Events',

    subtitle: 'Shop the best party and event supplies from trusted shops in Oshodi.',

    icon: '🎉',

    subcategories: [

      { key: 'decorations', label: 'Decorations & Balloons', icon: '🎈', match: ['balloon', 'decoration'] },

      { key: 'partyware', label: 'Partyware', icon: '🥤', match: ['partyware', 'cup', 'plate'] },

      { key: 'gifts', label: 'Gifts & Souvenirs', icon: '🎁', match: ['gift', 'souvenir'] },

      { key: 'rentals', label: 'Canopies & Rentals', icon: '⛺', match: ['canopy', 'rental', 'chair rental'] }

    ]

  },

  gardenoutdoor: {

    title: 'Garden and Outdoor',

    subtitle: 'Shop the best garden and outdoor essentials from trusted shops in Oshodi.',

    icon: '🌳',

    subcategories: [

      { key: 'plants', label: 'Plants & Seeds', icon: '🌱', match: ['plant', 'seed'] },

      { key: 'tools', label: 'Garden Tools', icon: '🛠️', match: ['garden tool', 'rake', 'shovel'] },

      { key: 'furniture', label: 'Outdoor Furniture', icon: '🪑', match: ['outdoor furniture', 'patio'] },

      { key: 'grills', label: 'Grills & BBQ', icon: '🍖', match: ['grill', 'bbq'] }

    ]

  }

};

