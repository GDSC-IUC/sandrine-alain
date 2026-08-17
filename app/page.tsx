import HeroSection from "@/components/sections/HeroSection";
import OurStorySection from "@/components/sections/OurStorySection";
import GallerySection from "@/components/sections/GallerySection";
import ProgramSection from "@/components/sections/ProgramSection";
import VenueSection from "@/components/sections/VenueSection";
import DressCodeSection from "@/components/sections/DressCodeSection";
import RsvpSection from "@/components/sections/RsvpSection";
import GuestbookSection from "@/components/sections/GuestbookSection";
import DotNavigation from "@/components/shared/DotNavigation";
import Footer from "@/components/shared/Footer";
import BackToTop from "@/components/shared/BackToTop";
import AudioPlayer from "@/components/shared/AudioPlayer";

export default function Home() {
  return (
    <main>
      <DotNavigation />
      <BackToTop />
      <AudioPlayer />
      <HeroSection />
      <OurStorySection />
      <GallerySection />
      <ProgramSection />
      <VenueSection />
      <DressCodeSection />
      <RsvpSection />
      <GuestbookSection />
      <Footer />
    </main>
  );
}
