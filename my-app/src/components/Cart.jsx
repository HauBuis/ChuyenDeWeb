import React from "react";

export default function Cart({
  cart,
  totalQty,
  totalMoney,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}) {
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
                  <button
                    onClick={() => onDecrease(item.id)}
                    style={{ padding: "4px 10px", cursor: "pointer" }}
                  >
                    -
                  </button>
                  <button
                    onClick={() => onIncrease(item.id)}
                    style={{ padding: "4px 10px", cursor: "pointer" }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => onRemove(item.id)}
                    style={{
                      padding: "4px 10px",
                      cursor: "pointer",
                      marginLeft: "auto",
                    }}
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
