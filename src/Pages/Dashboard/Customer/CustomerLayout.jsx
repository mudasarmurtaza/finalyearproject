import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { CustomerHeader } from "./CustomerHeader";
import { CustomerSidebar } from "./CustomerSidebaar";

export const CustomerLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);

      // Auto close sidebar when switching to desktop
      if (window.innerWidth >= 992) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* ✅ Mobile Overlay */}
      {isMobile && showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 999,
          }}
        />
      )}

      {/* ✅ Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: isMobile ? (showSidebar ? "0" : "-220px") : "0",
          width: "220px",
          height: "100vh",
          backgroundColor: "#212529",
          transition: "left 0.3s ease",
          zIndex: 1000,
        }}
      >
        <CustomerSidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      </div>

      {/* ✅ Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: isMobile ? "0" : "220px",
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 0.3s ease",
        }}
      >
        <CustomerHeader setShowSidebar={setShowSidebar} />

        <main
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#f8f9fa",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};