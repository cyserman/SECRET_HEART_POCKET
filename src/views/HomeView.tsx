import AuraBackground from "../components/layout/AuraBackground";
import AppHeader from "../components/layout/AppHeader";
import MobileFooterNav from "../components/layout/MobileFooterNav";
import WebFooter from "../components/layout/WebFooter";
import LegacyBanner from "../components/home/LegacyBanner";
import HeroSection from "../components/home/HeroSection";
import CommunityStories from "../components/home/CommunityStories";
import StoryCreationTools from "../components/home/StoryCreationTools";

export default function HomeView() {
  return (
    <div className="bg-[#0B1221] text-neutral-200 antialiased font-sans min-h-screen">
      <AuraBackground />
      <AppHeader />

      <main className="pt-40 md:pt-48 pb-20 max-w-7xl mx-auto md:px-8">
        <LegacyBanner onActivate={() => alert("Open Legacy Mode modal")} />
        <HeroSection
          onCreate={() => (window.location.href = "/create")}
          onBrowse={() => (window.location.href = "/market")}
        />
        <CommunityStories />
        <StoryCreationTools />
      </main>

      <MobileFooterNav />
      <WebFooter />
    </div>
  );
}
