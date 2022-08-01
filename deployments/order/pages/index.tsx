import Link from "next/link";

export default function Order() {
  return (
    <div>
      <h2>Order</h2>

      <ul>
        <li>
          <Link href="/admin">Admin</Link>
        </li>
        <li>
          <Link href="/">Menu</Link>
        </li>
        <li>
          <Link href="/checkout">Checkout</Link>
        </li>
      </ul>
    </div>
  );
}
