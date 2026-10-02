import type { ReactElement } from 'react';
import { SiteLayout } from './components/layout/SiteLayout/SiteLayout';
import { HomePage } from './pages/HomePage/HomePage';

export function App(): ReactElement {
  return (
    <SiteLayout>
      <HomePage />
    </SiteLayout>
  );
}
