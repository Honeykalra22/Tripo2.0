import React from "react";

export const TravelBox = ({ place }) => {
    return (
        // <div className="border w-[20vw] items-center flex flex-col shadow-md rounded overflow-hidden">
        //   <img
        //     src={place.image}
        //     alt={place.name}
        //     className="w-[18vw] object-cover"
        //   />
        //   <div className="p-4">
        //     <h2 className="text-lg font-semibold">{place.name}</h2>
        //     <p className="text-gray-600 text-sm">{place.description}</p>
        //     <p className="text-blue-500 text-sm mt-2">{place.location}</p>
        //   </div>
        // </div>


        <div
            className="relative bg-cover bg-center rounded-lg shadow-lg overflow-hidden w-[22vw] h-full p-4 border"
            style={{ backgroundImage: `url(${place.image})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            <div className="relative p-4 text-white">
                <h2 className="text-xl font-bold">{place.name}</h2>
                <p className="text-sm">{place.address}</p>
                <div className="mt-2">
                    <p className="text-sm">
                        <span className="font-semibold">Opening Time:</span> {place.openingTime}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Closing Time:</span> {place.closingTime}
                    </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    {place.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
