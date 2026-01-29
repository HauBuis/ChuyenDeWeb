import React, { useEffect, useMemo, useRef, useState } from "react";

export default function ShoppingCart() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Cart: mỗi item có id, name, price
  const [cart, setCart] = useState([
    { id: 1, name: "Táo", price: 12000 },
    { id: 2, name: "Sữa", price: 18000 },
  ]);

  const listEndRef = useRef(null);

  const totalProducts = cart.length;
  const totalMoney = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  // Add xong tự scroll xuống cuối
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [cart.length]);

  const handleAdd = () => {
    const trimmedName = name.trim();
    const numPrice = Number(price);

    if (!trimmedName) {
      alert("Nhập tên sản phẩm!");
      return;
    }
    if (!Number.isFinite(numPrice) || numPrice <= 0) {
      alert("Giá phải là số > 0!");
      return;
    }

    const newItem = {
      id: Date.now(), // id đơn giản
      name: trimmedName,
      price: numPrice,
    };

    setCart((prev) => [...prev, newItem]); // add chạy thẳng xuống (append)
    setName("");
    setPrice("");
  };

  const handleRemoveOne = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRemoveAll = () => {
    setCart([]);
  };

  const formatVND = (n) =>
    n.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  return (
    <div style={{ maxWidth: 650, margin: "20px auto", padding: 16 }}>
      <h2>Shopping Cart</h2>

      {/* Add form */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ flex: 2, padding: 8 }}
        />
        <input
           type="number"
           placeholder="Giá"
           value={price}
            min="0"
           step="1"
           onChange={(e) => {
          //  const value = e.target.value;

          //  // Không cho nhập số âm
          //   if (value < 0) return;

           setPrice(value);
  }}
/>
        <button onClick={handleAdd} style={{ padding: "8px 14px" }}>
          Add
        </button>
      </div>

      {/* Summary */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 12,
          border: "1px solid #ddd",
          borderRadius: 8,
          marginBottom: 12,
        }}
      >
        <div>
          <div>
            <b>Tổng số sản phẩm:</b> {totalProducts}
          </div>
          <div>
            <b>Tổng tiền:</b> {formatVND(totalMoney)}
          </div>
        </div>

        <button
          onClick={handleRemoveAll}
          disabled={cart.length === 0}
          style={{ padding: "8px 14px" }}
        >
          Remove all
        </button>
      </div>

      {/* List */}
      <div style={{ border: "1px solid #eee", borderRadius: 8 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 140px 110px",
            gap: 10,
            padding: 12,
            borderBottom: "1px solid #eee",
            fontWeight: 700,
          }}
        >
          <div>Sản phẩm</div>
          <div>Giá</div>
          <div>Hành động</div>
        </div>

        {cart.length === 0 ? (
          <div style={{ padding: 12 }}>Giỏ hàng trống.</div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 140px 110px",
                gap: 10,
                padding: 12,
                borderBottom: "1px solid #f3f3f3",
                alignItems: "center",
              }}
            >
              <div>{item.name}</div>
              <div>{formatVND(item.price)}</div>
              <button
                onClick={() => handleRemoveOne(item.id)}
                style={{ padding: "6px 10px" }}
              >
                Remove
              </button>
            </div>
          ))
        )}

        <div ref={listEndRef} />
      </div>
    </div>
  );
}
