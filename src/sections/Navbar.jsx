import React, { useEffect, useRef, useState } from "react";
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBurger, setShowBurger] = useState(true);

  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 30);
      setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* ── Top Bar ───────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-10 h-16 transition-all duration-500 ${
          scrolled
            ? "bg-[#F6F2EC]/85 backdrop-blur-xl border-b border-black/8 shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* Wordmark */}
        <Link
          to="home"
          smooth
          duration={2000}
          className="cursor-pointer select-none"
        >
          <span
            style={{ fontFamily: "Syne, sans-serif" }}
            className="text-2xl font-black tracking-tight uppercase text-black"
          >
            Be<span style={{ color: "#C8A882" }}>Pro</span>
          </span>
        </Link>

        {/* Descriptor — desktop only */}
        <p className="hidden md:block text-[10px] tracking-[0.4em] uppercase text-black/35 font-light">
          Five Brands · One Vision
        </p>

        {/* Spacer so burger doesn't overlap header label on mobile */}
        <div className="w-14 md:w-20" />
      </header>

      {/* ── Slide-in Nav Panel ────────────────────────────────── */}
      <nav
        ref={navRef}
        className="fixed z-50 flex flex-col justify-between w-full h-full px-10 uppercase bg-[#F6F2EC] text-black/75 py-28 gap-y-10 md:w-1/2 md:left-1/2 border-l border-black/8"
        style={{ boxShadow: "-40px 0 80px rgba(0,0,0,0.06)" }}
      >
        {/* Nav Links */}
        <div className="flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-8xl">
          {["home", "services", "about", "work", "contact"].map(
            (section, index) => (
              <div key={index} ref={(el) => (linksRef.current[index] = el)}>
                <Link
                  className="transition-all duration-300 cursor-pointer hover:text-[#C8A882] hover:pl-2"
                  style={{ display: "block" }}
                  to={`${section}`}
                  smooth
                  offset={0}
                  duration={2000}
                  onClick={toggleMenu}
                >
                  {section}
                </Link>
              </div>
            )
          )}
        </div>

        {/* Bottom Contact Strip */}
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row border-t border-black/10 pt-8"
        >
          <div className="font-light">
            <p className="text-[10px] tracking-[0.4em] uppercase text-black/35 mb-1">
              E-mail
            </p>
            <p className="text-lg tracking-widest lowercase text-pretty text-black/70">
              hello@bepro.com.bd
            </p>
          </div>
          <div className="font-light">
            <p className="text-[10px] tracking-[0.4em] uppercase text-black/35 mb-1">
              Follow
            </p>
            <div className="flex flex-col flex-wrap md:flex-row gap-x-2">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm leading-loose tracking-widest uppercase text-black/50 hover:text-[#C8A882] transition-colors duration-300"
                >
                  {"{ "}
                  {social.name}
                  {" }"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Burger Button ─────────────────────────────────────── */}
      <div
        className="fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10"
        onClick={toggleMenu}
        style={
          showBurger
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
      >
        <span
          ref={topLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        />
        <span
          ref={bottomLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        />
      </div>
    </>
  );
};

export default Navbar;
