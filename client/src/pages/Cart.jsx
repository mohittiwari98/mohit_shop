import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import assets, { dummyAddress } from "../assets/assets";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState(dummyAddress);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
  const [paymentOption, setPaymentOption] = useState("COD");

  // ✅ Safe cart builder
  const getCart = () => {
    let tempArray = [];

    for (const key in cartItems) {
      const product = products.find((i) => i._id === key);

      if (product) {
        tempArray.push({
          ...product,
          quantity: cartItems[key],
        });
      }
    }

    setCartArray(tempArray);
  };

  const placeOrder = async () => {
    // Demo order placement + history
    const order = {
      _id: `ord_${Date.now()}`,
      items: cartArray.map((p) => ({
        product: p,
        quantity: p.quantity,
      })),
      amount: getCartAmount(),
      address: selectedAddress,
      status: "Order Placed",
      paymentType: paymentOption,
      isPaid: paymentOption !== "COD",
      createdAt: new Date().toISOString(),
    };

    try {
      const raw = localStorage.getItem("orders");
      const history = raw ? JSON.parse(raw) : [];
      localStorage.setItem("orders", JSON.stringify([order, ...history]));
    } catch {
      // ignore
    }

    alert("Order placed successfully");
    // Clear cart
    // (simple clear via updateCartItem/removeFromCart loop)
    if (cartItems && Object.keys(cartItems).length > 0) {
      Object.keys(cartItems).forEach((id) => removeFromCart(id));
    }
  };


  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  if (products.length === 0) return null;

  return (
    <div className="flex flex-col md:flex-row mt-16">
      {/* LEFT SIDE */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-[#4fbf8b]">
            {getCartCount()} Items
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`
                  );
                  window.scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>

              <div>
                <p className="hidden md:block font-semibold">
                  {product.name}
                </p>

                <div className="font-normal text-gray-500/70">
                  <p>
                    Weight:{" "}
                    <span>{product.weight || "N/A"}</span>
                  </p>

                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      className="outline-none ml-2"
                      value={product.quantity}
                      onChange={(e) =>
                        updateCartItem(
                          product._id,
                          Number(e.target.value)
                        )
                      }
                    >
                      {Array(
                        product.quantity > 9
                          ? product.quantity
                          : 9
                      )
                        .fill("")
                        .map((_, index) => (
                          <option
                            key={index}
                            value={index + 1}
                          >
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center">
              {currency}
              {product.offerPrice * product.quantity}
            </p>

            <button
              onClick={() =>
                removeFromCart(product._id)
              }
              className="cursor-pointer mx-auto"
            >
              <img
                src={assets.refresh_icon}
                alt="remove"
                className="inline-block w-6 h-6"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            window.scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-[#4fbf8b] font-medium"
        >
          <img
            className="group-hover:-translate-x-1 transition"
            src={assets.arrow_right_icon_colored}
            alt="arrow"
          />
          Continue Shopping
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl font-medium">
          Order Summary
        </h2>

        <hr className="border-gray-300 my-5" />

        {/* ADDRESS */}
        <p className="text-sm font-medium uppercase">
          Delivery Address
        </p>

        <div className="relative flex justify-between items-start mt-2">
          <p className="text-gray-500">
            {selectedAddress
              ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
              : "No Address Found"}
          </p>

          <button
            onClick={() =>
              setShowAddress(!showAddress)
            }
            className="text-[#4fbf8b] hover:underline cursor-pointer"
          >
            Change
          </button>

          {showAddress && (
            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
              {addresses.map((address, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setSelectedAddress(address);
                    setShowAddress(false);
                  }}
                  className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {address.street},{address.city},
                  {address.state},{address.country}
                </p>
              ))}

              <p
                onClick={() =>
                  navigate("/add-address")
                }
                className="text-[#4fbf8b] text-center cursor-pointer p-2 hover:bg-[#4fbf8b]/10"
              >
                Add address
              </p>
            </div>
          )}
        </div>

        {/* PAYMENT */}
        <p className="text-sm font-medium uppercase mt-6">
          Payment Method
        </p>

        <select
          onChange={(e) =>
            setPaymentOption(e.target.value)
          }
          className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
        >
          <option value="COD">
            Cash On Delivery
          </option>
          <option value="Online">
            Online Payment
          </option>
        </select>

        <hr className="border-gray-300 my-5" />

        {/* SUMMARY */}
        <div className="text-gray-500 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>

          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">
              Free
            </span>
          </p>

          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getCartAmount() * 2) / 100}
            </span>
          </p>

          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>
              {currency}
              {getCartAmount() +
                (getCartAmount() * 2) / 100}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-[#4fbf8b] text-white font-medium hover:bg-[#44ae7c] transition"
        >
          {paymentOption === "COD"
            ? "Place Order"
            : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
