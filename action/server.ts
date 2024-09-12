//server.ts

/**
 * This file sets up an Express server and initializes the Payload CMS.

	•	Express setup: Uses the express framework to create a basic server.
	•	@getPayLoadClient call:
	•	Calls the getPayLoadClient function to initialize the Payload CMS, passing options like attaching the Express app instance to the Payload configuration.
	•	The onInit callback logs the admin URL once the CMS is initialized.
	•	Start server: Starts the Express server on the PORT specified in the environment or defaults to 3000.

 */
import { InitOptions } from "payload/config";
import payload from "payload";
import { getPayLoadClient } from "./get-payload";
import { nextApp, nextHandler } from "../next-utils";
import { Request, Response } from "express";

const express = require("express");
require("dotenv").config();
const app = express();

const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  const payload = await getPayLoadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });
  app.use((req: Request, res: Response) => nextHandler(req, res));
  nextApp.prepare().then(() => {
    payload.logger.info("Next.js started");

    app.listen(PORT, async () => {
      payload.logger.info(`Next js App URL: ${process.env.NEXT_PUBLIC_URL}`);
    });
  });
};

start();
