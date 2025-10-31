import { useState, useMemo } from 'react';
import { Grid, List } from 'lucide-react';
import { handleImageError } from '../../utils/helpers';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  rating: number;
  masterId: string;
  category?: string;
  reviews?: number;
  date?: string;
  views?: number;
  likes?: number;
  tags?: string[];
  client?: string;
  duration?: string;
}

interface User {
  id?: string;
}

interface PortfolioProps {
  portfolio?: PortfolioItem[];
  currentUser?: User;
}

const categories = [
  'Все',
  'Екрани iPhone',
  'Заміна батареї',
  'Ремонт MacBook',
  'Пошкодження від рідини',
];

export function Portfolio({ portfolio = [] }: PortfolioProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [_selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  // Трансформувати старі дані в новий формат
  const transformedPortfolio = portfolio.map((item) => ({
    ...item,
    category: item.category || 'iPhone Screens',
    reviews: item.reviews || Math.floor(Math.random() * 50),
    date: item.date || new Date().toISOString(),
    views: item.views || Math.floor(Math.random() * 2000),
    likes: item.likes || Math.floor(Math.random() * 200),
    tags: item.tags || ['Apple', 'Ремонт', 'Якість'],
    client: item.client || 'Приватний клієнт',
    duration: item.duration || '1-2 дні'
  }));

  const filteredAndSortedProjects = useMemo(() => {
    const filtered = transformedPortfolio.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      const matchesCategory = selectedCategory === 'Все' || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'views':
          return (b.views || 0) - (a.views || 0);
        case 'likes':
          return (b.likes || 0) - (a.likes || 0);
        case 'date':
        default:
          return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
      }
    });

    return filtered;
  }, [transformedPortfolio, searchQuery, selectedCategory, sortBy]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : i < rating
                ? 'fill-yellow-200 text-yellow-400'
                : 'text-gray-300'
            }`}
          >
            ⭐
          </span>
        ))}
        <span className="ml-1 text-sm font-medium text-gray-900">{rating.toFixed(1)}</span>
        <span className="text-sm text-gray-600">({transformedPortfolio.find(p => p.rating === rating)?.reviews || 0})</span>
      </div>
    );
  };

  const ProjectCard = ({ project }: { project: PortfolioItem }) => {
    if (viewMode === 'list') {
      return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 relative overflow-hidden group h-64 md:h-auto bg-gray-100">
              {project.images?.[0] ? (
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h16M4 6a2 2 0 012-2h12a2 2 0 012 2M4 6v10a2 2 0 002 2h12a2 2 0 002-2V6m-4 0V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m0 0h8" />
                  </svg>
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {project.category}
                </span>
              </div>
            </div>
            <div className="md:w-2/3 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{project.description}</p>
              
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                <div><span className="font-medium text-gray-900">Клієнт:</span> {project.client}</div>
                <div><span className="font-medium text-gray-900">Тривалість:</span> {project.duration}</div>
              </div>

              {renderStars(project.rating || 4.5)}

              <div className="mt-4 flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>👁️</span>
                    <span>{project.views || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>❤️</span>
                    <span>{project.likes || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📅</span>
                    <span>{new Date(project.date || '').toLocaleDateString('uk-UA')}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Деталі
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
        <div className="relative overflow-hidden h-48">
          <img
            src={project.images?.[0] || 'https://via.placeholder.com/300x200'}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              {project.category}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <button 
              onClick={() => setSelectedProject(project)}
              className="w-full bg-white hover:bg-gray-100 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium"
            >
              Деталі
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{project.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
          
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {renderStars(project.rating || 4.5)}

          <div className="mt-3 flex items-center justify-between pt-3 border-t text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span>👁️</span>
                <span>{project.views || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>❤️</span>
                <span>{project.likes || 0}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span>📅</span>
              <span>{new Date(project.date || '').toLocaleDateString('uk-UA', { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Портфоліо</h1>
          <p className="text-gray-600">Професійні роботи з високим рейтингом</p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5">🔍</span>
              <input
                type="text"
                placeholder="Пошук проектів..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="date">По даті</option>
              <option value="rating">По рейтингу</option>
              <option value="views">По переглядам</option>
              <option value="likes">По лайкам</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 text-sm text-gray-600">
          Знайдено проектів: <span className="font-semibold text-gray-900">{filteredAndSortedProjects.length}</span>
        </div>

        {filteredAndSortedProjects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">Проекти не знайдені</p>
            <p className="text-sm text-gray-500 mt-2">Спробуйте змінити параметри пошуку</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'flex flex-col gap-6'
          }>
            {filteredAndSortedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


