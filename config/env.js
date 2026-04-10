import { config } from "dotenv";
config(options, {
  path: `.env.${process.env.NODE_END || "development"}.local`,
});

export const { PORT } = process.env;
