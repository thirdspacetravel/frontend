import { Routes, Route, BrowserRouter } from "react-router";
import { useSystemTheme } from "./hooks/useSystemTheme";
import ScrollToTop from "./hooks/useScrollToTop";
import MainLayout from "./components/utils/MainLayout";
import Home from "./pages/Home";
import GroupTrips from "./pages/trips/GroupTrips";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TermsConditions from "./pages/policies/TermsAndConditions";
import CancellationPolicy from "./pages/policies/CancellationPolicy";
import CorporateTrips from "./pages/trips/CorporateTrips";
import Trip from "./pages/trips/Trip";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import SafetyPolicy from "./pages/policies/SafetyPolicy";
import PrivacyPolicy from "./pages/policies/PrivacyPolicy";
import AdminDashboardLayout from "./admin/pages/AdminDashboardLayout";
import DashboardPage from "./admin/pages/DashboardPage";
import TripsPage from "./admin/pages/trips/TripsPage";
import TripDetailPage from "./admin/pages/trips/TripDetailPage";
import BookingsPage from "./admin/pages/BookingsPage";
import CustomersPage from "./admin/pages/CustomersPage";
import EnquiriesPage from "./admin/pages/enquiries/EnquiriesPage";
import NotificationsPage from "./admin/pages/NotificationsPage";
import EnquiryDetailPage from "./admin/pages/enquiries/EnquiryDetailPage";
import AdminProfilePage from "./admin/pages/AdminProfilePage";
import Profile from "./pages/Profile";
import "./styles/app.scss";
import "./admin/styles/global.scss";
import AdminLoginPage from "./admin/pages/AdminLoginPage";
import AdminAuthGuard from "./admin/guards/AdminAuthGuard";
import AdminLoginGuard from "./admin/guards/AdminLoginGuard";
import LoginGuard from "./guards/LoginGuard";
import AuthGuard from "./guards/AuthGuard";
import MockPaytmPage from "./MockPaytmPage";
import { VerifyEmail } from "./pages/VerifyMail";
function App() {
  useSystemTheme();
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<LoginGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<AuthGuard />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/mock-paytm/:bookingId" element={<MockPaytmPage />} />
        </Route>
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/group-trips" element={<GroupTrips />} />
          <Route path="/corporate-trips" element={<CorporateTrips />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
          <Route path="/safety-policy" element={<SafetyPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/trip/:tripId" element={<Trip />} />
        </Route>
        <Route path="/admin">
          <Route element={<AdminLoginGuard />}>
            <Route path="login" element={<AdminLoginPage />} />
          </Route>
          <Route element={<AdminAuthGuard />}>
            <Route element={<AdminDashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="trips">
                <Route index element={<TripsPage />} />
                <Route path=":tripId" element={<TripDetailPage />} />
              </Route>
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="customers" element={<CustomersPage />} />
              <Route path="enquiries">
                <Route index element={<EnquiriesPage />} />
                <Route path=":enquiryId" element={<EnquiryDetailPage />} />
              </Route>
              <Route path="profile" element={<AdminProfilePage />} />
              <Route path="notifications" element={<NotificationsPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
