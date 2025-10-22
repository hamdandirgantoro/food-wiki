import { useSidebar } from "./context-providers/sidebar";

export default function Sidebar() {
  const { sidebar } = useSidebar();
  return (
    <div style={{ display: sidebar }}>
      <div>test</div>
      <div>test</div>
    </div>
  );
}
