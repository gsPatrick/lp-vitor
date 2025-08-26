// /app/[lang]/assessment/success/page.js
import { getDictionary } from '../../../../../get-dictionary';
import { getFormDictionary } from '../../../../../dictionaries/form-dictionary';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import CalendlyEmbed from '../../../components/CalendlyEmbed/CalendlyEmbed';

export async function generateMetadata({ params: { lang } }) {
    const dictionary = await getDictionary(lang);
    return {
        title: `Agende sua Avaliação | Keystone Consulting`,
        description: dictionary.hero.subheadline,
    };
}

export default async function AssessmentSuccessPage({ params: { lang } }) {
    const mainDictionary = await getDictionary(lang);
    const formDictionary = await getFormDictionary(lang);

    return (
        <>
            <Header dictionary={mainDictionary.header} />
            <main>
                <CalendlyEmbed dictionary={formDictionary.form} />
            </main>
            <Footer dictionary={mainDictionary.footer} />
        </>
    );
}