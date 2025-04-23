import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, Users, User, BadgeInfo } from "lucide-react";
import AuthService from "../../services/auth/AuthService";
import { ToastContainer, toast } from "react-toastify";
import { AppBar, Toolbar, IconButton, Popper, Paper } from "@mui/material";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  const anchorRef = useRef(null);
  const [openPopper, setOpenPopper] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigate("/");
      toast.success("Logout successful!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setOpenPopper(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setOpenPopper(false), 200);
    setHoverTimeout(timeout);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        color: "black",
        borderBottom: "1px solid #e0e0e0",
        boxShadow: "0 0 20px rgba(0, 114, 229, 0.15)",
        backgroundImage:
          "radial-gradient(circle at 50% 0%, rgba(200, 230, 255, 0.1), transparent 70%)",
      }}
      elevation={0}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Section: Logo and Menu */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            sx={{
              backgroundColor: "transparent",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            {/* Optional: Logo icon here */}
          </IconButton>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: "45px", marginLeft: "8px" }}
          />
          <Menu
            className="hover:cursor-pointer"
            style={{ color: "#0072e5", marginLeft: "24px", marginTop: "8px" }}
            onClick={toggleSidebar}
          />
        </div>

        {/* Right Section: User Info and Logout */}
        <div className="flex items-center gap-6">
          {/* User Info + Popper */}
          <div
            className="flex items-center gap-3"
            ref={anchorRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-white border-blue-400 border-2 rounded-full hover:cursor-pointer">
              <Users color="#e070ff" size={16} />
            </div>
            <div className="flex flex-col hover:cursor-pointer">
              <span className="text-sm text-gray-500">Welcome,</span>
              <span className="text-sm font-medium text-gray-900 flex items-center gap-1">
                {user.username}
                <BadgeInfo size={16} color="#e070ff" />
              </span>
            </div>

            {/* Popper with Arrow */}
            <Popper
              open={openPopper}
              anchorEl={anchorRef.current}
              placement="bottom-start"
              style={{ zIndex: 1300 }}
              disablePortal
              modifiers={[
                {
                  name: "offset",
                  options: {
                    offset: [0, 12],
                  },
                },
                {
                  name: "arrow",
                  options: {
                    element: "#popper-arrow",
                  },
                },
              ]}
            >
              <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {/* Arrow */}
                <span
                  id="popper-arrow"
                  className="block"
                  style={{
                    position: "absolute",
                    width: "10px",
                    height: "10px",
                    backgroundColor: "white",
                    transform: "rotate(45deg)",
                    top: "-5px",
                    left: "20px",
                    boxShadow: "-1px -1px 4px rgba(0,0,0,0.05)",
                    borderLeft: "1px solid #d0e0ff",
                    borderTop: "1px solid #d0e0ff",
                    zIndex: -1,
                  }}
                />
                <Paper
                  elevation={3}
                  className="px-4 py-3 rounded-xl shadow-lg border border-blue-100"
                  style={{
                    backgroundColor: "white",
                    minWidth: "200px",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 bg-white border-blue-400 border-2 rounded-full hover:cursor-pointer">
                      <User color="#0072e5" size={12} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Role</span>
                      <span className="text-sm font-semibold text-gray-700">
                        {user.role || "Unknown"}
                      </span>
                    </div>
                  </div>
                </Paper>
              </div>
            </Popper>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-blue-600 border-2 border-blue-100 rounded-md hover:bg-blue-50 hover:border-blue-200 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </Toolbar>
      <ToastContainer />
    </AppBar>
  );
};

export default Header;
