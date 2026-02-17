import { useState, useCallback } from 'react';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import PageTransition from "./components/PageTransition";
import SplashScreen from "./components/SplashScreen";
import HomePage from "./pages/HomePage";
import FounderPage from "./pages/FounderPage";
import PillarsPage from "./pages/PillarsPage";
import JoinPage from "./pages/JoinPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/founder" element={<PageTransition><FounderPage /></PageTransition>} />
        <Route path="/pillars" element={<PageTransition><PillarsPage /></PageTransition>} />
        <Route path="/join" element={<PageTransition><JoinPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [splashDone, setSplashDone] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('ryfio-splash') === 'done';
  });

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem('ryfio-splash', 'done');
    setSplashDone(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
        <BrowserRouter>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
