import Link from "next/link";

export default function Admin() {
  return (
    <div>
      <h2>Admin</h2>

      <ul>
        <li>
          <Link href="/">Menu</Link>
        </li>
        <li>
          <Link href="/order">Order</Link>
        </li>
        <li>
          <Link href="/checkout">Checkout</Link>
        </li>
      </ul>
    </div>
  );
}
