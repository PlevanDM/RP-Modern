export const ExperienceStep = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Ваш опыт работы</h2>
      <p className="text-gray-600 text-center">Добавьте места работы, чтобы повысить доверие клиентов.</p>

      <div className="space-y-4 p-4 border rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700">Название компании</label>
          <input
            type="text"
            placeholder="Например, iFixit"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Должность</label>
          <input
            type="text"
            placeholder="Например, Ведущий инженер"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="flex space-x-4">
            <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Дата начала</label>
                <input
                    type="text"
                    placeholder="Например, Январь 2020"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Дата окончания</label>
                <input
                    type="text"
                    placeholder="Например, Наст. время"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>
        </div>
      </div>
      <div className="text-center">
        <button className="text-blue-500 hover:underline">
          + Добавить еще одно место работы
        </button>
      </div>
    </div>
  );
};
