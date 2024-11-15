import moment from "moment/moment";

export const cardsData = [
  {
    title: "Revenue",
    change: 24,
    amount: 42056,
  },
  {
    title: "Orders",
    change: -14,
    amount: 52125.03,
  },
  {
    title: "Expenses",
    change: 18,
    amount: 1216.5,
  },
  {
    title: "Profit",
    change: 12,
    amount: 10125.0,
  },
];


//* get the value in group number format
export const groupNumber = (number) => {
  return parseFloat(number.toFixed(2)).toLocaleString("en", {
    useGrouping: true,
  });
};


//* calendar Events
let eventGuid = 0
let todayStr = moment().format("YYYY-MM-DD")  // YYYY-MM-DD of today
export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Lunch Pary',
    start: todayStr + 'T09:00:00',
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: moment(todayStr).add(1, "days").format("YYYY-MM-DD") + 'T16:00:00'
  },
  {
    id: createEventId(),
    title: "Head Meetup",
    start: moment(todayStr).add(2, "days").format("YYYY-MM-DD") + 'T20:00:00'
  },
  {
    id: createEventId(),
    title: "VC Meeting",
    start: moment(todayStr).add(3, "days").format("YYYY-MM-DD") + 'T09:00:00'
  },
  {
    id: createEventId(),
    title: "Payment Shedules",
    start: moment(todayStr).add(5, "days").format("YYYY-MM-DD") + 'T13:00:00'
  },
  {
    id: createEventId(),
    title: "VC Meeting",
    start: moment(todayStr).add(6, "days").format("YYYY-MM-DD") + 'T13:00:00'
  },
]

export function createEventId() {
  return String(eventGuid++)
}

// * tasks
export const boardData = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      cards: [
        {
          id: 1,
          title: "Database Setup",
          description: "Firebase Integration"
        },
        {
          id: 2,
          title: "Data Flow",
          description: "Setup Diagram with other developers"
        },
      ]
    },
    {
      id: 2,
      title: "TODO",
      cards: [
        {
          id: 9,
          title: "Data Table Page",
          description: "Server side Pagination",
        }
      ]
    },
    {
      id: 3,
      title: "Doing",
      cards: [
        {
          id: 10,
          title: "Full Calendar Extension",
          description: "Make new events and store in global states"
        },
        {
          id: 11,
          title: "Custom Kanban Board",
          description: "Setup react-kanban dep within Dashboard as seperate page"
        }
      ]
    },
    {
      id: 4,
      title: "Completed",
      cards: [
        {
          id: 12,
          title: "Vite Server Setup",
          description: "Configure required modules and starters"
        },
        {
          id: 13,
          title: "Modular structre",
          description: "Write css in form of modules to reduce the naming conflicts"
        }
      ]
    }
  ]
}


