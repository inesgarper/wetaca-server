import { gql } from "apollo-server"
import Meal from "../models/Meal"
import Order from "../models/Order"
import Subscription from "../models/Subscription"
import User from "../models/User"
import testServer, { userContext } from "../testServer"
import { baseMenuMeal, userSubscription } from "./helpers"

let newUser

beforeAll(async () => {

    newUser = new User(userSubscription)
    await newUser.save()

    userContext._id = newUser.id


    await Subscription.deleteMany()
    await Order.deleteMany()
    await Meal.deleteMany()
})


describe('CREATE SUBSCRIPTION', () => {
    it('Should return subscription', async () => {

        const result = await testServer.executeOperation({
            query: gql`
                mutation($subscriptionData: SubscriptionInput!){
                    createSubscription(subscriptionData: $subscriptionData) {
                        address {
                        city
                        }
                        status
                        deliveryWeekDay
                    }
                }
            `,
            variables: {
                subscriptionData: {
                    address: {
                        city: "Madrid",
                        number: 8,
                        postCode: 28045,
                        province: "Madrid",
                        street: "Paseo de la Chopera"
                    },
                    deliveryWeekDay: "SUNDAY"
                }
            }
        })

        expect(result.data.createSubscription).toBeTruthy()
        expect(result.errors).toBeFalsy()
        expect(result.data.createSubscription.address.city).toBe('Madrid')
        expect(result.data.createSubscription.status).toBe('ACTIVED')
        expect(result.data.createSubscription.deliveryWeekDay).toBe('SUNDAY')
    })

    it('Should throw an error if user does not provide all inputs', async () => {

        const result = await testServer.executeOperation({
            query: gql`
                mutation($subscriptionData: SubscriptionInput!){
                    createSubscription(subscriptionData: $subscriptionData) {
                        address {
                        city
                        }
                        status
                        deliveryWeekDay
                    }
                }
            `,
            variables: {
                subscriptionData: {
                    address: {
                        city: "",
                        number: 8,
                        postCode: 28045,
                        province: "Madrid",
                        street: "Paseo de la Chopera"
                    },
                    deliveryWeekDay: "SUNDAY"
                }
            }
        })

        expect(result.data.createSubscription).toBeFalsy()
        expect(result.errors).toBeTruthy()
        expect(result.errors[0].message).toBe('Provide all inputs')
    })
})


describe('UPDATE SUBSCRIPTION STATUS', () => {
    it('Should update de subscription status', async () => {

        const result = await testServer.executeOperation({
            query: gql`
                mutation($status: String!){
                    updateSubscriptionStatus(status: $status) {
                        status
                    }
                }
            `,
            variables: {
                status: 'Paused'
            }
        })

        expect(result.data.updateSubscriptionStatus).toBeTruthy()
        expect(result.errors).toBeFalsy()
        expect(result.data.updateSubscriptionStatus.status).toBe('PAUSED')
    })

    it('Should return error if status is not valid', async () => {

        const result = await testServer.executeOperation({
            query: gql`
                mutation($status: String!){
                    updateSubscriptionStatus(status: $status) {
                        status
                    }
                }
            `,
            variables: {
                status: 'Pause'
            }
        })

        expect(result.data.updateSubscriptionStatus).toBeFalsy()
        expect(result.errors).toBeTruthy()
        expect(result.errors[0].message).toBe('Status not valid.')
    })
})

describe('UPDATE DELIVERY WEEK DAY', () => {
    it('Should update de delivery week day', async () => {

        const result = await testServer.executeOperation({
            query: gql`
                mutation($day: String!){
                    updateDeliveryWeekDay(day: $day) {
                        deliveryWeekDay
                    }
                }
            `,
            variables: {
                day: '2'
            }
        })

        expect(result.data.updateDeliveryWeekDay).toBeTruthy()
        expect(result.errors).toBeFalsy()
        expect(result.data.updateDeliveryWeekDay.deliveryWeekDay).toBe('TUESDAY')
    })

    it('Should return error if day is Thursday or Friday', async () => {

        const result = await testServer.executeOperation({
            query: gql`
                mutation($day: String!){
                    updateDeliveryWeekDay(day: $day) {
                        deliveryWeekDay
                    }
                }
            `,
            variables: {
                day: '4'
            }
        })

        expect(result.data.updateDeliveryWeekDay).toBeFalsy()
        expect(result.errors).toBeTruthy()
        expect(result.errors[0].message).toBe('Day not available')
    })
})


