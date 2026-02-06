import React from "react";

export default function ProductItem({ product, qty, onAdd, onRemove }) {
  const formatVND = (n) =>
    n.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const totalItem = product.price * qty;

  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: 12,
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <div style={{ height: 150, overflow: "hidden" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ padding: 12 }}>
        <div style={{ fontWeight: 700 }}>{product.name}</div>
        <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>
          {product.description}
        </div>

        <div style={{ marginTop: 10, fontWeight: 700 }}>
          Giá: {formatVND(product.price)}
        </div>

           {/* Buttons */}
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

        {/* Mini cart giống slide */}
         <div style={{ marginTop: 12, borderTop: "1px solid #eee", paddingTop: 10 }}>
          <b>Giỏ hàng</b>
          {qty === 0 ? (
            <div style={{ marginTop: 6, opacity: 0.8 }}>
              Chưa có sản phẩm trong giỏ hàng
            </div>
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
