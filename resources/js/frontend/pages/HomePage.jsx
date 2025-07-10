import Navbar from "../components/Navbar";
import HomeSection from "../components/HomeSection";
import UleminduluFeaturesSection from "../components/UleminduluFeaturesSection";
import FullFeaturesSection from "../components/FullFeatureSection";
import FooterSection from "../components/FooterSection";
import GetStartedSection from "../components/GetStartedSection";
export default function HomePage() {
    return (
        <>
            <Navbar />
            <HomeSection />
            <UleminduluFeaturesSection />
            <FullFeaturesSection />
            <GetStartedSection />
            <FooterSection />
        </>
    );
}