// * products table data
export const productsData = [
  {
    "id": 1,
    "name": "Running Shoes",
    "description": "Good running shoes absorb and reduce the impact on your feet. They're light in weight to allow for quick movement. They have more cushioning near the heel and toes than regular shoes for better shock absorption. Additionally, they have a breathable mesh.",
    "mainImage": "../../public/shoes.jpg",
    "images": ["../../public/shoes1.jpg", "../../public/shoes2.jpg"],
    "coverImage": "../../public/cover-image.jpg",
    "categoryId": 2,
    "subcategoryId": 3,
    "subSubcategoryId": 11,
    "brand": "Brand C",
    "stock": 57,
    "totalSold": 194,
    "totalRevenue": 2000,
    "totalSoldMonths": [
      ["2024-01-01", 10],
      ["2024-02-01", 30],
      ["2024-03-01", 20],
      ["2024-04-01", 20],
      ["2024-05-01", 20],
      ["2024-06-01", 12], // June
      ["2024-07-01", 11], // July
      ["2024-08-01", 20], // August
      ["2024-09-01", 23], // September
      ["2024-10-01", 50], // October
      ["2024-11-01", 54], // November
      ["2024-12-01", 24]  // December
    ],
    "rate": 3.7,
    "customerFeedback": [
      { "comment": "Great shoes for running!", "rating": 5 },
      { "comment": "Very comfortable.", "rating": 4 },
      { "comment": "Excellent quality!", "rating": 5 },
      { "comment": "Love the design.", "rating": 4 },
      { "comment": "Perfect fit!", "rating": 5 },
      { "comment": "Fast shipping.", "rating": 3 },
      { "comment": "Best purchase ever!", "rating": 5 },
      { "comment": "Impressive durability.", "rating": 4 },
      { "comment": "Disappointed with the color.", "rating": 2 },
      { "comment": "Average quality for the price.", "rating": 3 }
    ]
    ,
    "customerSegments": {
      "age": {
        "18-24": 157,
        "25-34": 34,
        "35-44": 10,
        "45-54": 7
      },
      "gender": {
        "male": 105,
        "female": 100
      }
    },
    "price": 79.99,
    "pva": 50,
    "discount": 5,
    "updatedAt": "2022-05-18T14:45:00.000Z",
    "createdAt": "2022-05-12T11:30:00.000Z",
    "Geo": {
      "USA": {
        "numberOfPurchases": 9000,
        "profit": 20000
      },
      "Canada": {
        "numberOfPurchases": 600,
        "profit": 10000
      },
      "Australia": {
        "numberOfPurchases": 1110,
        "profit": 12000
      },
      "UK": {
        "numberOfPurchases": 1400,
        "profit": 16000
      },
      "Morocco": {
        "numberOfPurchases": 400,
        "profit": 160
      },
      "Japan": {
        "numberOfPurchases": 2450,
        "profit": 7500
      },
      "Brazil": {
        "numberOfPurchases": 532,
        "profit": 9000
      },
      "India": {
        "numberOfPurchases": 800,
        "profit": 15000
      },
      "South Africa": {
        "numberOfPurchases": 180,
        "profit": 5400
      },
      "Italy": {
        "numberOfPurchases": 9000,
        "profit": 10500
      }
    }

  },
  {
    "id": 2,
    "name": "Trail Shoes",
    "description": "Trail shoes are built more rugged than road shoes to protect the shoes and your feet from things you'll encounter on your run, like rocks, roots and sticks",
    "mainImage": "../../public/default-image.png",
    "images": ["../../public/exemple-image-product1.jpg", "../../public/exemple-image-product2.jpg"],
    "coverImage": "../../public/cover-image2.jpg",
    "categoryId": 1,
    "subcategoryId": 1,
    "subSubcategoryId": null,
    "brand": "Brand D",
    "stock": 0,
    "totalSold": 150,
    "totalSoldMonths": [
      ["2023-01-01", 10],
      ["2023-02-01", 30],
      ["2023-03-01", 20],
      ["2023-04-01", 20],
      ["2023-05-01", 20],
      ["2023-06-01", 30],
      ["2023-07-01", 20],
    ],
    "totalRevenue": 3000,
    "rate": 2.6,
    "customerFeedback": [
      { "comment": "Perfect for rough terrains.", "rating": 5 },
      { "comment": "Durable and sturdy.", "rating": 4 }
    ],
    "customerSegments": {
      "age": {
        "18-24": 40,
        "25-34": 45,
        "35-44": 20,
        "45-54": 30
      },
      "gender": {
        "male": 30,
        "female": 70
      }
    },
    "price": 89.99,
    "pva": 60,
    "discount": 10,
    "updatedAt": "2022-06-01T10:15:00.000Z",
    "createdAt": "2022-05-25T09:00:00.000Z",
    "Geo": {
      "Morocco": {
        "numberOfPurchases": 150,
        "profit": 3000
      },
      "France": {
        "numberOfPurchases": 300,
        "profit": 9000
      },
      "Germany": {
        "numberOfPurchases": 200,
        "profit": 6000
      },
      "Portugal": {
        "numberOfPurchases": 100,
        "profit": 2500
      },
      "Italy": {
        "numberOfPurchases": 180,
        "profit": 4500
      },
      "Spain": {
        "numberOfPurchases": 250,
        "profit": 7500
      },
      "United Kingdom": {
        "numberOfPurchases": 220,
        "profit": 6600
      },
      "Canada": {
        "numberOfPurchases": 130,
        "profit": 3900
      },
      "Australia": {
        "numberOfPurchases": 160,
        "profit": 4800
      }
    }
  }
];

