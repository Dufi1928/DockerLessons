import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from 'axios';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            try {
                const passkey = process.env.DJANGO_SECRET_KEY;
                const response = await axios.post('process.env.USERS_ENDPOINT/api/auth/checkIfUserExist', {
                    email: email || user.email,
                    firstName: profile?.given_name || user?.name?.split(" ")[0], // Ajoute le prénom
                    lastName: profile?.family_name || user?.name?.split(" ").slice(1).join(" "),
                    smallSizeAvatar: profile?.image || user?.image,
                    passkey
                });
                if (response.status === 200 && response.data.jwt) {
                    user.jwt = response.data.jwt; // Stocke le JWT dans l'objet utilisateur
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error("Erreur lors de la connexion :", error);
                return false;
            }
        },
        async session({ session, user, token }) {
            if (token.jwt) {
                session.user.jwt = token.jwt; // Ajoute le JWT à la session
            }
            return session;
        },
        async jwt({ token, user, account }) {
            if (user?.jwt) {
                token.jwt = user.jwt;
            }
            return token;
        }
    },
});
