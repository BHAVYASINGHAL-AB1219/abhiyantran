import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Schedule from "./pages/Schedule";
import ComingSoon from "./pages/ComingSoon";
import Announcements from "./pages/Announcements";
import OrganisingTeam from "./pages/OrganisingTeam";
// import Merch from "./pages/Merch"; // Temporarily replaced by ComingSoon
import EventDetail from "./pages/EventDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
  </QueryClientProvider>
);

export default App;
