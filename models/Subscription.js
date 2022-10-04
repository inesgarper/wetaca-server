import mongoose from "mongoose"
const { Schema, model } = mongoose

const schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['Actived', 'Paused', 'Cancelled'],
            default: 'Actived'
        },
        baseMenu: {
            meals: {
                total: {
                    type: Number
                },
                perCategory: {
                    meat: Number,
                    chicken: Number,
                    fish: Number,
                    pasta: Number,
                    rice: Number,
                    gratinated: Number,
                    legume: Number,
                    international: Number,
                    veggie: Number,
                    starter: Number,
                    full: Number,
                    light: Number,
                    dessert: Number
                }
            },
            maxPrice: {
                type: Number
            }
        },
        deliveryWeekDay: {
            type: Number,
            enum: [1, 2, 3, 6, 0],
            default: 6
        },
        address: {
            street: {
                type: String,
            },
            number: {
                type: String,
            },
            city: {
                type: String,
            },
            province: {
                type: String
            },
            postCode: {
                type: String
            },
        }
    },
    {
        timestamps: true
    }
)

export default model('Subscription', schema)