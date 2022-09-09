import Subscription from './../../models/Subscription.js'
import Order from './../../models/Order.js'
import setBaseMenu from '../../utils/setBaseMenu.js'
import { ApolloError, AuthenticationError, UserInputError } from 'apollo-server'

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

        getAllSubs: async () => await Subscription.find().populate('user'),

        getOneUserSubs: async (_, { user }) => await Subscription.find({ user }).populate('user'),

        getMySubs: async (_, args, { currentUser }) => {

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

        createSubscription: (_, { subscriptionData }, { currentUser }) => {

            const { _id } = currentUser
            const { address, deliveryWeekDay } = subscriptionData

            const subscription = new Subscription({ user: _id, address, deliveryWeekDay })
            return subscription.save()
        },

        updateSubscriptionStatus: async (_, { status }, { currentUser }) => {

            if (status !== 'Actived' && status !== 'Paused' && status !== 'Cancelled') {
                throw new UserInputError('Status not valid.')
            }

            const { _id } = currentUser

            const updatedSubs = await Subscription.findOne({ user: _id })
            updatedSubs.status = status

            return updatedSubs.save()

        },

        updateDeliveryWeekDay: async (_, { day }, { currentUser }) => {

            const { _id } = currentUser

            if (day === '4' || day === '5') throw new UserInputError('Day not available')

            const updatedSubs = await Subscription.findOne({ user: _id })
            updatedSubs.deliveryWeekDay = day

            return updatedSubs.save()
        },

        deleteSubscription: async (_, { subs }) => {

            await Subscription.findByIdAndDelete(subs)
            return 'Subscription deleted'
        },

        createBaseMenu: async (_, { orderID }) => {

            const order = await Order.findById(orderID).populate('meals.mealID')

            const baseMenu = setBaseMenu(order)

            const updatedSub = await Subscription.findByIdAndUpdate(order.subscription, { baseMenu }, { new: true })
            updatedSub.save()

            return updatedSub.baseMenu
        }

    }
}

export default subscriptionResolvers