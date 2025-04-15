import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import vf from "../assets/vf.png";


const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-amber-50 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="col-span-1 md:col-span-1">
            <h1 className="text-white flex place-items-center font-display text-2xl font-bold">
              <img className="size-5 text-white" src={vf} alt={vf} />
              <span>erdant</span>
            </h1>
            <p className=" mb-4 max-w-xs">
              Bringing nature into your home with high-quality, sustainably
              grown plants.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://instagram.com"
                className="text-amber-50 hover:text-emerald-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                className="text-amber-50 hover:text-emerald-300 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-amber-50 hover:text-emerald-300 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:hello@emerald.com"
                className="text-amber-50 hover:text-emerald-300 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop"
                  className=" hover:text-white transition-colors"
                >
                  All Plants
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/indoor"
                  className=" hover:text-white transition-colors"
                >
                  Indoor Plants
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/outdoor"
                  className=" hover:text-white transition-colors"
                >
                  Outdoor Plants
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/rare"
                  className=" hover:text-white transition-colors"
                >
                  Rare Finds
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/planters"
                  className=" hover:text-white transition-colors"
                >
                  Planters
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/accessories"
                  className=" hover:text-white transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/care-guides"
                  className=" hover:text-white transition-colors"
                >
                  Plant Care
                </Link>
              </li>
              <li>
                <Link to="/faq" className=" hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className=" hover:text-white transition-colors"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className=" hover:text-white transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className=" hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className=" hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className=" hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className=" hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/sustainability"
                  className=" hover:text-white transition-colors"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className=" hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className=" hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="mt-10 pb-10 border-b border-emerald-600">
          <div className="max-w-md mx-auto md:mx-0">
            <h3 className="text-lg font-semibold mb-2">Join our newsletter</h3>
            <p className=" mb-4">Get plant care tips and exclusive offers</p>
            <div className="flex text-black">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 w-full placeholder:text-black bg-white rounded-l-md text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="bg-orange-300 hover:bg-yellow-600  font-semibold py-2 px-4 rounded-r-md transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center md:text-left  text-sm">
          <p>© {new Date().getFullYear()} Verdant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
