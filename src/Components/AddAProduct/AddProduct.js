import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-hot-toast";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

const initialState = {
  book_id: "",
  goodreads_book_id: "",
  best_book_id: "",
  work_id: "",
  books_count: "",
  isbn: "",
  isbn13: "",
  // authors will be an array of up to 3 names
  authors: [""],
  original_publication_year: "",
  original_title: "",
  title: "",
  language_code: "",
  average_rating: "",
  ratings_count: "",
  work_ratings_count: "",
  work_text_reviews_count: "",
  ratings_1: "",
  ratings_2: "",
  ratings_3: "",
  ratings_4: "",
  ratings_5: "",
  image_url: "",
  small_image_url: "",
  category: "",
  price: "",
  rating: "",
  stock: "",
  publisher: "",
  published_year: "",
};

const AddProduct = () => {
  const { token } = useAuth();
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    "All",
    "History",
    "Technology",
    "Fiction",
    "Science",
    "Fantasy",
    "War",
    "Love",
    "Medicine",
    "Art",
    "Craft",
    "Self help",
  ];

  const languages = ["ENG", "BN", "SPA", "HIN", "CHI", "ARA"];

  const setField = (name, value) => setForm((s) => ({ ...s, [name]: value }));

  // Only allow sellers
  // if (!user || user?.role !== 'seller') {
  //   return (
  //     <div className="p-8 max-w-3xl mx-auto">
  //       <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
  //       <p className="text-gray-600">You must be a seller to add products.</p>
  //     </div>
  //   );
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const updateAuthor = (index, value) => {
    setForm((s) => {
      const authors = [...s.authors];
      authors[index] = value;
      return { ...s, authors };
    });
  };

  const addAuthor = () => {
    setForm((s) => {
      if (s.authors.length >= 3) return s;
      return { ...s, authors: [...s.authors, ""] };
    });
  };

  const removeAuthor = (index) => {
    setForm((s) => {
      if (s.authors.length <= 1) return s;
      const authors = s.authors.filter((_, i) => i !== index);
      return { ...s, authors };
    });
  };

  const validate = () => {
    // basic validation: required fields
    const required = ["title", "original_title", "isbn", "original_publication_year", "average_rating", "price", "publisher", "category"];
    for (const key of required) {
      if (!form[key] || String(form[key]).trim() === "") return `Field ${key} is required`;
    }

    // authors: at least one, max 3, no empty entries
    if (!Array.isArray(form.authors) || form.authors.length === 0) return "At least one author is required";
    if (form.authors.length > 3) return "You can add at most 3 authors";
    for (const a of form.authors) {
      if (!a || String(a).trim() === "") return "Please fill all author fields or remove empty ones";
    }

    // publication year basic check (optional but if provided must be a number)
  if (isNaN(Number(form.original_publication_year))) return "Publication year must be a number";

    // price must be a positive number
    if (form.price === "" || isNaN(Number(form.price)) || Number(form.price) < 0) return "Price must be a valid positive number";

    // average rating must be between 0 and 5
    const ar = Number(form.average_rating);
    if (isNaN(ar) || ar < 0 || ar > 5) return "Average rating must be between 0 and 5";

    // stock between 0 and 100
    if (form.stock === "" || isNaN(Number(form.stock))) return "Stock must be a number between 0 and 100";
    const s = Number(form.stock);
    if (s < 0 || s > 100) return "Stock must be between 0 and 100";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return toast.error(err);

    // prepare payload: convert numeric fields and normalize authors -> string
    const payload = { ...form };
    // authors array -> comma separated string
    if (Array.isArray(payload.authors)) {
      payload.authors = payload.authors.filter(Boolean).map((a) => String(a).trim()).join(', ');
    }
    const numericKeys = [
      "book_id",
      "goodreads_book_id",
      "best_book_id",
      "work_id",
      "books_count",
      "isbn13",
      "original_publication_year",
      "average_rating",
      "ratings_count",
      "work_ratings_count",
      "work_text_reviews_count",
      "ratings_1",
      "ratings_2",
      "ratings_3",
      "ratings_4",
      "ratings_5",
      "price",
      "rating",
      "stock",
      "published_year",
    ];
    numericKeys.forEach((k) => {
      if (payload[k] !== undefined && payload[k] !== "") {
        const n = Number(payload[k]);
        payload[k] = Number.isNaN(n) ? payload[k] : n;
      }
    });

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || "Failed to create book");
      }

      await res.json();
      toast.success("Book uploaded successfully");
      setForm(initialState);
    } catch (err) {
      console.error("Upload error", err);
      toast.error(err.message || "Upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* <label className="block text-sm">
              <span className="text-gray-700">Book ID</span>
              <input name="book_id" value={form.book_id} onChange={handleChange} className="mt-1 block w-full rounded border px-2 py-1" />
            </label> */}
          <label className="block text-sm">
            <span className="text-gray-700">Title</span>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label>

          <label className="block text-sm">
            <span className="text-gray-700">Original Title</span>
            <input
              name="original_title"
              value={form.original_title}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label>

          {/* <label className="block text-sm">
            <span className="text-gray-700">Goodreads Book ID</span>
            <input
              name="goodreads_book_id"
              value={form.goodreads_book_id}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label> */}

          {/* <label className="block text-sm">
            <span className="text-gray-700">Best Book ID</span>
            <input
              name="best_book_id"
              value={form.best_book_id}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label> */}

          {/* <label className="block text-sm">
            <span className="text-gray-700">Work ID</span>
            <input
              name="work_id"
              value={form.work_id}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label> */}

          {/* <label className="block text-sm">
            <span className="text-gray-700">Books Count</span>
            <input
              name="books_count"
              value={form.books_count}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label> */}

          <label className="block text-sm">
            <span className="text-gray-700">ISBN</span>
            <input
              name="isbn"
              value={form.isbn}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label>

          {/* <label className="block text-sm">
            <span className="text-gray-700">ISBN13</span>
            <input
              name="isbn13"
              value={form.isbn13}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label> */}

          <label className="block text-sm">
            <span className="text-gray-700">Authors</span>
            <div className="space-y-2">
              {form.authors.map((a, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    value={a}
                    onChange={(e) => updateAuthor(idx, e.target.value)}
                    className="mt-1 block w-full rounded border px-2 py-1"
                    placeholder={`Author ${idx + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeAuthor(idx)}
                    className="text-red-500 px-2 py-1 rounded bg-red-50 hover:bg-red-100 flex items-center gap-1"
                    aria-label={`Remove author ${idx + 1}`}
                    disabled={form.authors.length <= 1}
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </button>
                </div>
              ))}
              <div>
                <button
                  type="button"
                  onClick={addAuthor}
                  className="mt-1 inline-flex items-center gap-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                  disabled={form.authors.length >= 3}
                >
                  <PlusIcon className="h-4 w-4" />
                  <span>Add Author</span>
                </button>
                <p className="text-xs text-gray-500 mt-1">You can add up to 3 authors.</p>
              </div>
            </div>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="block text-sm">
            <span className="text-gray-700">Original Publication Year</span>
            <input
              name="original_publication_year"
              value={form.original_publication_year}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label>

          

          <label className="block text-sm">
            <span className="text-gray-700">Language Code</span>
            <div className="mt-1">
              <Listbox value={form.language_code} onChange={(val) => setField('language_code', val)}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded border bg-white py-2 pl-3 pr-10 text-left">
                    <span className="block truncate">{form.language_code || 'Select language'}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg">
                    {languages.map((l) => (
                      <Listbox.Option key={l} value={l} className={({ active }) => `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'bg-indigo-100' : ''}`}>
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{l}</span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                <CheckIcon className="h-5 w-5" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </label>

          <label className="block text-sm">
            <span className="text-gray-700">Average Rating</span>
            <input
              name="average_rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={form.average_rating}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label>

          {/* <label className="block text-sm">
            <span className="text-gray-700">Ratings Count</span>
            <input
              name="ratings_count"
              value={form.ratings_count}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label> */}
        </div>

        {/* <div className="grid grid-cols-2 gap-4">
          <label className="block text-sm">
            <span className="text-gray-700">Work Ratings Count</span>
            <input
              name="work_ratings_count"
              value={form.work_ratings_count}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label>

          <label className="block text-sm">
            <span className="text-gray-700">Work Text Reviews Count</span>
            <input
              name="work_text_reviews_count"
              value={form.work_text_reviews_count}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label>

          <label className="block text-sm">
            <span className="text-gray-700">Ratings 1</span>
            <input
              name="ratings_1"
              value={form.ratings_1}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label>

          <label className="block text-sm">
            <span className="text-gray-700">Ratings 2</span>
            <input
              name="ratings_2"
              value={form.ratings_2}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label>

          <label className="block text-sm">
            <span className="text-gray-700">Ratings 3</span>
            <input
              name="ratings_3"
              value={form.ratings_3}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label>

          <label className="block text-sm">
            <span className="text-gray-700">Ratings 4</span>
            <input
              name="ratings_4"
              value={form.ratings_4}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label>

          <label className="block text-sm">
            <span className="text-gray-700">Ratings 5</span>
            <input
              name="ratings_5"
              value={form.ratings_5}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label>
        </div> */}

        <div className="grid grid-cols-2 gap-4">
          <label className="block text-sm">
            <span className="text-gray-700">Image URL</span>
            <input
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label>

          {/* <label className="block text-sm">
            <span className="text-gray-700">Small Image URL</span>
            <input
              name="small_image_url"
              value={form.small_image_url}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label> */}

          <label className="block text-sm">
            <span className="text-gray-700">Category</span>
            <div className="mt-1">
              <Listbox value={form.category} onChange={(val) => setField('category', val)}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded border bg-white py-2 pl-3 pr-10 text-left">
                    <span className="block truncate">{form.category || 'Select category'}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg">
                    {categories.map((c) => (
                      <Listbox.Option key={c} value={c} className={({ active }) => `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'bg-indigo-100' : ''}`}>
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{c}</span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                <CheckIcon className="h-5 w-5" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </label>

          <label className="block text-sm">
            <span className="text-gray-700">Price</span>
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label>

          {/* <label className="block text-sm">
            <span className="text-gray-700">Rating</span><label className="block text-sm">
            <span className="text-gray-700">Original Title</span>
            <input
              name="original_title"
              value={form.original_title}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label>
            <input
              name="rating"
              value={form.rating}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label> */}

          <label className="block text-sm">
            <span className="text-gray-700">Stock</span>
            <input
              name="stock"
              type="number"
              min="0"
              max="100"
              value={form.stock}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label>

          <label className="block text-sm">
            <span className="text-gray-700">Publisher</span>
            <input
              name="publisher"
              value={form.publisher}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label>

          {/* <label className="block text-sm">
            <span className="text-gray-700">Published Year</span>
            <input
              name="published_year"
              value={form.published_year}
              onChange={handleChange}
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </label> */}
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60"
          >
            {submitting ? "Uploading..." : "Upload Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
