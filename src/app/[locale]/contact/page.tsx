import { getTranslations } from 'next-intl/server';
import Header from '@/components/common/Header';
import ContactHero from './components/ContactHero';
import ContactMethods from './components/ContactMethods';
import ConsultationForm from './components/ConsultationForm';
import ResponseTime from './components/ResponseTime';
import OfficeLocation from './components/OfficeLocation';
import FAQSection from './components/FAQSection';
import ContactFooter from './components/ContactFooter';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Contact.metadata' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-20">
        <ContactHero />
        <ResponseTime />
        <ContactMethods />
        <ConsultationForm />
        <OfficeLocation />
        <FAQSection />
        <ContactFooter />
      </div>
    </main>
  );
}