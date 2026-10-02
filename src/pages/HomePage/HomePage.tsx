import type { ReactElement } from 'react';
import { ContactSection } from '../../sections/ContactSection/ContactSection';
import { DifferentialsSection } from '../../sections/DifferentialsSection/DifferentialsSection';
import { FaqSection } from '../../sections/FaqSection/FaqSection';
import { HeroSection } from '../../sections/HeroSection/HeroSection';
import { ProcessSection } from '../../sections/ProcessSection/ProcessSection';
import { ServiceExplorer } from '../../sections/ServiceExplorer/ServiceExplorer';

export function HomePage(): ReactElement {
  return (
    <>
      <HeroSection />
      <ServiceExplorer />
      <ContactSection />
      <ProcessSection />
      <DifferentialsSection />
      <FaqSection />
    </>
  );
}
