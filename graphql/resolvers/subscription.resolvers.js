import Subscription from './../../models/Subscription.js'

const subscriptionResolvers = {

    Query: {

        getAllSubs: async () => {
            const allSubs = await Subscription.find().populate('user')
            console.log(allSubs)
            return allSubs
        },

        getOneUserSubs: async (_, { user }) => {
            const subs = await Subscription.find({ user })
            return subs
        },

        getMySubs: async (_, args, { currentUser }) => {
            const { _id } = currentUser

            const mySubs = await Subscription.find({ user: _id })
            return mySubs
        },

        getOneSub: async (_, { subs }) => {
            const subscription = await Subscription.findById(subs)
            return subscription
        }
    },

    Mutation: {

        createSubscription: (_, { subscriptionData }, context) => {
            const { _id } = context.currentUser
            const { address } = subscriptionData

            const subscription = new Subscription({ user: _id, address })
            return subscription.save()
        },

        updateStatus: async (_, { subs, status }) => {
            const updatedSubs = await Subscription.findByIdAndUpdate(subs, { status }, { new: true })
            return updatedSubs
        },

        deleteSubscription: async (_, { subs }) => {
            await Subscription.findByIdAndDelete(subs)
            return 'Subscription deleted'
        }

    }
}

export default subscriptionResolvers