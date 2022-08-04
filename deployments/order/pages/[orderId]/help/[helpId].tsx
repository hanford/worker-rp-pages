import Link from "next/link";
import { useRouter } from "next/router";

export default function OrderHelp() {
  const router = useRouter();
  return (
    <div>
      <h2>
        Order: {router.query.orderId} / Help / {router.query.helpId}
      </h2>

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
          <Link href="/456-456">Order 456</Link>
        </li>
      </ul>
    </div>
  );
}
