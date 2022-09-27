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

        getAllSubscriptions: async () => await Subscription.find().populate('user'),

        getOneUserSubscription: async (_, { userID }) => await Subscription.findOne({ userID }).populate('user'),

        getMySubcription: async (_, args, { currentUser }) => {

            const { _id } = currentUser

            const mySubs = await Subscription.find({ user: _id })
            return mySubs
        }
    },

    Mutation: {

        createSubscription: (_, { subscriptionData }, { currentUser }) => {

            const { _id } = currentUser

            for (const input in subscriptionData) {
                for (const addressInput in subscriptionData.address) {
                    if (subscriptionData.address[addressInput] === '') throw new UserInputError('Provide all inputs')
                }
                if (subscriptionData[input] === '') throw new UserInputError('Provide all inputs')
            }

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

        createBaseMenu: async (_, args, { currentUser }) => {

            const { _id } = currentUser

            const subscription = await Subscription.findOne({ user: _id })
            const order = await Order.findOne({ subscription: subscription._id, status: 'Actived' }).populate('meals.mealID')

            // const order = await Order.findById(orderID).populate('meals.mealID')

            const baseMenu = setBaseMenu(order)

            const updatedSub = await Subscription.findByIdAndUpdate(order.subscription, { baseMenu }, { new: true })
            updatedSub.save()

            return updatedSub.baseMenu
        }

    }
}

export default subscriptionResolvers