import React, { useContext, useState, useEffect } from 'react'
import {format} from 'date-fns'
import { Link, Switch, useHistory, useParams, Route, Redirect } from 'react-router-dom';
import { MenuContext } from './MenuList';
import  ItemList  from './ItemList'
import ItemForm from './ItemForm'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default function Menu() {
  let { menus, setMenus, authenticated, setAuthenticated } = useContext(MenuContext)
  let [modalOpen, setModalOpen] = useState(false)
  const [ items, setItems ] = useState();
  let mid = useParams();
  let menu = ""
  const history = useHistory()

  for(let i = 0; i < menus.length; i++)
  {
    if (menus[i].id.toString() == mid.mid.toString())
    {
      menu = menus[i]
    }
  }

  const deleteMenu = () => {
    fetch(`/api/menus/${mid.mid}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      },
      credentials: 'same-origin'
    }).then(() => {
        toast('Successfully deleted', {
            onClose: () => {
                document.location = "/menus"
            }
        })

        setModalOpen(false)
    }).catch((error) => {
        toast('Failed to delete', {
            onClose: () => {
                document.location = "/menus"
            }
        })
    })
  }

  return(
    <>
    <div className="card col-12 col-md-5 mx-3 my-2">
      <div className="card-body">
        <h1 className="card-title">{ menu.name}</h1>
        <p className="card-text">{ menu.description }</p>
        <div className="row">
          <div className="col-12 justify-content-center text-center">
            <button className="btn btn-warning mx-2" onClick={() => history.push(`/menus/${menu.id}/edit`)}>Edit</button>
            <button className="btn btn-danger mx-2" onClick={() => {
                  if(authenticated) setModalOpen(true)
                  else document.location = '/signin'
               }}>Delete</button>
               <ItemList menu={ menu.name }/>
            <button type="button" className="btn btn-info mx-2" onClick={()=> history.push(`/menus/`) }>Back to menus</button>
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onRequestClose={()=> setModalOpen(false)}
          style={customStyles} contentLabel="Are you sure?">
        <p>Are you sure you want to delete {menu.name}?</p>
        <button className="btn btn-danger mx-2" onClick={deleteMenu}>Confirm Delete</button>
        <button className="btn btn-warning mx-2" onClick={() => setModalOpen(false)}>Cancel</button>
      </Modal>  
      <Switch>
        <Route path="/items/new"><ItemForm/></Route>
      </Switch>
    </div>
    </>
  );
}