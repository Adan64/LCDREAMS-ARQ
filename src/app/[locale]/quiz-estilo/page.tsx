import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import QuizPage from './QuizPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    es: '¿Cuál es tu Estilo Arquitectónico? – DREAMWORK',
    en: 'What is Your Architectural Style? – DREAMWORK',
    pt: 'Qual é o Seu Estilo Arquitetônico? – DREAMWORK',
  };
  const descriptions: Record<string, string> = {
    es: 'Descubre en 5 preguntas cuál es tu estilo arquitectónico ideal: minimalista, sostenible, contemporáneo o industrial. Obtén una consulta gratuita personalizada.',
    en: 'Discover in 5 questions what your ideal architectural style is: minimalist, sustainable, contemporary or industrial. Get a personalized free consultation.',
    pt: 'Descubra em 5 perguntas qual é o seu estilo arquitetônico ideal: minimalista, sustentável, contemporâneo ou industrial. Obtenha uma consulta gratuita personalizada.',
  };
  return {
    title: titles[locale] ?? titles.es,
    description: descriptions[locale] ?? descriptions.es,
    openGraph: {
      title: titles[locale] ?? titles.es,
      description: descriptions[locale] ?? descriptions.es,
      type: 'website',
    },
  };
}

export default function QuizEstiloPage() {
  return <QuizPage />;
}
