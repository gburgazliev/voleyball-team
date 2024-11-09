import "./App.css";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MobileHeader from "./components/mobileHeader/MobileHeader";
import { useEffect } from "react";
import { isMobileDevice } from "./utils/utils";
import React from "react";
import Loader from "./components/loader/Loader";
import { useLocation } from "react-router-dom";
import AuthPage from "./components/authPage/AuthPage";
const LazyHome = React.lazy(() => import("./views/home/Home"));
const LazyAboutUs = React.lazy(() => import("./components/aboutUs/AboutUs"));
const LazyDetailedAthletePage = React.lazy(() =>
  import("./components/detailedAthletePage/DetailedAthletePage")
);
const LazyCoachesPage = React.lazy(() =>
  import("./components/coachesPage/CoachesPage")
);
const LazyDetailedCoach = React.lazy(() =>
  import("./components/detailedCoach/DetailedCoach")
);
const LazyContactUsPage = React.lazy(() =>
  import("./components/contactUsPage/ContactUsPage")
);

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);

  return (
    <div className="app">
      {!isMobileDevice() ? <Header /> : <MobileHeader />}
      <div className="main">
        <Routes>
          <Route
            path="/detailed-athlete-view/:id"
            element={
              <React.Suspense fallback={<Loader />}>
                <LazyDetailedAthletePage />
              </React.Suspense>
            }
          />
          <Route
            path="/coaches"
            element={
              <React.Suspense fallback={<Loader />}>
                <LazyCoachesPage />
              </React.Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <React.Suspense fallback={<Loader />}>
                <LazyContactUsPage />
              </React.Suspense>
            }
          />
          <Route
            path="/about-us"
            element={
              <React.Suspense fallback={<Loader />}>
                <LazyAboutUs />
              </React.Suspense>
            }
          />

          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/detailed-coach/:id"
            element={
              <React.Suspense fallback={<Loader />}>
                <LazyDetailedCoach />
              </React.Suspense>
            }
          />
          <Route
            path="/"
            element={
              <React.Suspense fallback={<Loader />}>
                <LazyHome />
              </React.Suspense>
            }
          />
          <Route path="*" element={"Not found"} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
