'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

const supabaseAdmin = createAdminClient();

// Server Action for Form Submission
export async function createUserAction(prevState: any, formData: FormData) {
    const supabaseAdmin = createAdminClient();
    
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;
    const role = formData.get('role') as string;

    if (!email || !password || !fullName || !role) {
        return { message: 'All fields are required.', success: false };
    }

    try {
        // 1. Create User in Auth
        const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
            email: email,
            password: password,
            email_confirm: true, // Auto-confirm email so they can login immediately
            user_metadata: {
                full_name: fullName,
                role: role
            }
        });

        if (userError) {
            // Handle "User already registered" implementation
            if (userError.message.includes('already been registered')) {
                console.log('User already exists in Auth, checking profile...');
                // Try to find the user ID by email (Admin API doesn't expose listUsers by email easily without pagination, 
                // but we can try to re-invite or just skip to profile check if we had the ID. 
                // Better approach: Admin listUsers filter by email.
                const { data: existingUsers, error: searchError } = await supabaseAdmin.auth.admin.listUsers();
                const existingUser = existingUsers?.users.find(u => u.email === email);

                if (existingUser) {
                    // Check if profile exists
                    const { data: profile } = await supabaseAdmin
                        .from('profiles')
                        .select('id')
                        .eq('id', existingUser.id)
                        .single();

                    if (!profile) {
                        console.log('Profile missing for existing user. Creating now...');
                        const { error: insertError } = await supabaseAdmin
                            .from('profiles')
                            .insert({
                                id: existingUser.id,
                                email: email,
                                full_name: fullName,
                                role: role,
                                updated_at: new Date().toISOString(),
                                created_at: new Date().toISOString() // Manually set created_at for these synced users
                            });
                        
                        if (insertError) {
                             console.error('Error syncing profile:', insertError);
                             return { message: 'User exists but failed to create profile: ' + insertError.message, success: false };
                        }
                        revalidatePath('/admin/users');
                        return { message: 'User existed. Profile synced successfully.', success: true };
                    }
                    return { message: 'User already exists and has a profile.', success: false };
                }
            }

            console.error('Error creating auth user:', userError);
            return { message: userError.message, success: false };
        }

        // 2. Profile Creation is handled by Trigger, but we can verify/update if needed
        // The trigger uses metadata, so it should be fine.

        revalidatePath('/admin/users');
        return { message: 'User created successfully!', success: true };

    } catch (error) {
        console.error('Unexpected error creating user:', error);
        return { message: 'An unexpected error occurred.', success: false };
    }
}
