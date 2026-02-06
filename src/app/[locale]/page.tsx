import { redirect } from 'next/navigation';

export default function LocaleIndex() {
    // Redirect from /es, /en, /pt to their /homepage equivalents
    redirect('homepage');
}
