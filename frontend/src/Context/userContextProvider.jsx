import React, { useState } from "react";
import UserContext from "./userContext.jsx";

const UserContextProvider = ({children}) => {
    const [isLogged,setLog]=useState(false);
    const [BuyingPrdt,setBuyingPrdt]=useState([]);
    return (
        <UserContext.Provider value={{isLogged,setLog,setBuyingPrdt,BuyingPrdt}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;