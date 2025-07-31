// src/app/page.js
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import PainPoints from './components/PainPoints/PainPoints';
import Advantage from './components/Advantage/Advantage';
import Services from './components/Services/Services';
import AboutFounder from './components/AboutFounder/AboutFounder';
import Testimonials from './components/Testimonials/Testimonials';
import Audience from './components/Audience/Audience';
import FAQ from './components/FAQ/FAQ';
import CTASection from './components/CTASection/CTASection';
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/Footer/Footer';
export default function Home() {
  return (
    <main>
      <Header />
    <Hero />
    <PainPoints />
    <Advantage />
    <Services />
    <AboutFounder />
    <Testimonials />
    <Audience />
    <FAQ/>
    <CTASection />
    <ContactSection/>
    <Footer />
    </main>
  );
}