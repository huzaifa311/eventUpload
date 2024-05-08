"use client";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Details from "./Details";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { responsive2 } from "@/constant/data";
import { Toaster } from "react-hot-toast";
import { usePopup } from "@/context/PopupContext";
import Link from "next/link";
import { GetEvent } from "@/helper/Event";

import Image from "next/image";
const ProductCard = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const url = `api/create-event`;
				const data = await GetEvent(url);
				setEvents(data.data);
			} catch (error) {
				console.error("Error fetching events:", error);
			}
		};

		fetchEvents();
	}, []);

	const { price = null, setPrice, productID, setProductID } = usePopup();
	return (
		<div className=" px-4 max-sm:px-6 md:px-8 lg:px-10 py-10 m-4  max-sm:py-6 md:py-8 lg:py-10 relative">
			<Toaster className="  " />
			<Details Id={productID} prices={price} />
			<Carousel className="product-carousel" responsive={responsive2} infinite={true}>
				{events && events.map((item, index) => (
					<Link
						className="flex max-sm:space-x-4 md:space-x-6 lg:space-x-8"
						key={index}
						href={{
							pathname: `/${item.interestedInCustomDomain}`,
						}}>
						<div className=" w-[500px] max-sm:w-full md:w-[400px] cursor-pointer relative shadow-sm m-4 max-sm:m-2 shadow-gray-400">
							<div className=" h-auto w-full md:w-full max-sm:w-full overflow-hidden">
								<Image 
									className="w-full max-sm:w-full max-sm:h-[300px] h-[400px] " 
									src={item.flyerURLs[0]} 
									alt="product image" 
									width={1000} 
									height={500} 
								/>
							</div>
							<div className="flex justify-center">
								<div className="flex items-center md:text-[8px] relative justify-center flex-col max-sm:text-[6px] px-2 text-gray-400 text-[18px]">
									{/* <div className="lg:mb-2 max-sm:mb-[-6px] max-sm:font-normal w-full text-black font-semibold  text-[12px] max-sm:text-[6px] text-center">{item.description}</div> */}
									<div className="max-sm:mb-[-6px] text-lg	 font-bold text-black uppercase max-sm:text-[8px] text-[20px] ">{item.eventTitle}</div>
									<div className="text-black font-normal text-[16px] w-full flex flex-col max-sm:text-[8px] justify-between items-center">
										<div>
											<div className="flex flex-row w-full">
												<FaCalendarAlt className="mr-4 max-sm:mr-1 text-black " />
												{item.dateOfEvent.slice(0, 10)}
											</div>
											<div className="flex flex-row w-full max-sm:text-[8px]">
												<FaLocationDot className="mr-4 max-sm:mr-1" /> {item.eventVenue}
											</div>
										</div>
										<div className="mt-1 max-sm:mt-0 bg-none">
											<p className="p-[2px] rounded-full text-black font-bold max-sm:text-[8px] text-[20px]">{item.ticketPrice}$</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Link>
				))}
			</Carousel>
		</div>
	);
};

export default ProductCard;
