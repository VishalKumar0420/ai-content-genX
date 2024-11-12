import React, { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { TemplateLists } from "../../constant/data";
import TemplateCard from "./TemplateCard";


const TemplateListSection = ({ userSearchInput }) => {
  const [templateList, setTemplateList] = useState(TemplateLists);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Set loading to true when the search input changes
    const timer = setTimeout(() => {
      if (userSearchInput) {
        const filterData = TemplateLists.filter((item) =>
          item.name.toLowerCase().includes(userSearchInput.toLowerCase())
        );
        setTemplateList(filterData);
      } else {
        setTemplateList(TemplateLists);
      }
      setIsLoading(false); 
    }, 1000); 

    return () => clearTimeout(timer); 
  }, [userSearchInput]);

  return (
    <div className="p-10">
      {isLoading ? (
       
        <div className="flex justify-center items-center h-32">
          <PuffLoader />
        </div>
      ) : templateList.length > 0 ? (
    
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {TemplateLists.map((item, index) => (
            <TemplateCard {...item} key={index} />
          ))}
        </div>
      ) : (
     
        <div className="text-center text-gray-500">
          <p>No templates found 😁😁 {userSearchInput}</p>
        </div>
      )}
    </div>
  );
};

export default TemplateListSection;