import React from "react";
import { Link } from "react-router-dom";
const TemplateCard = (item) => {
  return (
    <Link to={`/dashboard/content/${item?.slug}`}>
      <div className="p-5 shadow-md rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all">
        <img src={item.icon} alt="icon" width={50} height={50} />
        <h2 className="font-medium text-lg">{item.name}</h2>
        <p className="text-gray-500 line-clamp-3">{item.desc}</p>
      </div>
    </Link>
  );
};

export default TemplateCard;
