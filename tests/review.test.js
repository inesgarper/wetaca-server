import { gql } from "apollo-server"
import { typeDefs } from "../graphql/typeDefs"
import server from "../server"


// describe('CREATE REVIEW', () => {
//     it('Should return the new review', async () => {
//         // const result = await server.executeOperation({
//         //     query: gql`
//         //         mutation($reviewData: ReviewInput){
//         //             createReview(reviewData: $reviewData) {
//         //                 comment
//         //                 user
//         //             }
//         //         }
//         //     `,
//         //     variables: {
//         //         reviewData: {
//         //             rating: 3,
//         //             // meal: ,
//         //             // comment: ,
//         //         }
//         //     }
//         // })

//         console.log('Prueba de contexto ---------------------------------------->', server.context())
//         // expect(result.data.QUERYNAME).toBeTruthy()
//     })
// })






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