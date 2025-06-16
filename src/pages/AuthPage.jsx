import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Добавить логику авторизации/регистрации
    console.log('Form submitted:', formData);
    if (isLogin) {
      // После успешного входа
      navigate('/profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="relative min-h-[calc(100vh-200px)] flex items-center justify-center bg-[#F5F5F8] py-8 px-2">
      {/* Фоновые декоративные SVG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="#E8E9ED"
        >
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
          {/* Декоративные элементы */}
          <div className="absolute -top-4 -right-4 text-4xl opacity-10 select-none">✿</div>
          <div className="absolute -bottom-4 -left-4 text-4xl opacity-10 select-none">✿</div>

          <h1 className="text-3xl font-light mb-8 text-center">
            {isLogin ? 'Вход в аккаунт' : 'Регистрация'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ваше имя"
                  className="w-full px-4 py-3 rounded-lg bg-[#F5F5F8] border border-[#E8E9ED] focus:outline-none focus:ring-2 focus:ring-[#BFC5D3] transition"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Телефон"
                  className="w-full px-4 py-3 rounded-lg bg-[#F5F5F8] border border-[#E8E9ED] focus:outline-none focus:ring-2 focus:ring-[#BFC5D3] transition"
                  required
                />
              </>
            )}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-[#F5F5F8] border border-[#E8E9ED] focus:outline-none focus:ring-2 focus:ring-[#BFC5D3] transition"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Пароль"
              className="w-full px-4 py-3 rounded-lg bg-[#F5F5F8] border border-[#E8E9ED] focus:outline-none focus:ring-2 focus:ring-[#BFC5D3] transition"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#E8E9ED] px-6 py-3 rounded-xl hover:bg-[#DFE0E4] transition-colors text-base font-medium mt-2 shadow-sm"
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-600 hover:text-gray-800 underline underline-offset-2 transition"
            >
              {isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт? Войти'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 