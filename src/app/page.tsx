import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { getDeliveryTime } from "@/lib/utils";

const featuredProducts = [
  {
    id: "1",
    name: "Fresh Bananas",
    price: 49,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=60",
    unit: "6 pcs",
    discount: 10,
  },
  {
    id: "2",
    name: "Organic Tomatoes",
    price: 39,
    image: "https://images.unsplash.com/photo-1546094098411-e0b9bb7e2de8?w=500&auto=format&fit=crop&q=60",
    unit: "500g",
  },
  {
    id: "3",
    name: "Fresh Milk",
    price: 65,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=60",
    unit: "1L",
    discount: 5,
  },
  {
    id: "4",
    name: "Brown Bread",
    price: 35,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60",
    unit: "400g",
  },
];

const featuredCategories = [
  {
    id: "fruits-vegetables",
    name: "Fruits & Vegetables",
    description: "Fresh fruits and vegetables delivered to your doorstep",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=60",
    itemCount: 150,
  },
  {
    id: "dairy-bread",
    name: "Dairy & Bread",
    description: "Fresh dairy products and bakery items",
    image: "https://images.unsplash.com/photo-1488477181946-6428a848b919?w=500&auto=format&fit=crop&q=60",
    itemCount: 80,
  },
  {
    id: "beverages",
    name: "Beverages",
    description: "Hot and cold beverages for every occasion",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&auto=format&fit=crop&q=60",
    itemCount: 120,
  },
  {
    id: "snacks-branded",
    name: "Snacks & Branded Foods",
    description: "Your favorite snacks and branded foods",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60",
    itemCount: 200,
  },
  {
    id: "cleaning-essentials",
    name: "Cleaning Essentials",
    description: "Everything you need for a sparkling clean home",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&auto=format&fit=crop&q=60",
    itemCount: 180,
  },
  {
    id: "kitchen-dining",
    name: "Kitchen & Dining",
    description: "Utensils, cookware, and dining essentials",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&auto=format&fit=crop&q=60",
    itemCount: 150,
  },
  {
    id: "bath-body",
    name: "Bath & Body",
    description: "Soaps, shampoos, and personal hygiene products",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=60",
    itemCount: 120,
  },
  {
    id: "pet-care",
    name: "Pet Care",
    description: "Food, treats, and supplies for your pets",
    image: "https://images.unsplash.com/photo-1583860312259-4386853a70d5?w=500&auto=format&fit=crop&q=60",
    itemCount: 90,
  },
  {
    id: "baby-care",
    name: "Baby Care",
    description: "Everything for your little one",
    image: "https://images.unsplash.com/photo-1595205451713-df6f06268b44?w=500&auto=format&fit=crop&q=60",
    itemCount: 110,
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Categories Section */}
      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
            <p className="text-sm text-gray-600">Browse through our wide range of categories</p>
          </div>
          <a
            href="/categories"
            className="rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
          >
            View all categories →
          </a>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-9 lg:grid-cols-18">
          {featuredCategories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-sm text-gray-600">Handpicked products for you</p>
          </div>
          <a
            href="/products"
            className="rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
          >
            View all products →
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="transform transition-transform hover:scale-105">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
