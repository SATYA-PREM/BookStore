export const INITIAL_BOOKS = [
  {
    id: "BK001",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    price: 499,
    originalPrice: 699,
    stock: 42,
    rating: 4.8,
    reviewsCount: 1240,
    isbn: "9780735211292",
    publisher: "Penguin Random House",
    publicationDate: "Oct 16, 2018",
    pages: 320,
    language: "English",
    format: "Paperback",
    status: "published",
    sales: 128,
    badge: "Bestseller",
    description: "An easy and proven way to build good habits and break bad ones. No matter your goals, Atomic Habits offers a proven framework for improving every day.",
    about: "James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    coverColor: "from-amber-600 to-orange-700",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
    lowStockThreshold: 10
  },
  {
    id: "BK002",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    price: 399,
    originalPrice: 499,
    stock: 17,
    rating: 4.7,
    reviewsCount: 980,
    isbn: "9780062315007",
    publisher: "HarperOne",
    publicationDate: "Apr 15, 2014",
    pages: 208,
    language: "English",
    format: "Paperback",
    status: "published",
    sales: 94,
    badge: "Classic",
    description: "A magical story about following your dreams and listening to your heart.",
    about: "Combining magic, mysticism, wisdom, and wonder into an inspiring tale of self-discovery, The Alchemist has become a modern classic, selling millions of copies around the world.",
    coverColor: "from-orange-500 to-amber-600",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
    lowStockThreshold: 15
  },
  {
    id: "BK003",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    category: "Business",
    price: 449,
    originalPrice: 599,
    stock: 5,
    rating: 4.6,
    reviewsCount: 840,
    isbn: "9781612680194",
    publisher: "Plata Publishing",
    publicationDate: "Apr 11, 2017",
    pages: 336,
    language: "English",
    format: "Paperback",
    status: "published",
    sales: 82,
    badge: "Finance Must-Read",
    description: "What the rich teach their kids about money that the poor and middle class do not!",
    about: "Rich Dad Poor Dad will explode the myth that you need to earn a high income to be rich and explain the difference between working for money and having your money work for you.",
    coverColor: "from-purple-800 to-indigo-900",
    coverImage: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&q=80&w=600",
    lowStockThreshold: 10
  },
  {
    id: "BK004",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    category: "Business",
    price: 349,
    originalPrice: 450,
    stock: 21,
    rating: 4.5,
    reviewsCount: 650,
    isbn: "9781585424337",
    publisher: "TarcherPerigee",
    publicationDate: "Aug 18, 2005",
    pages: 238,
    language: "English",
    format: "Paperback",
    status: "published",
    sales: 76,
    badge: "Timeless",
    description: "The landmark bestseller now revised and updated for the 21st century.",
    about: "Think and Grow Rich has been called the 'Granddaddy of All Motivational Literature.' It was the first book to boldly ask, 'What makes a winner?'",
    coverColor: "from-emerald-700 to-teal-900",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600",
    lowStockThreshold: 8
  },
  {
    id: "BK005",
    title: "Tiny Power of Mind",
    author: "Dr. Joseph Murphy",
    category: "Self Help",
    price: 299,
    originalPrice: 399,
    stock: 35,
    rating: 4.4,
    reviewsCount: 420,
    isbn: "9780143425120",
    publisher: "Penguin India",
    publicationDate: "Jan 10, 2015",
    pages: 240,
    language: "English",
    format: "Paperback",
    status: "published",
    sales: 61,
    badge: "Popular",
    description: "Unlock the miraculous powers of your subconscious mind to attain success and happiness.",
    about: "Practical exercises and real-life success stories to harness mental strength, overcome mental blocks, and attract abundance.",
    coverColor: "from-sky-700 to-blue-900",
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600",
    lowStockThreshold: 10
  },
  {
    id: "BK006",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Business",
    price: 499,
    originalPrice: 599,
    stock: 28,
    rating: 4.9,
    reviewsCount: 1540,
    isbn: "9789390166268",
    publisher: "Jaico Publishing House",
    publicationDate: "Sep 01, 2020",
    pages: 252,
    language: "English",
    format: "Paperback",
    status: "published",
    sales: 110,
    badge: "Top Rated",
    description: "Timeless lessons on wealth, greed, and happiness doing well with money.",
    about: "Money's greatest intrinsic value is its ability to give you control over your time. Morgan Housel shares 19 short stories exploring the strange ways people think about money.",
    coverColor: "from-amber-700 to-yellow-900",
    coverImage: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=600",
    lowStockThreshold: 10
  },
  {
    id: "BK007",
    title: "Clean Code: Agile Software Craftsmanship",
    author: "Robert C. Martin",
    category: "Technology",
    price: 899,
    originalPrice: 1199,
    stock: 14,
    rating: 4.8,
    reviewsCount: 780,
    isbn: "9780132350884",
    publisher: "Prentice Hall",
    publicationDate: "Aug 01, 2008",
    pages: 464,
    language: "English",
    format: "Hardcover",
    status: "published",
    sales: 58,
    badge: "Dev Favorite",
    description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
    about: "A must-read handbook of software craftsmanship packed with case studies, principles, patterns, and practices of writing clean, maintainable code.",
    coverColor: "from-blue-800 to-slate-900",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600",
    lowStockThreshold: 5
  },
  {
    id: "BK008",
    title: "Deep Work",
    author: "Cal Newport",
    category: "Technology",
    price: 450,
    originalPrice: 550,
    stock: 19,
    rating: 4.7,
    reviewsCount: 620,
    isbn: "9781455586691",
    publisher: "Grand Central Publishing",
    publicationDate: "Jan 05, 2016",
    pages: 304,
    language: "English",
    format: "Paperback",
    status: "published",
    sales: 67,
    badge: "Focus",
    description: "Rules for focused success in a distracted world.",
    about: "Deep work is the ability to focus without distraction on a cognitively demanding task. It's a skill that allows you to quickly master complicated information and produce better results in less time.",
    coverColor: "from-red-800 to-rose-950",
    coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600",
    lowStockThreshold: 8
  },
  {
    id: "BK009",
    title: "Ikigai: The Japanese Secret to a Long and Happy Life",
    author: "Héctor García & Francesc Miralles",
    category: "Self Help",
    price: 379,
    originalPrice: 499,
    stock: 31,
    rating: 4.6,
    reviewsCount: 910,
    isbn: "9781786330895",
    publisher: "Hutchinson",
    publicationDate: "Sep 07, 2017",
    pages: 208,
    language: "English",
    format: "Hardcover",
    status: "published",
    sales: 88,
    badge: "Bestseller",
    description: "Discover your reason for being and live with purpose, peace, and longevity.",
    about: "According to the Japanese, everyone has an ikigai—a reason for being. Finding it is the key to a happier and longer life.",
    coverColor: "from-teal-700 to-emerald-900",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
    lowStockThreshold: 10
  },
  {
    id: "BK010",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "Academic",
    price: 599,
    originalPrice: 799,
    stock: 22,
    rating: 4.8,
    reviewsCount: 1820,
    isbn: "9780062316097",
    publisher: "Harper",
    publicationDate: "Feb 10, 2015",
    pages: 464,
    language: "English",
    format: "Paperback",
    status: "published",
    sales: 104,
    badge: "Global Phenomenon",
    description: "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution.",
    about: "One hundred thousand years ago, at least six different species of humans inhabited Earth. Yet today there is only one—Homo sapiens. How did our species succeed in the battle for dominance?",
    coverColor: "from-stone-800 to-amber-950",
    coverImage: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=600",
    lowStockThreshold: 10
  }
];

