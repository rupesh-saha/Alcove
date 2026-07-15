import dns from "node:dns";
dns.setServers(['8.8.8.8', '8.8.4.4']);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.ALCOVE_DB_URL!);
const db = client.db("alcovedb");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "guest"
      }
    }
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (!user.emailVerified && !user.password) {
             return {
               data: {
                 ...user,
                 role: "host"
               }
             }
          }
          return { data: user };
        }
      }
    }
  }
});