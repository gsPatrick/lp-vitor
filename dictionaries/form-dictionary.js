// /form-dictionary.js (COM FAIXAS DE RECEITA CORRIGIDAS)

const dictionaries = {
  en: {
    form: {
      introTitle: "Ready to Scale with Clarity?",
      introText: "Your journey towards financial mastery starts here. By providing a few details, you allow us to prepare a preliminary analysis tailored to your business. This isn't just a form; it's the first step towards transforming your financial future.",
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "Enter your full name",
      businessEmailLabel: "Business Email",
      businessEmailPlaceholder: "your.email@company.com",
      countryLabel: "Country",
      countryPlaceholder: "Select your country",
      annualRevenueLabel: "Annual Revenue (USD)",
      annualRevenuePlaceholder: "Select revenue range",
      countryCodeLabel: "Country Code",
      countryCodePlaceholder: "Code",
      phoneLabel: "Phone Number",
      phonePlaceholder: "(555) 123-4567",
      submitButton: "Schedule Free Assessment",
      submittingButton: "Submitting...",
      privacyText: "Your information is secure and will never be shared. We respect your privacy.",
      successMessage: "Thank you! Your assessment has been scheduled successfully.",
      errorMessage: "An error occurred. Please try again later."
    }
  },
  pt: {
    form: {
      introTitle: "Pronto para Escalar com Clareza?",
      introText: "Sua jornada rumo à maestria financeira começa aqui. Ao fornecer alguns detalhes, você nos permite preparar uma análise preliminar focada no seu negócio. Isto não é apenas um formulário; é o primeiro passo para transformar o futuro financeiro da sua empresa.",
      fullNameLabel: "Nome Completo",
      fullNamePlaceholder: "Digite seu nome completo",
      businessEmailLabel: "E-mail Comercial",
      businessEmailPlaceholder: "seu.email@empresa.com",
      countryLabel: "País",
      countryPlaceholder: "Selecione seu país",
      annualRevenueLabel: "Receita Anual (USD)",
      annualRevenuePlaceholder: "Selecione a faixa de receita",
      countryCodeLabel: "Cód. do País",
      countryCodePlaceholder: "Cód.",
      phoneLabel: "Número de Telefone",
      phonePlaceholder: "(11) 99999-9999",
      submitButton: "Agendar Avaliação Gratuita",
      submittingButton: "Enviando...",
      privacyText: "Suas informações estão seguras e nunca serão compartilhadas. Respeitamos sua privacidade.",
      successMessage: "Obrigado! Sua avaliação foi agendada com sucesso.",
      errorMessage: "Ocorreu um erro. Por favor, tente novamente mais tarde."
    }
  },
  de: {
    form: {
      introTitle: "Bereit, mit Klarheit zu skalieren?",
      introText: "Ihre Reise zur finanziellen Meisterschaft beginnt hier. Indem Sie einige Details angeben, ermöglichen Sie uns, eine auf Ihr Unternehmen zugeschnittene vorläufige Analyse vorzubereiten. Dies ist nicht nur ein Formular; es ist der erste Schritt zur Transformation Ihrer finanziellen Zukunft.",
      fullNameLabel: "Vollständiger Name",
      fullNamePlaceholder: "Geben Sie Ihren vollständigen Namen ein",
      businessEmailLabel: "Geschäftliche E-Mail-Adresse",
      businessEmailPlaceholder: "ihre.email@firma.com",
      countryLabel: "Land",
      countryPlaceholder: "Wählen Sie Ihr Land aus",
      annualRevenueLabel: "Jahresumsatz (USD)",
      annualRevenuePlaceholder: "Umsatzbereich auswählen",
      countryCodeLabel: "Ländervorwahl",
      countryCodePlaceholder: "Vorwahl",
      phoneLabel: "Telefonnummer",
      phonePlaceholder: "(0151) 12345678",
      submitButton: "Kostenlose Bewertung Vereinbaren",
      submittingButton: "Wird gesendet...",
      privacyText: "Ihre Informationen sind sicher und werden niemals weitergegeben. Wir respektieren Ihre Privatsphäre.",
      successMessage: "Vielen Dank! Ihre Bewertung wurde erfolgreich vereinbart.",
      errorMessage: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
    }
  }
};

const formData = {
  countries: ["United States", "Canada", "United Kingdom", "Germany", "France", "Netherlands", "Italy", "Spain", "Brazil", "Switzerland", "Sweden"],
  // ===== FAIXAS DE RECEITA ATUALIZADAS AQUI =====
  revenues: ["Under $250.000", "$250.000 - $500.000", "$500.000 - $750.000", "$750.000 - $1.000.000", "$1.000.000 - $5.000.000", "$5.000.000+"],
  // ===============================================
  countryCodes: ["+1 (US/CA)", "+44 (UK)", "+49 (DE)", "+33 (FR)", "+31 (NL)", "+39 (IT)", "+34 (ES)", "+55 (BR)", "+41 (CH)", "+46 (SE)"]
};


export const getFormDictionary = async (locale) => {
  const lang = dictionaries[locale] ? locale : 'en';
  return {
    ...dictionaries[lang],
    formData
  };
};