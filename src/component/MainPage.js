import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainPage = ({children}) => {
    return (
        <div>
            <Header/>
            <Sidebar/>
            <div>
                {children}
            </div>
        </div>
    )
}

export default MainPage;