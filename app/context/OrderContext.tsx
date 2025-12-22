"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

/* ---------------- TYPES ---------------- */

export type OrderItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
  id: string;
  items: OrderItem[];
  address: {
    name: string;
    phone: string;
    pincode: string;
    city: string;
    state: string;
    addressLine: string;
  };
  total: number;
  paymentMethod: "COD" | "ONLINE";
  status: "PLACED";
  createdAt: number;
};


type OrderContextType = {
  orders: Order[];
  placeOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

/* ---------------- PROVIDER ---------------- */

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  /* Load orders from localStorage */
  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  /* Persist orders to localStorage */
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const getOrderById = (id: string) => {
    return orders.find((o) => o.id === id);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

/* ---------------- HOOK ---------------- */

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used inside OrderProvider");
  return ctx;
}
