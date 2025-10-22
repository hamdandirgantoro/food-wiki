import { createContext, useContext, useState, type ReactNode } from "react";

type SidebarContextType = {
  sidebar: string;
  toggleSidebar: () => void;
};

const status: { open: string; closed: string } = {
  open: "block",
  closed: "none",
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [sidebar, setSidebar] = useState(status.closed);

  const toggleSidebar = () => {
    setSidebar((prev) => (prev === status.open ? status.closed : status.open));
  };

  return (
    <SidebarContext.Provider value={{ sidebar, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
