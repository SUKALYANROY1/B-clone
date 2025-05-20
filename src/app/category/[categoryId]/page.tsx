import { ProductCard } from "@/components/ProductCard";
import { notFound } from "next/navigation";
import Link from "next/link";

// This would typically come from a database
const categoryProducts = {
  "grocery-kitchen": {
    name: "Grocery & Kitchen",
    description: "Essential groceries and kitchen supplies for your home",
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
    ],
  },
  "grocery-kitchen/fruits-vegetables": {
    name: "Fruits & Vegetables",
    products: [
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
    ],
  },
  "snacks-drinks": {
    name: "Snacks & Drinks",
    description: "Your favorite snacks and beverages",
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
    ],
  },
  "snacks-drinks/beverages": {
    name: "Beverages",
    products: [
      {
        id: "3",
        name: "Cola Drink",
        price: 45,
        image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop&q=60",
        unit: "2L",
        discount: 5,
      },
      {
        id: "4",
        name: "Orange Juice",
        price: 99,
        image: "https://images.unsplash.com/photo-16134782237194052cbe61a55f?w=500&auto=format&fit=crop&q=60",
        unit: "1L",
      },
    ],
  },
};

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = params;
  const category = categoryProducts[categoryId as keyof typeof categoryProducts];

  if (!category) {
    notFound();
  }

  // Check if this is a main category (has subcategories) or a subcategory (has products)
  const isMainCategory = 'subcategories' in category;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
        {isMainCategory ? (
          <p className="mt-2 text-gray-600">{category.description}</p>
        ) : (
          <p className="mt-2 text-gray-600">Browse our selection of {category.name.toLowerCase()}</p>
        )}
      </div>

      {isMainCategory ? (
        // Display subcategories grid
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {category.subcategories.map((subcategory) => (
            <Link
              key={subcategory.id}
              href={`/category/${categoryId}/${subcategory.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={subcategory.image}
                    alt={subcategory.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{subcategory.name}</h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{subcategory.description}</p>
                  <p className="mt-2 text-sm font-medium text-green-600">{subcategory.itemCount} items</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // Display products grid
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {category.products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
} 