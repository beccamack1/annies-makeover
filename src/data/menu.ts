/* ==========================================================
   THE MENU, for each store. The two stores have different
   treats and prices, so each has its own list.

   Copied from each store's online ordering page (Menufy) on
   Oct 4, 2026, with spelling fixed. Prices are online-order
   prices; check them with the owners before launch.

   - price:   the starting price (a slice, a medium drink...)
   - sizes:   other sizes and prices (optional)
   - desc:    a short description (optional)
   - photo:   a picture in public/images/menu/ (optional)
   - emoji:   shown in the circle when there's no photo
   - tags:    'gluten-free' or 'caffeine-free' (optional)
   ========================================================== */
import type { StoreId } from './shop'

export type MenuTag = 'gluten-free' | 'caffeine-free'

export type MenuItem = {
  name: string
  price: string
  sizes?: string[]
  desc?: string
  photo?: string
  emoji?: string
  tags?: MenuTag[]
}

export type MenuCategory = {
  id: string
  label: string
  emoji: string
  note?: string
  sizeNote?: string
  items: MenuItem[]
}

export const fm423Menu: MenuCategory[] = [
  {
    "id": "cakes",
    "label": "Cakes & cheesecakes",
    "emoji": "🍰",
    "items": [
      {
        "name": "Double Chocolate Layer Cake",
        "price": "$6.49",
        "sizes": [
          "Slice $6.49",
          "8″ cake $44",
          "8″ with writing $49"
        ],
        "photo": "/images/menu/double-chocolate-layer-cake.webp"
      },
      {
        "name": "Oreo Cheesecake",
        "price": "$5.35",
        "sizes": [
          "Slice $5.35",
          "8″ cake $38",
          "8″ with writing $43"
        ],
        "photo": "/images/menu/oreo-cheesecake.webp"
      },
      {
        "name": "New York Cheesecake",
        "price": "$5.35",
        "sizes": [
          "Slice $5.35",
          "8″ cake $35",
          "8″ with writing $40"
        ],
        "photo": "/images/menu/new-york-cheesecake.webp"
      },
      {
        "name": "Red Velvet Cake",
        "price": "$5.95",
        "sizes": [
          "Slice $5.95",
          "8″ cake $44",
          "8″ with writing $49"
        ],
        "photo": "/images/menu/red-velvet-cake.webp"
      },
      {
        "name": "Brownie Chocolate Cheesecake",
        "price": "$6.49",
        "sizes": [
          "Slice $6.49",
          "8″ cake $44",
          "8″ with writing $49"
        ],
        "photo": "/images/menu/brownie-chocolate-cheesecake.webp"
      },
      {
        "name": "Tiramisu",
        "price": "$5.35",
        "sizes": [
          "Slice $5.35",
          "8″ cake $38",
          "8″ with writing $43"
        ],
        "desc": "Less sweet, home baking style.",
        "photo": "/images/menu/tiramisu.webp"
      },
      {
        "name": "Crème Brûlée Cheesecake",
        "price": "$5.35",
        "sizes": [
          "Slice $5.35",
          "8″ cake $38",
          "8″ with writing $43"
        ],
        "photo": "/images/menu/cream-brulee-cheesecake.webp"
      },
      {
        "name": "Blueberry Cheesecake",
        "price": "$6.00",
        "sizes": [
          "Slice $6.00",
          "8″ cake $44",
          "8″ with writing $49"
        ],
        "photo": "/images/menu/blueberry-cheesecake.webp"
      },
      {
        "name": "New York Cheesecake with Strawberry Cream",
        "price": "$6.00",
        "sizes": [
          "Slice $6.00",
          "8″ cake $44",
          "8″ with writing $49"
        ],
        "emoji": "🍓"
      },
      {
        "name": "Strawberry Tiramisu",
        "price": "$5.35",
        "sizes": [
          "Slice $5.35",
          "8″ cake $38",
          "8″ with writing $43"
        ],
        "photo": "/images/menu/strawberry-tiramisu.webp"
      }
    ],
    "note": "By the slice, or a whole 8″ cake. Writing on a whole cake is $5 more: order at least 1 day ahead, and keep it short."
  },
  {
    "id": "macarons",
    "label": "Macarons",
    "emoji": "🍬",
    "items": [
      {
        "name": "Peach Mango",
        "price": "$3.00",
        "photo": "/images/menu/peach-mango-macaron.webp"
      },
      {
        "name": "Nutella Chocolate",
        "price": "$3.00",
        "photo": "/images/menu/nutella-chocolate-macaron.webp"
      },
      {
        "name": "Vanilla Cream Cheese",
        "price": "$3.00",
        "photo": "/images/menu/vanilla-cream-cheese-macaron.webp"
      },
      {
        "name": "Cookies & Cream",
        "price": "$3.00",
        "photo": "/images/menu/cookies-cream-macaron.webp"
      },
      {
        "name": "Macaron Gift Set",
        "price": "$16.50",
        "sizes": [
          "12 Piece $33",
          "6 Piece $16.50"
        ],
        "photo": "/images/menu/macaron-gift-set.webp"
      },
      {
        "name": "Salted Caramel",
        "price": "$3.00",
        "photo": "/images/menu/salted-caramel-macaron.webp"
      },
      {
        "name": "Pistachio",
        "price": "$3.00",
        "photo": "/images/menu/pistachio-macaron.webp"
      },
      {
        "name": "Coffee",
        "price": "$3.00",
        "photo": "/images/menu/coffee-macaron.webp"
      },
      {
        "name": "Crème Brûlée",
        "price": "$3.30",
        "photo": "/images/menu/cream-brulee-macaron.webp"
      },
      {
        "name": "Cotton Candy",
        "price": "$3.00",
        "photo": "/images/menu/cotton-candy-macaron.webp"
      },
      {
        "name": "Raspberry",
        "price": "$3.00",
        "photo": "/images/menu/raspberry-macaron.webp"
      },
      {
        "name": "Rose Strawberry",
        "price": "$3.00",
        "photo": "/images/menu/rose-strawberry-macaron.webp"
      }
    ],
    "note": "Made with gluten-free almond flour, egg whites and powdered sugar."
  },
  {
    "id": "cookies",
    "label": "Cookies",
    "emoji": "🍪",
    "items": [
      {
        "name": "Oat Chocolate Chip Cookie",
        "price": "$5.70",
        "photo": "/images/menu/oat-chocolate-chip-cookie-gluten-free.webp",
        "tags": [
          "gluten-free"
        ]
      },
      {
        "name": "Birthday Mini Cookie",
        "price": "$2.26",
        "photo": "/images/menu/birthday-mini-cookie.webp"
      },
      {
        "name": "Chocolate Chip Mini Cookie",
        "price": "$2.26",
        "photo": "/images/menu/chocolate-chip-mini-cookie.webp"
      },
      {
        "name": "Oreo Mini Cookie",
        "price": "$2.26",
        "photo": "/images/menu/oreo-mini-cookie.webp"
      },
      {
        "name": "Peanut Butter Cookie",
        "price": "$5.50",
        "desc": "Contains gluten.",
        "photo": "/images/menu/peanut-butter-cookie.webp"
      },
      {
        "name": "Birthday Cake Cookie",
        "price": "$5.50",
        "desc": "Contains gluten.",
        "photo": "/images/menu/birthday-cake.webp"
      },
      {
        "name": "Vanilla Bean Decorated Cookie",
        "price": "$5.80",
        "photo": "/images/menu/vanilla-bean-decorated-cookie.webp"
      },
      {
        "name": "Salted Caramel Cookie",
        "price": "$5.50",
        "photo": "/images/menu/salted-caramel-cookie.webp"
      },
      {
        "name": "Chocolate Chip Deluxe",
        "price": "$5.50",
        "photo": "/images/menu/chocolate-chip-deluxe.webp"
      },
      {
        "name": "Red Velvet Cookie",
        "price": "$4.20",
        "desc": "Stuffed with cream cheese.",
        "emoji": "🍪"
      },
      {
        "name": "Oreo Cookie",
        "price": "$5.50",
        "desc": "Final boss of cookie.",
        "photo": "/images/menu/oreo-cookie.webp"
      },
      {
        "name": "Mini Cookie Gift Set",
        "price": "$13.52",
        "sizes": [
          "12 Piece $25.82",
          "6 Piece $13.52"
        ],
        "desc": "Chocolate chip, Oreo and birthday mini cookies.",
        "photo": "/images/menu/mini-cookie-gift-set.webp"
      },
      {
        "name": "Meringue Cookie Cup",
        "price": "$6.50",
        "desc": "Egg white and sugar.",
        "photo": "/images/menu/meringue-cookie-cup.webp",
        "tags": [
          "gluten-free"
        ]
      }
    ],
    "note": "Our signature soft-baked cookies, with a rich center."
  },
  {
    "id": "pastries",
    "label": "Brownies & bars",
    "emoji": "🍫",
    "items": [
      {
        "name": "Coconut Macaroon",
        "price": "$4.50",
        "photo": "/images/menu/coconut-macaroon.webp"
      },
      {
        "name": "Cookie Brownie",
        "price": "$4.50",
        "photo": "/images/menu/cookie-brownie.webp"
      },
      {
        "name": "Coconut Bar",
        "price": "$4.50",
        "photo": "/images/menu/coconut-bar.webp"
      },
      {
        "name": "Lemon Bar",
        "price": "$4.50",
        "photo": "/images/menu/lemon-bar.webp"
      },
      {
        "name": "Deep Deep Chocolate Brownie",
        "price": "$4.50",
        "photo": "/images/menu/deep-deep-chocolate-brownie.webp"
      },
      {
        "name": "Salted Nutella Brownie",
        "price": "$4.50",
        "photo": "/images/menu/salted-nutella-brownie.webp"
      }
    ]
  },
  {
    "id": "gelato",
    "label": "Gelato",
    "emoji": "🍨",
    "items": [
      {
        "name": "1 Scoop",
        "price": "$4.20",
        "emoji": "🍨"
      },
      {
        "name": "2 Scoops",
        "price": "$6.99",
        "desc": "Large 20 oz cup, up to 3 flavors.",
        "emoji": "🍨"
      }
    ],
    "note": "Paciugo gelato. Flavors: French vanilla, chocolate and strawberry."
  },
  {
    "id": "coffee",
    "label": "Coffee & lattes",
    "emoji": "☕",
    "items": [
      {
        "name": "Americano",
        "price": "$2.95",
        "emoji": "☕"
      },
      {
        "name": "Cappuccino",
        "price": "$4.75",
        "emoji": "☕"
      },
      {
        "name": "Cafe Latte",
        "price": "$4.25",
        "emoji": "☕"
      },
      {
        "name": "Mocha Latte",
        "price": "$4.75",
        "photo": "/images/menu/mocha-latte.webp"
      },
      {
        "name": "Caramel Latte",
        "price": "$4.75",
        "emoji": "🍯"
      },
      {
        "name": "Vanilla Latte",
        "price": "$4.75",
        "emoji": "🤍"
      },
      {
        "name": "Hazelnut Latte",
        "price": "$4.75",
        "emoji": "☕"
      },
      {
        "name": "White Chocolate Mocha Latte",
        "price": "$4.75",
        "emoji": "🍫"
      },
      {
        "name": "Salted Caramel Latte",
        "price": "$4.75",
        "emoji": "🍯"
      },
      {
        "name": "Peppermint Mocha Latte",
        "price": "$4.75",
        "emoji": "🍫"
      },
      {
        "name": "Peppermint Latte",
        "price": "$4.75",
        "emoji": "🌿"
      },
      {
        "name": "Espresso Shot",
        "price": "$1.95",
        "emoji": "☕"
      },
      {
        "name": "Tiger Black Sugar Latte",
        "price": "$4.95",
        "photo": "/images/menu/tiger-black-sugar-latte.webp"
      },
      {
        "name": "French Mocha Latte",
        "price": "$5.25",
        "photo": "/images/menu/french-mocha-latte.webp"
      },
      {
        "name": "Chai Latte",
        "price": "$4.25",
        "emoji": "☕"
      },
      {
        "name": "Chocolate Latte",
        "price": "$3.45",
        "desc": "Hot chocolate, just like hot cocoa. Great with marshmallow.",
        "emoji": "🍫"
      },
      {
        "name": "Hot Tea",
        "price": "$2.99",
        "emoji": "☕"
      },
      {
        "name": "White Chocolate Latte",
        "price": "$3.45",
        "emoji": "🍫"
      }
    ],
    "note": "Hot or iced (iced is 75¢ more on espresso drinks). Swap to soy, almond, coconut or non-fat milk for 75¢.",
    "sizeNote": "Sizes (on Americano): Medium $2.95 · Large $3.45."
  },
  {
    "id": "frappes",
    "label": "Frappes & smoothies",
    "emoji": "🥤",
    "items": [
      {
        "name": "Taro Frappe",
        "price": "$5.99",
        "emoji": "💜"
      },
      {
        "name": "Matcha Frappe",
        "price": "$5.99",
        "desc": "Contains caffeine.",
        "photo": "/images/menu/matcha-frappe.webp"
      },
      {
        "name": "Chocolate Frappe",
        "price": "$5.99",
        "emoji": "🍫"
      },
      {
        "name": "Coffee Frappe",
        "price": "$5.99",
        "desc": "Contains espresso.",
        "emoji": "🥤"
      },
      {
        "name": "Caramel Frappe",
        "price": "$5.99",
        "desc": "Contains espresso.",
        "photo": "/images/menu/caramel-frappe.webp"
      },
      {
        "name": "Mocha Frappe",
        "price": "$5.99",
        "desc": "Contains espresso.",
        "emoji": "🍫"
      },
      {
        "name": "Coconut Frappe",
        "price": "$5.99",
        "emoji": "🥥"
      },
      {
        "name": "Peach Smoothie",
        "price": "$5.99",
        "emoji": "🍑"
      },
      {
        "name": "Pina Colada Smoothie",
        "price": "$5.99",
        "emoji": "🍍"
      },
      {
        "name": "Passion Fruit Smoothie",
        "price": "$5.99",
        "emoji": "💛"
      },
      {
        "name": "Lychee Smoothie",
        "price": "$5.99",
        "emoji": "🤍"
      },
      {
        "name": "Banana Smoothie",
        "price": "$5.99",
        "emoji": "🍌"
      },
      {
        "name": "Honeydew Smoothie",
        "price": "$5.99",
        "emoji": "🍈"
      },
      {
        "name": "Lemon Smoothie",
        "price": "$5.99",
        "emoji": "🍋"
      },
      {
        "name": "Wildberry Smoothie",
        "price": "$5.99",
        "emoji": "🫐"
      }
    ],
    "note": "Smoothies are made with real fruit. Add toppings like boba, jelly or poppers for 75¢ each.",
    "sizeNote": "Sizes (on Taro Frappe): Medium $5.99 · Large $6.49."
  },
  {
    "id": "bubble-tea",
    "label": "Bubble tea",
    "emoji": "🧋",
    "items": [
      {
        "name": "Mango Star Green Tea",
        "price": "$5.45",
        "photo": "/images/menu/mango-star-green-tea.webp"
      },
      {
        "name": "Peach Tango Green Tea",
        "price": "$5.45",
        "emoji": "🍑"
      },
      {
        "name": "Tropical Passion Fruit Black Tea",
        "price": "$5.45",
        "emoji": "💛"
      },
      {
        "name": "Granny Green Apple Green Tea",
        "price": "$5.45",
        "emoji": "🍏"
      },
      {
        "name": "Chewy Lychee Green Tea",
        "price": "$5.45",
        "emoji": "🤍"
      },
      {
        "name": "Real Kiwi Green Tea",
        "price": "$5.45",
        "emoji": "🥝"
      },
      {
        "name": "Jasmine Honey Green Tea",
        "price": "$5.45",
        "emoji": "🍯"
      },
      {
        "name": "Honeydew Green Tea",
        "price": "$5.45",
        "emoji": "🍈"
      },
      {
        "name": "Pomegranate Black Tea",
        "price": "$5.45",
        "emoji": "❤️"
      },
      {
        "name": "Blueberry Black Tea",
        "price": "$5.45",
        "emoji": "🫐"
      },
      {
        "name": "Raspberry Black Tea",
        "price": "$5.45",
        "emoji": "🫐"
      },
      {
        "name": "Yuja Green Tea",
        "price": "$5.45",
        "emoji": "🍊"
      },
      {
        "name": "Aloe Green Tea",
        "price": "$5.45",
        "emoji": "🌱"
      },
      {
        "name": "Ginger Black Tea",
        "price": "$5.45",
        "emoji": "🫚"
      }
    ],
    "note": "Hot or iced. Choose jelly & popper or tapioca pearls, or add extra toppings for 75¢ each."
  },
  {
    "id": "milk-tea",
    "label": "Milk tea",
    "emoji": "🧋",
    "items": [
      {
        "name": "Original Milk Tea",
        "price": "$5.45",
        "emoji": "🧋"
      },
      {
        "name": "Thai Milk Tea",
        "price": "$5.45",
        "photo": "/images/menu/thai-milk-tea.webp"
      },
      {
        "name": "Chocolate Black Milk Tea",
        "price": "$5.45",
        "emoji": "🍫"
      },
      {
        "name": "Taro Milk Tea",
        "price": "$5.45",
        "photo": "/images/menu/taro-milk-tea.webp"
      },
      {
        "name": "Matcha Milk Tea",
        "price": "$5.45",
        "photo": "/images/menu/matcha-milk-tea.webp"
      },
      {
        "name": "Coffee Black Milk Tea",
        "price": "$5.45",
        "emoji": "🧋"
      },
      {
        "name": "Coconut Black Milk Tea",
        "price": "$5.45",
        "emoji": "🥥"
      },
      {
        "name": "Jasmine Green Milk Tea",
        "price": "$5.45",
        "emoji": "🌸"
      },
      {
        "name": "Almond Black Milk Tea",
        "price": "$5.45",
        "emoji": "🌰"
      },
      {
        "name": "Mango Green Milk Tea",
        "price": "$5.45",
        "emoji": "🥭"
      },
      {
        "name": "Tiger Black Sugar Milk Tea",
        "price": "$5.95",
        "desc": "Boba (tapioca pearl) is optional.",
        "photo": "/images/menu/tiger-black-sugar-milk-tea.webp"
      },
      {
        "name": "Rose Milk Tea",
        "price": "$4.95",
        "emoji": "🌹"
      },
      {
        "name": "Strawberry Sensation Milk Tea",
        "price": "$5.45",
        "desc": "Strawberry sensation yogurt ice cream with puree, tea, and milk.",
        "emoji": "🍓"
      },
      {
        "name": "Vanilla Bean Sensation Milk Tea",
        "price": "$5.45",
        "desc": "French vanilla yogurt ice cream, vanilla bean, and milk included.",
        "emoji": "🤍"
      },
      {
        "name": "Chocolate Sensation Milk Tea",
        "price": "$5.45",
        "desc": "Triple chocolate yogurt ice cream, milk chocolate, dark chocolate, black tea, and milk included.",
        "emoji": "🍫"
      }
    ],
    "note": "Hot or iced, less ice or less sweet. Add toppings for 75¢ each."
  },
  {
    "id": "hot-tea",
    "label": "Fresh unsweet tea",
    "emoji": "🍵",
    "items": [
      {
        "name": "Chamomile Lavender",
        "price": "$3.49",
        "emoji": "🪻",
        "tags": [
          "caffeine-free"
        ]
      },
      {
        "name": "Lemon Echinacea",
        "price": "$3.49",
        "emoji": "🍋",
        "tags": [
          "caffeine-free"
        ]
      },
      {
        "name": "Chamomile",
        "price": "$3.49",
        "emoji": "🌼",
        "tags": [
          "caffeine-free"
        ]
      },
      {
        "name": "Mint",
        "price": "$3.49",
        "emoji": "🌿",
        "tags": [
          "caffeine-free"
        ]
      },
      {
        "name": "Dandelion Peach",
        "price": "$3.49",
        "emoji": "🍑"
      },
      {
        "name": "Rooibos Hibiscus",
        "price": "$3.49",
        "emoji": "🌺",
        "tags": [
          "caffeine-free"
        ]
      },
      {
        "name": "Butterfly Pea Flower",
        "price": "$3.49",
        "emoji": "🦋",
        "tags": [
          "caffeine-free"
        ]
      },
      {
        "name": "Earl Grey",
        "price": "$3.49",
        "emoji": "🫖"
      },
      {
        "name": "Red Refresh Herbal Tea",
        "price": "$3.49",
        "emoji": "🍵",
        "tags": [
          "caffeine-free"
        ]
      },
      {
        "name": "Oolong Jasmine Green Tea",
        "price": "$3.49",
        "emoji": "🫖"
      },
      {
        "name": "Lemon Ginger",
        "price": "$3.49",
        "emoji": "🍋",
        "tags": [
          "caffeine-free"
        ]
      }
    ],
    "note": "Served hot, or cold for $1 more.",
    "sizeNote": "Sizes (on Chamomile Lavender): Medium $3.49 · Large $3.99."
  }
]

