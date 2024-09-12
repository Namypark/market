//next-utils.ts
/**
 * This file sets up the Next.js application server.

	•	nextApp:
	•	Initializes the Next.js app using the next() function, which takes an options object:
	•	@dev : Checks if the app is in development mode based on NODE_ENV.
	•	@port : Sets the port to the value from the environment variables or defaults to 3000.
	•	@nextHandler :
	•	This is the default request handler for the Next.js app, used to handle all incoming HTTP requests.
 */

import next from "next";

const PORT = Number(process.env.PORT) || 3000;

export const nextApp = next({
  dev: process.env.NODE_ENV !== "production",
  port: PORT,
});

export const nextHandler = nextApp.getRequestHandler();

// "dev": "cross-env PAYLOAD_CONFIG_PATH=s/payload.config.ts nodemon",
