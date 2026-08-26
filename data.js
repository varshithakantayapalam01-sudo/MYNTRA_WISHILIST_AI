// ============================================================
// Myntra Wishlist Decision Assistant — Mock Data Layer
// ============================================================

const PRODUCTS = [
  {
    id: "SKU001",
    name: "Floral Print Maxi Dress",
    brand: "Anouk",
    category: "Dresses",
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    rating: 4.3,
    reviewCount: 1247,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=520&fit=crop&q=80",
    sizes: ["XS", "S", "M", "L", "XL"],
    sizesInStock: ["S", "M", "L", "XL"],
    deliveryDays: 3,
    returnDays: 30,
    description: "A stunning floral print maxi dress perfect for brunches and casual outings. Features a flattering A-line silhouette with adjustable tie-up waist.",
    fabric: "Viscose Rayon",
    fitType: "Regular Fit"
  },
  {
    id: "SKU002",
    name: "Classic Denim Jacket",
    brand: "Roadster",
    category: "Jackets",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.1,
    reviewCount: 893,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=520&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizesInStock: ["M", "L", "XL"],
    deliveryDays: 4,
    returnDays: 30,
    description: "A timeless denim jacket with a relaxed fit. Perfect for layering over tees and dresses during cooler evenings.",
    fabric: "100% Cotton Denim",
    fitType: "Relaxed Fit"
  },
  {
    id: "SKU003",
    name: "White Chunky Sneakers",
    brand: "HRX by Hrithik Roshan",
    category: "Footwear",
    price: 1899,
    originalPrice: 3499,
    discount: 46,
    rating: 4.5,
    reviewCount: 2103,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=520&fit=crop&q=80",
    sizes: ["UK6", "UK7", "UK8", "UK9", "UK10"],
    sizesInStock: ["UK6", "UK7", "UK8", "UK9", "UK10"],
    deliveryDays: 2,
    returnDays: 30,
    description: "Trendy white chunky sneakers with premium cushioning. Pairs well with jeans, joggers, and casual dresses.",
    fabric: "Synthetic Leather Upper",
    fitType: "True to Size"
  },
  {
    id: "SKU004",
    name: "Embroidered Anarkali Kurta Set",
    brand: "Biba",
    category: "Ethnic Wear",
    price: 2199,
    originalPrice: 3999,
    discount: 45,
    rating: 4.4,
    reviewCount: 678,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=520&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizesInStock: ["S", "M", "L"],
    deliveryDays: 5,
    returnDays: 30,
    description: "Elegant embroidered anarkali kurta set with dupatta. Ideal for festive occasions and family gatherings.",
    fabric: "Cotton Blend",
    fitType: "Flared Fit"
  },
  {
    id: "SKU005",
    name: "Structured Leather Tote Bag",
    brand: "Lavie",
    category: "Bags",
    price: 1799,
    originalPrice: 2899,
    discount: 38,
    rating: 4.0,
    reviewCount: 412,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=520&fit=crop&q=80",
    sizes: ["One Size"],
    sizesInStock: ["One Size"],
    deliveryDays: 3,
    returnDays: 15,
    description: "A chic structured tote bag in classic black. Features multiple compartments, zip closure, and adjustable strap.",
    fabric: "Faux Leather",
    fitType: "N/A"
  },
  {
    id: "SKU006",
    name: "Oversized Graphic T-Shirt",
    brand: "Bewakoof",
    category: "T-Shirts",
    price: 599,
    originalPrice: 999,
    discount: 40,
    rating: 4.2,
    reviewCount: 3456,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=520&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizesInStock: ["S", "M", "L", "XL", "XXL"],
    deliveryDays: 2,
    returnDays: 30,
    description: "Trendy oversized graphic tee in premium cotton. Features bold front print and drop-shoulder design.",
    fabric: "100% Cotton",
    fitType: "Oversized Fit"
  },
  {
    id: "SKU007",
    name: "Slim Fit Formal Shirt",
    brand: "Allen Solly",
    category: "Shirts",
    price: 1099,
    originalPrice: 1799,
    discount: 39,
    rating: 4.3,
    reviewCount: 1564,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=520&fit=crop&q=80",
    sizes: ["38", "39", "40", "42", "44"],
    sizesInStock: ["39", "40", "42"],
    deliveryDays: 3,
    returnDays: 30,
    description: "A crisp slim-fit formal shirt in sky blue. Ideal for office wear and formal events with wrinkle-resistant fabric.",
    fabric: "Cotton Blend",
    fitType: "Slim Fit"
  },
  {
    id: "SKU008",
    name: "Performance Running Shoes",
    brand: "Nike",
    category: "Footwear",
    price: 4995,
    originalPrice: 7495,
    discount: 33,
    rating: 4.6,
    reviewCount: 987,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=520&fit=crop&q=80",
    sizes: ["UK7", "UK8", "UK9", "UK10", "UK11"],
    sizesInStock: ["UK8", "UK9", "UK10"],
    deliveryDays: 4,
    returnDays: 30,
    description: "Lightweight running shoes with responsive cushioning and breathable mesh upper. Engineered for comfort during long runs.",
    fabric: "Mesh Upper, Rubber Sole",
    fitType: "True to Size"
  },
  {
    id: "SKU009",
    name: "Banarasi Silk Saree",
    brand: "Saree Mall",
    category: "Ethnic Wear",
    price: 3499,
    originalPrice: 6999,
    discount: 50,
    rating: 4.5,
    reviewCount: 321,
    image: "https://images.unsplash.com/photo-1610189019599-3f0f31875e5b?w=400&h=520&fit=crop&q=80",
    sizes: ["Free Size"],
    sizesInStock: ["Free Size"],
    deliveryDays: 6,
    returnDays: 15,
    description: "Exquisite Banarasi silk saree with rich zari weaving. A timeless piece for weddings and special occasions.",
    fabric: "Pure Silk",
    fitType: "Free Size"
  },
  {
    id: "SKU010",
    name: "Cotton Chino Shorts",
    brand: "H&M",
    category: "Shorts",
    price: 799,
    originalPrice: 1299,
    discount: 38,
    rating: 4.1,
    reviewCount: 756,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=520&fit=crop&q=80",
    sizes: ["28", "30", "32", "34", "36"],
    sizesInStock: ["28", "30", "32", "34"],
    deliveryDays: 3,
    returnDays: 30,
    description: "Comfortable cotton chino shorts with a relaxed fit. Perfect for weekend outings and casual days.",
    fabric: "98% Cotton, 2% Elastane",
    fitType: "Regular Fit"
  },
  {
    id: "SKU011",
    name: "Embellished Block Heels",
    brand: "Metro",
    category: "Footwear",
    price: 1599,
    originalPrice: 2499,
    discount: 36,
    rating: 3.9,
    reviewCount: 289,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=520&fit=crop&q=80",
    sizes: ["UK3", "UK4", "UK5", "UK6", "UK7"],
    sizesInStock: ["UK4", "UK5", "UK6"],
    deliveryDays: 4,
    returnDays: 15,
    description: "Elegant embellished block heels with cushioned insole. Perfect for parties and festive occasions.",
    fabric: "Synthetic Upper",
    fitType: "Slightly Narrow"
  },
  {
    id: "SKU012",
    name: "Printed Palazzo Pants",
    brand: "W",
    category: "Bottoms",
    price: 899,
    originalPrice: 1499,
    discount: 40,
    rating: 4.2,
    reviewCount: 534,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=520&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL"],
    sizesInStock: ["S", "M", "L", "XL"],
    deliveryDays: 3,
    returnDays: 30,
    description: "Flowy printed palazzo pants in vibrant colours. Elastic waistband for all-day comfort.",
    fabric: "Rayon",
    fitType: "Relaxed Fit"
  }
];

