import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { AppointmentPage } from "./pages/AppointmentPage";
import { AdminPage } from "./pages/AdminPage";
import { ReviewPage } from "./pages/ReviewPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/appointment",
    Component: AppointmentPage,
  },
  {
    path: "/admin",
    Component: AdminPage,
  },
  {
    path: "/review",
    Component: ReviewPage,
  },
  {
    path: "*",
    Component: () => (
      <div className="min-h-screen bg-gradient-to-br from-[#1a202c] via-[#2d3748] to-[#1a202c] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <p className="text-xl text-gray-300 mb-8">Page non trouvée</p>
          <a
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-[#ff6b35] to-[#f9a826] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all inline-block"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    ),
  },
]);
