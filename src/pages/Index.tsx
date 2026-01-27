import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedEvents } from '@/components/home/FeaturedEvents';
import { HighlightsSection } from '@/components/home/HighlightsSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedEvents />
      <HighlightsSection />
    </Layout>
  );
};

export default Index;
