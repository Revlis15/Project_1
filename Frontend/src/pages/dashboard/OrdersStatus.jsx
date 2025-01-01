import { useEffect, useState } from "react";
import axios from "axios";
import getBaseUrl from "../../utils/baseURL";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading";

const OrdersStatus = () => {
  const { userRole } = useAuth();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [allOrders, setAllOrders] = useState([]);
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${getBaseUrl()}/api/admin`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setStats(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await axios.get(`${getBaseUrl()}/api/orders`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        setAllOrders(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all orders:", error);
      }
    };
    fetchAllOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`${getBaseUrl()}/api/orders/${orderId}/status`, 
        { status: newStatus },
        { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } }
      );
      setAllOrders(prev => prev.map(o => 
        o._id === orderId ? { ...o, status: newStatus } : o
       ));
      fetchStats(); // <-- re-fetch stats here
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Redirect non-admin users
  useEffect(() => {
    if (userRole !== 'admin') {
      navigate('/'); 
    }
  }, [userRole, navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders Status</h1>
      <p>Total Orders: {stats.totalOrders}</p>
      <p>Completed Orders: {stats.completedOrders}</p>
      <p>Orders Left: {stats.ordersLeft}</p>
      <div className="h-96 overflow-y-auto mt-2">
        {
          allOrders.length === 0 ? (
            <div>No orders found</div>
          ) : (
            allOrders.map((order, index) => (
              <div key={order._id} className="border-b mb-4 pb-4">
                <p className="p-1 bg-secondary text-white w-10 rounded mb-2">#{index + 1}</p>
                <h2 className="font-bold">Order ID: {order._id}</h2>
                <p>Name: {order.name}</p>
                <p>Email: {order.email}</p>
                <p>Phone: {order.phone}</p>
                <p>Total Price: ${order.totalPrice}</p>
                <p>Status: {order.status}</p>
                <h3 className="font-semibold mt-2">Address:</h3>
                <p>
                  {order.address?.city}, {order.address?.state}, {order.address?.country}, {order.address?.zipcode}
                </p>
                <h3 className="font-semibold mt-2">Products:</h3>
                <ul>
                  {order.productIDs.map((pid) => (
                    <li key={pid}>{pid}</li>
                  ))}
                </ul>
                {order.status === "completed" ? (
                  <button
                    onClick={() => handleStatusChange(order._id, "pending")}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Pending
                  </button>
                ) : (
                  <button
                    onClick={() => handleStatusChange(order._id, "completed")}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Completed
                  </button>
                )}
              </div>
            ))
          )
        }
      </div>
    </div>
  );
};

export default OrdersStatus;