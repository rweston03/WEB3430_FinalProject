import { Menu } from '../models/menu'
import { getCurrentUser } from '../config/routes'
import { User } from '../models/user'

// GET /api/menus
export const allMenusAPI = (req, res, next) => {
    Menu.find().exec((err, menus) => {
        if (err) {
            res.json({success: false, message: "Query failed"})
            res.end()
        } else {
            res.write(JSON.stringify(menus))
            res.end()
        }
    })
}

// GET /api/menus/:id
export const oneMenuAPI = (req, res, next) => {
    Menu.find({_id: req.params.id}).exec((err, menu) => {
        if (err) {
            res.json({success: false, message: "Query failed"})
            res.end()
        } else {
            res.write(JSON.stringify(menu))
            res.end()
        }
    })
}

// POST /api/menus
export const createMenuAPI = (req, res, next) => {
    let menu = new Menu(req.body)
    menu.created = new Date()
    menu.updated = new Date()
    menu.created_by = new User(getCurrentUser(req))
    menu.save((err) => {
        if (err) {
            res.json({success: false, message: "Menu creation failed"})
            res.end()
        } else {
            res.end()
        }
    })
}

// PUT /api/menus/:id
export const updateMenuAPI = (req, res, next) => {
    Menu.findOne({_id: req.params.id}).exec((err, menu) => {
        if (err) {
            res.json({success: false, message: "Unable to update"})
            res.end()
        } else {
            Object.assign(menu, req.body)
            menu.updated = new Date()
            menu.save((err) => {
                if (err) {
                    res.json({success: false, message: "Unable to update menu"})
                    res.end()
                } else {
                    res.end()
                }
            })
        }
    })
}

// DELETE /api/menus/:id
export const deleteMenuAPI = (req, res, next) => {
    Menu.findOne({_id: req.params.id}).exec((err, menu) => {
        if (err) {
            res.json({success: false, message: "Unable to delete"})
            res.end()
        } else {
            Menu.findByIdAndDelete(req.params.id, err => {
                if (err) {
                    res.json({success: false, message: "Unable to delete menu"})
                    res.end()
                } else {
                    res.end()
                }
            })
        }
    })
}