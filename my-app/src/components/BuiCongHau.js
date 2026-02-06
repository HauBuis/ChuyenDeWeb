import React, { useMemo, useState } from "react";

// ✅ Import ảnh local từ src/data (đúng theo folder bạn đang có)
import img1 from "./data/1.jpg";
import img2 from "./data/2.jpg";
import img3 from "./data/3.jpg";
import img4 from "./data/4.jpg";
import img5 from "./data/5.jpg";
import img6 from "./data/6.jpg";
import img7 from "./data/7.jpg";
import img8 from "./data/8.jpg";
import img9 from "./data/9.jpg";
import img10 from "./data/10.jpg";

// ✅ Gộp products ngay trong file
const products = [
  {
    id: "F001",
    name: "Hoa hồng đỏ",
    description: "Hoa hồng đỏ tượng trưng cho tình yêu nồng cháy",
    price: 150000,
    image: img1,
  },
  {
    id: "F002",
    name: "Hoa tulip vàng",
    description: "Hoa tulip vàng mang ý nghĩa hạnh phúc và tươi mới",
    price: 180000,
    image: img2,
  },
  {
    id: "F003",
    name: "Hoa cúc trắng",
    description: "Hoa cúc trắng tượng trưng cho sự trong sáng",
    price: 120000,
    image: img3,
  },
  {
    id: "F004",
    name: "Hoa hướng dương",
    description: "Hoa hướng dương vàng rực mang năng lượng tích cực",
    price: 200000,
    image: img4,
  },
  {
    id: "F005",
    name: "Hoa lavender",
    description: "Hoa lavender tím nhẹ, hương thơm dễ chịu",
    price: 220000,
    image: img5,
  },
  {
    id: "F006",
    name: "Hoa ly",
    description: "Hoa ly sang trọng, thích hợp làm quà tặng",
    price: 250000,
    image: img6,
  },
  {
    id: "F007",
    name: "Hoa sen",
    description: "Hoa sen thanh khiết tượng trưng cho sự cao quý",
    price: 300000,
    image: img7,
  },
  {
    id: "F008",
    name: "Hoa đào",
    description: "Hoa đào mang không khí tết và may mắn",
    price: 280000,
    image: img8,
  },
  {
    id: "F009",
    name: "Hoa mai",
    description: "Hoa mai vàng biểu tượng cho tài lộc",
    price: 270000,
    image: img9,
  },
  {
    id: "F010",
    name: "Hoa cẩm tú cầu",
    description: "Hoa cẩm tú cầu tròn đầy, nhiều màu sắc đẹp mắt",
    price: 260000,
    image: img10,
  },
];

// ✅ Gộp ToggleCart
function ToggleCart({ isOpen, onToggle, totalQty }) {
  return (
    <button
      onClick={onToggle}
      style={{ padding: "8px 12px", cursor: "pointer", marginLeft: "auto" }}
      title="Ẩn/Hiện giỏ hàng"
    >
      {isOpen ? "Hide Cart" : "Show Cart"} ({totalQty})
    </button>
  );
}

// ✅ Gộp Cart
function Cart({ cart, totalQty, totalMoney, onIncrease, onDecrease, onRemove, onClear }) {
  const formatVND = (n) =>
    n.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: 12,
        padding: 12,
        background: "#fff",
        height: "fit-content",
        position: "sticky",
        top: 12,
      }}
    >
      <h3 style={{ marginTop: 0 }}>Giỏ hàng</h3>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <b>Tổng SP:</b> {totalQty}
        </div>
        <button
          onClick={onClear}
          disabled={cart.length === 0}
          style={{ padding: "6px 10px", cursor: "pointer" }}
        >
          Remove all
        </button>
      </div>

      <div style={{ marginTop: 10 }}>
        {cart.length === 0 ? (
          <div style={{ opacity: 0.7 }}>Chưa có sản phẩm nào.</div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "52px 1fr",
                gap: 10,
                padding: "10px 0",
                borderBottom: "1px solid #f3f3f3",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: 52,
                  height: 52,
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />

              <div>
                <div style={{ fontWeight: 700 }}>{item.name}</div>
                <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>
                  {formatVND(item.price)} x {item.qty} ={" "}
                  <b>{formatVND(item.price * item.qty)}</b>
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button onClick={() => onDecrease(item.id)} style={{ padding: "4px 10px" }}>
                    -
                  </button>
                  <button onClick={() => onIncrease(item.id)} style={{ padding: "4px 10px" }}>
                    +
                  </button>
                  <button
                    onClick={() => onRemove(item.id)}
                    style={{ padding: "4px 10px", marginLeft: "auto" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div
        style={{
          marginTop: 12,
          paddingTop: 12,
          borderTop: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 800,
        }}
      >
        <div>Tổng tiền</div>
        <div>{formatVND(totalMoney)}</div>
      </div>
    </div>
  );
}

// ✅ Gộp ProductItem (có Add + Remove + mini cart giống slide)
function ProductItem({ product, qty, onAdd, onRemove }) {
  const formatVND = (n) =>
    n.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const totalItem = product.price * qty;

  return (
    <div style={{ border: "1px solid #eee", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
      <div style={{ height: 150, overflow: "hidden" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ padding: 12 }}>
        <div style={{ fontWeight: 700 }}>{product.name}</div>
        <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>{product.description}</div>

        <div style={{ marginTop: 10, fontWeight: 700 }}>Giá: {formatVND(product.price)}</div>

        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button onClick={onAdd} style={{ padding: "6px 10px", cursor: "pointer" }}>
            Add to cart
          </button>
          <button
            onClick={onRemove}
            disabled={qty === 0}
            style={{ padding: "6px 10px", cursor: "pointer" }}
          >
            Remove
          </button>
        </div>

        <div style={{ marginTop: 12, borderTop: "1px solid #eee", paddingTop: 10 }}>
          <b>Giỏ hàng</b>
          {qty === 0 ? (
            <div style={{ marginTop: 6, opacity: 0.8 }}>Chưa có sản phẩm trong giỏ hàng</div>
          ) : (
            <>
              <div style={{ marginTop: 6 }}>
                {product.name}: <b>{qty}</b> × {formatVND(product.price)}
              </div>
              <div style={{ marginTop: 4 }}>
                <b>Tổng:</b> {formatVND(totalItem)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ✅ Gộp ProductList (logic cart)
function ProductList() {
  const [cart, setCart] = useState([]); // [{id,name,price,image,qty}]
  const [isCartOpen, setIsCartOpen] = useState(true);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((x) => x.id === product.id);
      if (found) {
        return prev.map((x) => (x.id === product.id ? { ...x, qty: x.qty + 1 } : x));
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
    setCart((prev) => prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)));
  };

  const removeItem = (id) => setCart((prev) => prev.filter((x) => x.id !== id));
  const clearCart = () => setCart([]);

  const totalQty = useMemo(() => cart.reduce((sum, x) => sum + x.qty, 0), [cart]);
  const totalMoney = useMemo(() => cart.reduce((sum, x) => sum + x.price * x.qty, 0), [cart]);

  const getQty = (id) => cart.find((x) => x.id === id)?.qty || 0;

  return (
    <div style={{ maxWidth: 1100, margin: "20px auto", padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h2 style={{ margin: 0 }}>Flower Shop</h2>

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
              qty={getQty(p.id)}
              onAdd={() => addToCart(p)}
              onRemove={() => decreaseQty(p.id)}
            />
          ))}
        </div>

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

// ✅ Export 1 component duy nhất để App.js gọi
export default function ShopPage() {
  return <ProductList />;
}
