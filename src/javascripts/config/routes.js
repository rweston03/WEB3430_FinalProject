import express from 'express'

import { indexPage, aboutPage, contactPage, signInPage, signUpPage } from '../controllers/index'
import { allMenusAPI, oneMenuAPI, createMenuAPI, updateMenuAPI, deleteMenuAPI } from '../controllers/menus'
import { allItemsAPI, itemsByMenuAPI, oneItemAPI, createItemAPI, updateItemAPI, deleteItemAPI } from '../controllers/items'
import { contactAPI } from '../controllers/contacts'
import { registerUserAPI, signUserInAPI } from '../controllers/users'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from './vars'

let router = express.Router()

export function getCurrentUser(req){
  if(req.cookies.token){
    return jwt.decode(req.cookies.token, APP_SECRET) 
  }else {
    return null
  }
}

function isSignedIn(req) {
    try {
        jwt.verify(req.cookies.token, APP_SECRET)
        return true
    } catch (err) {
        return false
    }
}

function requireSignIn(req, res, next) {
    if(isSignedIn(req)) {
        next()
    } else {
        res.status(401)
        res.end()
    }
}

export function configureRoutes(app) {
     app.all('*', (req, res, next)=>{
       app.locals.signedIn = isSignedIn(req)
       app.locals.currentUser = getCurrentUser(req)
       next()
     })
    
    router.get('/', indexPage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)
    router.get('/signin', signInPage)
    router.get('/signup', signUpPage)
    
    
    router.get('/menus*', indexPage)
    router.get('/items*', indexPage)
    router.get('/register', indexPage)
    router.get('/signin', indexPage)

    // Menus API Endpoints
    router.get('/api/menus', allMenusAPI)
    router.get('/api/menus/:id', oneMenuAPI)
    router.post('/api/menus', requireSignIn, createMenuAPI)
    router.put('/api/menus/:id', requireSignIn, updateMenuAPI)
    router.delete('/api/menus/:id', requireSignIn, deleteMenuAPI)

    // Items API Endpoints
    router.get('/api/items', allItemsAPI)
    router.get('/api/items/:menu', itemsByMenuAPI)
    router.get('/api/items/:id', oneItemAPI)
    router.post('/api/items', requireSignIn, createItemAPI)
    router.put('/api/items/:id', requireSignIn, updateItemAPI)
    router.delete('/api/items/:id', requireSignIn, deleteItemAPI)

    // Users
    router.post('/api/users/register', registerUserAPI)
    router.post('/api/users/signin', signUserInAPI)
    
    router.post('/api/contact', contactAPI)

    app.use('/', router)
}