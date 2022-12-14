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
        <li>
          <Link href="/123-123">Order 123</Link>
        </li>
        <li>
          <Link href="/456-456">Order 456</Link>
        </li>
        <li>
          <Link href="/789-789">Order 789</Link>
        </li>
        <li>
          <Link href="/123-123/help/456-456">Order Help</Link>
        </li>
      </ul>
    </div>
  );
}
