'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { Link, useRouter } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/client';

interface ProjectFormProps {
  initialData?: any;
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const t = useTranslations('Admin.Projects.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isChanged, setIsChanged] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Helper to safely get localized string from JSONB
  const getLocStr = (val: any) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val.es || val.en || '';
  };

  // State for controlled inputs
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    status: 'Diseño',
    description: '',
    access_code: '',
    progress: 0,
    start_date: '',
    estimated_completion: ''
  });

  // Initialize form data when initialData loads
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: getLocStr(initialData.title),
        client: initialData.client || '',
        status: initialData.status || 'Diseño',
        description: getLocStr(initialData.description),
        access_code: initialData.access_code || '',
        progress: initialData.progress || 0,
        start_date: initialData.start_date || '',
        estimated_completion: initialData.estimated_completion || ''
      });
    }
  }, [initialData]);

  // Check for changes
  useEffect(() => {
    if (!initialData) {
      setIsChanged(!!formData.title);
      return;
    }

    const hasChanges =
      formData.title !== getLocStr(initialData.title) ||
      formData.client !== (initialData.client || '') ||
      formData.status !== (initialData.status || 'Diseño') ||
      formData.description !== getLocStr(initialData.description) ||
      formData.access_code !== (initialData.access_code || '') ||
      Number(formData.progress) !== (initialData.progress || 0) ||
      formData.start_date !== (initialData.start_date || '') ||
      formData.estimated_completion !== (initialData.estimated_completion || '');

    setIsChanged(hasChanges || !!file);
  }, [formData, initialData, file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isChanged && !file && initialData) return;
    setIsSubmitting(true);

    try {
      let imageUrl = initialData?.cover_image || null;

      // 1. Upload Image if exists
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('projects')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('projects')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      // 2. Prepare Data Payload
      const payload = {
        title: { es: formData.title, en: formData.title + ' (EN)', pt: formData.title + ' (PT)' },
        client: formData.client,
        status: formData.status,
        description: { es: formData.description, en: formData.description + ' (EN)', pt: formData.description + ' (PT)' },
        cover_image: imageUrl,
        category: 'Residencial',

        // Client Portal Data
        access_code: formData.access_code || null,
        progress: formData.progress ? Number(formData.progress) : 0,
        start_date: formData.start_date || null,
        estimated_completion: formData.estimated_completion || null,

        ...(initialData ? {} : { images: [] })
      };

      let error;

      if (initialData?.id) {
        const { error: updateError } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', initialData.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('projects')
          .insert(payload);
        error = insertError;
      }

      if (error) throw error;

      alert(initialData ? '¡Proyecto actualizado!' : '¡Proyecto creado con éxito!');
      router.push('/admin/projects');
      router.refresh();

    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar el proyecto.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-700 bg-gray-800 p-8 rounded-xl border border-gray-700">
      <div className="space-y-8 divide-y divide-gray-700">
        <div>
          <div>
            <h3 className="text-base font-semibold leading-6 text-white">
              {initialData ? t('editInfo') : t('titleInfo')}
            </h3>
            <p className="mt-1 text-sm text-gray-400">{t('subtitleInfo')}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-white">
                {t('projectTitle')}
              </label>
              <div className="mt-2">
                <div className="flex rounded-md bg-gray-700/50 ring-1 ring-inset ring-gray-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-500">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="flex-1 border-0 bg-transparent py-2.5 pl-3 text-white placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Ej: Casa en la Playa"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="client" className="block text-sm font-medium leading-6 text-white">
                {t('client')}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="client"
                  id="client"
                  value={formData.client}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-gray-700/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="status" className="block text-sm font-medium leading-6 text-white">
                {t('status')}
              </label>
              <div className="mt-2">
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-gray-700/50 py-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                >
                  <option value="Diseño">{t('status') === 'Status' ? 'Design' : 'Diseño'}</option>
                  <option value="Licencia">Licencia</option>
                  <option value="En Construcción">En Construcción</option>
                  <option value="Completado">{t('status') === 'Status' ? 'Completed' : 'Completado'}</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-white">
                {t('description')}
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-gray-700/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Client Portal Section */}
            <div className="col-span-full pt-6 border-t border-gray-700">
              <h3 className="text-base font-semibold leading-6 text-white mb-4">{t('clientPortalSection')}</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                <div className="sm:col-span-3">
                  <label htmlFor="access_code" className="block text-sm font-medium leading-6 text-yellow-500">
                    {t('accessCode')}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="access_code"
                      id="access_code"
                      value={formData.access_code}
                      onChange={handleChange}
                      placeholder="Ej: VILLA2024"
                      className="block w-full rounded-md border-0 bg-gray-700/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="progress" className="block text-sm font-medium leading-6 text-white">
                    {t('progress')}
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="progress"
                      id="progress"
                      min="0"
                      max="100"
                      value={formData.progress}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 bg-gray-700/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="start_date" className="block text-sm font-medium leading-6 text-white">
                    {t('startDate')}
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="start_date"
                      id="start_date"
                      value={formData.start_date}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 bg-gray-700/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="estimated_completion" className="block text-sm font-medium leading-6 text-white">
                    {t('estimatedDate')}
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="estimated_completion"
                      id="estimated_completion"
                      value={formData.estimated_completion}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 bg-gray-700/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white">
                {t('coverImage')}
              </label>
              {initialData?.cover_image && (
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-2">Imagen actual:</p>
                  <img src={initialData.cover_image} alt="Cover" className="h-32 rounded-lg object-cover" />
                </div>
              )}
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10 hover:border-gray-500 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  {file ? (
                    <div className="text-yellow-500 font-semibold">{file.name}</div>
                  ) : (
                    <>
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-400">
                        <span className="relative rounded-md font-semibold text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-500 focus-within:ring-offset-2 hover:text-yellow-400">
                          {initialData?.cover_image ? t('uploadImage') : t('uploadImage')}
                        </span>
                        <p className="pl-1">o arrastra y suelta</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 flex items-center justify-end gap-x-6">
        <Link href="/admin/projects" className="text-sm font-semibold leading-6 text-white hover:text-gray-300">
          {t('cancel')}
        </Link>
        <button
          type="submit"
          disabled={isSubmitting || !isChanged}
          className="rounded-md bg-yellow-500 px-6 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? t('saving') : (initialData ? t('update') : t('save'))}
        </button>
      </div>
    </form>
  );
}
