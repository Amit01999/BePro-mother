import { useRef } from 'react';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import { AnimatedTextLines } from '../components/AnimatedTextLines';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '340+', label: 'Businesses Served' },
  { value: '52K+', label: 'Professionals Trained' },
  { value: '8,200+', label: 'Students Placed Abroad' },
  { value: '5', label: 'Sister Brands' },
];

const About = () => {
  const text = `Built on the belief that growth is multidimensional —
    we designed an ecosystem where every brand
    amplifies the others, and elevates you.`;

  const aboutText = `BePro is not a single company — it is an ecosystem.
A deliberate architecture of five specialised brands, each world-class in its domain, unified under a single philosophy: that the most powerful competitive advantages are built, not bought.
From enterprise strategy and human capital development to technology infrastructure, international education, and brand — we represent the full stack of modern growth.
Headquartered in Bangladesh. Operating across borders. Thinking at scale.`;

  const imgWrapperRef = useRef(null);
  const imgRef = useRef(null);
  const statRefs = useRef([]);
  const sectionTagRef = useRef(null);

  useGSAP(() => {
    // Section exit — starts the moment section bottom hits viewport bottom,
    // ends when section has fully scrolled off. Scale + dark-card colour morph.
    gsap.to('#about', {
      scale: 0.88,
      backgroundColor: '#393632',
      borderRadius: '40px',
      scrollTrigger: {
        trigger: '#about',
        start: 'bottom bottom',   // fires as soon as section starts exiting
        end: 'bottom top',        // completes when section is fully off-screen
        scrub: 1.5,
        markers: false,
      },
    });

    // Image container clip-path reveal
    gsap.set(imgWrapperRef.current, {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
    });
    gsap.to(imgWrapperRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1.6,
      ease: 'power4.out',
      scrollTrigger: { trigger: imgWrapperRef.current, start: 'top 85%' },
    });

    // Inner image parallax — moves slightly upward as you scroll
    gsap.to(imgRef.current, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: imgWrapperRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  return (
    <section id="about" className="min-h-screen bg-[#F6F2EC] rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={'Our story · Vision & Mission'}
        title={'About'}
        text={text}
        textColor={'text-black'}
        withScrollTrigger={true}
      />

      {/* ── Stats Grid ───────────────────────────────────────── */}
      <div className="mx-10 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden border border-black/10">
          {STATS.map((stat, i) => (
            <div
              key={i}
              ref={el => (statRefs.current[i] = el)}
              className={`bg-[#F6F2EC] flex flex-col items-center justify-center py-10 px-4 text-center ${
                i < STATS.length - 1 ? 'border-r border-black/8' : ''
              } ${i < 2 ? 'border-b border-black/8' : ''}`}
            >
              <span
                className="text-4xl md:text-5xl font-black text-black tracking-tight"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {stat.value}
              </span>
              <span className="mt-2 text-[10px] tracking-[0.3em] uppercase text-black/35 font-light">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Body — Image + Text ──────────────────────────────── */}
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-20 lg:flex-row">

        {/* ── Image ─────────────────────────────────────────── */}
        <div className="relative w-full max-w-md flex-shrink-0 group">

          {/* Index label */}
          <div className="absolute -top-7 left-0 flex items-center gap-2 z-10">
            <span className="text-[9px] tracking-[0.45em] uppercase text-black/25 font-light">01</span>
            <span className="w-8 h-px bg-black/15" />
            <span className="text-[9px] tracking-[0.45em] uppercase text-black/25 font-light">Visual Identity</span>
          </div>

          {/* Main image container */}
          <div
            ref={imgWrapperRef}
            className="relative overflow-hidden"
            style={{
              borderRadius: '80px 4px 80px 4px',
              aspectRatio: '3 / 4',
            }}
          >
            {/* Parallax image — extra height to allow upward movement */}
            <img
              ref={imgRef}
              src="images/man.jpeg"
              alt="BePro team"
              className="w-full h-[110%] object-cover will-change-transform -translate-y-0"
              style={{ objectPosition: 'center top' }}
            />

            {/* Grain texture overlay */}
            <div
              className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-[0.35]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                backgroundSize: '180px 180px',
              }}
            />

            {/* Dark gradient */}
            <div className="absolute inset-0 z-[5] bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

            {/* Bottom caption */}
            <div
              ref={sectionTagRef}
              className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-7 flex items-end justify-between"
            >
              <div>
                <p className="text-[9px] tracking-[0.45em] uppercase text-white/45 font-light mb-1">
                  Est. in Bangladesh
                </p>
                <p className="text-sm font-light text-white/85 tracking-wide">
                  Five brands · One vision
                </p>
              </div>

              {/* Arrow icon */}
              <div className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center opacity-60 group-hover:opacity-100 group-hover:border-white/50 transition-all duration-500">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M2.5 10.5L10.5 2.5M10.5 2.5H4.5M10.5 2.5V8.5"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Vertical side label */}
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 -rotate-90 origin-center pointer-events-none">
            <span
              className="text-[8px] tracking-[0.55em] uppercase text-black/20 font-light whitespace-nowrap"
            >
              Dhaka, Bangladesh — 2018
            </span>
          </div>

          {/* Decorative corner accent — bottom-left */}
          <div className="absolute -bottom-5 -left-5 w-14 h-14 border-l border-b border-black/12 pointer-events-none" />

          {/* Floating year badge */}
          <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-[#F6F2EC] border border-black/10 flex items-center justify-center shadow-sm">
            <span
              className="text-[9px] tracking-[0.2em] text-black/40 font-light leading-tight text-center"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              EST<br />2018
            </span>
          </div>
        </div>

        {/* Text block */}
        <AnimatedTextLines
          text={aboutText}
          className="w-full text-xl md:text-2xl lg:text-3xl font-light tracking-wide text-black/50 leading-relaxed"
        />
      </div>
    </section>
  );
};

export default About;
