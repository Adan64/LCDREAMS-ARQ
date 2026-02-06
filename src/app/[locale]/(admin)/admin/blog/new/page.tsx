import BlogForm from '@/components/admin/BlogForm';

export default function NewBlogPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Nuevo Artículo</h1>
        <p className="text-gray-400 text-sm mt-1">Crea contenido para el blog o noticias.</p>
      </div>
      <BlogForm />
    </div>
  );
}
