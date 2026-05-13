import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets, { dummyProducts } from "../assets/assets";

export const AppContext = createContext();

const currencySymbol = "₹";

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // Auth/UI
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [isSellerr, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Data
  const [products, setProducts] = useState(dummyProducts);
  const [currency] = useState(currencySymbol);

  // Cart
  // cartItems: { [productId]: quantity }
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cartItems");
      if (raw) setCartItems(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (!user) localStorage.removeItem("user");
      else localStorage.setItem("user", JSON.stringify(user));
    } catch {
      // ignore
    }
  }, [user]);


  const addToCart = (productId) => {
    setCartItems((prev) => {
      const current = prev[productId] || 0;
      return { ...prev, [productId]: current + 1 };
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const updateCartItem = (productId, quantity) => {
    const qty = Number(quantity);
    if (!Number.isFinite(qty) || qty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prev) => ({ ...prev, [productId]: qty }));
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  const getCartAmount = () => {
    // Uses offerPrice if available, else price
    let total = 0;
    for (const [productId, qty] of Object.entries(cartItems)) {
      const p = products.find((x) => x._id === productId);
      if (!p) continue;
      const unit = typeof p.offerPrice === "number" ? p.offerPrice : p.offerPrice ?? p.price ?? 0;
      total += Number(unit) * qty;
    }
    return total;
  };

  // Address / Orders stubs (if pages expect them)
  const value = useMemo(
    () => ({
      // router
      navigate,

      // auth/ui
      user,
      setUser,
      isSellerr,
      setIsSeller,
      showUserLogin,
      setShowUserLogin,

      // search
      searchQuery,
      setSearchQuery,

      // catalog
      products,
      setProducts,
      currency,

      // cart
      cartItems,
      addToCart,
      removeFromCart,
      updateCartItem,
      getCartCount,
      getCartAmount,

      // assets (optional convenience)
      assets,
    }),
    [
      navigate,
      user,
      isSellerr,
      showUserLogin,
      searchQuery,
      products,
      currency,
      cartItems,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

