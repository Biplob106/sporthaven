import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { bearer, jwt } from "better-auth/plugins";
import dns from "dns";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is not set in environment variables");
}

const client = new MongoClient(uri);
const db = client.db(process.env.MONGODB_DB || "sportHavenDB");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
  },
  socialProviders:
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : undefined,
  user: {
    additionalFields: {
      photoURL: {
        type: "string",
        required: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  plugins: [
    jwt({
      jwt: {
        expirationTime: "7d",
        issuer: process.env.BETTER_AUTH_URL || "http://localhost:3000",
        audience: process.env.BETTER_AUTH_URL || "http://localhost:3000",
      },
    }),
    bearer(),
  ],
});
