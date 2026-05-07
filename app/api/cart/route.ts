import { NextRequest, NextResponse } from 'next/server';
import { Cart } from '@/app/types';

let cart: Cart = {};

export async function GET() {
  return NextResponse.json(Object.values(cart));
}

export async function POST(req: NextRequest) {
  const pizza = await req.json();
  cart[pizza.id] = {
    pizza,
    quantity: (cart[pizza.id]?.quantity || 0) + 1
  };
  return NextResponse.json(Object.values(cart));
}
