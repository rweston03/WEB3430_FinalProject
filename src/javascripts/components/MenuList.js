import React, { createContext, useState, useEffect } from 'react'
import { useHistory, Route, Switch, Redirect } from 'react-router-dom'
import  MenuItem  from './MenuItem'
import  Menu  from './Menu'
import  MenuForm  from './MenuForm'
import ItemList from './ItemList'
import { About, ErrorNotFound } from './Pages'
import { useCookies } from 'react-cookie'
import { FaPlus } from "react-icons/fa";

export const MenuContext = createContext()

export default function MenuList() {
  const [ menus, setMenus ] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  let [authenticated, setAuthenticated] = useState(cookies.token !== undefined)
  const history = useHistory();

  useEffect(() => {
    if (!menus) {
      fetch('/api/menus', {
        credentials: 'same-origin'
      })
        .then(response => response.text())
        .then((data) => {
          setMenus(JSON.parse(data, (key, value) => {
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
  
  if(!menus)
    return <p>Loading...</p>
  return (
    <>
    <MenuContext.Provider value={{menus, setMenus, authenticated, setAuthenticated}}>
      <main className="container d-flex flex-wrap justify-content-around">
        <Switch>
          <Route exact path="/menus">
          <div className="container d-flex justify-content-end">
            <button className="btn btn-primary mx-2 my-2" onClick={() => history.push('/menus/new')}><FaPlus/> Menu</button>
          </div>
          <div className="container d-flex justify-content-center">
            {menus.map((m, i) => {
              return <MenuItem key={m.id} menu={m}/>
            })}
          </div>
          </Route>
          <Route path="/menus/new"><MenuForm/></Route>
          <Route path="/menus/:mid/edit"><MenuForm/></Route>
          <Route path="/menus/:mid"><Menu/></Route>
          <Route path="/items/:mname"><ItemList/></Route>
          <Redirect from="" to="/home"/>
          <Route path="*"><ErrorNotFound/></Route>
        </Switch>
      </main>
    </MenuContext.Provider>
    </>
  );
}