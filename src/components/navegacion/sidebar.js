import React  from 'react';
import {
    FaTaxi,
    FaGripHorizontal,
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const menuItem=[
        {
            path:"/",
            name:"Panel Principal",
            icon:<FaTaxi/>
        },
        {
            path:"/espacios",
            name:"Espacios",
            icon:<FaGripHorizontal/>
        },
        {
            path:"/login",
            name:"Iniciar Seccion",
            icon:<FaGripHorizontal/>
        },
        
    ]
    return (
        <div className="container">
           <div  className="sidebar">
               <div className="top_section">
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div  className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;