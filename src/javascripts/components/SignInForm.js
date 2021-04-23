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
    username: yup.string().required(),
    password: yup.string().required()
})

export default function SignInForm () {
    let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema,
        onSubmit(values){
            fetch('/api/users/signin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'same-origin',
                body: JSON.stringify(values)
            }).then((response) => {
                if(!response.ok) throw Error('Failed to sign in')
                return response.text()
            }).then(() => {
                toast('Successfully signed in', {
                    onClose: () => {
                        document.location = "/projects"
                    }
                })
            }).catch((error) => {
                toast('Failed to sign in', {
                    onClose: () => {
                        document.location = "/projects"
                    }
                })
            })
        }
    });

    const history = useHistory();

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <div className="field">
                <label htmlFor="username" className="form-label">Username</label>
                <div className="control">
                    <input type="text" className="form-control" name="username" id="username" value={values.username} onChange={handleChange}/>
                    <VHelp message={errors.username}/>
                </div>
            </div>
            <div className="field">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="control">
                    <input type="password" className="form-control" name="password" id="password" value={values.password} onChange={handleChange}/>
                    <VHelp message={errors.password}/>
                </div>
            </div>
            <div className="field">
                <label></label>
                <div className="control">
                    <button className="btn btn-primary mx-2" type="submit">Submit</button>
                    <button className="btn btn-warning mx-2" onClick={()=> document.location = '/projects'}>Cancel</button>
                </div>
            </div>
        </form>
    )
}