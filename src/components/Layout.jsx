import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  ListMusic,
  Podcast,
  Mic2,
  Search,
  Bell,
  User,
  Home,
  Music,
  X,
  Info,
  BookOpen,
  TrendingUp,
  Users,
} from "lucide-react";

// ─── Colors ───
const BLUE_LIGHT = "#3b82f6";
const BLUE_DARK = "#1d4ed8";
const TEXT_BLACK = "#0f172a";
const BLUE_GRADIENT = `linear-gradient(135deg, ${BLUE_LIGHT}, ${BLUE_DARK})`;

const NavItem = ({ icon: Icon, label, to, sidebarOpen }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className="block">
      <button
        className={`flex items-center gap-4 px-3 py-2.5 w-full rounded-lg transition-all duration-200 group relative ${
          isActive
            ? "text-white shadow-md" // Active text white
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900" // Inactive text dark gray
        }`}
        style={isActive ? { background: BLUE_GRADIENT } : {}} // Active background Blue Gradient
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {sidebarOpen && <span className="font-medium text-sm">{label}</span>}
      </button>
    </Link>
  );
};

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("browse");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // Main Background: Light Gray/White
    <div className="fixed inset-0 flex bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar: White Background */}
      <motion.aside
        initial={{ width: 240 }}
        animate={{ width: sidebarOpen ? 240 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-full bg-white border-r border-slate-200 flex flex-col justify-between py-6 px-3 relative z-20 shadow-sm"
      >
        <div>
          {/* Logo Area */}
          <div className="flex items-center gap-3 px-2 mb-6">
            {sidebarOpen ? (
              <Link
                to="/"
                className="flex items-center p-2 rounded-lg"
                style={{ background: "rgba(0, 0, 0, 0.03)" }}
              >
                <img
                  src="/tuneraaga.png"
                  alt="Tune Raaga Logo"
                  className="h-20 w-52 object-cover"
                />
              </Link>
            ) : (
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mx-auto shadow-md"
                style={{ background: BLUE_GRADIENT }}
              >
                <Play className="w-5 h-5 fill-white text-white" />
              </div>
            )}
          </div>

          {/* Tab Switcher: Light Background */}
          {sidebarOpen && (
            <div className="flex items-center bg-slate-100 rounded-lg p-1 mb-6 mx-2">
              <button
                onClick={() => setActiveTab("browse")}
                className={`flex-1 text-xs font-bold py-2 rounded-md transition-all ${
                  activeTab === "browse"
                    ? "text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                style={activeTab === "browse" ? { background: BLUE_GRADIENT } : {}}
              >
                Browse
              </button>
              <button
                onClick={() => setActiveTab("tuneraaga")}
                className={`flex-1 text-xs font-bold py-2 rounded-md transition-all ${
                  activeTab === "tuneraaga"
                    ? "text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                style={activeTab === "tuneraaga" ? { background: BLUE_GRADIENT } : {}}
              >
                Tune Raaga
              </button>
            </div>
          )}

          <nav className="flex flex-col gap-2">
            {activeTab === "browse" && (
              <>
  <NavItem to="/music" icon={Music} label="Music" sidebarOpen={sidebarOpen} />
  <NavItem to="/new-release" icon={Star} label="New Release" sidebarOpen={sidebarOpen} />
  <NavItem to="/top-chart" icon={TrendingUp} label="TopChart" sidebarOpen={sidebarOpen} />
  <NavItem to="/top-playlist" icon={ListMusic} label="TopPlayList" sidebarOpen={sidebarOpen} />
  <NavItem to="/podcast" icon={Podcast} label="Podcast" sidebarOpen={sidebarOpen} />
  <NavItem to="/topartist" icon={Mic2} label="TopArtist" sidebarOpen={sidebarOpen} />
</>
            )}

            {activeTab === "tuneraaga" && (
              <>
                <div className="border-t border-slate-200 my-2" />
                <span className={`text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-1 ${!sidebarOpen && "text-center"}`}>
                  {sidebarOpen ? "Menu" : ""}
                </span>
                <NavItem to="/" icon={Home} label="Home" sidebarOpen={sidebarOpen} />
                <NavItem to="/about" icon={Info} label="Our DNA" sidebarOpen={sidebarOpen} />
                <NavItem to="/knowledge" icon={BookOpen} label="Knowledge" sidebarOpen={sidebarOpen} />
                <NavItem to="/reached" icon={TrendingUp} label="Reached" sidebarOpen={sidebarOpen} />
                <NavItem to="/audience" icon={Users} label="Audience" sidebarOpen={sidebarOpen} />
                <NavItem to="/what" icon={Info} label="What we offer" sidebarOpen={sidebarOpen} />
              </>
            )}
          </nav>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:text-white hover:border-blue-500 transition-colors z-50 shadow-sm text-slate-600"
          onMouseEnter={(e) => e.currentTarget.style.background = BLUE_GRADIENT}
          onMouseLeave={(e) => e.currentTarget.style.background = "white"}
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 h-full flex flex-col overflow-hidden relative">
        {/* Top Search Bar: Light Theme */}
        <div className="sticky top-0 z-30 pointer-events-none bg-gradient-to-b from-slate-50 via-slate-50 to-transparent pb-2 pt-4">
          <div className="flex items-center justify-center px-4 md:px-12 pointer-events-auto relative">
            <div className="relative w-full max-w-lg">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, shows, genres..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Right Icons */}
            <div className="hidden md:flex items-center gap-4 bg-white p-2 pl-6 rounded-full border border-slate-200 shadow-sm absolute right-4 md:right-12 top-1/2 -translate-y-1/2">
              <Bell className="w-5 h-5 text-slate-500 hover:text-blue-600 cursor-pointer transition-colors relative">
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full" />
              </Bell>
              <div
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer hover:ring-2 ring-blue-500 transition-all overflow-hidden"
                onClick={() => navigate("/login")}
              >
                <User className="w-4 h-4 text-slate-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-8 pb-10">
          <Outlet context={{ searchQuery }} />
        </div>
      </div>
    </div>
  );
};

export default Layout;