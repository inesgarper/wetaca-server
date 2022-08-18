import mongoose from "mongoose"
const { Schema, model } = mongoose

const schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        meal: {
            type: Schema.Types.ObjectId,
            ref: 'Meal'
        },
        rating: {
            type: Number
        },
        comment: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export default model('Review', schema)