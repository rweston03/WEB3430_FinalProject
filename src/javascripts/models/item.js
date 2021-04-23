import mongoose from 'mongoose'

const Schema = mongoose.Schema

let itemSchema = new Schema({
    name: String,
    description: String,
    menu: {type: Schema.Types.ObjectId, ref: "Menu"},
    price: Number,
    image: String,
    created: Date,
    created_by: {type: Schema.Types.ObjectId, ref: "User"},
    updated: Date,
})

itemSchema.virtual('id').get(function(){
    return this._id.toHexString()
})

itemSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret._id
    }
})

export let Item = mongoose.model("Item", itemSchema)