export const coitMenu: MenuCategory[] = [
  {
    "id": "cakes",
    "label": "Cakes & cheesecakes",
    "emoji": "🍰",
    "items": [
      {
        "name": "Double Chocolate Layer Cake",
        "price": "$6.70",
        "sizes": [
          "Slice $6.70",
          "Whole $43.26"
        ],
        "photo": "/images/menu/double-chocolate-layer-cake.webp"
      },
      {
        "name": "Red Velvet Cake",
        "price": "$6.70",
        "sizes": [
          "Slice $6.70",
          "Whole $43.26"
        ],
        "photo": "/images/menu/red-velvet-cake.webp"
      },
      {
        "name": "Tiramisu",
        "price": "$6.44",
        "sizes": [
          "Slice $6.44",
          "Whole $39.14"
        ],
        "photo": "/images/menu/tiramisu.webp"
      },
      {
        "name": "Strawberry Tiramisu",
        "price": "$6.44",
        "sizes": [
          "Slice $6.44",
          "Whole $39.14"
        ],
        "photo": "/images/menu/strawberry-tiramisu.webp"
      },
      {
        "name": "New York Cheesecake",
        "price": "$6.18",
        "sizes": [
          "Slice $6.18",
          "Whole $35.02"
        ],
        "photo": "/images/menu/new-york-cheesecake.webp"
      },
      {
        "name": "Crème Brûlée Cheesecake",
        "price": "$6.44",
        "sizes": [
          "Slice $6.44",
          "Whole $39.14"
        ],
        "photo": "/images/menu/cream-brulee-cheesecake.webp"
      },
      {
        "name": "Strawberry Cheesecake",
        "price": "$6.70",
        "sizes": [
          "Slice $6.70",
          "Whole $43.26"
        ],
        "emoji": "🍓"
      },
      {
        "name": "Blueberry Cheesecake",
        "price": "$6.70",
        "sizes": [
          "Slice $6.70",
          "Whole $43.26"
        ],
        "photo": "/images/menu/blueberry-cheesecake.webp"
      },
      {
        "name": "Oreo Cheesecake",
        "price": "$6.44",
        "sizes": [
          "Slice $6.44",
          "Whole $39.14"
        ],
        "photo": "/images/menu/oreo-cheesecake.webp"
      },
      {
        "name": "Apple Crumble Cheesecake",
        "price": "$6.44",
        "sizes": [
          "Slice $6.44",
          "Whole $39.14"
        ],
        "emoji": "🍏"
      }
    ],
    "note": "By the slice, or a whole cake. For writing on a whole cake, order at least 1 day ahead and keep it short."
  },
  {
    "id": "macarons",
    "label": "Macarons",
    "emoji": "🍬",
    "items": [
      {
        "name": "1 Piece Macaron",
        "price": "$2.83",
        "photo": "/images/menu/peach-mango-macaron.webp"
      },
      {
        "name": "6 Piece Macarons",
        "price": "$16.48",
        "photo": "/images/menu/macaron-gift-set.webp"
      },
      {
        "name": "12 Piece Macarons",
        "price": "$30.90",
        "photo": "/images/menu/macaron-gift-set.webp"
      }
    ],
    "note": "Flavors: cotton candy, vanilla, strawberry rose, salted caramel, Nutella, cookies & cream, pistachio, coffee, peach mango, strawberry, raspberry and crème brûlée (25¢ more)."
  },
  {
    "id": "croffles",
    "label": "Croffles",
    "emoji": "🧇",
    "items": [
      {
        "name": "Original Croffle (1 Piece)",
        "price": "$4.64",
        "emoji": "🧇"
      },
      {
        "name": "Original Croffle (2 Pieces)",
        "price": "$8.76",
        "emoji": "🧇"
      },
      {
        "name": "Oreo Croffle",
        "price": "$7.72",
        "emoji": "🖤"
      },
      {
        "name": "Banana Croffle",
        "price": "$7.72",
        "emoji": "🍌"
      },
      {
        "name": "Nutella Croffle",
        "price": "$8.24",
        "emoji": "🧇"
      },
      {
        "name": "Tiramisu Croffle",
        "price": "$8.24",
        "emoji": "🧇"
      },
      {
        "name": "Avocado Croffle",
        "price": "$10.82",
        "emoji": "🥑"
      }
    ],
    "note": "A croissant pressed in a waffle iron. Add toppings like Oreo, sprinkles or boba for 75¢ each."
  },
  {
    "id": "cookies",
    "label": "Cookies & pastries",
    "emoji": "🍪",
    "items": [
      {
        "name": "6 Piece Mix & Match",
        "price": "$21.63",
        "emoji": "🍪"
      },
      {
        "name": "12 Piece Mix & Match",
        "price": "$42.23",
        "emoji": "🍪"
      },
      {
        "name": "Deep Deep Chocolate Brownie",
        "price": "$3.86",
        "photo": "/images/menu/deep-deep-chocolate-brownie.webp"
      },
      {
        "name": "Salted Nutella Brownie",
        "price": "$3.86",
        "photo": "/images/menu/salted-nutella-brownie.webp"
      },
      {
        "name": "Lemon Bar",
        "price": "$3.86",
        "photo": "/images/menu/lemon-bar.webp"
      },
      {
        "name": "Coconut Macaroon",
        "price": "$3.86",
        "photo": "/images/menu/coconut-macaroon.webp"
      },
      {
        "name": "Chocolate Chip Cookie",
        "price": "$3.86",
        "emoji": "🍫"
      },
      {
        "name": "Walnut Chocolate Cookie",
        "price": "$3.86",
        "emoji": "🍫"
      },
      {
        "name": "Birthday Cake Cookie",
        "price": "$3.86",
        "emoji": "🍰"
      },
      {
        "name": "Biscoff Cookie",
        "price": "$3.86",
        "emoji": "🍪"
      },
      {
        "name": "Oreo Cookie",
        "price": "$3.86",
        "emoji": "🖤"
      },
      {
        "name": "Red Velvet Cookie",
        "price": "$3.86",
        "emoji": "🍪"
      },
      {
        "name": "Vanilla Bean Decorated Cookie",
        "price": "$5.14",
        "photo": "/images/menu/vanilla-bean-decorated-cookie.webp"
      },
      {
        "name": "Meringue Cookie Cup",
        "price": "$3.86",
        "photo": "/images/menu/meringue-cookie-cup.webp",
        "tags": [
          "gluten-free"
        ]
      },
      {
        "name": "Gluten-Free Deep Deep Brownie",
        "price": "$3.86",
        "emoji": "🍫",
        "tags": [
          "gluten-free"
        ]
      },
      {
        "name": "Gluten-Free Oatmeal Chocolate Chip Cookie",
        "price": "$3.86",
        "emoji": "🍫",
        "tags": [
          "gluten-free"
        ]
      }
    ],
    "note": "Mix & match boxes can include any of these (gluten-free picks are $1 more)."
  },
  {
    "id": "gelato",
    "label": "Gelato",
    "emoji": "🍨",
    "items": [
      {
        "name": "1 Scoop Gelato",
        "price": "$3.60",
        "sizes": [
          "Waffle cone +$1.03",
          "Bowl"
        ],
        "emoji": "🍨"
      },
      {
        "name": "2 Scoop Gelato",
        "price": "$6.13",
        "sizes": [
          "Waffle cone +$1.03",
          "Bowl"
        ],
        "emoji": "🍨"
      },
      {
        "name": "3 Scoop Gelato",
        "price": "$7.71",
        "sizes": [
          "Waffle cone +$1.03",
          "Bowl"
        ],
        "emoji": "🍨"
      }
    ],
    "note": "Flavors: mango sorbet, raspberry sorbet, strawberry, chocolate, birthday cake, pistachio, vanilla, caramel pecan and banana cream. In a bowl, or a waffle cone for $1.03 more."
  },
  {
    "id": "coffee",
    "label": "Coffee & lattes",
    "emoji": "☕",
    "items": [
      {
        "name": "Americano",
        "price": "$3.86",
        "emoji": "☕"
      },
      {
        "name": "Cafe Latte",
        "price": "$4.89",
        "emoji": "☕"
      },
      {
        "name": "Cappuccino",
        "price": "$4.89",
        "emoji": "☕"
      },
      {
        "name": "French Vanilla",
        "price": "$5.41",
        "emoji": "🤍"
      },
      {
        "name": "Hazelnut",
        "price": "$5.41",
        "emoji": "☕"
      },
      {
        "name": "Mocha",
        "price": "$5.92",
        "emoji": "🍫"
      },
      {
        "name": "Caramel",
        "price": "$5.92",
        "emoji": "🍯"
      },
      {
        "name": "White Chocolate",
        "price": "$5.92",
        "emoji": "🍫"
      },
      {
        "name": "Double Espresso Shot",
        "price": "$3.09",
        "emoji": "☕"
      },
      {
        "name": "Hot Choco Latte (No Espresso)",
        "price": "$4.64",
        "emoji": "🍫"
      },
      {
        "name": "Hot White Chocolate (No Espresso)",
        "price": "$4.64",
        "emoji": "🍫"
      },
      {
        "name": "Tiramisu Foam Latte",
        "price": "$5.92",
        "emoji": "☕"
      },
      {
        "name": "Dalgona Latte",
        "price": "$5.92",
        "emoji": "☕"
      },
      {
        "name": "Lavender Cloud Latte",
        "price": "$5.92",
        "emoji": "🪻"
      },
      {
        "name": "Milky Dolce Latte",
        "price": "$5.92",
        "emoji": "☕"
      }
    ],
    "sizeNote": "Sizes (on Americano): Small (12oz) $3.86 · Medium (16oz) $4.12 · Large (24oz) $4.89."
  },
  {
    "id": "frappes",
    "label": "Smoothies & frappes",
    "emoji": "🥤",
    "items": [
      {
        "name": "Mango",
        "price": "$6.18",
        "emoji": "🥭"
      },
      {
        "name": "Mango Strawberry",
        "price": "$6.18",
        "emoji": "🥭"
      },
      {
        "name": "Strawberry",
        "price": "$6.18",
        "emoji": "🍓"
      },
      {
        "name": "Strawberry Banana",
        "price": "$6.18",
        "emoji": "🍓"
      },
      {
        "name": "Pina Colada",
        "price": "$6.18",
        "emoji": "🍍"
      },
      {
        "name": "Dragon Fruit",
        "price": "$6.18",
        "emoji": "🐉"
      },
      {
        "name": "Lychee",
        "price": "$6.18",
        "emoji": "🤍"
      },
      {
        "name": "Avocado",
        "price": "$6.18",
        "emoji": "🥑"
      },
      {
        "name": "Taro",
        "price": "$6.18",
        "emoji": "💜"
      },
      {
        "name": "Oreo",
        "price": "$6.18",
        "emoji": "🖤"
      },
      {
        "name": "Coffee",
        "price": "$6.18",
        "emoji": "🥤"
      },
      {
        "name": "Caramel",
        "price": "$6.18",
        "emoji": "🍯"
      },
      {
        "name": "Vanilla Bean",
        "price": "$6.18",
        "emoji": "🤍"
      },
      {
        "name": "Matcha",
        "price": "$6.18",
        "photo": "/images/menu/matcha-frappe.webp"
      },
      {
        "name": "Chocolate",
        "price": "$6.18",
        "emoji": "🍫"
      }
    ],
    "note": "Add 25g of protein powder for $2.",
    "sizeNote": "Sizes (on Mango): Medium $6.18 · Large $6.70."
  },
  {
    "id": "bubble-tea",
    "label": "Bubble tea",
    "emoji": "🧋",
    "items": [
      {
        "name": "Mango Star (Green Tea)",
        "price": "$4.89",
        "photo": "/images/menu/mango-star-green-tea.webp"
      },
      {
        "name": "Honeydew (Green Tea)",
        "price": "$4.89",
        "emoji": "🍈"
      },
      {
        "name": "Watermelon (Green Tea)",
        "price": "$4.89",
        "emoji": "🍉"
      },
      {
        "name": "Jasmine Honey (Green Tea)",
        "price": "$4.89",
        "emoji": "🍯"
      },
      {
        "name": "Aloe (Green Tea)",
        "price": "$4.89",
        "emoji": "🌱"
      },
      {
        "name": "Lychee (Green Tea)",
        "price": "$4.89",
        "emoji": "🤍"
      },
      {
        "name": "Green Apple (Green Tea)",
        "price": "$4.89",
        "emoji": "🍏"
      },
      {
        "name": "Ginger (Black Tea)",
        "price": "$4.89",
        "emoji": "🫚"
      },
      {
        "name": "Hibiscus (Black Tea)",
        "price": "$4.89",
        "emoji": "🌺"
      },
      {
        "name": "Raspberry (Black Tea)",
        "price": "$4.89",
        "emoji": "🫐"
      },
      {
        "name": "Peach Tango (Black Tea)",
        "price": "$4.89",
        "emoji": "🍑"
      },
      {
        "name": "Passionfruit (Black Tea)",
        "price": "$4.89",
        "emoji": "💛"
      },
      {
        "name": "Strawberry Heart (Black Tea)",
        "price": "$4.89",
        "emoji": "🍓"
      }
    ],
    "note": "Add toppings like boba, jelly or poppers for 75¢ each. Swap to oat, soy, almond or coconut milk for 75¢.",
    "sizeNote": "Sizes (on Mango Star (Green Tea)): Medium $4.89 · Large $5.41."
  },
  {
    "id": "milk-tea",
    "label": "Milk tea",
    "emoji": "🧋",
    "items": [
      {
        "name": "Strawberry Matcha (Green Tea)",
        "price": "$5.15",
        "emoji": "🍓"
      },
      {
        "name": "Matcha (Green Tea)",
        "price": "$5.15",
        "photo": "/images/menu/matcha-milk-tea.webp"
      },
      {
        "name": "Strawberry (Green Tea)",
        "price": "$5.15",
        "emoji": "🍓"
      },
      {
        "name": "Mango (Green Tea)",
        "price": "$5.15",
        "emoji": "🥭"
      },
      {
        "name": "Jasmine (Green Tea)",
        "price": "$5.15",
        "emoji": "🌸"
      },
      {
        "name": "Original (Black Tea)",
        "price": "$5.15",
        "emoji": "🧋"
      },
      {
        "name": "Rose (Black Tea)",
        "price": "$5.15",
        "emoji": "🌹"
      },
      {
        "name": "Lavender (Black Tea)",
        "price": "$5.15",
        "emoji": "🪻"
      },
      {
        "name": "Coffee (Black Tea)",
        "price": "$5.15",
        "emoji": "🧋"
      },
      {
        "name": "Thai (Black Tea)",
        "price": "$5.15",
        "photo": "/images/menu/thai-milk-tea.webp"
      },
      {
        "name": "Coconut (Black Tea)",
        "price": "$5.15",
        "emoji": "🥥"
      },
      {
        "name": "Dragon Fruit (Black Tea)",
        "price": "$5.15",
        "emoji": "🐉"
      },
      {
        "name": "Caramel (Black Tea)",
        "price": "$5.15",
        "emoji": "🍯"
      },
      {
        "name": "Chocolate (Black Tea)",
        "price": "$5.15",
        "emoji": "🍫"
      },
      {
        "name": "Taro",
        "price": "$5.15",
        "emoji": "💜",
        "tags": [
          "caffeine-free"
        ]
      },
      {
        "name": "Tiger Brown Sugar",
        "price": "$5.15",
        "emoji": "🧋",
        "tags": [
          "caffeine-free"
        ]
      }
    ],
    "note": "Add toppings for 75¢ each. Swap to oat, soy, almond or coconut milk for 75¢.",
    "sizeNote": "Sizes (on Strawberry Matcha (Green Tea)): Medium $5.15 · Large $5.66."
  }
]

export const menus: Record<StoreId, MenuCategory[]> = {
  fm423: fm423Menu,
  coit: coitMenu,
}
