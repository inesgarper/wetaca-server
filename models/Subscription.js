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
            type: String,
            enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
            default: 'Sábado'
        },
        address: {
            street: {
                type: String,
            },
            number: {
                type: Number,
            },
            city: {
                type: String,
            },
            province: {
                type: String
            },
            postCode: {
                type: Number
            },
        }
    },
    {
        timestamps: true
    }
)

export default model('Subscription', schema)