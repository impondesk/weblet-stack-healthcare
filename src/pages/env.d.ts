/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    title: string;
    user: {
      name: string;
    };
    host: string;
    path: string;
    base: string;
    tenant: any;
    theme: string;
    welcomeTitle: () => string;
    orders: Map<string, object>;
  }
}
