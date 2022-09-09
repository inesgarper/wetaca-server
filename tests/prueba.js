import { gql } from "apollo-server"
import testServer from "../server"

import request from 'supertest'

console.log('que hay aquí ---->', testServer())

// describe('SIGNUP', () => {

//     let server, url

//     beforeAll(async () => {
//         ({ server, url } = await testServer({ port: 0 }));
//     });

//     afterAll(async () => {
//         await server?.close();
//     });

//     it('Creates user when providing correct data', async () => {

//         const result = await request(url)
//             .post('/')
//             .send({
//                 query: gql`
//                 mutation($userData: UserInput){
//                     createUser(userData: $userData) {
//                         name
//                         id
//                     }
//                 }
//             `,
//                 variables: {
//                     userData: {
//                         name: "SignUp",
//                         lastName: "Test",
//                         email: "signuptest@gmail.com",
//                         password: "password1",
//                         phoneNumber: 123123123,
//                         birthDate: "1997/04/14",
//                     }
//                 }
//             });

//         expect(result.body.data?.createUser).toBeTruthy()
//         expect(result.body.errors).toBeFalsy()
//         expect(result.body.data?.createUser.name).toBe('SignUp')

//     })
// })