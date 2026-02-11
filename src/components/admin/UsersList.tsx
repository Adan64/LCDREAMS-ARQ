'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef, useActionState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { UserIcon, ShieldCheckIcon, PencilSquareIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { createUserAction } from '@/actions/admin/users';

type Profile = {
    id: string;
    full_name: string;
    email: string;
    role: 'admin' | 'client' | 'user';
    updated_at: string;
};

export default function UsersList() {
    const t = useTranslations('Admin.Users');
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newRole, setNewRole] = useState<'admin' | 'client' | 'user'>('client');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    // @ts-ignore
    const [state, formAction] = useActionState(createUserAction, { message: '', success: false });

    const supabase = createClient();

    // Effect to handle server action response
    useEffect(() => {
        if (state?.success) {
            setIsCreateModalOpen(false);
            alert(state.success ? 'Usuario creado correctamente' : state.message);
            fetchProfiles(); // Refresh list
            formRef.current?.reset();
        } else if (state?.message) {
            alert(state.message);
        }
    }, [state]);


    const fetchProfiles = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .select('*')
                .order('updated_at', { ascending: false, nullsFirst: false }); // Fallback to updated_at until created_at is fixed

            if (error) {
                console.error('Supabase Error:', error);
                console.error('Error Message:', error.message);
                console.error('Error Details:', error.details);
                console.error('Error Hint:', error.hint);
                throw error;
            }
            setProfiles(data || []);
        } catch (error: any) {
            console.error('Error fetching profiles (CATCH):', error);
            if (error.message) alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    const handleUpdateRole = async (id: string) => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ role: newRole })
                .eq('id', id);

            if (error) throw error;

            setProfiles(profiles.map(p => p.id === id ? { ...p, role: newRole } : p));
            setEditingId(null);
            alert(t('alerts.updated') || 'User role updated!');
        } catch (error) {
            console.error('Error updating role:', error);
            alert(t('alerts.error') || 'Error updating role.');
        }
    };

    const startEditing = (profile: Profile) => {
        setEditingId(profile.id);
        setNewRole(profile.role);
    };

    const filteredProfiles = profiles.filter(profile => {
        const name = (profile.full_name || '').toLowerCase();
        const email = (profile.email || '').toLowerCase();
        const search = searchTerm.toLowerCase();
        return name.includes(search) || email.includes(search);
    });

    if (loading) return <div className="text-gray-400 p-4">{t('loading')}</div>;

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700 flex flex-col sm:flex-row justify-between gap-4 items-center">
                <div className="w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-64 rounded-md border-0 bg-gray-700/50 py-2 pl-4 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm"
                    />
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-md text-sm font-semibold transition-colors w-full sm:w-auto justify-center"
                >
                    <PlusIcon className="h-5 w-5" />
                    {t('createUser') || 'Create User'}
                </button>
            </div>

            {/* Create User Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md mx-4 shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">{t('createUser') || 'Create New User'}</h3>
                            <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-white">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <form action={formAction} ref={formRef} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                                <input name="fullName" required className="w-full rounded-md border-0 bg-gray-900 py-2 px-3 text-white ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-yellow-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                <input name="email" type="email" required className="w-full rounded-md border-0 bg-gray-900 py-2 px-3 text-white ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-yellow-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                                <input name="password" type="password" required minLength={6} className="w-full rounded-md border-0 bg-gray-900 py-2 px-3 text-white ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-yellow-500" placeholder="Min 6 characters" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                                <select name="role" className="w-full rounded-md border-0 bg-gray-900 py-2 px-3 text-white ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-yellow-500">
                                    <option value="client">Client</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-white px-4 py-2 text-sm font-semibold">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-md text-sm font-semibold transition-colors">
                                    Create User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-900/50">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">{t('table.name')}</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">{t('table.email')}</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">{t('table.role')}</th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">{t('table.actions')}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 bg-gray-800">
                        {filteredProfiles.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-gray-400 text-sm">
                                    {t('noUsers')}
                                </td>
                            </tr>
                        ) : (
                            filteredProfiles.map((profile) => (
                                <tr key={profile.id} className="hover:bg-gray-700/30 transition-colors">
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-yellow-500">
                                                <UserIcon className="h-4 w-4" />
                                            </div>
                                            <span>{profile.full_name || 'N/A'}</span>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                        {profile.email}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                        {editingId === profile.id ? (
                                            <select
                                                value={newRole}
                                                onChange={(e) => setNewRole(e.target.value as any)}
                                                className="rounded-md border-0 bg-gray-900 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-xs sm:leading-6"
                                            >
                                                <option value="user">User</option>
                                                <option value="client">Client</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        ) : (
                                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${profile.role === 'admin'
                                                ? 'bg-purple-400/10 text-purple-400 ring-purple-400/20'
                                                : profile.role === 'client'
                                                    ? 'bg-yellow-400/10 text-yellow-500 ring-yellow-400/20'
                                                    : 'bg-gray-400/10 text-gray-400 ring-gray-400/20'
                                                }`}>
                                                {profile.role === 'admin' && <ShieldCheckIcon className="h-3 w-3" />}
                                                {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                                            </span>
                                        )}
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <div className="flex items-center justify-end gap-3">
                                            {editingId === profile.id ? (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleUpdateRole(profile.id)}
                                                        className="text-green-400 hover:text-green-300 text-xs text-bold"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="text-gray-400 hover:text-gray-300 text-xs"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => startEditing(profile)}
                                                    className="text-yellow-500 hover:text-yellow-400 transition-colors"
                                                    title={t('editRole') || 'Edit Role'}
                                                >
                                                    <PencilSquareIcon className="h-5 w-5" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
