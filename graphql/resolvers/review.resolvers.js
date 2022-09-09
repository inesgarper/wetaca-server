import Review from './../../models/Review.js'
import updateMealRating from '../../utils/updateMealRating.js'
import { UserInputError } from 'apollo-server'

const reviewResolvers = {

    Query: {

        getReviews: async (_, { mealID }) => await Review.find({ meal: mealID }).populate('meal')
    },

    Mutation: {
        createReview: async (_, { reviewData }, { currentUser }) => {

            const { _id } = currentUser

            if (!reviewData.rating) throw new UserInputError('Rating must be provided')

            const review = new Review({ ...reviewData, user: _id })
            await review.save()

            updateMealRating(reviewData.meal)

            return await Review.findById(review._id).populate('meal')
        }
    }
}

export default reviewResolvers
