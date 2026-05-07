'use client';

import { Cart, CartItem, Pizza } from "@/app/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<Cart>({});

  const addToCart = async (pizza: Pizza) => {
    setCart(prev => ({
      ...prev,
      [pizza.id]: {
        pizza,
        quantity: (prev[pizza.id]?.quantity || 0) + 1
      }
    }));

    await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pizza),
    });
  };

  useEffect(() => {
    setIsLoading(true);

    fetch('/api/pizzas')
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      }).then((data: Pizza[]) => {
        setPizzas(data);
        setIsLoading(false);
      }).catch((err) => console.error(`Fetch error: ${err}`));

    fetch('/api/cart')
      .then(res => res.json())
      .then((data: CartItem[]) => {
        const cartMap = data
          .filter((item) => item?.pizza != null)
          .reduce<Cart>((acc, item) => ({
            ...acc,
            [item.pizza.id]: item
          }), {});
        setCart(cartMap);
      });
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">🍕 Pizza Menu</h1>

      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="font-semibold text-lg">
          Cart ({Object.values(cart).filter(Boolean).reduce((sum, { quantity }) => sum + quantity, 0)} items)
        </h2>
        {Object.keys(cart).length === 0 ? (
          <p className="text-gray-500">No items yet</p>
        ) : (
          <ul>
            {Object.values(cart).filter(Boolean).map(({ pizza, quantity }) => (
              <li key={pizza.id}>
                {pizza.name} x{quantity} — ${pizza.price * quantity}
              </li>
            ))}
          </ul>
        )}
        <p className="font-bold mt-2">
          Total: ${Object.values(cart).filter(Boolean).reduce((sum, { pizza, quantity }) => sum + pizza.price * quantity, 0)}
        </p>
      </div>

      {isLoading ? <div>Loading...</div> :
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          { pizzas.map((pizza: Pizza) => (
            <div key={pizza.id} className="border rounded-lg p-4 min-w-0" onClick={() => addToCart(pizza)}>
              <h2 className="text-xl font-semibold">{pizza.name}</h2>
              <p className="text-gray-500 mt-1">{pizza.description}</p>
              <p className="text-lg font-bold mt-2">${pizza.price}</p>
            </div>
          ))}
        </div>
        }
    </main>
  )
}
