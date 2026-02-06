import React from "react";

export default function ToggleCart({ isOpen, onToggle, totalQty }) {
  return (
    <button
      onClick={onToggle}
      style={{
        padding: "8px 12px",
        cursor: "pointer",
        marginLeft: "auto",
      }}
      title="Ẩn/Hiện giỏ hàng"
    >
      {isOpen ? "Hide Cart" : "Show Cart"} ({totalQty})
    </button>
  );
}
