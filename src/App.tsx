
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { AssetProvider } from "@/context/AssetContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import Create from "./pages/Create";
import Editor from "./pages/Editor";
import Review from "./pages/Review";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <AssetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/homepage" 
                element={
                  <ProtectedRoute roles={["supplier"]}>
                    <Homepage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute roles={["supplier", "internal"]}>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/create" 
                element={
                  <ProtectedRoute roles={["supplier", "internal"]}>
                    <Create />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/editor" 
                element={
                  <ProtectedRoute roles={["supplier", "internal"]}>
                    <Editor />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/review" 
                element={
                  <ProtectedRoute roles={["internal"]}>
                    <Review />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/account" 
                element={
                  <ProtectedRoute roles={["supplier", "internal"]}>
                    <Account />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AssetProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
