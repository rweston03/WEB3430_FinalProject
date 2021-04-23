import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { MenuContext } from './MenuList'

toast.configure()

export function VHelp({message}){
  return <div className="invalid-feedback">{message}</div>
}

const validationSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  image: yup.string().required()
})

export default function MenuForm() {
  let { menus, setMenus, authenticated, setAuthenticated } = useContext(MenuContext)
  let { mid } = useParams()
  
  if(!authenticated)
  {
    document.location = '/signin'
    return <></>
  }

  let menu = mid ? menus.find(m => m.id == mid ) : {}
  let is_new = mid === undefined
  console.log(is_new)

  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    initialValues: is_new ? {
      name: "",
      description: "",
      image: ""
    } : {...menu}, 
    validationSchema,
    onSubmit(values){
      fetch(`/api/menus${is_new ? '' : '/' + menu.id}`, {
          method: is_new ? "POST" : "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          credentials: 'same-origin',
          body: JSON.stringify(values)
      }).then(() => {
          toast('Successfully submitted', {
              onClose: () => {
                  document.location = "/menus"
              }
          })
      }).catch((error) => {
          toast('Failed to submit', {
              onClose: () => {
                  document.location = "/menus"
              }
          })
      })
  }
  })

  return (
    <>
      <form className="needs-validation" onSubmit={handleSubmit}>
        <h1>{ is_new ? 'Creating a Menu' : 'Editing a Menu' }</h1>
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
          <label htmlFor="image" className="form-label">Image</label>
          <div className="input-group has-validation">
            <input className={`form-control ${errors.image ? 'is-invalid' : ''}`} type="text" id="image" name="image" value={values.image} onChange={handleChange}/>
            <VHelp message={errors.image}/>
          </div>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary me-2">Submit</button>
          <button type="button" className="btn btn-secondary" onClick={()=> history.push(`/menus/`)}>Cancel</button>
        </div>
      </form >
    </>
  )
}