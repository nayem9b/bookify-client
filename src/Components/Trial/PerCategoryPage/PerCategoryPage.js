import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import BookingModal from "../../BookingModal/BookingModal";
import TrialBookDetailsCard from "../TrialBookDetailsCard/TrialBookDetailsCard";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const PerCategoryPage = () => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState();
  const [price, setPrice] = useState();
  const [picture, setPicture] = useState();
  const gridRef = useRef(null);

  // Register GSAP plugins once
  useEffect(() => {
    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`https://bookify-serverside.onrender.com/api/categories/${id}/books`)
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setBooks(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (mounted) setBooks([]);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [id]);

  // GSAP scroll & hover animations for cards
  useEffect(() => {
    if (!gridRef.current || !gsap || !ScrollTrigger) return;

    const cards = gridRef.current.querySelectorAll(".pc-card");

    // entrance animation when grid scrolls into view
    const tg = gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
      }
    );

    // hover image scale effect
    const listeners = [];
    cards.forEach((card) => {
      const img = card.querySelector("img");
      if (!img) return;
      const enter = () =>
        gsap.to(img, { scale: 1.06, duration: 0.4, ease: "power1.out" });
      const leave = () =>
        gsap.to(img, { scale: 1, duration: 0.45, ease: "power1.out" });
      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
      listeners.push({ card, enter, leave });
    });

    return () => {
      try {
        tg.kill();
      } catch (e) {}
      ScrollTrigger.getAll().forEach((t) => t.kill());
      listeners.forEach(({ card, enter, leave }) => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      });
    };
  }, [books]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 mt-24">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Category: {id}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Browse books in this category. Click a card to view details and
            book.
          </p>
        </header>

        {loading ? (
          <div className="grid place-items-center py-24">
            <div className="animate-pulse">
              <div className="h-6 w-64 bg-gray-200 rounded mb-3" />
              <div className="h-6 w-48 bg-gray-200 rounded" />
            </div>
          </div>
        ) : books.length === 0 ? (
          <div className="py-24 text-center text-gray-500">
            No books found in this category.
          </div>
        ) : (
          <motion.div
            ref={gridRef}
            className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 px-4"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            {books.map((book) => (
              <motion.div
                key={book._id}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ type: "tween", duration: 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden pc-card backdrop-blur-sm bg-white/90 border border-gray-100/20"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitFontSmoothing: "subpixel-antialiased",
                }}
              >
                <Link to={`/books/${book._id}`}>
                  <TrialBookDetailsCard
                    book={book}
                    setItem={setSelectedItem}
                    setPrice={setPrice}
                    setPicture={setPicture}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        <BookingModal item={selectedItem} price={price} picture={picture} />
      </div>
    </div>
  );
};

export default PerCategoryPage;
