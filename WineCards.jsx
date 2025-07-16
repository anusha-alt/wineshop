
import Card from "./Card";

const WineCards = ({
  wines,
  cart,
  increment,
  decrement,
  addToCart,
  favorites,
  toggleFavorite,
}) => {
  // Get only favorite wine objects
  const favoriteWines = wines.filter((wine) => favorites.includes(wine.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Shop Wines</h1>

      {/*  Favorites Grid */}
      {favoriteWines.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-[#4b1e24]">
            Your Favorites
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteWines.map((wine) => (
              <Card
                key={wine.id}
                wine={wine}
                count={cart[wine.id] || 0}
                increment={() => increment(wine.id)}
                decrement={() => decrement(wine.id)}
                addToCart={addToCart}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Wines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wines.map((wine) => (
          <Card
            key={wine.id}
            wine={wine}
            count={cart[wine.id] || 0}
            increment={() => increment(wine.id)}
            decrement={() => decrement(wine.id)}
            addToCart={addToCart}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default WineCards;