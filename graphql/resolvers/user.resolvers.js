import User from './../../models/User.js'

const userResolvers = {

    Query: {
        hello: () => 'Hello'
    },

    Mutation: {
        createUser: (_, args) => {
            const user = new User({ ...args.user })
            return user.save()
        }

    }
}

export default userResolvers

// createUser: (root, args) => {
//     const user = new User({ username: args.username })

//     // podemos hacer un try catch o async await
//     return user.save().catch(error => {
//         throw new UserInputError(error.message, {
//             invalidArgs: args
//         })
//     })
// },