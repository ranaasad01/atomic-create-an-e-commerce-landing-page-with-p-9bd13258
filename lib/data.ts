export const APP_NAME = "Amazon";
export const APP_TAGLINE = "Curated for the discerning eye.";
export const APP_EMAIL = "hello@lumiere.shop";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products" },
  { label: "Categories", href: "#categories" },
  { label: "Sale", href: "#sale" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const navCTA = {
  label: "Shop Now",
  href: "#products",
};

export const footerLinks = {
  shop: [
    { label: "New Arrivals", href: "#products" },
    { label: "Best Sellers", href: "#products" },
    { label: "Sale Items", href: "#sale" },
    { label: "All Products", href: "#products" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#about" },
    { label: "Press", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  support: [
    { label: "FAQ", href: "#contact" },
    { label: "Shipping Policy", href: "#contact" },
    { label: "Returns", href: "#contact" },
    { label: "Track Order", href: "#contact" },
  ],
};