export const INITIAL_CATEGORIES = [
  { id: "cat-1", name: "Fiction", icon: "BookOpen", count: 185, color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  { id: "cat-2", name: "Self Help", icon: "Sparkles", count: 420, color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  { id: "cat-3", name: "Business", icon: "Briefcase", count: 290, color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  { id: "cat-4", name: "Technology", icon: "Cpu", count: 160, color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" },
  { id: "cat-5", name: "Academic", icon: "GraduationCap", count: 110, color: "bg-rose-500/10 text-rose-500 border-rose-500/20" },
  { id: "cat-6", name: "Biography", icon: "UserCheck", count: 83, color: "bg-purple-500/10 text-purple-500 border-purple-500/20" }
];

export const INITIAL_COUPONS = [
  {
    id: "CPN001",
    code: "BOOK10",
    discountType: "percentage",
    discountValue: 10,
    minOrder: 400,
    maxDiscount: 200,
    usedCount: 84,
    usageLimit: 500,
    status: "active",
    description: "10% off on all orders above ₹400",
    expiryDate: "2026-12-31"
  },
  {
    id: "CPN002",
    code: "WELCOME100",
    discountType: "fixed",
    discountValue: 100,
    minOrder: 500,
    maxDiscount: 100,
    usedCount: 142,
    usageLimit: 1000,
    status: "active",
    description: "Flat ₹100 off for book lovers on orders above ₹500",
    expiryDate: "2026-12-31"
  },
  {
    id: "CPN003",
    code: "READ20",
    discountType: "percentage",
    discountValue: 20,
    minOrder: 800,
    maxDiscount: 300,
    usedCount: 39,
    usageLimit: 200,
    status: "active",
    description: "20% off on large book bundles above ₹800",
    expiryDate: "2026-11-30"
  }
];

export const INITIAL_ORDERS = [
  {
    id: "BF-1024",
    customerId: "CUS001",
    customerName: "Satya Prem",
    customerEmail: "satya@example.com",
    customerPhone: "+91 98765 43210",
    address: {
      street: "42 Tech Park, Sector 5",
      city: "Bengaluru",
      state: "Karnataka",
      zip: "560100",
      country: "India"
    },
    items: [
      { bookId: "BK001", title: "Atomic Habits", price: 499, quantity: 1 },
      { bookId: "BK002", title: "The Alchemist", price: 399, quantity: 1 }
    ],
    subtotal: 898,
    discount: 0,
    shipping: 0,
    tax: 44,
    total: 942,
    paymentMethod: "Demo Card (Visa)",
    paymentStatus: "paid",
    orderStatus: "shipped",
    transactionId: "TXN-829381",
    createdAt: "2026-09-03T18:20:00.000Z",
    estimatedDelivery: "Sep 07 - Sep 09, 2026",
    timeline: [
      { status: "Order Placed", date: "Sep 03, 06:20 PM", completed: true },
      { status: "Payment Confirmed", date: "Sep 03, 06:21 PM", completed: true },
      { status: "Order Packed", date: "Sep 03, 08:00 PM", completed: true },
      { status: "Shipped", date: "Sep 03, 09:30 PM", completed: true },
      { status: "Out for Delivery", date: "Expected Sep 07", completed: false },
      { status: "Delivered", date: "Expected Sep 08", completed: false }
    ]
  },
  {
    id: "BF-1023",
    customerId: "CUS002",
    customerName: "Rahul Sharma",
    customerEmail: "rahul@example.com",
    customerPhone: "+91 91234 56789",
    address: {
      street: "12 Connaught Place",
      city: "New Delhi",
      state: "Delhi",
      zip: "110001",
      country: "India"
    },
    items: [
      { bookId: "BK006", title: "The Psychology of Money", price: 499, quantity: 1 }
    ],
    subtotal: 499,
    discount: 50,
    shipping: 0,
    tax: 22,
    total: 471,
    paymentMethod: "UPI Demo (Google Pay)",
    paymentStatus: "paid",
    orderStatus: "delivered",
    transactionId: "TXN-829104",
    createdAt: "2026-09-02T14:15:00.000Z",
    estimatedDelivery: "Delivered Sep 03",
    timeline: [
      { status: "Order Placed", date: "Sep 02, 02:15 PM", completed: true },
      { status: "Payment Confirmed", date: "Sep 02, 02:16 PM", completed: true },
      { status: "Order Packed", date: "Sep 02, 04:00 PM", completed: true },
      { status: "Shipped", date: "Sep 02, 07:30 PM", completed: true },
      { status: "Out for Delivery", date: "Sep 03, 09:00 AM", completed: true },
      { status: "Delivered", date: "Sep 03, 01:45 PM", completed: true }
    ]
  },
  {
    id: "BF-1022",
    customerId: "CUS003",
    customerName: "Priya Patel",
    customerEmail: "priya@example.com",
    customerPhone: "+91 99887 66554",
    address: {
      street: "78 SG Highway",
      city: "Ahmedabad",
      state: "Gujarat",
      zip: "380015",
      country: "India"
    },
    items: [
      { bookId: "BK003", title: "Rich Dad Poor Dad", price: 449, quantity: 1 },
      { bookId: "BK004", title: "Think and Grow Rich", price: 349, quantity: 1 },
      { bookId: "BK005", title: "Tiny Power of Mind", price: 299, quantity: 1 }
    ],
    subtotal: 1097,
    discount: 100,
    shipping: 0,
    tax: 48,
    total: 1045,
    paymentMethod: "Demo Card (Mastercard)",
    paymentStatus: "paid",
    orderStatus: "processing",
    transactionId: "TXN-828945",
    createdAt: "2026-09-03T10:10:00.000Z",
    estimatedDelivery: "Sep 08 - Sep 10, 2026",
    timeline: [
      { status: "Order Placed", date: "Sep 03, 10:10 AM", completed: true },
      { status: "Payment Confirmed", date: "Sep 03, 10:11 AM", completed: true },
      { status: "Order Packed", date: "In Progress", completed: false },
      { status: "Shipped", date: "Pending", completed: false },
      { status: "Out for Delivery", date: "Pending", completed: false },
      { status: "Delivered", date: "Pending", completed: false }
    ]
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: "CUS001",
    name: "Satya Prem",
    email: "satya@example.com",
    phone: "+91 98765 43210",
    ordersCount: 12,
    totalSpent: 8420,
    lastOrderDate: "2026-09-03",
    status: "active",
    city: "Bengaluru"
  },
  {
    id: "CUS002",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 91234 56789",
    ordersCount: 5,
    totalSpent: 3150,
    lastOrderDate: "2026-09-02",
    status: "active",
    city: "New Delhi"
  },
  {
    id: "CUS003",
    name: "Priya Patel",
    email: "priya@example.com",
    phone: "+91 99887 66554",
    ordersCount: 3,
    totalSpent: 2680,
    lastOrderDate: "2026-09-03",
    status: "active",
    city: "Ahmedabad"
  },
  {
    id: "CUS004",
    name: "Ananya Sen",
    email: "ananya@example.com",
    phone: "+91 94321 09876",
    ordersCount: 8,
    totalSpent: 5490,
    lastOrderDate: "2026-08-29",
    status: "active",
    city: "Kolkata"
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: "TXN-829381",
    orderId: "BF-1024",
    customerName: "Satya Prem",
    amount: 942,
    method: "Visa Card (•••• 4242)",
    status: "successful",
    date: "2026-09-03 18:21"
  },
  {
    id: "TXN-829104",
    orderId: "BF-1023",
    customerName: "Rahul Sharma",
    amount: 471,
    method: "UPI (Google Pay)",
    status: "successful",
    date: "2026-09-02 14:16"
  },
  {
    id: "TXN-828945",
    orderId: "BF-1022",
    customerName: "Priya Patel",
    amount: 1045,
    method: "Mastercard (•••• 5555)",
    status: "successful",
    date: "2026-09-03 10:11"
  },
  {
    id: "TXN-827411",
    orderId: "BF-1021",
    customerName: "Vikram Mehta",
    amount: 799,
    method: "RuPay Card (•••• 9995)",
    status: "failed",
    date: "2026-09-01 11:05",
    failureReason: "Insufficient funds"
  }
];

export const INITIAL_REVIEWS = [
  {
    id: "REV001",
    bookId: "BK001",
    bookTitle: "Atomic Habits",
    customerName: "Satya Prem",
    rating: 5,
    date: "2026-09-01",
    comment: "Life-changing book! The 1% improvement framework is genuinely practical and well-structured.",
    status: "approved"
  },
  {
    id: "REV002",
    bookId: "BK002",
    bookTitle: "The Alchemist",
    customerName: "Ananya Sen",
    rating: 5,
    date: "2026-08-28",
    comment: "A beautiful philosophical fable. Fast delivery and high print quality from BookFlow.",
    status: "approved"
  },
  {
    id: "REV003",
    bookId: "BK006",
    bookTitle: "The Psychology of Money",
    customerName: "Rahul Sharma",
    rating: 5,
    date: "2026-08-25",
    comment: "Must read for every young professional wanting to understand financial psychology.",
    status: "approved"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "NOTIF-001",
    title: "New Order Received",
    message: "Order #BF-1024 has been placed by Satya Prem for ₹942.",
    type: "order",
    time: "10 mins ago",
    read: false
  },
  {
    id: "NOTIF-002",
    title: "Low Stock Alert",
    message: "Rich Dad Poor Dad has only 5 copies left in inventory.",
    type: "warning",
    time: "2 hours ago",
    read: false
  },
  {
    id: "NOTIF-003",
    title: "Payment Received",
    message: "Payment of ₹1,045 received for Order #BF-1022.",
    type: "payment",
    time: "5 hours ago",
    read: true
  },
  {
    id: "NOTIF-004",
    title: "5-Star Review Added",
    message: "Satya left a 5-star review on Atomic Habits.",
    type: "review",
    time: "1 day ago",
    read: true
  }
];

export const STORE_SETTINGS = {
  storeName: "BookFlow Storefront & Books SaaS",
  tagline: "Everything You Need to Sell Books Online",
  storeEmail: "support@bookflow.saas",
  storePhone: "+91 8000 123 456",
  currency: "INR",
  currencySymbol: "₹",
  taxRate: 5, // 5% GST on books
  freeShippingThreshold: 500,
  shippingFee: 40,
  storeAddress: "BookFlow Hub, Tower 3, High-Tech City, Bengaluru, Karnataka 560100",
  gstin: "29AABCB1234F1Z9"
};

