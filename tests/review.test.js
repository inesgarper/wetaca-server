import { gql } from "apollo-server"
import mongoose from "mongoose"
import { typeDefs } from "../graphql/typeDefs"
import testServer from "../server"

// jest.useFakeTimers()


// beforeEach(() => {
//     jest.setTimeout(200000);
// });

// describe('CREATE REVIEW', () => {
//     it('Should return the new review', async () => {
//         const result = await server.executeOperation({
//             query: gql`
//                 mutation($reviewData: ReviewInput!){
//                     createReview(reviewData: $reviewData) {
//                         comment
//                         user{
//                             name
//                         }
//                     }
//                 }
//             `,
//             variables: {
//                 reviewData: {
//                     rating: 3.2,
//                     meal: "630d14cef19d5545b990ec85",
//                     comment: "Muy rico",
//                 }
//             }
//         })

//         console.log('k esta pasando ??? ----->', result)
//         expect(result.data.createReview).toBeTruthy()
//     })
// })

describe('GET REVIEWS', () => {
    it('Should return an array of reviews', async () => {
        const result = await testServer.executeOperation({
            query: gql`
                query($mealId: ID!){
                    getReviews(mealID: $mealId) {
                        meal {
                            name
                        }
                        comment
                    }
                }
            `,
            variables: {
                mealId: "630d14cef19d5545b990ec85"
            }
        })

        console.log('k esta pasando ??? ----->', result)
        expect(result.data.getReviews).toBeTruthy()
    })
})


// describe('SOMETHING', () => {
//     it('SOMETHING', async () => {
//         const result = await server.executeOperation({
//             query: gql`
//                 QUERYTYPE {
//                     QUERYNAME(
//                         DATA: {

//                         }
//                     ){
//                         SOMETHING
//                     }
//                 }
//             `
//         })
//         expect(result.data.QUERYNAME).toBeTruthy()
//     })
// })

afterAll(async () => {
    await mongoose.connection.close()
})