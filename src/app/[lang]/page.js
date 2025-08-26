// /app/[lang]/page.js (ATUALIZADO)
import { getDictionary } from '../../../get-dictionary';
import { getFormDictionary } from '../../../dictionaries/form-dictionary';

import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import PainPoints from '../components/PainPoints/PainPoints';
import Advantage from '../components/Advantage/Advantage';
import Services from '../components/Services/Services';
import AboutFounder from '../components/AboutFounder/AboutFounder';
import Testimonials from '../components/Testimonials/Testimonials';
import Audience from '../components/Audience/Audience';
import FAQ from '../components/FAQ/FAQ';
import CTASection from '../components/CTASection/CTASection';
import ContactSection from '../components/ContactSection/ContactSection';
import AssessmentForm from '../components/AssessmentForm/AssessmentForm';
import AhkSection from '../components/AhkSection/AhkSection';
import Footer from '../components/Footer/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp/FloatingWhatsApp';
import BrazilExpansion from '../components/BrazilExpansion/BrazilExpansion';


export default async function Home({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const formDictionary = await getFormDictionary(lang);

  const whatsappChannel = dictionary.contact.channels.find(c => c.title === 'WhatsApp');
  const whatsappLink = whatsappChannel ? whatsappChannel.link : '';

  return (
    <main>
      <Header dictionary={dictionary.header} />
      <Hero dictionary={dictionary.hero} lang={lang} />
      <PainPoints dictionary={dictionary.painPoints} />
      <Advantage dictionary={dictionary.advantage} />
      <Services dictionary={dictionary.services} />
      <AboutFounder dictionary={dictionary.aboutFounder} />
      <Testimonials dictionary={dictionary.testimonials} />
      <Audience dictionary={dictionary.audience} />
      <BrazilExpansion dictionary={dictionary.brazilExpansion} />
      <FAQ dictionary={dictionary.faq} />
      <CTASection dictionary={dictionary.cta} />
      <ContactSection dictionary={dictionary.contact} />
      
      {/* ===== ALTERAÇÃO PRINCIPAL AQUI ===== */}
      {/* Adicionamos a prop 'lang' ao componente */}
      <AssessmentForm 
        dictionary={formDictionary.form} 
        formData={formDictionary.formData}
        lang={lang} 
      />
      {/* ======================================= */}

      <AhkSection dictionary={dictionary.ahk} lang={lang} />
      <Footer dictionary={dictionary.footer} />
      <FloatingWhatsApp link={whatsappLink} />
    </main>
  );
}