import { config } from "dotenv";
config(options, {
  path: process.env,
});

export const { PORT } = process.env;
