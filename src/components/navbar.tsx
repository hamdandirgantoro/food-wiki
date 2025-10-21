import Lineicons from "@lineiconshq/react-lineicons";
import "./navbar.css";
import { MenuHamburger1Duotone, MenuHamburger1Solid } from "@lineiconshq/free-icons";

export default function Navbar() {
  return (
    <nav id="navbar">
      <button><Lineicons icon={MenuHamburger1Solid}/></button>
      <div>Food Wiki</div>
    </nav>
  );
}
