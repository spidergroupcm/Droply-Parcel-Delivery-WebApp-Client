import React from "react";
import Lottie from "lottie-react";
import deliveryAnimation from "./Animation - 1742140047975.json";

const PackageSection = () => {
    const packages = [
        {
            weight: "0-1 kg",
            price: "50 TK",
            description: "Lightweight parcel delivery within the city.",
        },
        {
            weight: "1-2 kg",
            price: "100 TK",
            description: "Standard delivery for medium-sized packages.",
        },
        {
            weight: "Above 2 kg",
            price: "150 TK",
            description: "Heavy package delivery across regions.",
        },
    ];

    return (
        <section className="py-5 bg-gradient-to-br from-orange-50 to-gray-100">
            <div className="container mx-auto px-5 lg:px-16">
                {/* Section Heading */}
                <div className="text-center mb-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-orange-600">
                        Affordable Package Pricing
                    </h2>
                    <p className="text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
                        Choose from our transparent and competitive pricing plans for all your delivery needs. 
                    </p>
                </div>

                {/* Layout */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    {/* Left Side - Lottie Animation */}
                    <div className="flex justify-center md:w-1/3">
                        <Lottie
                            animationData={deliveryAnimation}
                            loop={true}
                            className="w-full max-w-xs md:max-w-sm"
                        />
                    </div>

                    {/* Right Side - Packages */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:w-2/3">
                        {packages.map((pkg, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-lg border border-orange-300 rounded-2xl p-8 text-center transform transition duration-300 hover:shadow-2xl hover:-translate-y-3"
                            >
                                <h3 className="text-3xl font-semibold text-orange-600 mb-4">
                                    {pkg.weight}
                                </h3>
                                <p className="text-5xl font-extrabold text-gray-900 mb-4">
                                    {pkg.price}
                                </p>
                                <p className="text-gray-600 text-lg">
                                    {pkg.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PackageSection;







// import React from "react";
// import Lottie from "lottie-react";
// // import deliveryAnimation from "./Animation - 1739958038886.json";
// import deliveryAnimation from "./Animation - 1742140047975.json";

// const PackageSection = () => {
//     const packages = [
//         {
//             weight: "0-1 kg",
//             price: "50 TK",
//             description: "Lightweight parcel delivery within the city.",
//         },
//         {
//             weight: "1-2 kg",
//             price: "100 TK",
//             description: "Standard delivery for medium-sized packages.",
//         },
//         {
//             weight: "Above 2 kg",
//             price: "150 TK",
//             description: "Heavy package delivery across regions.",
//         },
//     ];

//     return (
//         <section className="py-10 bg-gradient-to-br from-orange-50 to-gray-100">
//             <div className="container mx-auto px-6 lg:px-16">
//                 {/* Section Heading */}
//                 <div className="text-center mb-12">
//                     <h2 className="text-4xl font-bold text-orange-600 drop-shadow-lg">
//                         Affordable Package Pricing
//                     </h2>
//                     <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
//                         Choose from our transparent and competitive pricing plans for all your delivery needs. 
//                         Whether it’s a lightweight parcel or a heavy shipment, we’ve got you covered.
//                     </p>
//                 </div>

//                 {/* Two-Column Layout */}
//                 <div className="flex flex-col md:flex-row items-center justify-between gap-12">
//                     {/* Left Side - Lottie Animation */}
//                     <div className="flex justify-center md:w-1/3">
//                         <Lottie
//                             animationData={deliveryAnimation}
//                             loop={true}
//                             className="w-[500px]"
//                         />
//                     </div>

//                     {/* Right Side - Packages */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:w-1/2">
//                         {packages.map((pkg, index) => (
//                             <div
//                                 key={index}
//                                 className="bg-white shadow-lg border border-orange-300 rounded-2xl p-8 text-center transform transition duration-300 hover:shadow-2xl hover:-translate-y-2"
//                             >
//                                 {/* Weight */}
//                                 <h3 className="text-2xl font-bold text-orange-600 mb-3">
//                                     {pkg.weight}
//                                 </h3>
//                                 {/* Price */}
//                                 <p className="text-4xl font-extrabold text-gray-900 mb-3">
//                                     {pkg.price}
//                                 </p>
//                                 {/* Description */}
//                                 <p className="text-gray-600 text-lg">
//                                     {pkg.description}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default PackageSection;





// import React from "react";
// import Lottie from "lottie-react";




// import deliveryAnimation from "./Animation - 1739958038886.json"; // Replace with a better animation JSON file

// const PackageSection = () => {
//     const packages = [
//         {
//             weight: "0-1 kg",
//             price: "50 TK",
//             description: "Lightweight parcel delivery within the city.",
//         },
//         {
//             weight: "1-2 kg",
//             price: "100 TK",
//             description: "Standard delivery for medium-sized packages.",
//         },
//         {
//             weight: "Above 2 kg",
//             price: "150 TK",
//             description: "Heavy package delivery across regions.",
//         },
//     ];

//     return (
//         <section className="py-10 lg:py-16 bg-[#F3F4F6] ">
//             <div className="container mx-auto p-4 md:p-10 rounded-3xl  shadow-lg bg-white">
//                 {/* Section Heading */}
//                 <h2 className="text-4xl font-extrabold text-center mb-4 text-orange-600">
//                     Affordable Package Pricing
//                 </h2>
//                 <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
//                     Explore our transparent and competitive pricing plans for all your delivery needs. Whether it’s a lightweight parcel or a heavy shipment, we’ve got you covered at unbeatable rates.
//                 </p>

//                 {/* Two-Column Layout */}
//                 <div className="flex flex-col md:flex-row justify-between items-center gap-10">
//                     {/* Left Side - Lottie Animation */}
//                     <div className="flex items-center justify-center w-full md:w-1/3 ">
//                         <Lottie
//                             animationData={deliveryAnimation}
//                             loop={true}
//                             style={{
//                                 maxWidth: "350px",
//                                 margin: "0 auto",
//                             }}
//                         />
//                     </div>

//                     {/* Right Side - Packages */}
//                     <div className="grid flex-grow grid-cols-1 md:grid-cols-3 gap-6 md:w-1/2">
//                         {packages.map((pkg, index) => (
//                             <div
//                                 key={index}
//                                 className="bg-gradient-to-b from-orange-50 to-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 text-center border border-orange-200"
//                             >
//                                 {/* Weight */}
//                                 <h3 className="text-xl font-bold text-orange-600 mb-2">
//                                     {pkg.weight}
//                                 </h3>
//                                 {/* Price */}
//                                 <p className="text-3xl font-extrabold text-gray-800 mb-2">
//                                     {pkg.price}
//                                 </p>
//                                 {/* Description */}
//                                 <p className="text-sm text-gray-600">
//                                     {pkg.description}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default PackageSection;