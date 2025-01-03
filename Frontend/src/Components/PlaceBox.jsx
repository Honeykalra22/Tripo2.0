import React from "react";
import { Link } from "react-router-dom";

export const PlaceBox = ({ place }) => {
    return (
        <Link to = '/placepage'>
            <div
                className="relative bg-cover bg-center rounded-lg shadow-lg overflow-hidden w-[22vw] h-full p-4 border cursor-pointer"
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
                                className="bg-gray-500 text-black font-bold text-xs px-2 py-1 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}
