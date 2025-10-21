interface Master {
  id: string;
  avatar: string;
  fullName: string;
  city: string;
  rating: number;
  hourlyRate: number;
}

interface MasterPart {
  id: string;
  name: string;
  price: number;
  masterId: string;
}

interface PriceComparisonProps {
  masters?: Master[];
  masterParts?: MasterPart[];
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  selectedCity?: string;
  setSelectedCity?: (city: string) => void;
  sortBy?: string;
  setSortBy?: (sort: string) => void;
  sortOrder?: string;
  setSortOrder?: (order: string) => void;
  selectedSkills?: string[];
  setSelectedSkills?: (skills: string[]) => void;
  favorites?: string[];
  toggleFavorite?: (id: string) => void;
}

export function PriceComparison(props: PriceComparisonProps) {
  const {
    masters = [],
    searchQuery = '',
    setSearchQuery = () => {},
    sortBy = 'rating',
    setSortBy = () => {}
  } = props;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Порівняння цін</h2>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Пошук майстра..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="rating">За рейтингом</option>
          <option value="price">За ціною</option>
          <option value="name">За іменем</option>
        </select>
      </div>

      {/* Masters Table */}
      {masters.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Немає даних для порівняння</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Майстер</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Місто</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Рейтинг</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ставка/год</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Дія</th>
              </tr>
            </thead>
            <tbody>
              {masters.map(master => (
                <tr key={master.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={master.avatar}
                        alt={master.fullName}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-medium text-gray-900">{master.fullName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{master.city || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-gray-900">{master.rating || 0}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-gray-900">{master.hourlyRate || 0}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => {
                        // Мастер выбран (можно добавить логику позже)
                        console.log(`Вибрано: ${master.fullName}`);
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      Вибрати
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


