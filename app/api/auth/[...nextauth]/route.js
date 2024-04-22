import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import User from '@models/user'
import { connectToDB } from "@utils/database";

/**
 * This is a NextAuth configuration object that sets up authentication using Google as the provider.
 * It also includes callbacks for handling session and sign-in events.
 */
const handler = NextAuth({
    /**
     * The providers array contains the list of authentication providers that NextAuth supports.
     * In this case, we're only using Google as the provider.
     */
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    /**
     * The callbacks object contains functions that are called at various points during the authentication process.
     * In this case, we have two callbacks: session and signIn.
     */
    callbacks: {
        /**
         * The session callback is called whenever a new session is created or updated.
         * It receives the session object as a parameter and can modify it as needed.
         * In this case, we're adding the user's ID to the session object.
         */
        async session({session}) {
            const sessionUser = await User.findOne({email: session.user.email})
            session.user.id = sessionUser._id.toString()
            return session
        },
        /**
         * The signIn callback is called whenever a user attempts to sign in.
         * It receives the profile object as a parameter and can perform any necessary checks or actions before allowing the user to sign in.
         * In this case, we're checking if the user already exists in the database, and if not, creating a new user record.
         */
        async signIn({ profile }){
            try {
                await connectToDB();
                
                const userExists = await User.findOne({
                    email: profile.email
                })
    
                if(!userExists){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture      
                    })
                }
    
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }
})

export { handler as GET, handler as POST }