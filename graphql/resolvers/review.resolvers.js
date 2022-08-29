import Review from './../../models/Review.js'
import { AuthenticationError } from 'apollo-server'

const reviewResolvers = {

    Mutation: {
        // FALTA AÑADIR EL MEAL
        createReview: async (_, args, context) => {

            const { _id } = context.currentUser
            if (!context.currentUser) throw new AuthenticationError('not authenticated')

            const review = new Review({ ...args.review, user: _id })
            await review.save()
            return review
        }
    }
}

export default reviewResolvers
