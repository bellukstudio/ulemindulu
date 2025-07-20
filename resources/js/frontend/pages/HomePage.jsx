import Navbar from "../components/Navbar";
import HomeSection from "../components/HomeSection";
import UleminduluFeaturesSection from "../components/UleminduluFeaturesSection";
import FullFeaturesSection from "../components/FullFeatureSection";
import FooterSection from "../components/FooterSection";
import GetStartedSection from "../components/GetStartedSection";
/**
 * Renders the main home page of the application with the following sections:
 * - Navbar
 * - HomeSection
 * - UleminduluFeaturesSection
 * - FullFeaturesSection
 * - GetStartedSection
 * - FooterSection
 *
 * @returns {JSX.Element} The rendered home page.
 */
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
