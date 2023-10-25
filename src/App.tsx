import { useEffect, useState } from 'react';
import './App.css';
import Main from './components/Main';
import { generateMenuItems } from './utils/shemaUtil';
import uischema from './schema/uischema.json';


const App =()=>{
  const [menuItems, setMenuitems] = useState<any[]>([]);

  useEffect(()=>{
      const menus=  generateMenuItems(uischema.elements[0]) // preparing the menu data to render the side menu from uischema ,
      setMenuitems([menus])
  },[])

  return (
   <div>
    {
      menuItems &&  menuItems.length > 0?
      <Main menuItems={menuItems} />
      :
      <label>Please wait</label>
    }
  </div>)
}

export default App;
