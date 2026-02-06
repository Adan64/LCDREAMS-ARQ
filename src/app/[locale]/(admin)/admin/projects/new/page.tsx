import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Nuevo Proyecto</h1>
        <p className="text-gray-400 text-sm mt-1">Añade una nueva obra a tu portafolio.</p>
      </div>
      <ProjectForm />
    </div>
  );
}
