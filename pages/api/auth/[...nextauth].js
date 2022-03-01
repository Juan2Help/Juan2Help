import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { ConnectDB } from "../../../config/connectDB";

export default NextAuth({
  //Configure JWT
  session: {
    strategy: "jwt",
    jwt: true,
  },
  //Specify Provider
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        //Connect to DB
        const client = await ConnectDB();
        //Get all the users
        const users = await client.db("juan2help").collection("users");
        //Find user with the email

        const user = await users.findOne({
          email: credentials.email,
        });

        console.log(user);

        //Not found - send error res
        if (!user) {
          client.close();
          throw new Error("No user found with the email");
        }
        //Check hashed password with DB password
        console.log(`Comparing ${credentials.password} ${user.password}`);
        const checkPassword = await compare(
          credentials.password,
          user.password
        );
        //Incorrect password - send response
        if (!checkPassword) {
          client.close();
          throw new Error("Password doesnt match");
        }
        //Else send success response
        client.close();
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) token.id = user.id;

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
      }

      if (session) {
        session.user.username = session.user.name
          .split(" ")
          .join("")
          .toLocaleLowerCase();
        session.user.uid = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  },
  database: process.env.MONGODB_URI,
});
