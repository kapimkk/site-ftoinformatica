import type { ReactElement, ReactNode } from 'react';
import { SECTION_IDS } from '../../../config/navigation';
import { useActiveSection } from '../../../hooks/useActiveSection';
import { ContactDock } from '../ContactDock/ContactDock';
import { DocumentMeta } from '../DocumentMeta/DocumentMeta';
import { SiteFooter } from '../SiteFooter/SiteFooter';
import { SiteHeader } from '../SiteHeader/SiteHeader';
import { SkipLink } from '../SkipLink/SkipLink';

type SiteLayoutProps = {
  children: ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps): ReactElement {
  const activeSectionId = useActiveSection(SECTION_IDS);

  return (
    <>
      <DocumentMeta />
      <SkipLink />
      <SiteHeader activeSectionId={activeSectionId} />
      <main id="conteudo">{children}</main>
      <SiteFooter />
      <ContactDock />
    </>
  );
}
