import mongoose from "mongoose"
const { Schema, model } = mongoose

const schema = new Schema(
    {
        subscription: {
            type: Schema.Types.ObjectId,
            ref: 'Subscription'
        },
        meals: [{
            mealID: {
                type: Schema.Types.ObjectId,
                ref: 'Meal'
            },
            quantity: {
                type: Number
            }
        }],
        price: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['Actived', 'Ordered', 'Delivered'],
            default: 'Actived'
        },
        deliveryDate: {
            day: {
                type: Date
            },
            hour: {
                type: String
            }
        }
    },
    {
        timestamps: true
    }
)

export default model('Order', schema)