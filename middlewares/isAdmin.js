import { ApolloError } from 'apollo-server'


const isAdmin = async (resolve, parent, args, context, info) => {

    if (!context.currentUser || context.currentUser.role !== 'ADMIN') throw new ApolloError('Not authorizated, needs permissions')

    const result = await resolve(parent, args, context, info)
    return result
}


const isAdminMiddleware = {

    Query: {
        // getAllUsers: isAdmin,

        // getAllMeals: isAdmin,
        getMealsByCategory: isAdmin,
        getMealsToCook: isAdmin,
        getMenu: isAdmin,


        // getAllSubscriptions: isAdmin,
        // getOneUserSubscription: isAdmin,

        getReviews: isAdmin,

        // getAllOrders: isAdmin,
        // getOneOrder: isAdmin,
        // getNextOrders: isAdmin,
    },

    Mutation: {

        deleteUser: isAdmin,

        deleteSubscription: isAdmin,

        // createMeal: isAdmin,
        updateMeal: isAdmin,
        deleteMeal: isAdmin,
        addMealToMenu: isAdmin,
        removeMealFromMenu: isAdmin,
        publishNewMenu: isAdmin,
    }
}


export default isAdminMiddleware