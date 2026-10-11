import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const API_BASE = process.env.REACT_APP_API_URL || "/api";

const SHELF_SIZE = 30;

const CATEGORIES = [
  { name: "Fiction", value: "Fiction" },
  { name: "Non-fiction", value: "Non-Fiction" },
  { name: "Mystery", value: "Mystery" },
  { name: "Romance", value: "Romance" },
  { name: "Science fiction", value: "Sci-fi" },
  { name: "Fantasy", value: "Fantasy" },
  { name: "Biography", value: "Biography" },
  { name: "History", value: "History" },
  { name: "Science", value: "Science" },
  { name: "Technology", value: "Technology" },
  { name: "Business", value: "Business" },
  { name: "Self-help", value: "Self-help" },
];

const SELLING_STEPS = [
  {
    title: "List your copy",
    body: "Add a photo, the price you want, and an honest note on its condition.",
  },
  {
    title: "A reader books it",
    body: "You get the buyer's details and agree on pickup or delivery.",
  },
  {
    title: "Hand it over",
    body: "Once it's in their hands, the sale is closed and the book has a new shelf.",
  },
];

const SPINE_COLORS = [
  "bg-spine-oxblood",
  "bg-spine-ochre",
  "bg-spine-navy",
  "bg-spine-green",
  "bg-spine-slate",
  "bg-spine-plum",
];

// Stable per-book number, so each spine keeps its look between renders.
const hashOf = (value) => {
  const text = String(value);
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
};

const bookId = (book) => book._id || book.id;
const authorOf = (book) => book.authors || book.author || "Unknown author";
const formatPrice = (value) => {
  const number = parseFloat(value);
  return Number.isFinite(number) ? `$${number.toFixed(2)}` : null;
};

const Spine = ({ book, index, onFocusBook }) => {
  const hash = hashOf(bookId(book) || book.title);
  const width = 36 + (hash % 26);
  const height = 78 + ((hash >> 3) % 22);
  const color = SPINE_COLORS[(hash >> 5) % SPINE_COLORS.length];
  const banded = (hash >> 7) % 3 === 0;

  return (
    <Link
      to={`/books/${bookId(book)}`}
      onMouseEnter={() => onFocusBook(book)}
      onFocus={() => onFocusBook(book)}
      aria-label={`${book.title} by ${authorOf(book)}`}
      className={`spine relative flex shrink-0 items-center justify-center overflow-hidden rounded-t-[3px] px-1 py-4 text-paper ${color}`}
      style={{
        width: `${width}px`,
        height: `${height}%`,
        animationDelay: `${index * 35}ms`,
      }}
    >
      {banded && (
        <>
          <span className="absolute inset-x-0 top-3 h-px bg-paper/40" />
          <span className="absolute inset-x-0 top-[18px] h-px bg-paper/40" />
          <span className="absolute inset-x-0 bottom-3 h-px bg-paper/40" />
        </>
      )}
      <span className="max-h-full overflow-hidden text-ellipsis whitespace-nowrap font-spine text-[15px] font-semibold uppercase leading-none tracking-wide">
        {book.title}
      </span>
    </Link>
  );
};

const Shelf = ({ books, loading }) => {
  const [focused, setFocused] = useState(null);

  const caption = focused
    ? [focused.title, authorOf(focused), formatPrice(focused.price)]
        .filter(Boolean)
        .join(", ")
    : null;

  return (
    <div onMouseLeave={() => setFocused(null)}>
      <div className="overflow-x-auto overflow-y-hidden pt-6">
        <div className="flex h-60 min-w-max items-end gap-[3px] px-4 sm:h-72 sm:px-6 lg:px-8">
          {loading
            ? Array.from({ length: 22 }).map((_, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="block shrink-0 rounded-t-[3px] bg-rule"
                  style={{
                    width: `${36 + ((i * 7) % 24)}px`,
                    height: `${78 + ((i * 11) % 22)}%`,
                  }}
                />
              ))
            : books.map((book, index) => (
                <Spine
                  key={bookId(book) || index}
                  book={book}
                  index={index}
                  onFocusBook={setFocused}
                />
              ))}
        </div>
      </div>
      {/* Plank */}
      <div className="h-3 border-t border-[#5b4632] bg-[#7a5f44] shadow-[0_6px_0_#5b4632]" />
      <p
        aria-live="polite"
        className="mx-auto mt-6 max-w-6xl px-4 text-base text-ink-soft sm:px-6 lg:px-8"
      >
        {caption ? (
          <span className="text-ink">{caption}</span>
        ) : loading ? (
          "Stocking the shelf…"
        ) : books.length ? (
          "Pick a spine to read it. Every copy here was listed by a reader."
        ) : (
          "The shelf is empty right now. Browse the full catalogue instead."
        )}
      </p>
    </div>
  );
};

