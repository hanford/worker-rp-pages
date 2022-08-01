import Link from "next/link";

export default function Checkout() {
  return (
    <div>
      <h2>Checkout</h2>

      <ul>
        <li>
          <Link href="/admin">Admin</Link>
        </li>
        <li>
          <Link href="/order">Order</Link>
        </li>
        <li>
          <Link href="/">Menu</Link>
        </li>
      </ul>
    </div>
  );
}
