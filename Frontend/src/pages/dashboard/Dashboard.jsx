import axios from "axios"
import getBaseUrl from "../../utils/baseURL"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Loading from "../../components/Loading"
import { MdIncompleteCircle } from "react-icons/md"
import RevenueChart from "./RevenueChart"
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
    const { userRole } = useAuth();
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const reponse = await axios.get(`${getBaseUrl()}/api/admin`,{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                })

                setData(reponse.data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching admin stats:", error)
            }
        }

        fetchData()
    }, [])

    console.log(data)

      // Redirect non-admin users
      useEffect(() => {
        if (userRole !== 'admin') {
            navigate('/'); // Redirect to home or appropriate page
        }
    }, [userRole, navigate]);

    if (loading) {
        return <Loading/>
    }
  return (
        <>
            {/* Parent Container */}
            <div className="container mx-auto p-6 flex flex-col space-y-6">
                
                {/* Top Section: Summary Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Total Sales */}
                    <div className="flex items-center p-8 bg-white shadow rounded-lg">
                        {/* Icon */}
                        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        {/* Data */}
                        <div>
                            <span className="block text-2xl font-bold">${data?.totalSales}</span>
                            <span className="block text-gray-500">Total Sales This Month</span>
                        </div>
                    </div>

                    {/* Trending Books */}
                    <div className="flex items-center p-8 bg-white shadow rounded-lg">
                        {/* Icon */}
                        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                        </div>
                        {/* Data */}
                        <div>
                            <span className="inline-block text-2xl font-bold">{data?.trendingBooks}</span>
                            <span className="block text-gray-500">Trending Books This Month</span>
                        </div>
                    </div>

                    {/* Total Orders */}
                    <div className="flex items-center p-8 bg-white shadow rounded-lg">
                        {/* Icon */}
                        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                            <MdIncompleteCircle className='h-6 w-6'/>
                        </div>
                        {/* Data */}
                        <div>
                            <span className="block text-2xl font-bold">{data?.totalOrders}</span>
                            <span className="block text-gray-500">Total Orders</span>
                        </div>
                    </div>

                    {/* Orders Left */}
                    <div className="flex items-center p-8 bg-white shadow rounded-lg">
                        {/* Icon */}
                        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
                            <svg
                                aria-hidden="true"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    fill="#fff"
                                    d="M12 14l9-5-9-5-9 5-9-5 9 5z"
                                />
                                <path
                                    fill="#fff"
                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 14l9-5-9-5-9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                />
                            </svg>
                        </div>
                        {/* Data */}
                        <div>
                            <span className="block text-2xl font-bold">{data?.ordersLeft}</span>
                            <span className="block text-gray-500">Orders Left</span>
                        </div>
                    </div>
                </section>

                {/* Bottom Section */}
                <section className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
                    {/* Revenue Chart */}
                    <div className="w-full lg:w-full">
                        <div className="flex items-center justify-center h-full p-4 bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                            <RevenueChart monthlySales={data.monthlySales}/>
                        </div>
                    </div>
                </section>      
            </div>
        </>
    )}
            
export default Dashboard