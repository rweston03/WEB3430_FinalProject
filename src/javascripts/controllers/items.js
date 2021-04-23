import { Item } from '../models/item'
import { getCurrentUser } from '../config/routes'
import { User } from '../models/user'
import { Menu } from '../models/menu'

// GET /api/Items
export const allItemsAPI = (req, res, next) => {
    Item.find().exec((err, Items) => {
        if (err) {
            res.json({success: false, message: "Query failed"})
            res.end()
        } else {
            res.write(JSON.stringify(Items))
            res.end()
        }
    })
}

// GET /api/Items/:mname
export const itemsByMenuAPI = (req, res, next) => {
    Item.findAll({menu: req.params.menu}).exec((err, Items) => {
        if (err) {
            res.json({success: false, message: "Query failed"})
            res.end()
        } else {
            res.write(JSON.stringify(Items))
            res.end()
        }
    })
}

// GET /api/Items/:id
export const oneItemAPI = (req, res, next) => {
    Item.find({_id: req.params.id}).exec((err, Item) => {
        if (err) {
            res.json({success: false, message: "Query failed"})
            res.end()
        } else {
            res.write(JSON.stringify(Item))
            res.end()
        }
    })
}

// POST /api/items
export const createItemAPI = (req, res, next) => {
    let Item = new Item(req.body)
    Item.created = new Date()
    Item.updated = new Date()
    Item.created_by = new User(getCurrentUser(req))
    Item.save((err) => {
        if (err) {
            res.json({success: false, message: "Item creation failed"})
            res.end()
        } else {
            res.end()
        }
    })
}

// PUT /api/items/:id
export const updateItemAPI = (req, res, next) => {
    Item.findOne({_id: req.params.id}).exec((err, Item) => {
        if (err) {
            res.json({success: false, message: "Unable to update"})
            res.end()
        } else {
            Object.assign(Item, req.body)
            Item.updated = new Date()
            Item.save((err) => {
                if (err) {
                    res.json({success: false, message: "Unable to update Item"})
                    res.end()
                } else {
                    res.end()
                }
            })
        }
    })
}

// DELETE /api/Items/:id
export const deleteItemAPI = (req, res, next) => {
    Item.findOne({_id: req.params.id}).exec((err, Item) => {
        if (err) {
            res.json({success: false, message: "Unable to delete"})
            res.end()
        } else {
            Item.findByIdAndDelete(req.params.id, err => {
                if (err) {
                    res.json({success: false, message: "Unable to delete Item"})
                    res.end()
                } else {
                    res.end()
                }
            })
        }
    })
}