import SiteFooter from '../components/layout/common/SiteFooter';
import SiteNavbar from '../components/layout/common/SiteNavbar';

export default function SiteLayout({ children, mainClassName = '' }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-surface selection:bg-primary/20 selection:text-primary">
      <SiteNavbar />
      <main className={`pt-28 ${mainClassName}`}>{children}</main>
      <SiteFooter />
    </div>
  );
}
