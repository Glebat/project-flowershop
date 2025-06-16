import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PopularSection from "./components/PopularSection";
import ProductCard from "./components/ProductCard";
import FavoritesPage from "./pages/FavoritesPage";
import AboutUsSection from "./components/AboutUsSection";
import NotFoundPage from "./pages/NotFoundPage";
import FeedbackPage from "./pages/FeedbackPage";
import Header  from './components/Header';
import CatalogueNews from './pages/CatalogueNews';
import CatalogueSpringHits from './pages/CatalogueSpringHits';
import CatalogueWedding from './pages/CatalogueWedding';
import CatalogueExotic from './pages/CatalogueExotic';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage'; 

function HomePage({ isCatalogVisible, setIsCatalogVisible, products, favorites, toggleFavorite, handleButtonClick, selectedCategory, addToCart }) {
  const navigate = useNavigate();

  return (
    <>
      {!isCatalogVisible && (
        <>
          <section className="mx-auto max-w-6xl px-4 sm:px-6 mb-8 sm:mb-16">
            <div className="relative rounded-3xl overflow-hidden">
              <img 
                src="/images/hero.jpg" 
                alt="Цветы" 
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-2 sm:mb-4">Цветы</h1>
                <p className="text-base sm:text-lg text-white mb-4 sm:mb-8">которые делают вас счастливыми</p>
                <button 
                  className="bg-white/90 w-fit px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-white transition-colors text-sm sm:text-base"
                  onClick={() => navigate('/feedback')}
                >
                  обратная связь
                </button>
              </div>
            </div>
          </section>
          <AboutUsSection />
          <PopularSection 
            products={products}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
          />
        </>
      )}

      <section className="mx-auto max-w-6xl px-4 sm:px-6 mb-8 sm:mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-light">
            Каталог
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full md:w-auto">
            {[
              { id: 'новинки', label: 'новинки', path: '/catalogue/news' },
              { id: 'весенние хиты', label: 'весенние хиты', path: '/catalogue/springhits' },
              { id: 'свадебные', label: 'свадебные', path: '/catalogue/wedding' },
              { id: 'экзотические', label: 'экзотические', path: '/catalogue/exotic' }
            ].map((category) => (
              <button
                key={category.id}
                className={`px-4 sm:px-6 py-2 rounded-lg transition-all relative text-sm sm:text-base flex-1 md:flex-none
                  ${selectedCategory === category.id 
                    ? 'bg-[#E8E9ED]' 
                    : 'bg-[#E8E9ED] hover:bg-[#DFE0E4]'}
                  ${selectedCategory === category.id && 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black'}`}
                onClick={() => category.path ? navigate(category.path) : handleButtonClick(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {isCatalogVisible ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isCatalog
                  isFavorite={favorites.includes(product.id)}
                  toggleFavorite={toggleFavorite}
                  addToCart={addToCart}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <button 
                onClick={() => setIsCatalogVisible(false)}
                className="bg-white/90 border border-[#E8E9ED] px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-[#E8E9ED] transition-colors text-sm sm:text-base"
              >
                вернуться на главную страницу
              </button>
            </div>
          </>
        ) : (
          <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] bg-[#C7CAD6] flex items-center justify-center relative overflow-hidden">
            <img
              src="/images/catalog.png"
              alt="Цветок"
              className="max-h-full object-contain"
            />
          </div>
        )}
      </section>
    </>
  );
}

function CartPage({ cart, products, setCart }) {
  const navigate = useNavigate();

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      const { [productId]: _, ...rest } = cart;
      setCart(rest);
    } else {
      setCart(prev => ({
        ...prev,
        [productId]: quantity
      }));
    }
  };

  if (Object.keys(cart).length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-light mb-6 sm:mb-8">Корзина</h1>
        <div className="text-center py-12 sm:py-16">
          <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6">Корзина пуста</p>
          <button
            onClick={() => navigate('/')}
            className="bg-white border border-[#E8E9ED] px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-[#E8E9ED] transition-colors text-sm sm:text-base"
          >
            Вернуться к покупкам
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-light mb-6 sm:mb-8">Корзина</h1>
      <div className="space-y-4 sm:space-y-6">
        {Object.entries(cart).map(([productId, quantity]) => {
          const product = products.find(p => p.id === parseInt(productId));
          if (!product) return null;
          
          return (
            <div key={productId} className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 p-4 sm:p-6">
                <div className="w-full sm:w-48 h-48 flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                  />
                </div>
                <div className="flex-grow w-full sm:w-auto">
                  <h3 className="text-xl sm:text-2xl font-light mb-2">{product.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">{product.description}</p>
                  <div className="text-lg sm:text-xl mb-4">{product.price}</div>
                  
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-3 sm:gap-4 bg-[#F8F8F8] rounded-lg px-3 sm:px-4 py-2">
                      <button
                        onClick={() => updateCartQuantity(productId, quantity - 1)}
                        className="text-gray-500 hover:text-black transition-colors w-6 h-6 flex items-center justify-center text-lg sm:text-xl"
                      >
                        -
                      </button>
                      <span className="w-6 sm:w-8 text-center text-sm sm:text-base">{quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(productId, quantity + 1)}
                        className="text-gray-500 hover:text-black transition-colors w-6 h-6 flex items-center justify-center text-lg sm:text-xl"
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => updateCartQuantity(productId, 0)}
                      className="text-gray-500 hover:text-red-500 transition-colors text-lg sm:text-xl"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md">
          <div className="text-xl sm:text-2xl font-light">
            Итого: {Object.entries(cart).reduce((total, [productId, quantity]) => {
              const product = products.find(p => p.id === parseInt(productId));
              return total + (parseInt(product.price) * quantity);
            }, 0)}₽
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full sm:w-auto bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl hover:bg-gray-800 transition-colors text-sm sm:text-base"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isCatalogVisible, setIsCatalogVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState({});

  const products = [
    {
      id: 1,
      title: "С добрым словом",
      description: "Букет комплиментов, сказанных от всего сердца",
      price: "4599₽",
      image: "/images/kindword.jpg",
    },
    {
      id: 2,
      title: "Золотое дыхание",
      description: "Он несет в себе уют, дарящий и красоту момента, здесь и сейчас",
      price: "5500₽",
      image: "/images/goldenbreath.jpg",
    },
    {
      id: 3,
      title: "Листопад чувств",
      description: "Этот букет — как сюрприз на осеннюю грусть",
      price: "4899₽",
      image: "/images/sensorydeposition.jpg",
    },
    {
      id: 4,
      title: "Просто так",
      description: "Иногда не нужен повод, чтобы порадовать",
      price: "5100₽",
      image: "/images/justlikethat.jpg",
    },
    {
      id: 5,
      title: "Доброе сердце",
      description: "В каждом дне есть место для красоты",
      price: "4599₽",
      image: "/images/kindheart.jpg",
    },
    {
      id: 6,
      title: "Нежнее нежного",
      description: "Этот букет как объятие: деликатное, теплое и нежное",
      price: "3599₽",
      image: "/images/gentlerthandelicate.jpg",
    },
    {
      id: 7,
      title: "Сердце весны",
      description: "Воплощение свежести и радости весенних дней",
      price: "3000₽",
      image: "/images/popular1.jpg",
    },
    {
      id: 8,
      title: "Нежность облаков",
      description: "Воздушный букет - словно кусочек неба в подарок",
      price: "3500₽",
      image: "/images/popular2.jpg",
    },
    {
      id: 9,
      title: "Мелодия счастья",
      description: "Яркий и жизнерадостный аккорд для любого повода",
      price: "2500₽",
      image: "/images/popular3.jpg",
    },
    {
      id: 10,
      title: "Амазонка",
      description: "Букет, подаренный в сердце диких природы",
      price: "8900₽",
      image: "/images/amazonka.jpg",
    },
    {
      id: 11,
      title: "Сафари",
      description: "Яркий микс - свежее дуновение дальних странствий",
      price: "6500₽",
      image: "/images/safari.jpg",
    },
    {
      id: 12,
      title: "Манго-мохито",
      description: "Сочный дуэт, наполняющий освежающей тропической палитрой",
      price: "10500₽",
      image: "/images/mango-mahito.jpg",
    },
    {
      id: 13,
      title: "Огненная страсть",
      description: "Смелое сочетание, создающее загадочный и незабываемый образ",
      price: "8500₽",
      image: "/images/fire.jpg",
    },
    {
      id: 14,
      title: "Пряный восток",
      description: "Тончайшие ароматы, насыщенные цвета и изысканные формы",
      price: "6599₽",
      image: "/images/east.jpg",
    },
    {
      id: 15,
      title: "Тропический коктейль",
      description: "Взрыв цвета и аромата! Этот букет – как свежий фруктовый микс",
      price: "9299₽",
      image: "/images/tropic.jpg",
    },
    {
      id: 16,
      title: "Весеннее пробуждение",
      description: "Нежное сочетание - как первое дыхание весны.",
      price: "4690₽",
      image: "/images/springawakening.jpg",
    },
    {
      id: 17,
      title: "Аромат апреля",
      description: "Лёгкий и воздушный букет, наполняющий свежестью.",
      price: "5790₽",
      image: "/images/scentofapril.jpg",
    },
    {
      id: 18,
      title: "Рассвет в саду",
      description: "Утонченный микс для романтических моментов.",
      price: "4500₽",
      image: "/images/dawninthegarden.jpg",
    },
    {
      id: 19,
      title: "Солнечный день",
      description: "Тёплая палитра - как лучи весеннего солнца.",
      price: "4000₽",
      image: "/images/sunnyday.jpg",
    },
    {
      id: 20,
      title: "Солнечные истории",
      description: "Каждый цветок здесь - как лучик света после долгой зимы.",
      price: "3590₽",
      image: "/images/sunnystories.jpg",
    },
    {
      id: 21,
      title: "Мелодия весны",
      description: "Нежное сочетание - как первое дыхание весны.",
      price: "4590₽",
      image: "/images/springmelody.jpg",
    },
    {
      id: 22,
      title: "Ванильное облако",
      description: "Лёгкий и элегантный букет – идеальный к классическому образу.",
      price: "2500₽",
      image: "/images/vanillacloud.jpg",
    },
    {
      id: 23,
      title: "Классическая невеста",
      description: "Элегантный букет – символ чистоты и вечной любви.",
      price: "10200₽",
      image: "/images/classicbride.jpg",
    },
    {
      id: 24,
      title: "Пудровая нежность",
      description: "Романтичное сочетание кремовых роз и пастельных пионов.",
      price: "9500₽",
      image: "/images/powdertenderness.jpg",
    },
    {
      id: 25,
      title: "Воздушная сказка",
      description: "Лёгкий и нежный букет – для невесты, мечтающей о сказке.",
      price: "8500₽",
      image: "/images/airyfairytale.jpg",
    },
    {
      id: 26,
      title: "Навсегда",
      description: "Каждый цветок Классика, проверенная временем.",
      price: "4999₽",
      image: "/images/forever.jpg",
    },
    {
      id: 27,
      title: "Шепот лепестков",
      description: "Нежность в каждом прикосновении.",
      price: "5999₽",
      image: "/images/whispetofpetals.jpg",
    }
  ];

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
    setIsCatalogVisible(true);
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId, quantity) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + quantity
    }));
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      const { [productId]: _, ...rest } = cart;
      setCart(rest);
    } else {
      setCart(prev => ({
        ...prev,
        [productId]: quantity
      }));
    }
  };

  // Получаем массив товаров из корзины
  const cartItems = Object.entries(cart).map(([productId, quantity]) => {
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return null;
    // Удаляем все нецифровые символы из price и приводим к числу
    const numericPrice = Number(String(product.price).replace(/[^0-9.]/g, ''));
    return {
      ...product,
      price: numericPrice,
      quantity: Number(quantity),
    };
  }).filter(Boolean);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header cartItemsCount={Object.values(cart).reduce((a, b) => a + b, 0)} />}>
          <Route index element={
            <HomePage
              isCatalogVisible={isCatalogVisible}
              setIsCatalogVisible={setIsCatalogVisible}
              products={products}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              handleButtonClick={handleButtonClick}
              selectedCategory={selectedCategory}
              addToCart={addToCart}
            />
          } />
          <Route path="favorites" element={<FavoritesPage products={products} favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart} />} />
          <Route path="cart" element={<CartPage products={products} cart={cart} setCart={setCart} />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="catalogue/news" element={<CatalogueNews products={products} favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart} />} />
          <Route path="catalogue/springhits" element={<CatalogueSpringHits products={products} favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart} />} />
          <Route path="catalogue/wedding" element={<CatalogueWedding products={products} favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart} />} />
          <Route path="catalogue/exotic" element={<CatalogueExotic products={products} favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart} />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="checkout" element={<CheckoutPage cart={cartItems} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;