import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { AppointmentPage } from "./pages/AppointmentPage";
import { AdminPage } from "./pages/AdminPage";
import { ReviewPage } from "./pages/ReviewPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { useLanguage } from "./contexts/LanguageContext";

function NotFoundPage() {
  const { language } = useLanguage();
  const isFr = language === "fr";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a202c] via-[#2d3748] to-[#1a202c] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-8">
          {isFr ? "Page non trouvée" : "Page not found"}
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-[#ff6b35] to-[#f9a826] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all inline-block"
        >
          {isFr ? "Retour à l'accueil" : "Back to home"}
        </a>
      </div>
    </div>
  );
}

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
    path: "/forgot-password",
    Component: ForgotPasswordPage,
  },
  {
    path: "/reset-password",
    Component: ResetPasswordPage,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
