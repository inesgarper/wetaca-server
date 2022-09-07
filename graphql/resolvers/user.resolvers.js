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

            const { userData } = args

            // EMPTY FIELDS VALIDATION

            for (const input in userData) {
                if (userData[input] === '') throw new UserInputError('Provide all inputs')
            }

            // EMAIL VALIDATION

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
            if (!emailRegex.test(userData.email)) {
                throw new UserInputError('Provide valid email address')
            }


            // CHECK DUPLICATED USERS

            const { email } = userData
            const foundUser = await User.findOne({ email })

            if (foundUser) {
                throw new UserInputError('Email already registered')
            }

            const { password } = userData

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            const user = new User({ ...userData, password: hashedPassword })
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

            // EMPTY FIELDS VALIDATION

            if (email === '' || password === '') {
                throw new UserInputError('Provide email and password')
            }

            const foundUser = await User.findOne({ email })

            if (!foundUser) {
                throw new UserInputError('User not found')
            }

            if (bcrypt.compareSync(password, foundUser.password)) {
                const { name, lastName, email, _id } = foundUser
                const payload = { name, lastName, email, _id }

                const authToken = jwt.sign(
                    payload,
                    'ginesecret',
                    { algorithm: 'HS256', expiresIn: '6h' }
                )

                return {
                    value: authToken
                }
            } else {
                throw new UserInputError('Wrong credentials')
            }
        }

    }
}

export default userResolvers