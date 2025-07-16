import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Logo from "./assets/copain-logo.png";
import { Link } from "react-router-dom"; 

const Header = ({ wines, cart }) => {
  const totalItems = Object.values(cart).reduce((sum, n) => sum + n, 0);
  const [showCart, setShowCart] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const navItems = [
    { id: 1, name: "OUR WINES" },
    { id: 2, name: "CLUBS" },
    { id: 3, name: "SUSTAINABILITY" },
    { id: 4, name: "ENTERTAIN" },
    { id: 5, name: "ABOUT" },
    { id: 6, name: "VISIT" },
  ];

  return (
    <header className="w-full font-sans">
      {/* Top Bar */}
      <div className="bg-[#4b1e24] py-1.5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex justify-end">
          <span className="text-white text-[11px] font-medium tracking-[0.2em]">
            SHIP TO: CO
          </span>
        </div>
      </div>

      {/* Logo + Icons */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Left: Logo */}
          <div className="flex items-center">
            <img src={Logo} alt="Copain Wines" className="h-10 w-auto" />
            <span className="ml-2 text-xl font-serif italic text-[#4b1e24]">
              Copain Wines
            </span>
          </div>

          {/* Right: Icons */}
          <div className="flex gap-6 text-[#4b1e24] items-center">
            <MagnifyingGlassIcon className="h-5 w-5 cursor-pointer" />

            {/* Cart */}
            <div className="relative">
              <ShoppingCartIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => setShowCart((v) => !v)}
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#4b1e24] text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center shadow">
                  {totalItems}
                </span>
              )}

              {/* Cart Dropdown */}
              {showCart && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg p-4 text-xs z-50">
                  <h4 className="font-bold mb-2">Your Cart</h4>

                  {wines
                    .filter((w) => (cart[w.id] || 0) > 0)
                    .map((w) => {
                      const unitPrice = Number(w.price.toString().replace(/[^0-9.]/g, ""));
                      const totalPrice = unitPrice * cart[w.id];

                      return (
                        <div
                          key={w.id}
                          className="flex items-center gap-3 py-2 border-b last:border-b-0"
                        >
                          <img
                            src={w.image}
                            alt={w.title}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex-1">
                            <div className="font-medium">{w.title}</div>
                            <div className="text-sm text-gray-500">
                              {cart[w.id]} × ${unitPrice}
                            </div>
                          </div>
                          <div className="text-sm font-semibold text-[#4b1e24]">
                            ${totalPrice.toFixed(2)}
                          </div>
                        </div>
                      );
                    })}

                  {/* Total Price */}
                  <div className="pt-4 border-t mt-4 text-right text-sm font-semibold text-[#4b1e24]">
                    Total: $
                    {wines
                      .reduce((sum, w) => {
                        const qty = cart[w.id] || 0;
                        const unitPrice = Number(w.price.toString().replace(/[^0-9.]/g, ""));
                        return sum + qty * unitPrice;
                      }, 0)
                      .toFixed(2)}
                  </div>

                  {Object.values(cart).every((q) => q === 0) ? (
                    <p className="italic text-gray-500">Your cart is empty.</p>
                  ) : (
                    <Link
                      to="/thank-you"
                      className="block w-full text-center bg-[#4b1e24] text-white py-2 rounded mt-4 text-xs hover:bg-[#3a161a] transition"
                    >
                      Checkout
                    </Link>
                  )}
                </div>
              )}
            </div>

            <UserIcon className="h-5 w-5 cursor-pointer" />

            {/* Hamburger icon */}
            <div className="md:hidden">
              <button onClick={() => setShowMobileNav(!showMobileNav)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#4b1e24]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop */}
          <nav className="hidden md:flex justify-start py-3 space-x-8">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4b1e24] whitespace-nowrap cursor-pointer">
                  {item.name}
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#4b1e24] transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </nav>

          {/* Mobile */}
          {showMobileNav && (
            <div className="md:hidden px-4 pb-4 pt-2 bg-white border-t">
              {navItems.map((item) => (
                <div key={item.id} className="py-2">
                  <span className="text-sm font-medium text-[#4b1e24]">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;