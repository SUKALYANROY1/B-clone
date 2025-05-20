import { CategoryCard } from "@/components/CategoryCard";
import Link from "next/link";

const mainCategories = [
  {
    id: "grocery-kitchen",
    name: "Grocery & Kitchen",
    description: "Essential groceries and kitchen supplies for your home",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=60",
    subcategories: [
      {
        id: "fruits-vegetables",
        name: "Fruits & Vegetables",
        description: "Fresh fruits and vegetables",
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=60",
        itemCount: 150,
      },
      {
        id: "dairy-bread",
        name: "Dairy & Bread",
        description: "Milk, curd, bread and bakery items",
        image: "https://images.unsplash.com/photo-1488477181946-6428a848b919?w=500&auto=format&fit=crop&q=60",
        itemCount: 80,
      },
      {
        id: "rice-dal",
        name: "Rice & Dal",
        description: "All types of rice, pulses and grains",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60",
        itemCount: 60,
      },
      {
        id: "masala-oil",
        name: "Masala, Oil & Ghee",
        description: "Cooking oils, ghee and spices",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=60",
        itemCount: 90,
      },
    ],
  },
  {
    id: "snacks-drinks",
    name: "Snacks & Drinks",
    description: "Your favorite snacks and beverages",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60",
    subcategories: [
      {
        id: "beverages",
        name: "Beverages",
        description: "Soft drinks, juices and energy drinks",
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&auto=format&fit=crop&q=60",
        itemCount: 120,
      },
      {
        id: "chips-crisps",
        name: "Chips & Crisps",
        description: "Potato chips, nachos and more",
        image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=60",
        itemCount: 85,
      },
      {
        id: "chocolates",
        name: "Chocolates & Candies",
        description: "Chocolates, candies and sweets",
        image: "https://images.unsplash.com/photo-1582176604856-e824b4736522?w=500&auto=format&fit=crop&q=60",
        itemCount: 95,
      },
      {
        id: "biscuits",
        name: "Biscuits & Cookies",
        description: "Sweet and savory biscuits",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=60",
        itemCount: 110,
      },
    ],
  },
  {
    id: "beauty-personal-care",
    name: "Beauty & Personal Care",
    description: "Personal care and beauty products",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60",
    subcategories: [
      {
        id: "skincare",
        name: "Skincare",
        description: "Face wash, creams and lotions",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=60",
        itemCount: 160,
      },
      {
        id: "haircare",
        name: "Hair Care",
        description: "Shampoo, conditioner and hair oils",
        image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop&q=60",
        itemCount: 140,
      },
      {
        id: "oral-care",
        name: "Oral Care",
        description: "Toothpaste, brushes and mouthwash",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&auto=format&fit=crop&q=60",
        itemCount: 75,
      },
      {
        id: "makeup",
        name: "Makeup",
        description: "Cosmetics and beauty products",
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format&fit=crop&q=60",
        itemCount: 200,
      },
    ],
  },
  {
    id: "household-essentials",
    name: "Household Essentials",
    description: "Essential items for your home",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=60",
    subcategories: [
      {
        id: "cleaning",
        name: "Cleaning Supplies",
        description: "Detergents, cleaners and more",
        image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&auto=format&fit=crop&q=60",
        itemCount: 180,
      },
      {
        id: "kitchen-essentials",
        name: "Kitchen Essentials",
        description: "Utensils and kitchen accessories",
        image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&auto=format&fit=crop&q=60",
        itemCount: 150,
      },
      {
        id: "bathroom",
        name: "Bathroom Essentials",
        description: "Bathroom accessories and supplies",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=60",
        itemCount: 120,
      },
      {
        id: "storage",
        name: "Storage & Organization",
        description: "Storage solutions and organizers",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60",
        itemCount: 90,
      },
    ],
  },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Categories</h1>
        <p className="mt-2 text-gray-600">Browse through our wide range of categories</p>
      </div>

      <div className="space-y-12">
        {mainCategories.map((category) => (
          <section key={category.id} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
              <Link
                href={`/category/${category.id}`}
                className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {category.subcategories.map((subcategory) => (
                <CategoryCard
                  key={subcategory.id}
                  id={`${category.id}/${subcategory.id}`}
                  name={subcategory.name}
                  image={subcategory.image}
                  description={subcategory.description}
                  itemCount={subcategory.itemCount}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
} 