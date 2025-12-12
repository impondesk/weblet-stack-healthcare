// import { auth } from "./auth";
// import { validate } from "./validate";
import { tenant } from "./tenant";
import { sequence } from "astro:middleware";

export const onRequest = sequence(tenant);
