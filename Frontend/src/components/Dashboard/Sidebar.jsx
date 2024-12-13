import { useState, useEffect } from "react";
import {
  User,
  Package,
  BarChart2,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";


function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // const { logout } = useAuth(); // Access logout from Auth Context

  const menuItems = [
    { icon: User, label: "Profile", path: "/users" },
    { icon: Package, label: "Inventory", path: "/inventory" },
    { icon: BarChart2, label: "Analytics", path: "/analytics" },
    { icon: FileText, label: "Logs", path: "/logs/inventory" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1024) {
        setIsMobile(true);
        setIsCollapsed(true);
      } else {
        setIsMobile(false);
        setIsCollapsed(false);
        setIsSidebarOpen(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);

    // Close sidebar on mobile after navigation
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-background p-2 rounded-full shadow-md lg:hidden"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar Overlay for Mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-auto bg-background/95 backdrop-blur 
          supports-[backdrop-filter]:bg-background/60 border-r border-border 
          flex flex-col py-6 transition-all duration-300 ease-in-out z-50 
          ${
            isMobile
              ? `transform ${
                  isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } w-64`
              : `${isCollapsed ? "w-20" : "w-64"} relative`
          }`}
      >
        {/* Collapse/Expand Button */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className={`p-2 hover:bg-accent rounded-full self-end mr-4 transition-transform duration-300 ${
              isCollapsed ? "-rotate-180" : ""
            }`}
          >
            {isCollapsed ? (
              <ChevronRight size={24} />
            ) : (
              <ChevronLeft size={24} />
            )}
          </button>
        )}

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-5 px-4 mt-10">
          {menuItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <button
                key={index}
                className={`flex items-center gap-4 p-3 rounded-lg 
                  text-foreground/60 hover:text-foreground 
                  transition-all duration-200 ease-in-out 
                  ${
                    isActive
                      ? "bg-accent text-foreground"
                      : "hover:bg-accent/50"
                  }
                  ${isMobile || isCollapsed ? "justify-center" : ""}`}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon
                  className={`w-6 h-6 transition-all duration-200 ${
                    isActive ? "text-primary" : ""
                  }`}
                />
                {!(isMobile || isCollapsed) && (
                  <span
                    className={`transition-all duration-200 ${
                      isActive ? "font-semibold" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout} // Use handleLogout function
          className={`flex items-center gap-4 p-3 mx-4 rounded-lg 
            text-foreground/60 hover:text-foreground 
            hover:bg-accent/50 transition-all duration-200 ease-in-out absolute bottom-5  
            ${isMobile || isCollapsed ? "justify-center" : ""}`}
        >
          <LogOut className="w-6 h-6" />
          {!(isMobile || isCollapsed) && <span>Logout</span>}
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