export const categoriesData = [
  {
    id: 1,
    name: "Electronics",
    image: "../../public/exemple-image-category.jpg",
    description: "electrical circuits that have electrical components. These common electrical components are vacuum tubes, transistors, diodes, integrated circuits, optoelectronics, and sensors. All of them are associated with passive electrical components and interconnection technologies.",
    PurchaseCount: 23,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
  },
  {
    id: 2,
    name: "Clothing",
    image: "../../public/default-image.png",
    description: "Fashionable clothing for all genders and ages.",
    PurchaseCount: 12,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
  },
];


export const subcategoriesData = [
  {
    id: 1,
    name: "Laptops",
    image: "../../public/default-image.png",
    description: "This portable delivers a full PC experience. It offers a comfortable keyboard, large hard drive, a huge screen and great system memory. The stereo speakers are loud and rich, plus you’ll find exciting emerging mobile technology such as Intel Wireless Display, which lets you play your laptop’s picture on your big-screen HDTV without wires. With all these features, a desktop replacement is too large for comfortable travel, and battery life is very short.",
    categoryId: 1,
    PurchaseCount: 13,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
  },
  {
    id: 2,
    name: "Smartphones",
    image: "../../public/default-image.png",
    description: "Latest smartphones with cutting-edge technology.",
    categoryId: 1,
    PurchaseCount: 11,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
  },
  {
    id: 3,
    name: "Women's Clothing",
    image: "../../public/default-image.png",
    description: "Latest trends and styles in women's clothing.",
    categoryId: 2,
    PurchaseCount: 23,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
  },
  {
    id: 4,
    name: "Men's Clothing",
    image: "../../public/default-image.png",
    description: "Latest trends and styles in men's clothing.",
    categoryId: 2,
    PurchaseCount: 12,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
  },
];


export const subsubcategoriesData = [
  {
    id: 1,
    name: "Gaming Laptops",
    image: "../../public/default-image.png",
    description: "A gaming laptop is a powerful portable computer designed specifically for playing online video games. These laptops are designed to offer an immersive gaming experience while also providing portability and convenience for gamers who want to play their favorite games while on-the-go..",
    subcategoryId: 1,
    PurchaseCount: 17,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
  },
  {
    id: 2,
    name: "Ultrabooks",
    image: "../../public/default-image.png",
    description: "Lightweight and powerful laptops for everyday use.",
    subcategoryId: 1,
    PurchaseCount: 13,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
  },
  {
    id: 3,
    name: "Android Phones",
    image: "../../public/default-image.png",
    description: "Smartphones running on Android OS.",
    subcategoryId: 2,
    PurchaseCount: 32,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
  },
  {
    id: 4,
    name: "iPhones",
    image: "../../public/default-image.png",
    description: "Apple's iPhones with iOS.",
    subcategoryId: 2,
    PurchaseCount: 12,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
  },
  {
    id: 5,
    name: "Dresses",
    image: "../../public/default-image.png",
    description: "Beautiful dresses for every occasion.",
    subcategoryId: 3,
    PurchaseCount: 23,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
  },
  {
    id: 6,
    name: "Tops",
    image: "../../public/default-image.png",
    description: "Stylish tops for women.",
    subcategoryId: 3,
    PurchaseCount: 11,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
  },
  {
    id: 7,
    name: "Bottoms",
    image: "../../public/default-image.png",
    description: "Comfortable and trendy bottoms for women.",
    subcategoryId: 3,
    PurchaseCount: 15,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
  },
  {
    id: 8,
    name: "Shirts",
    image: "../../public/default-image.png",
    description: "Formal and casual shirts for men.",
    subcategoryId: 4,
    PurchaseCount: 12,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
  },
  {
    id: 9,
    name: "Pants",
    image: "../../public/default-image.png",
    description: "Comfortable and stylish pants for men.",
    subcategoryId: 4,
    PurchaseCount: 18,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
  },
  {
    id: 10,
    name: "Jackets",
    image: "../../public/default-image.png",
    description: "Warm and trendy jackets for men.",
    subcategoryId: 4,
    PurchaseCount: 13,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
  },
  {
    id: 11,
    name: "Running Shoes",
    image: "../../public/default-image.png",
    description: "High-performance running shoes for men.",
    subcategoryId: 4,
    PurchaseCount: 14,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
  },
  {
    id: 12,
    name: "Trail Shoes",
    image: "../../public/default-image.png",
    description: "Durable and comfortable trail shoes for men.",
    subcategoryId: 4,
    PurchaseCount: 2,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
  },
];

