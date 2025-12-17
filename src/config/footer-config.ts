/**
 * Footer Configuration
 *
 * This file contains all customizable footer settings.
 * Keeping customizations here prevents merge conflicts with template updates.
 */

export interface SocialLink {
  name: string;
  url: string;
  icon: string; // SVG path or identifier
}

export interface FooterLink {
  text: string;
  url: string;
}

export interface FooterConfig {
  socialLinks: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    github?: string;
    linkedin?: string;
    youtube?: string;
  };
  footerLinks: FooterLink[];
  showThemeToggle: boolean;
  copyrightText?: string; // Custom copyright text (optional)
  poweredByText?: string; // Custom "powered by" text (optional)
  showPoweredBy: boolean;
  themeName?: string; // Theme name to display in footer (optional)
}

// CUSTOMIZE YOUR FOOTER HERE
export const footerConfig: FooterConfig = {
  // Social Media Links - Update with your URLs
  socialLinks: {
    twitter: "https://x.com/",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    github: "https://github.com/",
    // linkedin: "https://www.linkedin.com/",
    // youtube: "https://www.youtube.com/",
  },

  // Footer Navigation Links
  footerLinks: [
    { text: "Privacy Policy", url: "/privacy" },
    { text: "Terms & Conditions", url: "/terms" },
    { text: "Get In Touch", url: "/contact" },
  ],

  // Theme Toggle in Footer
  showThemeToggle: true,

  // Custom copyright text (leave undefined to use default)
  copyrightText: undefined,

  // Custom "powered by" text (leave undefined to use default)
  poweredByText:
    "Expertly powered and managed by Weblet Platforms, Default Theme Template",

  // Show/hide the "powered by" section
  showPoweredBy: true,

  // Theme name displayed in footer
  themeName: "Default Theme Template",
};
