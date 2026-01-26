import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { helloWorld } from "../../../inngest/functions";
import { syncIndexes } from "mongoose";
import { synUserCreation, syncUserUpdate, syncUserDeletion } from "../../../config/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdate,
    syncUserDeletion
  ],
});