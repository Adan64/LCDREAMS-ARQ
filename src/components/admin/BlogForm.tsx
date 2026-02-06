'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';

export default function BlogForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Artículo publicado con éxito (Simulación)');
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-700 bg-gray-800 p-8 rounded-xl border border-gray-700">
      <div className="space-y-8 divide-y divide-gray-700">
        <div>
          <div>
            <h3 className="text-base font-semibold leading-6 text-white">Contenido del Artículo</h3>
            <p className="mt-1 text-sm text-gray-400">Escribe y gestiona tus publicaciones.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-white">
                Título
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block w-full rounded-md border-0 bg-gray-700/50 py-3 text-white text-lg font-medium shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:leading-6"
                  placeholder="Escribe un título atractivo..."
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-white">
                Categoría
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  name="category"
                  className="block w-full rounded-md border-0 bg-gray-700/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                >
                  <option>Diseño</option>
                  <option>Sostenibilidad</option>
                  <option>Noticias</option>
                  <option>Premios</option>
                </select>
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
                  className="block w-full rounded-md border-0 bg-gray-700/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                >
                  <option>Borrador</option>
                  <option>Publicado</option>
                  <option>Archivado</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="content" className="block text-sm font-medium leading-6 text-white">
                Contenido
              </label>
              <div className="mt-2">
                <textarea
                  id="content"
                  name="content"
                  rows={15}
                  className="block w-full rounded-md border-0 bg-gray-700/50 py-3 text-white font-mono text-sm shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-500"
                  placeholder="# Escribe tu artículo en Markdown..."
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">Soporta formato Markdown básico.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 flex items-center justify-end gap-x-6">
        <Link href="/admin/blog" className="text-sm font-semibold leading-6 text-white hover:text-gray-300">
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-yellow-500 px-6 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? 'Publicando...' : 'Publicar Artículo'}
        </button>
      </div>
    </form>
  );
}
