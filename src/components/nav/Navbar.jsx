import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <ul className="navbar">
      <div className="navbar-item-group">
        <li className="navbar-item">
          <Link className="navbar-link" to="/gallery">
            Gallery
          </Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/profile">
            Profile
          </Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/auth">
            Login
          </Link>
        </li>
      </div>
    </ul>
  );
};
