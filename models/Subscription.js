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
                    carne: Number,
                    pollo: Number,
                    pescado: Number,
                    pasta: Number,
                    gratinado: Number,
                    arroz: Number,
                    legumbres: Number,
                    internacional: Number
                }
            },
            maxPrice: {
                type: Number
            }
        },
    },
    {
        timestamps: true
    }
)

export default model('Subscription', schema)