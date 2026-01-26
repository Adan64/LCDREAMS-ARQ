import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ContactHero from './components/ContactHero';
import ContactMethods from './components/ContactMethods';
import ConsultationForm from './components/ConsultationForm';
import ResponseTime from './components/ResponseTime';
import OfficeLocation from './components/OfficeLocation';
import FAQSection from './components/FAQSection';
import ContactFooter from './components/ContactFooter';

export const metadata: Metadata = {
  title: 'Contact & Consultation - LCDREAM.ARQ',
  description: 'Get in touch with LCDREAM.ARQ to discuss your architectural project. Schedule a consultation, visit our Madrid studio, or contact us via phone, email, or our online form. We respond within 24 hours.',
};

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