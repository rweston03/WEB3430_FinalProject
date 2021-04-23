import React, { createContext, useState, useEffect, useContext } from 'react'
import { useHistory, Route, Switch, Redirect, useParams } from 'react-router-dom'
import { MenuContext } from './MenuList';
import Item from './Item'
import ItemForm from './ItemForm'
import { About, ErrorNotFound } from './Pages'
import { useCookies } from 'react-cookie'
import { FaPlus } from "react-icons/fa";

export const ItemContext = createContext()

export default function ItemList() {
  const [ items, setItems ] = useState();
  let { menus, setMenus } = useContext(MenuContext)
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  let [authenticated, setAuthenticated] = useState(cookies.token !== undefined)
  const history = useHistory();
  let menu_name = useParams()
  let menu=""
  for(let i = 0; i < menus.length; i++)
  {
    if (menus[i].name.toString() == menu_name.mname.toString())
    {
      menu = menus[i]
    }
  }
  console.log(menu.name)


  useEffect(() => {
    if (!items) {
      for(let i = 0; i < menus.length; i++)
      {
        if (menus[i].name.toString() == menu_name.mname.toString())
        {
          menu = menus[i]
        }
      }
      fetch(`/api/items/${menu}`, {
        credentials: 'same-origin'
      })
        .then(response => response.text())
        .then((data) => {
          setItems(JSON.parse(data, (key, value) => {
            const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/
            if(typeof value === 'string' && dateFormat.test(value))
            {
              return new Date(value)
            }
            return value
          }))
        })
        .catch(console.error)
    }
  })
  
  if(!items)
    return (
    <>
      <h1>{menu.name}</h1>
      <p>Loading...</p>
      <button className="btn btn-primary mx-2 my-2" onClick={() => history.push('/items/new')}><FaPlus/> Item</button>
    </>)
  return (
    <>
    <ItemContext.Provider value={{items, setItems, authenticated, setAuthenticated}}>
      <div className="pull-content-right">
        <Route path="/items">
        </Route>
      </div>
      <main className="container d-flex flex-wrap justify-content-around">
        <h1>{menu.name}</h1>
        <Switch>
          <Route exact path="/items">
          <div className="container d-flex justify-content-end">
            <button className="btn btn-primary mx-2 my-2" onClick={() => history.push('/items/new')}><FaPlus/> Item</button>
          </div>
            {items.map((p, i) => {
              return <Item key={i.id} item={i}/>
            })}
          </Route>
          <Route path="/items/new"><ItemForm menu={menu}/></Route>
          <Route path="/items/:iid/edit"><ItemForm menu={menu}/></Route>
          <Redirect from="" to="/items"/>
          <Route path="*"><ErrorNotFound/></Route>
        </Switch>
      </main>
    </ItemContext.Provider>
    </>
  );
}