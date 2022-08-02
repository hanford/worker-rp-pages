import { useRouter } from "next/router";
import Link from "next/link";

export default function OrderId() {
  const router = useRouter();
  return (
    <div>
      <h2>Order: {router.query.orderId}</h2>

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
          <Link href="/">Order index</Link>
        </li>
      </ul>
    </div>
  );
}
