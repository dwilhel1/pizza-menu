import { pizzas } from "@/app/data/pizza";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(pizzas);
}
