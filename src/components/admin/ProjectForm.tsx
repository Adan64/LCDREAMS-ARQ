'use client';

import { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { Link } from '@/i18n/routing';

export default function ProjectForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Proyecto guardado con éxito (Simulación)');
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-700 bg-gray-800 p-8 rounded-xl border border-gray-700">
      <div className="space-y-8 divide-y divide-gray-700">
        <div>
          <div>
            <h3 className="text-base font-semibold leading-6 text-white">Información del Proyecto</h3>
            <p className="mt-1 text-sm text-gray-400">Esta información será pública en el portafolio.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-white">
                Título del Proyecto
              </label>
              <div className="mt-2">
                <div className="flex rounded-md bg-gray-700/50 ring-1 ring-inset ring-gray-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-500">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="flex-1 border-0 bg-transparent py-2.5 pl-3 text-white placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Ej: Casa en la Playa"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="client" className="block text-sm font-medium leading-6 text-white">
                Cliente
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="client"
                  id="client"
                  className="block w-full rounded-md border-0 bg-gray-700/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="status" className="block text-sm font-medium leading-6 text-white">
                Estado
              </label>
              <div className="mt-2">
                <select
                  id="status"
                  name="status"
                  className="block w-full rounded-md border-0 bg-gray-700/50 py-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                >
                  <option>Diseño</option>
                  <option>Licencia</option>
                  <option>En Construcción</option>
                  <option>Completado</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-white">
                Descripción
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 bg-gray-700/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white">
                Imagen de Portada
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10 hover:border-gray-500 transition-colors cursor-pointer">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-400">
                    <span className="relative rounded-md font-semibold text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-500 focus-within:ring-offset-2 hover:text-yellow-400">
                      Sube un archivo
                    </span>
                    <p className="pl-1">o arrastra y suelta</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 flex items-center justify-end gap-x-6">
        <Link href="/admin/projects" className="text-sm font-semibold leading-6 text-white hover:text-gray-300">
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-yellow-500 px-6 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Proyecto'}
        </button>
      </div>
    </form>
  );
}
