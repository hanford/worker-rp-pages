import Link from "next/link";

export default function Admin() {
  return (
    <div>
      <h2>Admin</h2>

      <ul>
        <li>
          <a href="/">Menu</a>
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
