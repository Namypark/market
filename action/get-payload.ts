// "use client";
//get-payload

/**
 * This file defines a function to initialize and return a Payload CMS client.
 *  It manages a cached instance of the Payload client to avoid revitalizing it multiple times.
 * 	@dotenv config: Loads environment variables from the .env file using dotenv to access secrets like PAYLOAD_SECRET.
	•	Caching logic:
	•	@cached.client: Stores the initialized Payload client if it exists, to prevent redundant initializations.
	•	cached.promise: Stores the promise of the Payload initialization, ensuring it only runs once during the process.
	•	getPayLoadClient function:
	•	First, it checks if the required PAYLOAD_SECRET is available in environment variables.
	•	If a client has already been initialized and cached, it returns that instance.
	•	Otherwise, it attempts to initialize the Payload CMS client using payload.init().
	•	If the initialization is successful, it returns the client and caches it; if it fails, the promise is cleared, and the error is thrown.
 */
import { Args } from "@/types";
import dotenv from "dotenv";
import path from "path";
import payload, { Payload } from "payload";
import nodemailer from "nodemailer";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 465, // Correct port for secure SMTP
  secure: true,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

let cached = (global as any).payload;
if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

export const getPayLoadClient = async ({
  initOptions,
}: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET IS MISSING");
  }
  if (cached.client) {
    return cached.client;
  }
  if (!cached.promise) {
    cached.promise = payload.init({
      email: {
        transport: transporter,
        fromAddress: "onboarding@resend.dev",
        fromName: "Hippo",
      },
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (e: unknown) {
    cached.promise = null;
    console.log("Error here");
    throw e;
  }
  return cached.client;
};
