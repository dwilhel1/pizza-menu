export type Pizza = {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity?: number;
}

export type Cart = Record<number, CartItem>;

export type CartItem = {
    pizza: Pizza;
    quantity: number;
};
