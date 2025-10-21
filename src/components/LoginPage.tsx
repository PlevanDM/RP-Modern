import { User } from '../types';
import { mockUsers } from '../utils/mockData';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  // Simple users for login
  const users = [
    { id: 'client1', fullName: 'Анна Коваленко', role: 'client', avatar: 'https://i.pravatar.cc/96?img=1' },
    { id: 'master1', fullName: 'Олександр Петренко', role: 'master', avatar: 'https://i.pravatar.cc/96?img=4' }
  ];

  const handleUserLogin = (userId: string) => {
    const userToLogin = mockUsers.find(u => u.id === userId);
    if (userToLogin) {
      onLogin(userToLogin);
    } else {
      console.error(`User with id ${userId} not found in mockUsers.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">🔧 RepairHub Pro</h1>
          <p className="text-xl text-indigo-100">Виберіть користувача для входу</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {users.map(user => {
            const fullUserData = mockUsers.find(u => u.id === user.id);
            return (
            <button
              key={user.id}
              onClick={() => handleUserLogin(user.id)}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={fullUserData?.avatar || user.avatar}
                alt={user.fullName}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{fullUserData?.fullName || user.fullName}</h2>
              <p className="text-lg text-indigo-600 mb-4">{user.role === 'client' ? '👤 Клієнт' : '🔧 Майстер'}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUserLogin(user.id);
                }}
                className="w-full px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Увійти
              </button>
            </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}


