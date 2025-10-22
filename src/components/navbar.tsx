import Lineicons from "@lineiconshq/react-lineicons";
import "./navbar.css";
import { MenuHamburger1Solid } from "@lineiconshq/free-icons";
import { useSidebar } from "./context-providers/sidebar";

export default function Navbar() {
  const { toggleSidebar } = useSidebar();
  return (
    <nav id="navbar">
      <button title="Open Sidebar" onClick={toggleSidebar}>
        <Lineicons icon={MenuHamburger1Solid} />
      </button>
      <div>Food Wiki</div>
    </nav>
  );
}
