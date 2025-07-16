import React, { useState } from "react";

const Card = (props) => {
  const [localCount, setLocalCount] = useState(0);
  const isFavorite = props.favorites.includes(props.wine.id);

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col h-full justify-between relative">
      {/* Heart icon top right */}
      <button
        onClick={() => props.toggleFavorite(props.wine.id)}
        className="absolute top-2 right-2"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      {/* Image & Info */}
      <div>
        <img
          src={props.wine.image}
          alt={props.wine.title}
          className="w-full h-64 object-contain rounded"
        />
        <h3 className="mt-4 font-semibold text-lg">{props.wine.title}</h3>
        <p className="text-sm text-gray-600">{props.wine.type}</p>
        <p className="text-maroon font-bold">{props.wine.price}</p>
      </div>

      {/* Local Add Picker */}
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLocalCount(Math.max(0, localCount - 1))}
            className="border px-2 py-1"
          >
            −
          </button>
          <span>{localCount}</span>
          <button
            onClick={() => setLocalCount(localCount + 1)}
            className="border px-2 py-1"
          >
            +
          </button>
          <button
            onClick={() => {
              if (localCount > 0) {
                props.addToCart(props.wine, localCount);
                //  Do not clear localCount, so user sees it
                setLocalCount(0);
              }
            }}
            disabled={localCount === 0}
            className="ml-auto bg-maroon text-white px-4 py-1 text-sm disabled:opacity-50"
          >
            ADD TO CART
          </button>
        </div>

        {/*  Show actual cart quantity */}
        {props.count > 0 && (
          <p className="mt-2 text-sm text-gray-700">
            In Cart: <strong>{props.count}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;