const ListingCover = ({ book }) => {
  const [failed, setFailed] = useState(false);
  const hash = hashOf(bookId(book) || book.title);

  if (book.image_url && !failed) {
    return (
      <img
        src={book.image_url}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full items-end p-4 text-paper ${
        SPINE_COLORS[hash % SPINE_COLORS.length]
      }`}
    >
      <span className="font-spine text-xl font-semibold uppercase leading-tight">
        {book.title}
      </span>
    </div>
  );
};

const Listing = ({ book }) => {
  const price = formatPrice(book.price);
  const oldPrice = formatPrice(book.old_price);

  return (
    <Link to={`/books/${bookId(book)}`} className="group block">
      <div className="aspect-[2/3] overflow-hidden rounded-sm bg-paper-deep ring-1 ring-ink/10 transition-transform duration-200 group-hover:-translate-y-1">
        <ListingCover book={book} />
      </div>
      <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug text-ink group-hover:underline">
        {book.title}
      </h3>
      <p className="mt-0.5 line-clamp-1 text-sm text-ink-soft">
        {authorOf(book)}
      </p>
      <p className="mt-2 flex items-baseline gap-2 text-sm">
        {price && <span className="font-semibold text-stamp">{price}</span>}
        {oldPrice && oldPrice !== price && (
          <span className="text-ink-faint line-through">{oldPrice} new</span>
        )}
      </p>
      {book.condition && (
        <p className="mt-1 text-sm italic text-ink-soft">{book.condition}</p>
      )}
    </Link>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_BASE}/books`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.books || data?.data;
        setBooks((list || []).filter((book) => book && book.title));
        setLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        setFailed(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const shelfBooks = useMemo(() => books.slice(0, SHELF_SIZE), [books]);
  const recentBooks = useMemo(() => books.slice(-8).reverse(), [books]);

  const handleSearch = (event) => {
    event.preventDefault();
    const term = query.trim();
    navigate(term ? `/books?search=${encodeURIComponent(term)}` : "/books");
  };

  return (
    <main className="bg-paper text-ink">
      {/* Hero: the shelf */}
      <section className="pt-14 sm:pt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="max-w-3xl text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.015em] sm:text-6xl">
            Buy the books other readers have finished.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Every copy on Bookify is listed by the person who owns it, with its
            condition stated up front. When you're done, sell it on.
          </p>

          <form
            onSubmit={handleSearch}
            role="search"
            className="mt-8 flex max-w-xl items-stretch rounded-md border border-ink/25 bg-white/70 focus-within:border-stamp focus-within:ring-1 focus-within:ring-stamp"
          >
            <label htmlFor="home-search" className="sr-only">
              Search by title, author, or ISBN
            </label>
            <FiSearch
              aria-hidden="true"
              className="ml-4 h-5 w-5 self-center text-ink-faint"
            />
            <input
              id="home-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Title, author, or ISBN"
              className="min-w-0 flex-1 border-0 bg-transparent px-3 py-3.5 text-base text-ink placeholder:text-ink-faint focus:ring-0"
            />
            <button
              type="submit"
              className="m-1.5 rounded bg-cloth px-5 text-sm font-semibold text-paper transition-colors hover:bg-cloth-dark"
            >
              Search
            </button>
          </form>
        </div>

        <div className="mx-auto mt-14 max-w-[1400px]">
          <Shelf books={shelfBooks} loading={loading} />
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule pb-4">
          <h2 className="text-3xl font-semibold tracking-[-0.01em]">
            Browse by shelf
          </h2>
          <Link
            to="/categories"
            className="text-sm font-semibold text-cloth underline-offset-4 hover:underline"
          >
            All categories
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-x-8 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <li key={category.value} className="border-b border-rule">
              <button
                type="button"
                onClick={() =>
                  navigate("/books", {
                    state: { selectedCategory: category.value },
                  })
                }
                className="w-full py-4 text-left text-lg text-ink transition-colors hover:text-cloth"
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Recently listed */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule pb-4">
          <h2 className="text-3xl font-semibold tracking-[-0.01em]">
            Recently listed
          </h2>
          <Link
            to="/books"
            className="text-sm font-semibold text-cloth underline-offset-4 hover:underline"
          >
            See every listing
          </Link>
        </div>

        {failed ? (
          <p className="mt-8 max-w-xl text-ink-soft">
            Listings couldn't be loaded. Check your connection and reload the
            page, or{" "}
            <Link to="/books" className="text-cloth underline">
              open the catalogue
            </Link>
            .
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} aria-hidden="true">
                    <div className="aspect-[2/3] rounded-sm bg-rule/60" />
                    <div className="mt-3 h-4 w-3/4 rounded bg-rule/60" />
                    <div className="mt-2 h-3 w-1/2 rounded bg-rule/60" />
                  </div>
                ))
              : recentBooks.map((book, index) => (
                  <Listing key={bookId(book) || index} book={book} />
                ))}
          </div>
        )}
      </section>

      {/* Selling */}
      <section className="mt-28 bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_2fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.01em]">
              Got a shelf that's full?
            </h2>
            <p className="mt-4 max-w-sm leading-relaxed text-paper/75">
              Selling a book takes a few minutes. You set the price; buyers come
              to you.
            </p>
            <Link
              to="/dashboard/addaproduct"
              className="mt-8 inline-block rounded bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white"
            >
              List a book
            </Link>
          </div>
          <ol className="grid gap-10 sm:grid-cols-3">
            {SELLING_STEPS.map((step, index) => (
              <li key={step.title} className="border-t border-paper/25 pt-5">
                <span className="font-spine text-4xl font-extrabold text-spine-ochre">
                  {index + 1}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/75">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
};

export default Home;
