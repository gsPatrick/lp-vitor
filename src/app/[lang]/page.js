// src/app/[lang]/page.js
import { getDictionary } from '../../../get-dictionary'; // Ajuste o caminho se necessário
import { getFormDictionary } from '../../../dictionaries/form-dictionary'; // ===== 1. IMPORTAR O DICIONÁRIO DO FORMULÁRIO =====

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
import AssessmentForm from '../components/AssessmentForm/AssessmentForm'; // ===== 2. IMPORTAR O COMPONENTE DO FORMULÁRIO =====

import Footer from '../components/Footer/Footer';
// Importe a nova seção AHK quando ela for criada
 import AhkSection from '../components/AhkSection/AhkSection';


export default async function Home({ params: { lang } }) {
  // Carrega o dicionário correto com base no idioma da URL
  const dictionary = await getDictionary(lang);
  const formDictionary = await getFormDictionary(lang); // ===== 3. OBTER OS DADOS DO FORMULÁRIO =====

  return (
    <main>
      <Header dictionary={dictionary.header} />
      {/* ===== MUDANÇA AQUI: Adicionamos a prop 'lang' ===== */}
      <Hero dictionary={dictionary.hero} lang={lang} />
      {/* ====================================================== */}
      <PainPoints dictionary={dictionary.painPoints} />
      <Advantage dictionary={dictionary.advantage} />
      <Services dictionary={dictionary.services} />
      <AboutFounder dictionary={dictionary.aboutFounder} />
      <Testimonials dictionary={dictionary.testimonials} />
      <Audience dictionary={dictionary.audience} />
      <FAQ dictionary={dictionary.faq} />
      <CTASection dictionary={dictionary.cta} />
      <ContactSection dictionary={dictionary.contact} />

    {/* ===== 4. POSICIONAR O FORMULÁRIO NO LOCAL CORRETO ===== */}
      <AssessmentForm 
        dictionary={formDictionary.form} 
        formData={formDictionary.formData} 
      />
      {/* ======================================================= */}
      
      
      <AhkSection dictionary={dictionary.ahk} lang={lang} />
      <Footer dictionary={dictionary.footer} />
    </main>
  );
}