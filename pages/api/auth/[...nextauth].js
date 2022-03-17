import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { ConnectDB } from "../../../config/connectDB";
import { authGoogle } from "../../../config/authGoogle";

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
          throw new Error(
            JSON.stringify({
              message: "Email has not been registered.",
              type: "email",
            })
          );
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
          throw new Error(
            JSON.stringify({ message: "Incorrect password.", type: "password" })
          );
        }
        //Else send success response
        client.close();
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          isModerator: user.isModerator,
          isAdmin: user.isAdmin,
          NGOname: user.NGOname,
        };
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
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.user = user;
      }
      if (account?.provider === "google") {
        token.provider = "google";
        token.user = await authGoogle(user);
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
        session.user = token.user;
      }

      if (session) {
        session.user.username = session.user?.name
          .split(" ")
          .join("")
          .toLocaleLowerCase();
        session.user.uid = token.sub;
      }

      console.log("Supplying", session);
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
