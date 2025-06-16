import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DELIVERY_PRICE = 300;
const FREE_DELIVERY_FROM = 5000;
const MIN_ORDER = 1000;

const CheckoutPage = ({ cart = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    date: '',
    time: '',
    comment: '',
  });
  const navigate = useNavigate();

  // Сумма товаров (исправлено: явное приведение к числу)
  const total = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
  const delivery = total >= FREE_DELIVERY_FROM ? 0 : DELIVERY_PRICE;
  const isFree = delivery === 0;
  const orderTotal = total + delivery;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: отправка заказа
    navigate('/profile');
  };

  if (!cart.length) {
    return (
      <div className="bg-[#F5F5F8] min-h-[calc(100vh-200px)] flex items-center justify-center px-2 sm:px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md text-center w-full max-w-md">
          <div className="text-2xl font-light mb-4">Ваша корзина пуста</div>
          <button
            onClick={() => navigate('/cart')}
            className="bg-black text-white rounded-xl px-8 py-3 text-base font-medium hover:bg-gray-800 transition-colors w-full"
          >
            Перейти в корзину
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F8] min-h-[calc(100vh-200px)] py-6 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Левая колонка — форма */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-md mb-6 md:mb-0 w-full"
        >
          <div className="grid grid-cols-1 gap-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Имя"
              className="px-4 py-3 rounded-lg bg-[#F5F5F8] border border-[#E8E9ED] focus:outline-none w-full text-base"
              required
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Телефон"
              className="px-4 py-3 rounded-lg bg-[#F5F5F8] border border-[#E8E9ED] focus:outline-none w-full text-base"
              required
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="px-4 py-3 rounded-lg bg-[#F5F5F8] border border-[#E8E9ED] focus:outline-none w-full text-base"
              required
            />
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Адрес доставки"
              className="px-4 py-3 rounded-lg bg-[#F5F5F8] border border-[#E8E9ED] focus:outline-none w-full text-base"
              required
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="дд.мм.гггг"
                type="date"
                className="flex-1 px-4 py-3 rounded-lg bg-[#F5F5F8] border border-[#E8E9ED] focus:outline-none text-base"
                required
              />
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="flex-1 px-4 py-3 rounded-lg bg-[#F5F5F8] border border-[#E8E9ED] focus:outline-none text-base"
                required
              >
                <option value="">Выберите время</option>
                {Array.from({ length: 13 }, (_, i) => 9 + i).map((h) => (
                  <option key={h} value={`${h}:00`}>
                    {`${h}:00`}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Комментарий к заказу"
              className="px-4 py-3 rounded-lg bg-[#F5F5F8] border border-[#E8E9ED] focus:outline-none min-h-[60px] w-full text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-black text-white rounded-xl py-3 text-base font-medium hover:bg-gray-800 transition-colors"
          >
            Подтвердить заказ
          </button>
        </form>

        {/* Правая колонка */}
        <div className="flex flex-col gap-6 w-full md:w-[370px]">
          {/* Корзина */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-md">
            <div className="text-lg font-medium mb-4">Ваш заказ</div>
            <div className="space-y-4 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm leading-tight">{item.title}</div>
                    <div className="text-xs text-gray-600">Количество: {item.quantity}</div>
                  </div>
                  <div className="text-sm font-medium">{item.price}₽</div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 text-sm space-y-1">
              <div className="flex justify-between">
                <span>Стоимость товаров:</span>
                <span>{total}₽</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка:</span>
                <span>{isFree ? 'Бесплатно' : `${DELIVERY_PRICE}₽`}</span>
              </div>
              <div className="flex justify-between font-bold text-base mt-2">
                <span>Итого:</span>
                <span>{orderTotal}₽</span>
              </div>
            </div>
          </div>
          {/* Информация о доставке */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-md text-sm">
            <div className="font-medium mb-2">Информация о доставке</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Доставка осуществляется ежедневно с 9:00 до 21:00</li>
              <li>Минимальная сумма заказа: {MIN_ORDER}₽</li>
              <li>Бесплатная доставка при заказе от {FREE_DELIVERY_FROM}₽</li>
              <li>Стоимость доставки: {DELIVERY_PRICE}₽</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 