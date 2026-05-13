import { Link, NavLink, Outlet } from "react-router-dom";
import assets from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const SellerLayout = () => {
  const { setIsSeller } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    setIsSeller(false);
    localStorage.removeItem("sellerId");
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/">
          <img
            src={assets.logo}
            alt="logo"
            className="cursor-pointer w-34 md:w-38"
          />
        </Link>

        <div className="flex items-center gap-5 text-gray-600">
          <p className="font-medium">Hi! Admin</p>

          <button
            onClick={logout}
            className="border border-[#4fbf8b] text-[#4fbf8b] hover:bg-[#4fbf8b] hover:text-white transition-all duration-200 rounded-full text-sm px-4 py-1.5"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="md:w-64 w-16 min-h-[calc(100vh-60px)] border-r border-gray-300 pt-4 flex flex-col transition-all duration-300 bg-white">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 transition-all duration-200
                ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-[#4fbf8b]/10 border-[#4fbf8b] text-[#4fbf8b]"
                    : "hover:bg-gray-100 text-gray-600"
                }`
              }
            >
              <img src={item.icon} alt="" className="w-6 h-6" />
              <p className="md:block hidden font-medium">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 bg-gray-50 min-h-[calc(100vh-60px)]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SellerLayout;