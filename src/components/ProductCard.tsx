"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import LoginModal from "./LoginModal";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  unit: string;
  discount?: number;
}

export function ProductCard({ id, name, price, image, unit, discount }: ProductCardProps) {
  const discountedPrice = discount ? price - (price * discount) / 100 : price;
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="group relative rounded-lg border bg-white p-2 hover:shadow-md transition-shadow">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-2 space-y-1">
        <h3 className="text-xs font-medium text-gray-900 line-clamp-2">{name}</h3>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-xs font-medium text-gray-900">
              {formatPrice(discountedPrice)}
            </p>
            {discount && (
              <div className="flex items-center space-x-1">
                <p className="text-[10px] text-gray-500 line-through">
                  {formatPrice(price)}
                </p>
                <p className="text-[10px] font-medium text-green-600">
                  {discount}% OFF
                </p>
              </div>
            )}
            <p className="text-[10px] text-gray-500">{unit}</p>
          </div>
          <button className="rounded-full bg-green-600 p-1.5 text-white hover:bg-green-700">
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>
      <button onClick={() => setShowLoginModal(true)}>Login</button>
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
} 