import React from "react";

const TransportationSection = () => {
    const transportOptions = [

        {
            image: "https://i.ibb.co/0Rzbcq7b/Percel.png", 
            title: "Parcel Delivery",
            description: "Seamless pickup for individuals, small businesses and enterprises.",
        },
        {
            image: "https://i.ibb.co/bMPJ8hJM/Truck.png", 
            title: "Truck Rent",
            description: " Rent open trucks and covered vans of any size, available anywhere in Bangladesh.",
        },
        {
            image: "https://i.ibb.co/DDs6DMTm/loadunload.png", 
            title: "Load/Unload",
            description: "Specialized loading and unloading services for factories, project sites.",
        },
        {
            image: "https://i.ibb.co/7Jk8CpK5/bulk.png", 
            title: "Bulk Shipment",
            description: " Tailored solutions for handling oversized items and bulk quantities.",
        },
    ];

    return (
        <section className="py-12 bg-gray-100" id="feature">
            <div className="container mx-auto px-4 mt-5">
                
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-orange-600">
                We deliver reliable services you can count on.
                </h2>
            
                <p className="text-lg text-gray-700 w-3/4 mx-auto text-center mb-8">
                Experience cutting-edge, reliable transportation solutions designed to fit your logistics needs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {transportOptions.map((option, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden bg-black text-white rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
                        >
                            <img
                                src={option.image}
                                alt={option.title}
                                className="w-full h-56 object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4">
                                <h3 className="text-xl md:text-2xl font-bold text-center">
                                    {option.title}
                                </h3>
                                <p className="text-sm mt-2 text-center">{option.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TransportationSection;