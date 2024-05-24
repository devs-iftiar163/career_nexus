import { Link } from "react-router-dom";
import logo from "../../../src/assets/img/logo_04.png";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="container">
        {/* Header Partition */}
        <div className="row">
          {/* Logo Area */}
          <div className="col-lg-3">
            <div className="site-logo">
              <img src={logo} alt="" />
            </div>
          </div>
          {/* Menu Area */}
          <div className="col-lg-6">
            <div className="menu-list">
              <ul>
                <li>
                  <Link href="">Home</Link>
                </li>
                <li>
                  <Link href="">About</Link>
                </li>
                <li>
                  <Link href="">Jobs</Link>
                </li>
                <li>
                  <Link href="">Company</Link>
                </li>
                <li>
                  <Link href="">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Login / Register */}
          <div className="col-lg-3">
            <div className="logn-register">
              <button className="login">Login</button>
              <button className="register">Register</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
