import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// --- PUBLIC COMPONENTS ---
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import About from "./pages/About";
import Knowledge from "./pages/Knowledge";
import Reached from "./pages/Reached";
import Audience from "./pages/Audience";
import WhatPage from "./pages/whatPage";
import NewRelease from "./pages/NewRelease";
import TopChart from "./pages/TopChart";
import TopPlayList from "./pages/TopPlayList";
import Podcast from "./pages/Podcast";
import TopArtist from "./pages/TopArtist";

// --- LOGIN PAGE ---
import LoginPage from "./pages/LoginPage";

// --- ADMIN COMPONENTS ---
// FIXED: Changed "./Admin/..." to "./admin/..." (Lowercase)
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ArtistManager from "./admin/ArtistManager";
import SongManager from "./admin/SongManager";

// --- ADMIN PAGE IMPORTS ---
import TopPlaylistAdmin from "./admin/TopPlaylistAdmin";
import TopChartAdmin from "./admin/TopChartAdmin";
import TrendingSongsAdmin from "./admin/TrendingSongsAdmin";

// --- NEW IMPORTS ---
import LatestReleasesAdmin from "./admin/LatestReleasesAdmin";
import Top10IndiaAdmin from "./admin/Top10IndiaAdmin";

// --- PROTECTED ROUTE IMPORT ---
import ProtectedRoute from "./components/ProtectedRoute";

// --- ARTIST IMPORTS ---
// FIXED: Changed "./Artist/..." to "./artist/..." (Lowercase)
import ArtistLayout from "./artist/ArtistLayout"; 
import ArtistDashboard from "./artist/ArtistDashboard";
import ArtistSettings from "./artist/ArtistSettings";

function App() {
  return (
    <Router>
      <Routes>
        {/* --- PUBLIC ROUTES (Yahan koi password nahi lagega) --- */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path="about" element={<About />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="reached" element={<Reached />} />
          <Route path="audience" element={<Audience />} />
          <Route path="what" element={<WhatPage />} />
          <Route path="new-release" element={<NewRelease />} />
          <Route path="/topartist" element={<TopArtist />} />
          <Route path="top-chart" element={<TopChart />} />
          <Route path="top-playlist" element={<TopPlayList />} />
          <Route path="/new-releases" element={<NewRelease />} />
          <Route path="podcast" element={<Podcast />} />
        </Route>

        {/* --- LOGIN ROUTE --- */}
        <Route path="/login" element={<LoginPage />} />

        {/* --- ARTIST ROUTES (PROTECTED) --- */}
        {/* Agar user login nahi hai toh use /login par bhej dega */}
        <Route
          path="/artist"
          element={
            <ProtectedRoute>
              <ArtistLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<ArtistDashboard />} />
          <Route path="settings" element={<ArtistSettings />} />
          <Route path="artist" element={<ArtistLayout />} />
        </Route>

        {/* --- ADMIN ROUTES (PROTECTED) --- */}
        {/* Agar user login nahi hai toh use /login par bhej dega */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="artist" element={<ArtistManager />} />

          {/* --- ROUTE FOR TRENDING SONGS --- */}
          <Route path="trending-songs" element={<TrendingSongsAdmin />} />

          {/* --- NEW ROUTE FOR LATEST RELEASES --- */}
          <Route path="latest-releases" element={<LatestReleasesAdmin />} />

          {/* --- NEW ROUTE FOR TOP 10 INDIA --- */}
          <Route path="top-10-india" element={<Top10IndiaAdmin />} />

          {/* --- ROUTE FOR TOP CHARTS --- */}
          <Route path="top-charts" element={<TopChartAdmin />} />

          {/* --- ROUTE FOR TOP PLAYLISTS --- */}
          <Route path="top-playlists" element={<TopPlaylistAdmin />} />

          <Route path="songs" element={<SongManager />} />
        </Route>

        {/* --- 404 / FALLBACK --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;