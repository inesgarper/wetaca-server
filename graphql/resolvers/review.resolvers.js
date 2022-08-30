import Review from './../../models/Review.js'
import { AuthenticationError } from 'apollo-server'
import Meal from '../../models/Meal.js'

const reviewResolvers = {

    Query: {
        getReviews: async (_, { mealId }) => {

            const reviews = await Review.find({ meal: mealId })
            if (reviews.length !== 0) return reviews
            else throw new Error('No reviews for this meal')
            // no podemos devolver una string porque debe devolver un array
        }
    },

    Mutation: {
        createReview: async (_, args, context) => {

            const { _id } = context.currentUser
            if (!context.currentUser) throw new AuthenticationError('not authenticated')

            const review = new Review({ ...args.reviewData, user: _id })
            await review.save()


            // UPDATE MEAL AVG RATING

            const allReviews = await Review.find({ meal: args.reviewData.meal })
            const ratings = allReviews.map(elm => elm.rating)

            const total = ratings.reduce((acc, elm) => acc + elm)
            const average = total / ratings.length

            await Meal.findByIdAndUpdate(args.reviewData.meal, { popularity: { averageRating: average } })

            return review
        }
    }
}

export default reviewResolvers
