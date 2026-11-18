
import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>

      <p>
        Sorry, the page you are looking for does not exist.
      </p>

      <Link to="/" className="home-button">
        Back to Board
      </Link>
    </div>
  );
}

export default NotFoundPage;
