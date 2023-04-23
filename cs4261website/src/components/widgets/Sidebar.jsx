import React from 'react';
import Text from '../elements/Text';
import {NavLink} from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="text-white">
        <ul>
            <Text className="text-lg pl-4 mt-6 font-bold mb-12">
                College Application Help
            </Text>

          
                <NavLink 
                    to="/home"
                    className={({isActive}) => 
                        isActive? "bg-secondary w-full block border-l-2 border-l-tertiary mr-2 py-3  text-sm"
                        : 
                        "mr-2 text-sm py-3 "
                    }    
                >                    
                    <li className="p-4 ">
                        Upload Essay
                    </li>
                </NavLink>
                <NavLink 
                    to="/manage"
                    className={({isActive}) => 
                        isActive? "bg-secondary w-full block border-l-2 border-l-tertiary mr-2 py-3  text-sm"
                        : 
                        "mr-2 text-sm py-3 "
                    }    
                >                    
                    <li className="p-4 ">
                        View Essays (Student View)
                    </li>
                </NavLink>      

                <NavLink 
                    to="/reviewersmanage"
                    className={({isActive}) => 
                        isActive? "bg-secondary w-full block border-l-2 border-l-tertiary mr-2 py-3  text-sm"
                        : 
                        "mr-2 text-sm py-3 "
                    }    
                >                    
                    <li className="p-4 ">
                        View Essays (Reviewer View)
                    </li>
                </NavLink>     
         
        </ul>
    </aside>
  )
}

export default Sidebar