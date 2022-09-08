import Review from "../models/Review.js"
import Meal from "../models/Meal.js"

const updateMealRating = async (mealID) => {

    const allReviews = await Review.find({ meal: mealID })

    const ratings = allReviews.map(review => review.rating)

    const total = ratings.reduce((acc, rating) => acc + rating)
    const averageRating = total / ratings.length

    return await Meal.findByIdAndUpdate(mealID, { averageRating })

}

export default updateMealRating