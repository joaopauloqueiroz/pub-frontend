import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { httpInstanceClient } from "../api";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const response = await httpInstanceClient.post(
            "/users/auth",
            credentials
          );
          return response?.data;
        } catch (error) {
          throw error;
        }
      },
      credentials: {
        username: { label: "Usuario", type: "text " },
        password: { label: "Senha", type: "password" },
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          ...user,
        };
      }

      return token;
    },
    async session({ session, token }) {
      return { ...session, ...token };
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});
