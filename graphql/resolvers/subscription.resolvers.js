import Subscription from './../../models/Subscription.js'
import Order from './../../models/Order.js'
import setBaseMenu from '../../utils/setBaseMenu.js'
import { ApolloError, AuthenticationError } from 'apollo-server'

const subscriptionResolvers = {

    DayOfTheWeek: {
        SATURDAY: 6,
        SUNDAY: 0,
        MONDAY: 1,
        TUESDAY: 2,
        WEDNESDAY: 3
    },

    SubscriptionStatus: {
        ACTIVED: 'Actived',
        PAUSED: 'Paused',
        CANCELLED: 'Cancelled'
    },

    Query: {

        getAllSubs: async () => {

            if (!currentUser || currentUser.role !== 'ADMIN') throw new ApolloError('Not authorizated, needs permissions')

            const allSubs = await Subscription.find().populate('user')
            console.log(allSubs)
            return allSubs
        },

        getOneUserSubs: async (_, { user }) => {

            if (!currentUser || currentUser.role !== 'ADMIN') throw new ApolloError('Not authorizated, needs permissions')

            const subs = await Subscription.find({ user })

            return subs
        },

        getMySubs: async (_, args, { currentUser }) => {

            if (!currentUser) throw new AuthenticationError('not authenticated')

            const { _id } = currentUser

            const mySubs = await Subscription.find({ user: _id })
            return mySubs
        },

        getOneSub: async (_, { subs }) => { // BORRAR
            const subscription = await Subscription.findById(subs)
            return subscription
        }
    },

    Mutation: {

        createSubscription: (_, { subscriptionData }, {currentUser}) => {

            if (!currentUser) throw new AuthenticationError('not authenticated')

            const { _id } = currentUser
            const { address, deliveryWeekDay } = subscriptionData

            const subscription = new Subscription({ user: _id, address, deliveryWeekDay })
            return subscription.save()
        },

        updateStatus: async (_, { subs, status }) => {

            if (!currentUser) throw new AuthenticationError('not authenticated')

            const updatedSubs = await Subscription.findByIdAndUpdate(subs, { status }, { new: true })
            return updatedSubs
        },

        updateDeliveryWeekDay: async (_, { subs, day }) => {

            if (!currentUser) throw new AuthenticationError('not authenticated')

            const updatedSubs = await Subscription.findByIdAndUpdate(subs, { deliveryWeekDay: day }, { new: true })
            return updatedSubs
        },

        deleteSubscription: async (_, { subs }) => {

            if (!currentUser || currentUser.role !== 'ADMIN') throw new ApolloError('Not authorizated, needs permissions')

            await Subscription.findByIdAndDelete(subs)
            return 'Subscription deleted'
        },

        createBaseMenu: async (_, { orderID }) => {

            if (!currentUser) throw new AuthenticationError('not authenticated')

            const order = await Order.findById(orderID).populate('meals.mealID')

            const baseMenu = setBaseMenu(order)

            const updatedSub = await Subscription.findByIdAndUpdate(order.subscription, { baseMenu }, { new: true })
            updatedSub.save()

            return updatedSub.baseMenu
        }

    }
}

export default subscriptionResolvers