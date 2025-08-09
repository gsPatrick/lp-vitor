// /app/[lang]/assessment/page.js
import { getDictionary } from '../../../../get-dictionary'; // Para Header/Footer
import { getFormDictionary } from '../../../../dictionaries/form-dictionary';
import AssessmentForm from '../../components/AssessmentForm/AssessmentForm';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// Metadata opcional
export async function generateMetadata({ params: { lang } }) {
    const { form } = await getFormDictionary(lang);
    return {
        title: `${form.title} | Financify`,
    };
}

export default async function AssessmentPage({ params: { lang } }) {
    // Buscamos AMBOS os dicionários
    const mainDictionary = await getDictionary(lang);
    const formDictionary = await getFormDictionary(lang);

    return (
        <>
            {/* Passamos o dicionário principal para o Header */}
            <Header dictionary={mainDictionary.header} />
            <main>
                {/* Passamos o dicionário do formulário para o componente */}
                <AssessmentForm 
                    dictionary={formDictionary.form} 
                    formData={formDictionary.formData} 
                />
            </main>
            {/* Passamos o dicionário principal para o Footer */}
            <Footer dictionary={mainDictionary.footer} />
        </>
    );
}