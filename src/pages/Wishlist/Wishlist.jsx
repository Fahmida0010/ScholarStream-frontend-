// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import useAuth from "../../hooks/useAuth";

// const Wishlist = () => {
//   const { user } = useAuth();
//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_API_URL}/wishlist/${user.email}`)
//       .then(res => res.json())
//       .then(data => setWishlist(data));
//   }, [user.email]);

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Remove?",
//       text: "Remove from wishlist?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes"
//     }).then(result => {
//       if (result.isConfirmed) {
//         fetch(`${import.meta.env.VITE_API_URL}/wishlist/${id}`, {
//           method: "DELETE"
//         })
//           .then(res => res.json())
//           .then(() => {
//             setWishlist(prev => prev.filter(item => item._id !== id));
//             Swal.fire("Removed!", "Scholarship removed.", "success");
//           });
//       }
//     });
//   };

//   return (
//     <div className="w-[90%] mx-auto my-10">
//       <h2 className="text-3xl font-bold mb-6">My Wishlist ❤️</h2>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {wishlist.map(item => (
//           <div key={item._id} className="card bg-base-100 shadow-lg">
//             <img src={item.universityImage} className="h-48 object-cover" />
//             <div className="p-4">
//               <h3 className="font-bold">{item.scholarshipName}</h3>
//               <p>{item.universityName}</p>

//               <button
//                 onClick={() => handleDelete(item._id)}
//                 className="btn btn-sm btn-error mt-3"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Wishlist;

