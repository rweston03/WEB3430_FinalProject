import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ItemContext } from './ItemList'
import { MenuContext } from './MenuList'

toast.configure()

export function VHelp({message}){
  return <div className="invalid-feedback">{message}</div>
}

const validationSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  menu: yup.string().required(),
  price: yup.number().required(),
  image: yup.string().required()
})

export default function ItemForm(props) {
  let { items, setItems } = useContext(ItemContext)
  let { menus, setMenus, authenticated, setAuthenticated } = useContext(MenuContext)
  let { iid } = useParams()
  let passed_m = props.menu
  
  if(!authenticated)
  {
    document.location = '/signin'
    return <></>
  }

  let item = iid ? items.find(i => i.id == iid ) : {}
  let is_new = iid === undefined

  let menuList = menus.length > 0 && menus.map((m, i) => {
    return (
      <option key={i} value={m.id}>{m.name}</option>
    )
  }, this)

  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    initialValues: is_new ? {
      name: "",
      description: "",
      menu: "",
      price: 0,
      image: ""
    } : {...item}, 
    validationSchema,
    onSubmit(values){
      fetch(`/api/items${is_new ? '' : '/' + item.id}`, {
          method: is_new ? "POST" : "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          credentials: 'same-origin',
          body: JSON.stringify(values)
      }).then(() => {
          toast('Successfully submitted', {
              onClose: () => {
                  document.location = "/items"
              }
          })
      }).catch((error) => {
          toast('Failed to submit', {
              onClose: () => {
                  document.location = "/items"
              }
          })
      })
  }
  })

  return (
    <>
      <form className="needs-validation" onSubmit={handleSubmit}>
        <h1>{ is_new ? 'Adding a new item' : 'Editing a item' }</h1>
        <div className="field mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <div className="input-group has-validation">
            <input className={`form-control ${errors.name ? 'is-invalid' : ''}`} type="text" id="name" name="name" value={values.name} onChange={handleChange}/>
            <VHelp message={errors.name}/>
          </div>
        </div>
        <div className="field mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <div className="input-group has-validation">
            <textarea className={`form-control ${errors.description ? 'is-invalid' : ''}`} id="description" name="description" value={values.description} onChange={handleChange}></textarea>
            <VHelp message={errors.description}/>
          </div>
        </div>
        <div className="field mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <div className="input-group has-validation">
            <input className={`form-control ${errors.price ? 'is-invalid' : ''}`} type="number" id="price" name="price" value={values.price} onChange={handleChange}/>
            <VHelp message={errors.price}/>
          </div>
        </div>
        <div className="field mb-3">
          <label htmlFor="menu" className="form-label">Menu</label>
          <div className="input-group has-validation is-invalid">
            <select className={`form-control ${errors.menu ? 'is-invalid' : ''}`} id="menu" name="menu" value={values.menu} onChange={handleChange}>
              {menuList}
            </select>
            <VHelp message={errors.menu}/>
          </div>
        </div>
        <div className="field mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <div className="input-group has-validation">
            <textarea className={`form-control ${errors.image ? 'is-invalid' : ''}`} id="image" name="image" value={values.image} onChange={handleChange}></textarea>
            <VHelp message={errors.image}/>
          </div>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary me-2">Submit</button>
          <button type="button" className="btn btn-secondary" onClick={()=> history.push(`/items/${passed_m.name}`)}>Cancel</button>
        </div>
      </form >
    </>
  )
}