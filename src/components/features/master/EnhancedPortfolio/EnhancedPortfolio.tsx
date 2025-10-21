import { useState } from 'react';
import { Award, Briefcase, Star } from 'lucide-react';

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  rating: number;
}

interface EnhancedPortfolioProps {
  projects?: PortfolioProject[];
  masterName?: string;
}

export function EnhancedPortfolio({ projects = [], masterName = 'Майстер' }: EnhancedPortfolioProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const defaultProjects: PortfolioProject[] = [
    {
      id: '1',
      title: 'Ремонт iPhone 14',
      description: 'Заміна дисплея та батареї',
      images: ['/placeholder-before.svg', '/placeholder-after.svg'],
      tags: ['iPhone', 'Дисплей', 'Батарея'],
      rating: 5
    },
    {
      id: '2',
      title: 'Відновлення Samsung Galaxy',
      description: 'Видалення води та заміна компонентів',
      images: ['/placeholder-before.svg', '/placeholder-after.svg'],
      tags: ['Samsung', 'Гідрозахист', 'Компоненти'],
      rating: 4.8
    }
  ];

  const portfolioProjects = projects.length > 0 ? projects : defaultProjects;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{masterName}</h2>
      <div className="flex items-center gap-2 mb-6">
        <Award className="w-5 h-5 text-yellow-500" />
        <span className="text-sm text-gray-600">Портфоліо проектів</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioProjects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
            onClick={() => setSelectedProject(project.id)}
          >
            <div className="relative h-48 bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center">
              {project.images?.[0] ? (
                <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <Briefcase className="w-16 h-16 text-white opacity-50" />
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{project.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 flex-wrap">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{project.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-x-hidden" onClick={() => setSelectedProject(null)}>
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">
                {portfolioProjects.find((p) => p.id === selectedProject)?.title}
              </h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
