import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'

toast.configure()

export function VHelp({message}){
    return <p className="help">{message}</p>
}

const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().required()
})

export default function ContactForm () {
    let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: ""
        },
        validationSchema,
        onSubmit(values){
            fetch('/api/contact', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'same-origin',
                body: JSON.stringify(values)
            }).then(() => {
                toast('Successfully submitted', {
                    onClose: () => {
                        document.location = "/projects"
                    }
                })
            }).catch((error) => {
                toast('Failed to submit', {
                    onClose: () => {
                        document.location = "/projects"
                    }
                })
            })
        }
    });

    const history = useHistory();

    return (
        <div className="container d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="col-10">
                <h1 className="my-3 text-center">Contact Us</h1>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <div>
                        <input className="form-control" type="text" name="name" id="name" value={values.name} onChange={handleChange}/>
                        <VHelp message={errors.name}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div>
                        <input className="form-control" type="email" name="email" id="email" value={values.email} onChange={handleChange}/>
                        <VHelp message={errors.email}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <div>
                        <textarea className="form-control" name="message" id="message" value={values.message} onChange={handleChange}></textarea>
                        <VHelp message={errors.message}/>
                    </div>
                </div>
                <div className="form-group">
                    <label></label>
                    <div>
                        <button className="btn btn-primary mx-2" type="submit">Submit</button>
                        <button className="btn btn-warning mx-2" onClick={()=>history.push('/projects')}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}