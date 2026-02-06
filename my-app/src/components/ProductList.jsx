import React, { useMemo, useState } from "react";
import { products } from "../data/products";
import ProductItem from "./ProductItem";
import Cart from "./Cart";
import ToggleCart from "./ToggleCart";

export default function ProductList() {
  const [cart, setCart] = useState([]); // [{id,name,price,image,qty}]
  const [isCartOpen, setIsCartOpen] = useState(true);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((x) => x.id === product.id);
      if (found) {
        return prev.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x))
        .filter((x) => x.qty > 0)
    );
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x))
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((x) => x.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalQty = useMemo(
    () => cart.reduce((sum, x) => sum + x.qty, 0),
    [cart]
  );

  const totalMoney = useMemo(
    () => cart.reduce((sum, x) => sum + x.price * x.qty, 0),
    [cart]
  );

  // ✅ Lấy qty hiện tại của từng sản phẩm để truyền xuống ProductItem
  const getQty = (id) => cart.find((x) => x.id === id)?.qty || 0;

  return (
    <div style={{ maxWidth: 1100, margin: "20px auto", padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h2 style={{ margin: 0 }}>Danh sách sản phẩm</h2>

        <ToggleCart
          isOpen={isCartOpen}
          onToggle={() => setIsCartOpen((v) => !v)}
          totalQty={totalQty}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isCartOpen ? "1fr 360px" : "1fr",
          gap: 16,
          marginTop: 12,
        }}
      >
        {/* Products */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            gap: 12,
          }}
        >
          {products.map((p) => (
            <ProductItem
              key={p.id}
              product={p}
              qty={getQty(p.id)}                 // ✅ thêm
              onAdd={() => addToCart(p)}
              onRemove={() => decreaseQty(p.id)} // ✅ thêm: Remove giảm qty
            />
          ))}
        </div>

        {/* Cart */}
         {isCartOpen && (
          <Cart
            cart={cart}
            totalQty={totalQty}
            totalMoney={totalMoney}
            onIncrease={increaseQty}
            onDecrease={decreaseQty}
            onRemove={removeItem}
            onClear={clearCart}
          />
        )}
      </div>
    </div>
  );
}
