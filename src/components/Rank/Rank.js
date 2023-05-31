import React from "react";

const Rank = ({ first_name, entries }) => {
    return(
 <div>
    <div className="white f3 ">
        {`${first_name}, your current rank is...`}
    </div>
    <div className="white f1 ">
        {entries}
    </div>
 </div>
    );
};


export default Rank;