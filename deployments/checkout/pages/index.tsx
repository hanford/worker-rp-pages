import Link from "next/link";

export default function Checkout() {
  return (
    <div>
      <h2>Checkout</h2>

      <ul>
        <li>
          <a href="/admin">Admin</a>
        </li>
        <li>
          <a href="/order">Order</a>
        </li>
        <li>
          <a href="/">Menu</a>
        </li>
      </ul>
    </div>
  );
}