// * adminActions table data
export const adminActions = [
  {
    id: 1,
    userId: 1, // ID of the admin who performed this action
    type: "Order",
    action: "Processed Order #1234",
    date: "2024-07-03 12:00:00",
  },
  {
    id: 2,
    userId: 1,
    type: "Product",
    action: "Added New Product 'XYZ'",
    date: "2024-07-02 10:00:00",
  },
  {
    id: 3,
    userId: 1,
    type: "Category",
    action: "Updated Category 'Electronics'",
    date: "2024-07-01 09:30:00",
  },
  {
    id: 4,
    userId: 1,
    type: "Subcategory",
    action: "Created Subcategory 'Laptops'",
    date: "2024-06-30 08:45:00",
  },
  {
    id: 5,
    userId: 1,
    type: "Subsubcategory",
    action: "Deleted Subsubcategory 'Gaming Laptops'",
    date: "2024-06-29 07:20:00",
  },
];

// * user table data
export const userData = [
  {
    id: 1,
    name: {
      firstName: 'Fadmin1',
      lastName: 'Ladmin1',
    },
    imageUrl: "../../public/profile.jpg",
    contactNumber: '123-456-7890',
    address: 'address 1',
    city: 'city 1',
    country: 'country 1',
    email: 'admin1@admin.com',
    password: 'admin1',
    role: 'admin',
  },
  {
    id: 2,
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    imageUrl: "../../public/default-image-profile.jpg",
    address: '769 Dominic Grove',
    city: 'Columbus',
    country: 'canada',
    contactNumber: '987-654-3210',
    email: 'jane.doe@example.com',
    password: 'admin2',
    role: 'user',
  },
  {
    id: 3,
    name: {
      firstName: 'FirstNameUser1',
      lastName: 'lasteNameUser1',
    },
    imageUrl: "../../public/exemple-image-product1.jpg",
    contactNumber: '123-456-7890',
    address: 'Hay takadoum',
    city: 'East Daphne',
    country: 'morroco',
    email: 'admin2@admin.com',
    password: 'admin3',
    role: 'admin',
  },
];

// * deliveryNotes table data
export const deliveryNotesData = [
  {
    id: 1,
    orderId: 1,
    date: "2024-06-16T08:00:00Z",
  },
  {
    id: 2,
    orderId: 2,
    date: "2024-06-17T09:00:00Z",
  },
];

// * order table data
export const ordersData = [
  {
    id: 1, //
    userId: 1, //
    tva: 20,  //
    paymentStatus: "Paid", //
    paymentMethod: "Credit Card", //
    orderType: "Online",
    orderDate: "2024-06-15T14:30:00Z", //
    orderStatus: "Shipped", //
    deliveryStatus: "Out for Delivery", //
    shippingAddress: "123 Main St, Springfield, USA", //
    itemsOrdered: [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 2,
        quantity: 1,
      },

    ],
    estimatedDeliveryDate: "2024-06-20T00:00:00Z",

    // this data just temporarily, i will delete when i finish Order Pages (igonred)
    name: "football",
    type: "Sport",
    items: 17,
    change: 370,
  },
  {
    id: 2,
    userId: 2,
    tva: 20,
    paymentStatus: "Pending",
    paymentMethod: "PayPal",
    orderType: "In-Store",
    orderDate: "2024-06-16T10:00:00Z",
    orderStatus: "Delivering",
    deliveryStatus: "Awaiting Pickup",
    shippingAddress: "456 Elm St, Springfield, USA",
    itemsOrdered: [
      {
        productId: 2,
        quantity: 3,
      },
      {
        productId: 1,
        quantity: 1,
      }
    ],
    invoiceLink: "https://example.com/invoice/2",
    trackingNumber: "DEF987654321",
    orderNotes: "",
    estimatedDeliveryDate: "2024-06-22T00:00:00Z",

    // this data just temporarily, i will delete when i finish Order Pages (igonred)
    name: "phone",
    type: "electronic",
    items: 2,
    change: 720
  },
];


