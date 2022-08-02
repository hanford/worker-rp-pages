import Link from "next/link";

export default function Order() {
  return (
    <div>
      <h2>Order App</h2>

      <ul>
        <li>
          <a href="/admin">Admin</a>
        </li>
        <li>
          <a href="/">Menu</a>
        </li>
        <li>
          <a href="/checkout">Checkout</a>
        </li>
      </ul>
    </div>
  );
}
