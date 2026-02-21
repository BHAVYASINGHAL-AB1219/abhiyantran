import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider, useAdminAuth } from "./contexts/AdminAuthContext";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Schedule from "./pages/Schedule";
import ComingSoon from "./pages/ComingSoon";
import Announcements from "./pages/Announcements";
import OrganisingTeam from "./pages/OrganisingTeam";
// import Merch from "./pages/Merch"; // Temporarily replaced by ComingSoon
import EventDetail from "./pages/EventDetail";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAdminAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/speakers" element={<ComingSoon title="Speakers" />} />
          <Route path="/sponsors" element={<ComingSoon title="Sponsors" />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/organising-team" element={<OrganisingTeam />} />
          <Route path="/merch" element={<ComingSoon title="Buy Merch" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
=======
    <AdminAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/organising-team" element={<OrganisingTeam />} />
            <Route path="/merch" element={<Merch />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AdminAuthProvider>
>>>>>>> 4068fcb6d0139f3156e5f7d2274b44dffb86e133
  </QueryClientProvider>
);

export default App;
