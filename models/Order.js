import mongoose from "mongoose"
const { Schema, model } = mongoose

const schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        meals: [{
            idMeal: {
                type: Schema.Types.ObjectId,
                ref: 'Meal'
            },
            quantity: {
                type: Number
            }
        }],
        price: {
            type: Number
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