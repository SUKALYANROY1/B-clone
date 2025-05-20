import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  itemCount: number;
}

export function CategoryCard({ id, name, image, description, itemCount }: CategoryCardProps) {
  // Split the ID to get main category and subcategory
  const [mainCategory, subCategory] = id.split('/');
  const href = subCategory ? `/category/${mainCategory}/${subCategory}` : `/category/${mainCategory}`;

  return (
    <Link href={href} className="group block w-[80px]">
      <div className="relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg p-1">
        <div className="aspect-[4/3] w-full overflow-hidden" style={{ maxHeight: '60px' }}>
          <Image
            src={image}
            alt={name}
            width={60}
            height={45}
            className="h-[60px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-1">
          <h3 className="text-[10px] font-semibold text-gray-900 line-clamp-1">{name}</h3>
          <p className="mt-0.5 text-[8px] text-gray-600 line-clamp-1">{description}</p>
          <p className="mt-0.5 text-[8px] font-medium text-green-600">{itemCount} items</p>
        </div>
      </div>
    </Link>
  );
} 