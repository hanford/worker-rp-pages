import Link from "next/link";

export default function Menu() {
  return (
    <div>
      <h2>Menu</h2>

      <ul>
        <li>
          <Link href="/admin">Admin</Link>
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
