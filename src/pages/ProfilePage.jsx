import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isAuth, setIsAuth] = useState(false);
  const [authForm, setAuthForm] = useState({ email: '', password: '', isLogin: true });

  const navigate = useNavigate();

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsAuth(true);
    setUserData(prev => ({ ...prev, email: authForm.email }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    setIsAuth(false);
    setAuthForm({ email: '', password: '', isLogin: true });
    setUserData({ name: '', email: '', phone: '', address: '' });
    navigate('/auth');
  };

  if (!isAuth) {
    return (
      <div className="relative min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 shadow-md w-full max-w-md">
          <h1 className="text-2xl font-light mb-6 text-center">
            {authForm.isLogin ? 'Вход в аккаунт' : 'Регистрация'}
          </h1>
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={authForm.email}
              onChange={handleAuthChange}
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg bg-[#F5F5F8] focus:outline-none"
              required
            />
            <input
              type="password"
              name="password"
              value={authForm.password}
              onChange={handleAuthChange}
              placeholder="Пароль"
              className="w-full px-4 py-2 rounded-lg bg-[#F5F5F8] focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#E8E9ED] px-6 py-2 rounded-lg hover:bg-[#DFE0E4] transition-colors"
            >
              {authForm.isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={() => setAuthForm(f => ({ ...f, isLogin: !f.isLogin }))}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              {authForm.isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт? Войти'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-200px)]">
      {/* Фоновые горы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="#E8E9ED"
        >
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-md">
          {/* Декоративные элементы */}
          <div className="absolute -top-4 -right-4 text-4xl opacity-10">✿</div>
          <div className="absolute -bottom-4 -left-4 text-4xl opacity-10">✿</div>

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-light">Профиль</h1>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Выйти
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Имя</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#F5F5F8] focus:outline-none"
                  autoFocus
                />
              ) : (
                <div className="px-4 py-2 bg-[#F5F5F8] rounded-lg select-none cursor-default">{userData.name || <span className="text-gray-400">Не указано</span>}</div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#F5F5F8] focus:outline-none"
                />
              ) : (
                <div className="px-4 py-2 bg-[#F5F5F8] rounded-lg select-none cursor-default">{userData.email || <span className="text-gray-400">Не указано</span>}</div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Телефон</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#F5F5F8] focus:outline-none"
                />
              ) : (
                <div className="px-4 py-2 bg-[#F5F5F8] rounded-lg select-none cursor-default">{userData.phone || <span className="text-gray-400">Не указано</span>}</div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Адрес доставки</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#F5F5F8] focus:outline-none"
                />
              ) : (
                <div className="px-4 py-2 bg-[#F5F5F8] rounded-lg select-none cursor-default">{userData.address || <span className="text-gray-400">Не указано</span>}</div>
              )}
            </div>

            <div className="flex justify-end gap-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 rounded-lg bg-[#F5F5F8] hover:bg-[#E8E9ED] transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-[#E8E9ED] hover:bg-[#DFE0E4] transition-colors"
                  >
                    Сохранить
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 rounded-lg bg-[#E8E9ED] hover:bg-[#DFE0E4] transition-colors"
                >
                  Редактировать
                </button>
              )}
            </div>
          </form>

          <div className="mt-8 pt-8 border-t">
            <h2 className="text-xl font-light mb-4">История заказов</h2>
            <div className="space-y-4">
              {/* TODO: Добавить список заказов */}
              <div className="p-4 bg-[#F5F5F8] rounded-lg">
                <p className="text-sm text-gray-600">У вас пока нет заказов</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 