describe('DELETE SUBSCRIPTION', () => {
    it('Should delete de subscription and return message', async () => {

        const newSubscription = await testServer.executeOperation({
            query: gql`
                mutation($subscriptionData: SubscriptionInput!){
                    createSubscription(subscriptionData: $subscriptionData) {
                        id
                    }
                }
            `,
            variables: {
                subscriptionData: {
                    address: {
                        city: "Madrid",
                        number: 8,
                        postCode: 28045,
                        province: "Madrid",
                        street: "Paseo de la Chopera"
                    },
                    deliveryWeekDay: "SUNDAY"
                }
            }
        })

        const result = await testServer.executeOperation({
            query: gql`
                mutation($subs: ID!){
                    deleteSubscription(subs: $subs)
                }
            `,
            variables: {
                subs: newSubscription.data.createSubscription.id
            }
        })

        expect(result.data.deleteSubscription).toBeTruthy()
        expect(result.errors).toBeFalsy()
        expect(result.data.deleteSubscription).toBe('Subscription deleted')

    })
})


describe('GET ALL SUBSCRIPTIONS', () => {
    it('Should return array of subscriptions', async () => {

        const result = await testServer.executeOperation({
            query: gql`
                query{
                    getAllSubs {
                        status
                    }
                }
            `
        })

        expect(result.data.getAllSubs).toBeTruthy()
        expect(result.errors).toBeFalsy()
        expect(result.data.getAllSubs.length).toBe(1)

    })
})

describe('CREATE BASE MENU', () => {
    it('Should return the new base menu', async () => {

        // CREATE MEAL
        const meal = await testServer.executeOperation({
            query: gql`
                mutation($mealData: MealInput){
                    createMeal(mealData: $mealData) {
                        id
                    }
                }
            `,
            variables: {
                mealData: baseMenuMeal
            }
        })

        // CREATE ORDER
        const newOrder = await testServer.executeOperation({
            query: gql`
                mutation{
                    createOrder {
                        id
                    }
                }
            `
        })


        // ADD MEAL TO ORDER
        const orderWithMeals = await testServer.executeOperation({
            query: gql`
                mutation($mealId: ID){
                    addMealToOrder(mealID: $mealId) {
                        quantity
                    }
                }
            `,
            variables: {
                mealId: meal.data.createMeal.id
            }
        })


        // CREATE BASE MENU
        const result = await testServer.executeOperation({
            query: gql`
                mutation{
                    createBaseMenu{
                        meals {
                            total,
                            perCategory {
                                dessert
                            }
                        }
                    }
                }
            `,
        })


    })
})

// describe('GET ONE USER SUBSCRIPTION', () => {
//     it("Should return the user's subcription", async () => {

//         const { _id } = newUser

//         const result = await testServer.executeOperation({
//             query: gql`
//                 query($user: ID!){
//                     getOneUserSubs(user: $user) {
//                         status
//                         address {
//                             city
//                         }
//                     }
//                 }
//             `,
//             variables: {
//                 user: _id
//             }
//         })

//         console.log('socorro ------------------------>', _id)

//         expect(result.data.getOneUserSubs).toBeTruthy()
//         expect(result.errors).toBeFalsy()
//         expect(result.data.getOneUserSubs.status).toBe('ACTIVED')
//         expect(result.data.getOneUserSubs.address.city).toBe('Madrid')
//     })
// })

// describe('GET MY SUBSCRIPTION', () => {
//     it("Should return the current user's subcription", async () => {

//         const result = await testServer.executeOperation({
//             query: gql`
//                query{ 
//                     getMySubs {
//                         status
//                         address {
//                             city
//                         }
//                     }
//                 }
//             `,
//         })

//         expect(result.data.getOneUserSubs).toBeTruthy()
//         expect(result.errors).toBeFalsy()
//         expect(result.data.getOneUserSubs.status).toBe('ACTIVED')
//         expect(result.data.getOneUserSubs.address.city).toBe('Madrid')
//     })
// })