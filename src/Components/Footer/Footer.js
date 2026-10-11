import React from "react";
import { Link } from "react-router-dom";

const columns = [
  {
    heading: "Shop",
    links: [
      { name: "All books", path: "/books" },
      { name: "Categories", path: "/categories" },
      { name: "Membership", path: "/subscription" },
    ],
  },
  {
    heading: "Sell",
    links: [
      { name: "List a book", path: "/dashboard/addaproduct" },
      { name: "My listings", path: "/dashboard/myproducts" },
      { name: "Dashboard", path: "/dashboard" },
    ],
  },
  {
    heading: "Company",
    links: [
      { name: "About", path: "/about" },
      { name: "Blog", path: "/blogs" },
      { name: "Contact", path: "/contact" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-rule bg-paper-deep text-ink">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-12 px-4 py-16 sm:grid-cols-3 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div className="col-span-full md:col-span-1">
          <Link
            to="/"
            className="font-spine text-4xl font-extrabold uppercase leading-none tracking-wide"
          >
            Bookify
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            A marketplace for secondhand books, run by the readers who list
            them.
          </p>
        </div>

        {columns.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h2 className="text-sm font-semibold text-ink-soft">
              {column.heading}
            </h2>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[15px] text-ink underline-offset-4 hover:text-cloth hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-rule">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-ink-faint sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Bookify
        </p>
      </div>
    </footer>
  );
};

export default Footer;
