import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import assets from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products?.find((item) => item._id === id);

  // Related Products
  useEffect(() => {
    if (product) {
      const filtered = products.filter(
        (item) =>
          item.category === product.category && item._id !== product._id
      );
      setRelatedProducts(filtered.slice(0, 5));
    }
  }, [products, product]);

  // Set main image
  useEffect(() => {
    if (product?.image?.length > 0) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="mt-20 text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-800">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 mt-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gray-700">Home</Link> /{" "}
        <Link to="/products" className="hover:text-gray-700">Shop</Link> /{" "}
        <Link 
          to={`/products/${product.category.toLowerCase()}`} 
          className="hover:text-gray-700"
        >
          {product.category}
        </Link>{" "}
        /{" "}
        <span className="text-emerald-600 font-medium">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Image Gallery */}
        <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-5/12">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 order-2 lg:order-1">
            {product.image?.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className={`border-2 rounded-2xl overflow-hidden cursor-pointer transition-all w-20 h-20 flex-shrink-0
                  ${thumbnail === image ? 'border-emerald-600' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 order-1 lg:order-2 border border-gray-100 rounded-3xl overflow-hidden bg-gray-50">
            <img
              src={thumbnail}
              alt={product.name}
              className="w-full h-full object-contain max-h-[520px] p-6"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-3">
            {Array(5).fill("").map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="star"
                className="w-5 h-5"
              />
            ))}
            <span className="text-gray-500 ml-2">(4 Reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-6">
            <p className="text-gray-500 line-through text-lg">
              MRP: {currency}{product.price}
            </p>
            <p className="text-4xl font-bold text-emerald-600 mt-1">
              {currency}{product.offerPrice}
            </p>
            <p className="text-sm text-gray-500 mt-1">(Inclusive of all taxes)</p>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-3">About this product</h3>
            <ul className="space-y-2 text-gray-600">
              {product.description?.map((desc, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1.5">•</span>
                  {desc}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              onClick={() => addToCart(product._id)}
              className="flex-1 py-4 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-2xl hover:bg-emerald-50 transition-all active:scale-95"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl transition-all active:scale-95"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <div className="flex flex-col items-center mb-10">
            <p className="text-3xl font-bold text-gray-900">Related Products</p>
            <div className="h-0.5 w-16 bg-emerald-600 mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {relatedProducts
              .filter((item) => item.inStock)
              .map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                navigate("/products");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-10 py-3 border border-gray-300 hover:border-emerald-600 hover:text-emerald-600 rounded-2xl font-medium transition-all"
            >
              View All Products
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;