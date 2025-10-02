// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar, Pie } from "react-chartjs-2";
// import axiosInstance from '../utils/axiosInstance';


// const CustomerAnalytics = () => {
//     const [stats, setStats] = useState({});
//     const [topLocations, setTopLocations] = useState([]);
//     const [monthlyRegistrations, setMonthlyRegistrations] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // const statsResponse = await axios.get('/api/customers/stats');
//                 const locationsResponse = await axiosInstance.get('/top-location');
//                 const  registrationsResponse= await axiosInstance.get('/monthly-registration');

//                 // const registrationsResponse = await axios.get('/api/customers/monthly-registrations');

//                 // const locationsResponse = await axios.get('/api/customers/top-locations');

//                 // setStats(statsResponse.data);
//                 setTopLocations(locationsResponse.data);
//                 setMonthlyRegistrations(registrationsResponse.data);
//             } catch (error) {
//                 console.error('Error fetching analytics:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div className="analytics-container p-6">
//             <h2 className="text-2xl font-bold mb-4">Customer Analytics</h2>

//             {/* Key Metrics */}
//             {/* <div className="grid grid-cols-3 gap-4"> */}
//                 {/* <div className="bg-blue-100 p-4 rounded-md">
//                     <h3 className="text-lg font-bold">Total Customers</h3>
//                     {/* <p className="text-xl">{stats.totalCustomers}</p> */}
//                 {/* </div> 
//                 {/* <div className="bg-green-100 p-4 rounded-md">
//                     <h3 className="text-lg font-bold">Active Customers</h3>
//                     <p className="text-xl">{stats.activeCustomers}</p>
//                 </div> */}
//                 {/* <div className="bg-red-100 p-4 rounded-md">
//                     <h3 className="text-lg font-bold">Inactive Customers</h3>
//                     <p className="text-xl">{stats.inactiveCustomers}</p>
//                 </div> */}
//             {/* </div> */}

//             {/* Top Locations */}
//             {/* <div className="mt-6">
//                 <h3 className="text-xl font-bold mb-2">Top Locations</h3>
//                 <ul className="list-disc pl-6">
//                     {topLocations.map((location, index) => (
//                         <li key={index}>
//                             {location._id || 'Unknown'}: {location.count} customers
//                         </li>
//                     ))}
//                 </ul>
//             </div> */}

//             {/* Monthly Registrations (Bar Chart) */}
//             <div className="mt-6">
//                 <h3 className="text-xl font-bold mb-2">Monthly Registrations</h3>
//                 <Bar
//                     data={{
//                         labels: monthlyRegistrations.map((data) => `Month ${data._id}`),
//                         datasets: [
//                             {
//                                 label: 'Registrations',
//                                 data: monthlyRegistrations.map((data) => data.count),
//                                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                                 borderColor: 'rgba(75, 192, 192, 1)',
//                                 borderWidth: 1,
//                             },
//                         ],
//                     }}
//                     options={{
//                         scales: {
//                             y: { beginAtZero: true },
//                         },
//                     }}
//                 />
//             </div>
//         </div>
//     );
// };

// export default CustomerAnalytics;
