import Link from "next/link";

export default function Menu() {
  return (
    <div>
      <h2>Menu</h2>

      <ul>
        <li>
          <a href="/admin">Admin</a>
        </li>
        <li>
          <a href="/order">Order</a>
        </li>
        <li>
          <a href="/checkout">Checkout</a>
        </li>
      </ul>
    </div>
  );
}
