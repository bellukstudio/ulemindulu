import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import HomeSection from "./components/HomeSection";
import "flowbite";
import UleminduluFeaturesSection from "./components/UleminduluFeaturesSection";
import FullFeaturesSection from "./components/FullFeatureSection";
import FooterSection from "./components/FooterSection";
import PriceListSection from "./components/PriceListSection";
const App = () => {
    return (
        <>
            <Navbar />
            <HomeSection />
            <UleminduluFeaturesSection/>
            <FullFeaturesSection/>
            <PriceListSection/>
            <FooterSection/>
        </>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
