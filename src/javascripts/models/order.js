import mongoose from 'mongoose'

const Schema = mongoose.Schema

let orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    phoneNumber: String,
    orderDate: Date,
    pickupDate: Date,
    items : { type : Array , "default" : [] },
    subtotal: Number,
    tax: Number,
    total: Number,
    status: String
})

orderSchema.virtual('id').get(function(){
    return this._id.toHexString()
})

orderSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret._id
    }
})

export let Order = mongoose.model("Order", orderSchema)