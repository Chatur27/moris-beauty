import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <span className="eyebrow">404</span>
      <h1>This beauty shelf is empty.</h1>
      <p>The page you requested does not exist in this portfolio demo.</p>
      <Link className="button button-dark" href="/shop">Return to the shop</Link>
    </div>
  );
}
