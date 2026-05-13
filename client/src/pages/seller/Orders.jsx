import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import assets from '../../assets/assets';
import toast from 'react-hot-toast';
import { getAllOrders, createOrder, assignVendorToOrder, updateOrderStatus } from '../../api/orderApi';
import { getAllVendors } from '../../api/vendorApi';
import { getAllProducts } from '../../api/productApi';

const Orders = () => {
    const { currency, products, isSeller, sellerData } = useAppContext()
    const [orders, setOrders] = useState([])
    const [vendors, setVendors] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [selectedVendor, setSelectedVendor] = useState({});
    const [showVendorModal, setShowVendorModal] = useState(null);
    const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // New order form state
    const [newOrder, setNewOrder] = useState({
        product: '',
        quantity: 1,
        vendor: '',
        customerName: '',
        customerAddress: '',
        customerPhone: '',
        amount: 0
    });

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await getAllOrders();
            if (res.data.success) {
                setOrders(res.data.orders || []);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchVendors = async () => {
        try {
            const res = await getAllVendors();
            if (res.data.success) {
                setVendors(res.data.vendors || []);
            }
        } catch (error) {
            console.error("Error fetching vendors:", error);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await getAllProducts();
            if (res.data.success) {
                setAllProducts(res.data.products || []);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            // Fallback to context products
            setAllProducts(products);
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchVendors();
        fetchProducts();
    }, []);

    // Calculate order amount when product or quantity changes
    useEffect(() => {
        if (newOrder.product && newOrder.quantity) {
            const product = allProducts.find(p => p._id === newOrder.product);
            if (product) {
                setNewOrder(prev => ({
                    ...prev,
                    amount: product.offerPrice * newOrder.quantity
                }));
            }
        }
    }, [newOrder.product, newOrder.quantity, allProducts]);

    const handleCreateOrder = async () => {
        if (!newOrder.product || !newOrder.vendor || !newOrder.customerName || !newOrder.customerAddress) {
            toast.error("Please fill all required fields");
            return;
        }

        try {
            const sellerId = localStorage.getItem("sellerId");
            const product = allProducts.find(p => p._id === newOrder.product);
            const vendor = vendors.find(v => v._id === newOrder.vendor);

            const orderData = {
                seller: sellerId,
                vendor: newOrder.vendor,
                isAssignedToVendor: true,
                customer: {
                    name: newOrder.customerName,
                    address: newOrder.customerAddress,
                    phone: newOrder.customerPhone || "N/A"
                },
                items: [{
                    product: product._id,
                    name: product.name,
                    price: product.offerPrice,
                    quantity: newOrder.quantity,
                    image: product.image?.[0]
                }],
                amount: newOrder.amount,
                paymentType: "COD",
                isPaid: false,
                status: "Processing"
            };

            const res = await createOrder(orderData);

            if (res.data.success) {
                toast.success("Order created and assigned to vendor!");
                fetchOrders();
                setShowCreateOrderModal(false);
                setNewOrder({
                    product: '',
                    quantity: 1,
                    vendor: '',
                    customerName: '',
                    customerAddress: '',
                    customerPhone: '',
                    amount: 0
                });
            }
        } catch (error) {
            console.error("Error creating order:", error);
            toast.error("Failed to create order");
        }
    };

    const handleAssignVendor = async (orderId) => {
        const vendorId = selectedVendor[orderId];
        if (!vendorId) {
            toast.error("Please select a vendor");
            return;
        }
        
        const vendor = vendors.find(v => v._id === vendorId);
        
        try {
            const res = await assignVendorToOrder(orderId, vendorId);
            
            if (res.data.success) {
                setOrders(orders.map(order => 
                    order._id === orderId 
                        ? { ...order, assignedVendor: vendor, isAssignedToVendor: true, status: 'Processing' }
                        : order
                ));
                toast.success(`Order assigned to ${vendor.name}`);
            }
        } catch (error) {
            console.error("Error assigning vendor:", error);
            toast.error("Failed to assign vendor");
        }
        
        setShowVendorModal(null);
        setSelectedVendor({...selectedVendor, [orderId]: ''});
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const res = await updateOrderStatus(orderId, { status: newStatus });
            
            if (res.data.success) {
                setOrders(orders.map(order => 
                    order._id === orderId 
                        ? { ...order, status: newStatus }
                        : order
                ));
                toast.success("Order status updated");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            'Pending': 'bg-yellow-100 text-yellow-800',
            'Processing': 'bg-blue-100 text-blue-800',
            'Shipped': 'bg-indigo-100 text-indigo-800',
            'Delivered': 'bg-green-100 text-green-800',
            'Cancelled': 'bg-red-100 text-red-800',
        };
        return statusColors[status] || 'bg-gray-100 text-gray-800';
    };
    
  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between'>
        <div className="md:p-10 p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Orders Management</h2>
                <button
                    onClick={() => setShowCreateOrderModal(true)}
                    className="px-4 py-2 bg-[#4fbf8b] text-white rounded-lg hover:bg-[#3da371] transition"
                >
                    + Create New Order
                </button>
            </div>
            
            <div className="text-sm text-gray-500">
                Total Orders: {orders.length}
            </div>
            
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#4fbf8b]"></div>
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    No orders found. Create a new order to get started.
                </div>
            ) : (
                orders.map((order, index) => (
                    <div key={index} className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300 bg-white">
                        <div className="flex gap-5 max-w-80">
                            <img className="w-12 h-12 object-cover " src={assets.box_icon} alt="boxIcon" />
                            <div>
                                {order.items?.map((item, idx) => (
                                    <div key={idx} className="flex flex-col ">
                                        <p className="font-medium">
                                            {item.name || item.product?.name || "Product"}{" "} 
                                            <span className="text">x {item.quantity}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-sm md:text-base text-black/60">
                            <p className='text-black/80'>{order.customer?.name || "Customer"}</p>
                            <p>{order.customer?.address || "Address"}</p>
                            <p>{order.customer?.phone}</p>
                        </div>

                        <p className="font-medium text-lg my-auto">{currency}{order.amount}</p>

                        <div className="flex flex-col text-sm md:text-base text-black/60">
                            <p>Method: {order.paymentType}</p>
                            <p>Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</p>
                            <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                                {order.status || "Pending"}
                            </span>
                            
                            {order.isAssignedToVendor ? (
                                <div className="text-xs text-green-600 font-medium">
                                    Vendor: {order.assignedVendor?.name || order.vendor?.name || "Assigned"}
                                </div>
                            ) : (
                                <button 
                                    onClick={() => setShowVendorModal(order._id)}
                                    className="px-3 py-1 bg-[#4fbf8b] text-white text-xs rounded hover:bg-[#3da371] transition"
                                >
                                    Assign Vendor
                                </button>
                            )}
                            
                            {/* Status Update Buttons */}
                            {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                    className="text-xs border border-gray-300 rounded px-2 py-1 mt-1"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            )}
                        </div>

                        {/* Vendor Assignment Modal */}
                        {showVendorModal === order._id && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                                    <h3 className="text-lg font-semibold mb-4">Assign Vendor to Order</h3>
                                    <p className="text-sm text-gray-500 mb-4">Order ID: {order._id?.slice(-6) || index}</p>
                                    
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Select Vendor
                                        </label>
                                        {vendors.length === 0 ? (
                                            <p className="text-gray-500 text-sm">No vendors registered.</p>
                                        ) : (
                                            <select
                                                value={selectedVendor[order._id] || ''}
                                                onChange={(e) => setSelectedVendor({...selectedVendor, [order._id]: e.target.value})}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b]"
                                            >
                                                <option value="">-- Select Vendor --</option>
                                                {vendors.map(vendor => (
                                                    <option key={vendor._id} value={vendor._id}>
                                                        {vendor.name} ({vendor.email})
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </div>

                                    <div className="flex gap-3 justify-end">
                                        <button
                                            onClick={() => setShowVendorModal(null)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleAssignVendor(order._id)}
                                            disabled={vendors.length === 0}
                                            className="px-4 py-2 bg-[#4fbf8b] text-white rounded-lg hover:bg-[#3da371] transition disabled:opacity-50"
                                        >
                                            Assign
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>

        {/* Create Order Modal */}
        {showCreateOrderModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-4">Create New Order</h3>
                    
                    <div className="space-y-4">
                        {/* Product Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Product *
                            </label>
                            <select
                                value={newOrder.product}
                                onChange={(e) => setNewOrder({...newOrder, product: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b]"
                            >
                                <option value="">-- Select Product --</option>
                                {allProducts.map(product => (
                                    <option key={product._id} value={product._id}>
                                        {product.name} - {currency}{product.offerPrice}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity *
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={newOrder.quantity}
                                onChange={(e) => setNewOrder({...newOrder, quantity: parseInt(e.target.value) || 1})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b]"
                            />
                        </div>

                        {/* Vendor Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Vendor *
                            </label>
                            {vendors.length === 0 ? (
                                <p className="text-gray-500 text-sm">No vendors registered yet.</p>
                            ) : (
                                <select
                                    value={newOrder.vendor}
                                    onChange={(e) => setNewOrder({...newOrder, vendor: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b]"
                                >
                                    <option value="">-- Select Vendor --</option>
                                    {vendors.map(vendor => (
                                        <option key={vendor._id} value={vendor._id}>
                                            {vendor.name} ({vendor.email})
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Customer Details */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Customer Name *
                            </label>
                            <input
                                type="text"
                                value={newOrder.customerName}
                                onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b]"
                                placeholder="Enter customer name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Customer Address *
                            </label>
                            <textarea
                                value={newOrder.customerAddress}
                                onChange={(e) => setNewOrder({...newOrder, customerAddress: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b]"
                                placeholder="Enter delivery address"
                                rows="2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Customer Phone
                            </label>
                            <input
                                type="text"
                                value={newOrder.customerPhone}
                                onChange={(e) => setNewOrder({...newOrder, customerPhone: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fbf8b]"
                                placeholder="Enter phone number"
                            />
                        </div>

                        {/* Amount Display */}
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">Order Amount:</p>
                            <p className="text-2xl font-bold text-[#4fbf8b]">{currency}{newOrder.amount}</p>
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end mt-6">
                        <button
                            onClick={() => setShowCreateOrderModal(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreateOrder}
                            disabled={vendors.length === 0 || !newOrder.product || !newOrder.vendor}
                            className="px-4 py-2 bg-[#4fbf8b] text-white rounded-lg hover:bg-[#3da371] transition disabled:opacity-50"
                        >
                            Create Order
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default Orders
