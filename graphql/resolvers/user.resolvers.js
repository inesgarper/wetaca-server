import User from './../../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { UserInputError } from 'apollo-server'

const saltRounds = 10


const userResolvers = {

    Query: {
        getCurrentUser: (_, args, context) => context.currentUser,

        getAllUsers: async () => {
            const users = await User.find()
            return users
        },
    },

    Mutation: {
        createUser: async (_, args) => {

            // checkear que no exista
            const { email } = args.user
            const foundUser = await User.findOne({ email })

            if (foundUser) {
                throw new UserInputError('Email already registered')
            }

            const { password } = args.user

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            const user = new User({ ...args.user, password: hashedPassword })
            return user.save()
        },

        deleteUser: async (_, { id }) => {
            await User.findByIdAndDelete(id)
            return 'User deleted'
        },

        updateUser: async (_, { id, user }) => {
            const updatedUser = await User.findByIdAndUpdate(id, {
                $set: user
            }, { new: true })
            return updatedUser
        },

        login: async (_, args) => {

            const { email, password } = args

            const foundUser = await User.findOne({ email })

            if (bcrypt.compareSync(password, foundUser.password)) {
                const { name, lastName, email, _id } = foundUser
                const payload = { name, lastName, email, _id }

                console.log('el pauload', payload)

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: '6h' }
                )

                return {
                    value: authToken
                }
            }
        }

    }
}

export default userResolvers