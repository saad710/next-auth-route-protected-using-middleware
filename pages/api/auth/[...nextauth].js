// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import clientPromise from "../../../src/lib/mongodb";
import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        name: {
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
        },
        // remember: {
        //   label: "Remember",
        //   type: "boolean",
        //   placeholder: "Remember",
        // },
        id: {
          label: "Id",
          type: "text",
          placeholder: "Id",
        },
      },
      async authorize(credentials, req) {
        console.log("testcre",credentials)
        // Add logic here to look up the user from the credentials supplied
        const user = { id: credentials.id, name: credentials.username, email: credentials.email }
        console.log(user)
  
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  jwt: {
    secret: process.env.SECRET,
  },
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    // jwt: true,
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // // Seconds - Throttle how frequently to write to database to extend a session.
    // // Use it to limit write operations. Set to 0 to always update the database.
    // // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async redirect(url, baseUrl) {
      // console.log("REDIRECT", url, baseUrl);
      return baseUrl;
    },
    jwt: async ({ token, user, account, profile, isNewUser }) => {

      console.log('### JWT CALLBACK ###')
      console.log('token: ', token)
      console.log('account: ', account)

      return token;
    },
  
    session: async ({ session, token, user }) => {
      // console.log('### SESSION CALLBACK ###')
      // console.log('session: ', session)
      // console.log('user: ', token)
      console.log('user: ', user)
      if(token){
        session.user.id = token.sub;
      }
      console.log("sss",session)

      return session;
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
    callbacks: {
        redirect: async (url, baseUrl) => {
          return Promise.resolve(url)
        }
      }
  }
})