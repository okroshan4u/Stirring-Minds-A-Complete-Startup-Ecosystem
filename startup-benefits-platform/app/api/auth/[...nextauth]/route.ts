import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"

interface BackendUser {
  _id: string
  name: string
  email: string
  isVerified: boolean
  isPremium: boolean
  token: string
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null

        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })

        const data = await res.json()

        if (!res.ok || !data.token) return null

        // NextAuth user object
        return {
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          token: data.token,
          isVerified: data.user.isVerified,
          isPremium: data.user.isPremium,
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.token = (user as any).token
        token.isVerified = (user as any).isVerified
        token.isPremium = (user as any).isPremium
      }
      return token
    },

    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.token = token.token as string
      session.user.isVerified = token.isVerified as boolean
      session.user.isPremium = token.isPremium as boolean
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
