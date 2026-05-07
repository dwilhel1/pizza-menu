'use client';

import { Pizza } from "@/app/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    fetch('/api/pizzas')
      .then((res: Response) => res.json())
      .then((data: Pizza[]) => setPizzas(data));
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">🍕 Pizza Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        { pizzas.map((pizza: Pizza) => (
          <div key={pizza.id} className="border rounded-lg p-4 min-w-0">
            <h2 className="text-xl font-semibold">{pizza.name}</h2>
            <p className="text-gray-500 mt-1">{pizza.description}</p>
            <p className="text-lg font-bold mt-2">${pizza.price}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
