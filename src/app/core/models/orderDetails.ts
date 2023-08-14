import { CartItem } from "./cartItem";
import { User } from "./user";

export interface OrderDetails {
    user?: User;
    cartItems: CartItem[];
}

export interface AdminOrderDetails extends OrderDetails {}

export interface GuestOrderDetails extends OrderDetails {}

export interface CustomerOrderDetails extends OrderDetails {}