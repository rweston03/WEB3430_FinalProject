import React, { useContext, useState } from 'react'
import {format} from 'date-fns'
import { Link, useHistory, useParams } from 'react-router-dom';
import { ItemContext } from './ItemList';
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

export default function Item(props) {
  let { items, setItems, authenticated, setAuthenticated } = useContext(ItemContext)
  let [modalOpen, setModalOpen] = useState(false)
  let i = props.item;
  const history = useHistory()

  const deleteItem = () => {
    fetch(`/api/items/${i.id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      },
      credentials: 'same-origin'
    }).then(() => {
        toast('Successfully deleted', {
            onClose: () => {
                document.location = "/items"
            }
        })

        setModalOpen(false)
    }).catch((error) => {
        toast('Failed to delete', {
            onClose: () => {
                document.location = "/items"
            }
        })
    })
  }

  return(
    <>
    <div className="card col-12 col-md-5 mx-3 my-2">
      <div className="card-body">
        <h2 className="card-title">{ i.title }</h2>
        <p className="card-text">{ i.description }</p>
        <div className="row">
          <div className="col-6">
            <strong>Begin date:</strong>
            <p>{ format(i.beginDate, 'MM/dd/yyyy') }</p>
          </div>
          <div className="col-6">
            <strong>Finish date:</strong>
            <p>{ format(i.finishDate, 'MM/dd/yyyy') }</p>
          </div>
          <div className="col-6">
            <strong>By:</strong> <p>{ i.creator }</p>
          </div>
          <div className="col-6">
            <strong>Progress:</strong>
            <div className="progress" style={{ width: "100%" }}>
              <div className="progress-bar" style={{width: `${100 * (i.progress / 100)}%`}} >
              { `${100 * (i.progress / 100)}%` }
              </div>
            </div>
          </div>
          <div className="col-6">
            <strong>Type:</strong> 
            <p>{ i.type }</p>
          </div>
          <div className="col-6">
            <strong>Status:</strong> 
            <p>{ i.status }</p>
          </div>
          <div className="col-12 justify-content-center text-center">
            <button className="btn btn-warning mx-2" onClick={() => history.push(`/items/${i.id}/edit`)}>Edit</button>
            <button className="btn btn-danger mx-2" onClick={() => {
                  if(authenticated) setModalOpen(true)
                  else document.location = '/signin'
               }}>Delete</button>
            <button type="button" className="btn btn-info mx-2" onClick={()=> history.push(`/items/`) }>Back to items</button>
          </div>
        </div>
      </div>

        <Modal isOpen={modalOpen} onRequestClose={()=> setModalOpen(false)}
          style={customStyles} contentLabel="Are you sure?">
          <p>Are you sure you want to delete {i.title}?</p>
          <button className="btn btn-danger mx-2" onClick={deleteItem}>Confirm Delete</button>
          <button className="btn btn-warning mx-2" onClick={() => setModalOpen(false)}>Cancel</button>
      </Modal>  
    </div>
    </>
  );
}