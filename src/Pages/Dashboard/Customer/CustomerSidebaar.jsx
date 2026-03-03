import {
  House,
  User,
  ClipboardCheck,
  MessageCircle,
  LogOut,
} from "lucide-react";
import { FileText } from "react-bootstrap-icons";
import { NavLink, useNavigate } from "react-router";

export const CustomerSidebar = ({ showSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("authChange"));
    navigate("/home");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="d-none d-lg-flex flex-column text-white p-4 vh-100"
        style={{
          width: "240px",
          backgroundColor: "#253863",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          position: "fixed",
          top: 0,
          left: 0,
          marginBottom: "5em"
        }}
      >
        <SidebarContent handleLogout={handleLogout} />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className="d-lg-none d-flex flex-column text-white p-4 vh-100"
        style={{
          width: "240px",
          backgroundColor: "#253863",
          position: "fixed",
          top: 0,
          left: showSidebar ? "0" : "-240px",
          transition: "left 0.3s ease",
          zIndex: 1050,
        }}
      >
        <SidebarContent handleLogout={handleLogout} />
      </aside>
    </>
  );
};

const SidebarContent = ({ handleLogout }) => (
  <>
    {/* Logo Section */}
    <div className="mb-5">
      <h5 className="fw-bold mb-0" style={{ color: "#ffffff" }}>
        Renexa<span style={{ color: "#fbbf24" }}>.ai</span>
      </h5>
      <small style={{ color: "rgba(255,255,255,0.6)" }}>
        Smart Construction
      </small>
    </div>

    {/* Navigation */}
    <ul className="nav flex-column gap-2 flex-grow-1">
      <SidebarItem to="/home" icon={<House size={18} />} label="Home" />
      <SidebarItem to="customer-profile" icon={<User size={18} />} label="Profile" />
      <SidebarItem to="/customer/proposals" icon={<FileText size={18} />} label="Project Proposals" />
      <SidebarItem to="/customer-project-track" icon={<ClipboardCheck size={18} />} label="Project Tracking" />
      <SidebarItem to="/customer-chat-list" icon={<MessageCircle size={18} />} label="Chat" />
      <SidebarItem to="/customer/shortlisted-proposals" icon={<FileText size={18} />} label="Shortlisted Proposals" />
      <SidebarItem to="/customer/accepted-proposals" icon={<FileText size={18} />} label="Accepted Proposals" />
      <SidebarItem to="/customer/projects" icon={<MessageCircle size={18} />} label="Make Request" />
      <SidebarItem to="/customer/see-request" icon={<MessageCircle size={18} />} label="View Request" />
    </ul>

    {/* Logout */}
    <div className="mt-auto pt-4">
      <button
        onClick={handleLogout}
        className="w-100 d-flex align-items-center justify-content-center gap-2 py-2 rounded-pill"
        style={{
          background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
          border: "none",
          color: "#798ab1ff",
          fontWeight: "600",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 8px 20px rgba(251,191,36,0.4)";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "none";
        }}
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  </>
);

const SidebarItem = ({ to, icon, label }) => (
  <li className="nav-item">
    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 ${isActive ? "active-link" : ""
        }`
      }
      style={({ isActive }) => ({
        color: isActive ? "#0f172a" : "rgba(255,255,255,0.8)",
        background: isActive
          ? "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)"
          : "transparent",
        transition: "all 0.3s ease",
      })}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  </li>
);