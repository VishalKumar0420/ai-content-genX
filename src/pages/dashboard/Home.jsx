import React, { useState } from "react";
import SearchSection from "../../components/dashboard/SearchSection";
import TemplateListSection from "../../components/dashboard/TemplateListSection";

const HomeDashboard = () => {
  const [userSearchInput,setUserSearchInput]=useState("")

  return (
    <div className="dark:bg-boxdark-2 dark:text-whiten bg-whiten">
      {/* search section */}
      <SearchSection
        onSearchInput={(value) => setUserSearchInput(value)}
      />
      {/* template section */}
      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  );
};

export default HomeDashboard;
