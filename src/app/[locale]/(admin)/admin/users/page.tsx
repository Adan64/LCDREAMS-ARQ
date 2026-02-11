import UsersList from '@/components/admin/UsersList';
import { useTranslations } from 'next-intl';

export default function AdminUsersPage() {
    const t = useTranslations('Admin.Users');

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
                    <p className="text-gray-400 text-sm mt-1">{t('subtitle')}</p>
                </div>
            </div>
            <UsersList />
        </div>
    );
}
