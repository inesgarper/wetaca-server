import Meal from '../../models/Meal.js'

const mealResolvers = {

    Query: {
        hello: () => 'Hello',
        // getCurrentUser: (_, args, context) => context.currentUser
    },

    Mutation: {
        addMeal: (_, args) => {
            const meal = new Meal({ ...args.mealData })
            return meal.save()
        },

    }
}

export default mealResolvers