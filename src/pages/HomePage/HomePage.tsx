import type { ReactElement } from 'react';
import { ContactSection } from '../../sections/ContactSection/ContactSection';
import { DifferentialsSection } from '../../sections/DifferentialsSection/DifferentialsSection';
import { FaqSection } from '../../sections/FaqSection/FaqSection';
import { HeroSection } from '../../sections/HeroSection/HeroSection';
import { MobileSection } from '../../sections/MobileSection/MobileSection';
import { NotebookSection } from '../../sections/NotebookSection/NotebookSection';
import { PrinterSection } from '../../sections/PrinterSection/PrinterSection';
import { ProcessSection } from '../../sections/ProcessSection/ProcessSection';
import { QuickServiceSection } from '../../sections/QuickServiceSection/QuickServiceSection';
import { QuoteSection } from '../../sections/QuoteSection/QuoteSection';
import { ServicesSection } from '../../sections/ServicesSection/ServicesSection';
import { StatsSection } from '../../sections/StatsSection/StatsSection';
import { SupportSection } from '../../sections/SupportSection/SupportSection';
import { TestimonialsSection } from '../../sections/TestimonialsSection/TestimonialsSection';

export function HomePage(): ReactElement {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <NotebookSection />
      <MobileSection />
      <PrinterSection />
      <SupportSection />
      <DifferentialsSection />
      <ProcessSection />
      <StatsSection />
      <QuickServiceSection />
      <TestimonialsSection />
      <FaqSection />
      <QuoteSection />
      <ContactSection />
    </>
  );
}