// ============================================================
// Mock Reviews Database
// ============================================================

const REVIEWS = [
  // --- SKU001 (Floral Print Maxi Dress) ---
  { id: "r001", productId: "SKU001", userName: "Priya S.", rating: 5, verified: true, date: "2026-07-15", title: "Absolutely love this dress!", text: "The fabric is so soft and flowy. Wore it to a brunch and got so many compliments. The floral print is exactly as shown. Worth every penny!", tags: { fit: "Perfect Fit", quality: "Excellent", colourAccuracy: "Exact Match", fabric: "Soft & Flowy" }, photos: 2 },
  { id: "r002", productId: "SKU001", userName: "Ananya M.", rating: 4, verified: true, date: "2026-07-10", title: "Beautiful but runs slightly long", text: "Gorgeous dress. The material quality is great. Only issue is it runs a bit long for petite frames. Got it altered and now it's perfect.", tags: { fit: "Runs Long", quality: "Good", colourAccuracy: "Exact Match", fabric: "Good Quality" }, photos: 1 },
  { id: "r003", productId: "SKU001", userName: "Ritika K.", rating: 4, verified: true, date: "2026-06-28", title: "Great for summer", text: "Light and breathable. Perfect for Indian summers. The tie-up waist is a nice touch. Colour is vibrant even after washing.", tags: { fit: "True to Size", quality: "Good", colourAccuracy: "Vibrant", fabric: "Breathable" }, photos: 0 },
  { id: "r004", productId: "SKU001", userName: "Meera J.", rating: 5, verified: true, date: "2026-06-20", title: "Best purchase this season", text: "I've been eyeing this for weeks. Finally bought it on sale and it exceeded expectations. The A-line cut is flattering on all body types.", tags: { fit: "Flattering", quality: "Premium", colourAccuracy: "As Shown", fabric: "Soft" }, photos: 3 },
  { id: "r005", productId: "SKU001", userName: "Divya R.", rating: 3, verified: true, date: "2026-06-15", title: "Good but wrinkles easily", text: "Pretty dress but viscose rayon wrinkles very easily. Need to iron before every wear. Otherwise the design and fit are nice.", tags: { fit: "True to Size", quality: "Average", colourAccuracy: "Slightly Different", fabric: "Wrinkles Easily" }, photos: 0 },

  // --- SKU002 (Classic Denim Jacket) ---
  { id: "r006", productId: "SKU002", userName: "Rahul T.", rating: 4, verified: true, date: "2026-07-18", title: "Solid denim jacket", text: "Good quality denim, sturdy buttons. Fits well over t-shirts. The wash colour is nice. Only complaint — slightly stiff initially.", tags: { fit: "True to Size", quality: "Good", colourAccuracy: "As Shown", fabric: "Sturdy Denim" }, photos: 1 },
  { id: "r007", productId: "SKU002", userName: "Karan P.", rating: 4, verified: true, date: "2026-07-05", title: "Great layering piece", text: "Perfect for evening outings. Goes with everything. The relaxed fit is comfortable. Arm length is slightly long for medium.", tags: { fit: "Slightly Long Arms", quality: "Good", colourAccuracy: "Exact Match", fabric: "Heavy Denim" }, photos: 0 },
  { id: "r008", productId: "SKU002", userName: "Sneha D.", rating: 5, verified: true, date: "2026-06-22", title: "Love the vintage feel", text: "Has that perfect worn-in vintage look. Paired it with a white dress and it looked amazing. Quality at this price is unbeatable.", tags: { fit: "Perfect Fit", quality: "Excellent", colourAccuracy: "As Shown", fabric: "Premium Feel" }, photos: 2 },
  { id: "r009", productId: "SKU002", userName: "Arjun V.", rating: 3, verified: true, date: "2026-06-10", title: "Decent for the price", text: "It's okay for the price. Denim feels a bit thin compared to premium brands. Stitching could be better in some places.", tags: { fit: "True to Size", quality: "Average", colourAccuracy: "Slightly Lighter", fabric: "Thin Denim" }, photos: 0 },

  // --- SKU003 (White Chunky Sneakers) ---
  { id: "r010", productId: "SKU003", userName: "Vikram S.", rating: 5, verified: true, date: "2026-08-01", title: "Best sneakers I've owned!", text: "Incredibly comfortable. Walked 10km in these with zero discomfort. The chunky sole gives great height. True to size.", tags: { fit: "True to Size", quality: "Excellent", colourAccuracy: "Bright White", fabric: "Premium Build" }, photos: 2 },
  { id: "r011", productId: "SKU003", userName: "Aisha N.", rating: 5, verified: true, date: "2026-07-25", title: "Stylish and comfy", text: "These go with literally everything. The cushioning is amazing. Only concern is keeping white clean but that's expected.", tags: { fit: "Perfect Fit", quality: "Excellent", colourAccuracy: "As Shown", fabric: "Good Material" }, photos: 1 },
  { id: "r012", productId: "SKU003", userName: "Rohit K.", rating: 4, verified: true, date: "2026-07-15", title: "Great value for money", text: "At this price point, these are fantastic. Comfortable right out of the box. The design is trendy without being over the top.", tags: { fit: "True to Size", quality: "Good", colourAccuracy: "As Shown", fabric: "Synthetic but Good" }, photos: 0 },
  { id: "r013", productId: "SKU003", userName: "Neha G.", rating: 4, verified: true, date: "2026-07-01", title: "Daily wear approved", text: "Using these as my daily sneakers. Very comfortable for long hours. Minor scuffing after a month but sole cushion is still great.", tags: { fit: "True to Size", quality: "Good", colourAccuracy: "Exact Match", fabric: "Durable" }, photos: 1 },

  // --- SKU004 (Embroidered Anarkali Kurta Set) ---
  { id: "r014", productId: "SKU004", userName: "Kavita B.", rating: 5, verified: true, date: "2026-07-20", title: "Gorgeous for festive season", text: "The embroidery work is intricate and beautiful. Fabric is comfortable even in heat. Got so many compliments at a family wedding!", tags: { fit: "True to Size", quality: "Excellent", colourAccuracy: "Vibrant", fabric: "Breathable Cotton" }, photos: 3 },
  { id: "r015", productId: "SKU004", userName: "Lakshmi P.", rating: 4, verified: true, date: "2026-07-12", title: "Beautiful but dupatta is plain", text: "Kurta and pants are lovely. The dupatta feels like an afterthought — plain and thin compared to the set. Otherwise very happy.", tags: { fit: "Slightly Loose", quality: "Good", colourAccuracy: "As Shown", fabric: "Soft Cotton" }, photos: 1 },
  { id: "r016", productId: "SKU004", userName: "Rashmi A.", rating: 4, verified: true, date: "2026-06-30", title: "Value for money ethnic wear", text: "Great set for the price. Embroidery doesn't come off after washing. Size M fit perfectly on my regular frame. Recommended for festive wear.", tags: { fit: "Perfect Fit", quality: "Good", colourAccuracy: "Exact Match", fabric: "Good Quality" }, photos: 0 },
  { id: "r017", productId: "SKU004", userName: "Sunita M.", rating: 5, verified: true, date: "2026-06-18", title: "Stunning piece!", text: "This anarkali is absolutely stunning in person. The flared cut is so elegant. I'm ordering another colour. Biba never disappoints.", tags: { fit: "Flattering", quality: "Premium", colourAccuracy: "As Shown", fabric: "Premium Cotton" }, photos: 2 },

  // --- SKU005 (Structured Leather Tote Bag) ---
  { id: "r018", productId: "SKU005", userName: "Tanya C.", rating: 4, verified: true, date: "2026-07-22", title: "Sleek and spacious", text: "Fits my laptop, wallet and all essentials. The structure holds well. Faux leather quality is decent. Zipper is smooth.", tags: { fit: "N/A", quality: "Good", colourAccuracy: "As Shown", fabric: "Good Faux Leather" }, photos: 1 },
  { id: "r019", productId: "SKU005", userName: "Pooja H.", rating: 4, verified: true, date: "2026-07-08", title: "Great work bag", text: "Using this daily for office. Looks professional and holds its shape. Minor peeling near handles after 2 months of heavy use.", tags: { fit: "N/A", quality: "Good", colourAccuracy: "Exact Match", fabric: "Decent Quality" }, photos: 0 },
  { id: "r020", productId: "SKU005", userName: "Swati R.", rating: 3, verified: true, date: "2026-06-25", title: "Looks good but smells initially", text: "The bag looks great and is very functional. However, it had a strong chemical smell for the first week. Airing it out helped.", tags: { fit: "N/A", quality: "Average", colourAccuracy: "As Shown", fabric: "Chemical Smell" }, photos: 0 },

  // --- SKU006 (Oversized Graphic T-Shirt) ---
  { id: "r021", productId: "SKU006", userName: "Aman J.", rating: 5, verified: true, date: "2026-08-05", title: "Fire print! 🔥", text: "The graphic print is sick. Cotton quality is top-notch for the price. Washed 5 times and no fading. Oversized fit is perfect.", tags: { fit: "Perfect Oversized", quality: "Excellent", colourAccuracy: "Vibrant Print", fabric: "Soft Cotton" }, photos: 2 },
  { id: "r022", productId: "SKU006", userName: "Deepa L.", rating: 4, verified: true, date: "2026-07-28", title: "Comfy everyday tee", text: "Great for casual wear. The drop shoulder design gives a cool streetwear vibe. Size up for extra oversized look.", tags: { fit: "True Oversized", quality: "Good", colourAccuracy: "As Shown", fabric: "Comfortable" }, photos: 0 },
  { id: "r023", productId: "SKU006", userName: "Suresh T.", rating: 4, verified: true, date: "2026-07-15", title: "Good quality at this price", text: "Bewakoof has really improved their quality. This tee is thick cotton, not see-through. Print is detailed and hasn't cracked.", tags: { fit: "Slightly Large", quality: "Good", colourAccuracy: "Exact Match", fabric: "Thick Cotton" }, photos: 1 },
  { id: "r024", productId: "SKU006", userName: "Kritika P.", rating: 3, verified: true, date: "2026-07-01", title: "Print is nice but sizing is off", text: "Love the design but the XL is way too big for me. Usually wear XL in other brands. The neck is also quite wide. Size down.", tags: { fit: "Runs Very Large", quality: "Good", colourAccuracy: "As Shown", fabric: "Good Cotton" }, photos: 0 },

  // --- SKU007 (Slim Fit Formal Shirt) ---
  { id: "r025", productId: "SKU007", userName: "Rajesh M.", rating: 5, verified: true, date: "2026-07-30", title: "Perfect office shirt", text: "Crisp finish, slim fit sits well. Wrinkle-resistant fabric really works — wore it for 10 hours and it still looked fresh.", tags: { fit: "Slim Fit", quality: "Excellent", colourAccuracy: "As Shown", fabric: "Wrinkle-Resistant" }, photos: 1 },
  { id: "r026", productId: "SKU007", userName: "Sanjay K.", rating: 4, verified: true, date: "2026-07-18", title: "Good shirt, size up if muscular", text: "Quality is great. The slim fit is genuinely slim — if you're athletic or muscular, go one size up. Colour is a nice sky blue.", tags: { fit: "Very Slim", quality: "Good", colourAccuracy: "Exact Match", fabric: "Good Blend" }, photos: 0 },
  { id: "r027", productId: "SKU007", userName: "Neeraj D.", rating: 4, verified: true, date: "2026-06-28", title: "Reliable brand", text: "Allen Solly never disappoints with formal shirts. This one is comfortable for all-day wear. Buttons are well-stitched.", tags: { fit: "True to Size", quality: "Good", colourAccuracy: "As Shown", fabric: "Comfortable Blend" }, photos: 0 },

  // --- SKU008 (Performance Running Shoes) ---
  { id: "r028", productId: "SKU008", userName: "Aditya S.", rating: 5, verified: true, date: "2026-08-10", title: "Worth every rupee", text: "These are incredible for running. The cushioning absorbs impact perfectly. Ran a half marathon in these — no blisters, no fatigue.", tags: { fit: "True to Size", quality: "Premium", colourAccuracy: "As Shown", fabric: "Breathable Mesh" }, photos: 2 },
  { id: "r029", productId: "SKU008", userName: "Prateek R.", rating: 5, verified: true, date: "2026-07-28", title: "Nike quality delivers", text: "Lightweight, responsive, and stylish. The grip on wet surfaces is excellent. Only premium running shoe you need.", tags: { fit: "Perfect Fit", quality: "Excellent", colourAccuracy: "Exact Match", fabric: "Premium Material" }, photos: 1 },
  { id: "r030", productId: "SKU008", userName: "Geeta V.", rating: 4, verified: true, date: "2026-07-10", title: "Great but pricey", text: "Amazing shoes, no doubt. But even at 33% off, they're expensive. If budget allows, these are the best running shoes on Myntra.", tags: { fit: "True to Size", quality: "Excellent", colourAccuracy: "As Shown", fabric: "Top Quality" }, photos: 0 },
  { id: "r031", productId: "SKU008", userName: "Manoj B.", rating: 4, verified: true, date: "2026-06-20", title: "Comfortable but narrow toe box", text: "Great shoe overall. My only issue is the toe box is slightly narrow. If you have wide feet, go half size up.", tags: { fit: "Slightly Narrow", quality: "Good", colourAccuracy: "As Shown", fabric: "Good Build" }, photos: 0 },

  // --- SKU009 (Banarasi Silk Saree) ---
  { id: "r032", productId: "SKU009", userName: "Padma S.", rating: 5, verified: true, date: "2026-07-25", title: "Exquisite craftsmanship", text: "The zari work is breathtaking. Pure silk quality is evident from the sheen and drape. Perfect for my daughter's wedding.", tags: { fit: "Free Size", quality: "Premium", colourAccuracy: "Rich & Vibrant", fabric: "Pure Silk" }, photos: 3 },
  { id: "r033", productId: "SKU009", userName: "Kamala R.", rating: 5, verified: true, date: "2026-07-10", title: "Museum quality at great price", text: "Can't believe this quality at 50% off. The traditional patterns are authentic Banarasi. Received many compliments.", tags: { fit: "Free Size", quality: "Excellent", colourAccuracy: "As Shown", fabric: "Luxurious Silk" }, photos: 2 },
  { id: "r034", productId: "SKU009", userName: "Isha T.", rating: 4, verified: true, date: "2026-06-28", title: "Beautiful but needs careful handling", text: "Stunning saree. The silk is genuine and beautiful. However, dry clean only and needs careful storage. Worth the investment.", tags: { fit: "Free Size", quality: "Good", colourAccuracy: "Exact Match", fabric: "Delicate Silk" }, photos: 0 },

  // --- SKU010 (Cotton Chino Shorts) ---
  { id: "r035", productId: "SKU010", userName: "Vikrant A.", rating: 4, verified: true, date: "2026-08-08", title: "Comfortable weekend shorts", text: "Soft cotton, good stitching. Perfect length — not too short, not too long. The khaki colour goes with everything.", tags: { fit: "True to Size", quality: "Good", colourAccuracy: "As Shown", fabric: "Soft Cotton" }, photos: 0 },
  { id: "r036", productId: "SKU010", userName: "Ishaan P.", rating: 4, verified: true, date: "2026-07-20", title: "Great fit and comfort", text: "H&M quality is reliable. These shorts are very comfortable for Indian weather. The elastane gives nice stretch. Bought 2 colours.", tags: { fit: "Perfect Fit", quality: "Good", colourAccuracy: "Exact Match", fabric: "Stretchy Cotton" }, photos: 1 },
  { id: "r037", productId: "SKU010", userName: "Ravi G.", rating: 4, verified: true, date: "2026-07-05", title: "Good but fades after multiple washes", text: "Comfortable and well-fitting. However, the colour faded a bit after 5-6 washes. Still good for casual use.", tags: { fit: "True to Size", quality: "Average", colourAccuracy: "Fades Slightly", fabric: "Decent Cotton" }, photos: 0 },

  // --- SKU011 (Embellished Block Heels) ---
  { id: "r038", productId: "SKU011", userName: "Nisha M.", rating: 4, verified: true, date: "2026-07-15", title: "Pretty party heels", text: "These look so elegant. The embellishments catch light beautifully. Block heel makes them more comfortable than stilettos.", tags: { fit: "True to Size", quality: "Good", colourAccuracy: "Sparkling", fabric: "Nice Finish" }, photos: 2 },
  { id: "r039", productId: "SKU011", userName: "Shalini R.", rating: 4, verified: true, date: "2026-07-01", title: "Good for short events", text: "Beautiful heels but the insole padding could be better. Comfortable for 2-3 hours, then starts to pinch slightly.", tags: { fit: "Slightly Narrow", quality: "Good", colourAccuracy: "As Shown", fabric: "Decent Finish" }, photos: 0 },
  { id: "r040", productId: "SKU011", userName: "Anjali K.", rating: 3, verified: true, date: "2026-06-20", title: "Pretty but uncomfortable", text: "Looks gorgeous but the narrow toe box makes it uncomfortable for wider feet. The embellishments started loosening after 3 wears.", tags: { fit: "Too Narrow", quality: "Below Average", colourAccuracy: "As Shown", fabric: "Flimsy" }, photos: 0 },

  // --- SKU012 (Printed Palazzo Pants) ---
  { id: "r041", productId: "SKU012", userName: "Megha S.", rating: 5, verified: true, date: "2026-08-02", title: "So comfortable!", text: "These palazzo pants are a dream to wear. The elastic waist is super comfortable and the print is cheerful. Wearing daily!", tags: { fit: "Relaxed & Comfy", quality: "Excellent", colourAccuracy: "Vibrant Print", fabric: "Soft Rayon" }, photos: 1 },
  { id: "r042", productId: "SKU012", userName: "Jyoti N.", rating: 4, verified: true, date: "2026-07-18", title: "Great everyday bottoms", text: "Perfect for work from home and casual outings. The wide leg silhouette is trendy and flattering. Pairs well with kurtas.", tags: { fit: "True to Size", quality: "Good", colourAccuracy: "As Shown", fabric: "Breathable" }, photos: 0 },
  { id: "r043", productId: "SKU012", userName: "Renu K.", rating: 4, verified: true, date: "2026-07-05", title: "Nice but transparent in sunlight", text: "Love the design and comfort. However, the rayon is slightly transparent in direct sunlight. Wear a slip underneath. Otherwise great.", tags: { fit: "True to Size", quality: "Good", colourAccuracy: "Exact Match", fabric: "Slightly Transparent" }, photos: 0 },
];

// ============================================================
// Helper: Get reviews for a product
// ============================================================
function getReviewsForProduct(productId) {
  return REVIEWS.filter(r => r.productId === productId);
}

// ============================================================
// Helper: Get product by ID
// ============================================================
function getProductById(productId) {
  return PRODUCTS.find(p => p.id === productId);
}
