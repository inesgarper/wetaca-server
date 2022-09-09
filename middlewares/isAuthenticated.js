import { ApolloError } from 'apollo-server'


const isAuthenticated = async (resolve, parent, args, context, info) => {

    if (!context.currentUser) throw new ApolloError('Not authenticated')

    return await resolve(parent, args, context, info)
}

const isAuthenticatedMiddleware = {

    Query: {

        getCurrentUser: isAuthenticated,

        getMySubs: isAuthenticated
    },

    Mutation: {

        createSubscription: isAuthenticated,
        updateSubscriptionStatus: isAuthenticated,
        updateDeliveryWeekDay: isAuthenticated,
        createBaseMenu: isAuthenticated,

        createReview: isAuthenticated

    }
}

export default isAuthenticatedMiddleware