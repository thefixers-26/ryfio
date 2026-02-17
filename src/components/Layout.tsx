import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ParticleBackground from './ParticleBackground';
import PageLoader from './PageLoader';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="relative min-h-screen">
    <ParticleBackground />
    <div className="scan-line" />
    <PageLoader />
    <Navbar />
    <main className="relative z-10 pt-16">{children}</main>
    <Footer />
  </div>
);

export default Layout;
