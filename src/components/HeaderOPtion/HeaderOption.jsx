import React from "react";
const HeaderOption = ({ Icon, title, Avatar }) => {
  return (
    <div>
      <div className="header_options">
        {Icon && <Icon></Icon>}
        <span>{title}</span>
      </div>
    </div>
  );
};

export default HeaderOption;
