import mongoose from 'mongoose'

const Schema = mongoose.Schema

let menuSchema = new Schema({
    name: String,
    description: String,
    image: String,
    created: Date,
    created_by: {type: Schema.Types.ObjectId, ref: "User"},
    updated: Date,
})

menuSchema.virtual('id').get(function(){
    return this._id.toHexString()
})

menuSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret._id
    }
})

export let Menu = mongoose.model("Menu", menuSchema)