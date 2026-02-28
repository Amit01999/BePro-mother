import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import fly8 from '../../public/images/website/fly8.png';
import buisness from '../../public/images/website/business.png';
import it from '../../public/images/website/it.png';
import training from '../../public/images/website/traning.png';
gsap.registerPlugin(ScrollTrigger);

// ─── BRAND DATA ──────────────────────────────────────────────────────────────
const BRANDS = [
  {
    id: 'business',
    name: 'Bepro Business',
    tagline: 'Growth & Consulting',
    desc: 'We architect enterprise growth strategies that move markets. From boardroom to execution, we operate where ambition meets precision and results compound over time.',
    color: '#C8A882',
    accent: '#7A5C35',
    num: '01',
    image: buisness,
    stat: '340+',
    statLabel: 'Enterprises Scaled',
    url: 'https://www.bepro.com.bd/',
  },
  {
    id: 'training',
    name: 'Bepro Training',
    tagline: 'Skill Development',
    desc: 'Human capital is the most defensible competitive advantage. We engineer learning ecosystems that transform raw potential into measurable, compounding performance.',
    color: '#88AA85',
    accent: '#3A6237',
    num: '02',
    image: training,
    stat: '52K+',
    statLabel: 'Professionals Trained',
    url: 'https://be-pro-trainingand-consultancy.vercel.app/',
  },
  {
    id: 'it',
    name: 'Bepro IT',
    tagline: 'Software & Infrastructure',
    desc: "Technology is the spine of modern enterprise. We design and build the digital infrastructure that carries tomorrow's most ambitious organisations forward.",
    color: '#85A0C8',
    accent: '#1A4A7A',
    num: '03',
    image: it,
    stat: '99.97%',
    statLabel: 'Uptime Record',
    url: 'https://bepro.it.com/',
  },
  {
    id: 'fly8',
    name: 'Fly8',
    tagline: 'International Study Abroad',
    desc: 'We open the world. From first application to campus arrival, Fly8 connects driven students with world-class academic institutions across 40+ countries.',
    color: '#C8C085',
    accent: '#7A6A1A',
    num: '04',
    image: fly8,
    stat: '8,200+',
    statLabel: 'Students Placed',
    url: 'https://www.fly8.global/',
  },
  {
    id: 'media',
    name: 'Bepro Media',
    tagline: 'Brand & Marketing',
    desc: "Perception is reality. We craft brand identities and performance marketing systems that don't just communicate — they command attention and convert at scale.",
    color: '#C885A5',
    accent: '#7A1A50',
    num: '05',
    image:
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1000&q=90',
    stat: '4.1B+',
    statLabel: 'Impressions Served',
    url: '/media-coming-soon.html',
  },
];

// Initial scatter positions
const SCATTER = [
  { x: '-40vw', y: '-30vh', r: -15, s: 0.8 },
  { x: '35vw', y: '-25vh', r: 12, s: 0.9 },
  { x: '-35vw', y: '35vh', r: -10, s: 0.75 },
  { x: '38vw', y: '30vh', r: 18, s: 0.85 },
  { x: '0vw', y: '45vh', r: 5, s: 0.7 },
];

// Grouped center formation
const GROUP_FORMATION = [
  { x: '-6vw', y: '-4vh', r: -4, s: 0.95, z: 5 },
  { x: '-8vw', y: '4vh', r: 6, s: 0.92, z: 4 },
  { x: '6vw', y: '-6vh', r: 5, s: 0.94, z: 3 },
  { x: '8vw', y: '6vh', r: -7, s: 0.9, z: 2 },
  { x: '0vw', y: '0vh', r: 0, s: 1, z: 6 },
];

// Left stack positions
const LEFT_STACK = [
  { x: '-28vw', y: '-8vh', r: -2, s: 0.85, z: 50 },
  { x: '-27vw', y: '0vh', r: 1, s: 0.85, z: 40 },
  { x: '-29vw', y: '8vh', r: -1, s: 0.85, z: 30 },
  { x: '-28vw', y: '16vh', r: 2, s: 0.85, z: 20 },
  { x: '-27vw', y: '24vh', r: -3, s: 0.85, z: 10 },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const Noise = () => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999,
      pointerEvents: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      opacity: 0.028,
      mixBlendMode: 'multiply',
    }}
  />
);

function CinematicSequence() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const textRefs = useRef([]);
  const buttonRefs = useRef([]);
  const headRef = useRef(null);
  const finalStatementRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      const texts = textRefs.current.filter(Boolean);

      const TOTAL = 11;

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${TOTAL * 100}%`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      // INITIAL STATE
      SCATTER.forEach((p, i) => {
        gsap.set(cards[i], {
          x: p.x,
          y: p.y,
          rotation: p.r,
          scale: p.s,
          opacity: 0,
        });
      });
      gsap.set(texts, { opacity: 0, x: 50 });
      gsap.set(headRef.current, { opacity: 1, scale: 1, y: 0 });
      gsap.set(finalStatementRef.current, { opacity: 0, scale: 0.9 });
      buttonRefs.current.filter(Boolean).forEach(btn => { btn.style.pointerEvents = 'none'; });

      // PHASE 1: Group Formation (Convergence)
      mainTl.to(cards, { opacity: 1, duration: 0.5 }, 0);
      GROUP_FORMATION.forEach((p, i) => {
        mainTl.to(
          cards[i],
          {
            x: p.x,
            y: p.y,
            rotation: p.r,
            scale: p.s,
            zIndex: p.z,
            duration: 1,
            ease: 'power2.inOut',
          },
          0,
        );
      });

      // Fade out headline
      mainTl.to(headRef.current, { opacity: 0, y: -100, duration: 0.5 }, 0.5);

      // PHASE 2: Group Moves Left
      LEFT_STACK.forEach((p, i) => {
        mainTl.to(
          cards[i],
          {
            x: p.x,
            y: p.y,
            rotation: p.r,
            scale: p.s,
            zIndex: p.z,
            duration: 1,
            ease: 'power3.inOut',
          },
          1,
        );
      });

      // PHASE 3: Sequential Reveal
      BRANDS.forEach((_brand, i) => {
        const t = 2 + i * 1.5;

        mainTl.to(
          texts[i],
          {
            opacity: 1, x: 0, duration: 0.6, ease: 'power2.out',
            onStart() {
              buttonRefs.current.forEach((btn, j) => {
                if (btn) btn.style.pointerEvents = j === i ? 'auto' : 'none';
              });
            },
            onReverseComplete() {
              if (buttonRefs.current[i]) buttonRefs.current[i].style.pointerEvents = 'none';
            },
          },
          t,
        );

        mainTl.to(cards[i], { scale: 0.9, duration: 0.5 }, t);

        if (i < BRANDS.length - 1) {
          mainTl.to(
            cards[i],
            {
              y: '130vh',
              rotation: i % 2 === 0 ? -20 : 20,
              opacity: 0,
              duration: 1,
              ease: 'power2.in',
            },
            t + 0.8,
          );

          mainTl.to(
            texts[i],
            {
              opacity: 0, x: -50, duration: 0.4,
              onStart() {
                if (buttonRefs.current[i]) buttonRefs.current[i].style.pointerEvents = 'none';
              },
              onReverseComplete() {
                buttonRefs.current.forEach((btn, j) => {
                  if (btn) btn.style.pointerEvents = j === i ? 'auto' : 'none';
                });
              },
            },
            t + 0.8,
          );

          for (let j = i + 1; j < BRANDS.length; j++) {
            const nextPos = LEFT_STACK[j - (i + 1)];
            mainTl.to(
              cards[j],
              {
                x: nextPos.x,
                y: nextPos.y,
                rotation: nextPos.r,
                duration: 0.8,
                ease: 'power2.inOut',
              },
              t + 0.8,
            );
          }
        }
      });

      // PHASE 4: Final Statement
      const finalT = 2 + (BRANDS.length - 1) * 1.5 + 1.2;
      mainTl.to(
        cards[BRANDS.length - 1],
        { opacity: 0, y: '130vh', duration: 1 },
        finalT,
      );
      mainTl.to(
        texts[BRANDS.length - 1],
        {
          opacity: 0, duration: 0.5,
          onStart() {
            const btn = buttonRefs.current[BRANDS.length - 1];
            if (btn) btn.style.pointerEvents = 'none';
          },
          onReverseComplete() {
            const btn = buttonRefs.current[BRANDS.length - 1];
            if (btn) btn.style.pointerEvents = 'auto';
          },
        },
        finalT,
      );

      mainTl.to(
        finalStatementRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
        },
        finalT + 0.5,
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* ── Fine crosshair grid ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.028) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(0,0,0,0.028) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      {/* ── Concentric circle decoration ── */}
      {[200, 148, 100, 62].map((size, idx) => (
        <div
          key={size}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${size}vh`,
            height: `${size}vh`,
            borderRadius: '50%',
            border: idx === 3
              ? '1px solid rgba(200,168,130,0.13)'
              : `1px solid rgba(0,0,0,${0.038 - idx * 0.007})`,
            boxShadow: idx === 3
              ? 'inset 0 0 60px rgba(200,168,130,0.03)'
              : 'none',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ── Precision center crosshair ── */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '50%', left: -20, width: 40, height: 1, background: 'rgba(200,168,130,0.25)', transform: 'translateY(-50%)' }} />
        <div style={{ position: 'absolute', left: '50%', top: -20, width: 1, height: 40, background: 'rgba(200,168,130,0.25)', transform: 'translateX(-50%)' }} />
        <div style={{ width: 5, height: 5, borderRadius: '50%', border: '1px solid rgba(200,168,130,0.4)', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>

      {/* ── Layered atmospheric light ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 90% 70% at 50% -5%, rgba(220,185,140,0.22) 0%, rgba(210,175,130,0.08) 50%, transparent 75%),' +
            'radial-gradient(ellipse 50% 40% at 12% 105%, rgba(200,168,110,0.08) 0%, transparent 55%),' +
            'radial-gradient(ellipse 50% 40% at 88% 105%, rgba(200,168,110,0.06) 0%, transparent 55%),' +
            'radial-gradient(ellipse at 50% 50%, transparent 48%, rgba(0,0,0,0.055) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Hero Title ── */}
      <div
        ref={headRef}
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        {/* ── Ghost monogram "BP" — dual-layer ── */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '32vw',
            fontFamily: 'Syne',
            fontWeight: 800,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(0,0,0,0.028)',
            letterSpacing: '-0.05em',
            textTransform: 'uppercase',
            userSelect: 'none',
            pointerEvents: 'none',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          BP
        </div>
        {/* second layer — warm tint */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '32vw',
            fontFamily: 'Syne',
            fontWeight: 800,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(200,168,130,0.04)',
            letterSpacing: '-0.05em',
            textTransform: 'uppercase',
            userSelect: 'none',
            pointerEvents: 'none',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          BP
        </div>

        {/* ── Corner brackets — refined ── */}
        {[
          { top: 32, left: 32 },
          { top: 32, right: 32 },
          { bottom: 32, left: 32 },
          { bottom: 32, right: 32 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...pos,
              width: 52,
              height: 52,
              borderTop: i < 2 ? '1.5px solid rgba(0,0,0,0.13)' : undefined,
              borderBottom: i >= 2 ? '1.5px solid rgba(0,0,0,0.13)' : undefined,
              borderLeft: i % 2 === 0 ? '1.5px solid rgba(0,0,0,0.13)' : undefined,
              borderRight: i % 2 === 1 ? '1.5px solid rgba(0,0,0,0.13)' : undefined,
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* ── Left vertical text ── */}
        <div
          style={{
            position: 'absolute',
            left: 40,
            top: '50%',
            transform: 'translateY(-50%) rotate(-90deg)',
            transformOrigin: 'center center',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            pointerEvents: 'none',
          }}
        >
          <div style={{ width: 24, height: 1, background: 'linear-gradient(to right, transparent, rgba(200,168,130,0.3))' }} />
          <span
            style={{
              fontSize: 9,
              letterSpacing: '0.48em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.22)',
              fontFamily: 'Syne',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Growth · Innovation · Impact
          </span>
          <div style={{ width: 24, height: 1, background: 'linear-gradient(to left, transparent, rgba(200,168,130,0.3))' }} />
        </div>

        {/* ── Right vertical text ── */}
        <div
          style={{
            position: 'absolute',
            right: 40,
            top: '50%',
            transform: 'translateY(-50%) rotate(90deg)',
            transformOrigin: 'center center',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            pointerEvents: 'none',
          }}
        >
          <div style={{ width: 24, height: 1, background: 'linear-gradient(to right, transparent, rgba(200,168,130,0.3))' }} />
          <span
            style={{
              fontSize: 9,
              letterSpacing: '0.48em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.22)',
              fontFamily: 'Syne',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Five Brands · One Vision
          </span>
          <div style={{ width: 24, height: 1, background: 'linear-gradient(to left, transparent, rgba(200,168,130,0.3))' }} />
        </div>

        {/* ── Scroll indicator ── */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: 8,
              letterSpacing: '0.52em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.22)',
              fontFamily: 'Syne',
              fontWeight: 600,
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 44,
              background:
                'linear-gradient(to bottom, rgba(200,168,130,0.5), transparent)',
            }}
          />
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(200,168,130,0.4)' }} />
        </div>

        {/* ── Eyebrow label — glassmorphism pill ── */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 40,
              height: 1,
              background:
                'linear-gradient(to right, transparent, rgba(200,168,130,0.6))',
            }}
          />
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 20px',
              borderRadius: 100,
              background: 'rgba(200,168,130,0.08)',
              border: '1px solid rgba(200,168,130,0.22)',
              boxShadow: '0 2px 12px rgba(200,168,130,0.08), inset 0 1px 0 rgba(255,255,255,0.5)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              fontSize: 9,
              letterSpacing: '0.58em',
              textTransform: 'uppercase',
              color: 'rgba(160,120,70,0.9)',
              fontFamily: 'Syne',
              fontWeight: 700,
            }}
          >
            Bepro Group
          </span>
          <div
            style={{
              width: 40,
              height: 1,
              background:
                'linear-gradient(to left, transparent, rgba(200,168,130,0.6))',
            }}
          />
        </div>

        {/* ── Main headline ── */}
        <h1
          style={{
            fontFamily: 'Syne',
            fontSize: 'clamp(4rem,10vw,10rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.85,
            textAlign: 'center',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          <span
            style={{
              display: 'block',
              color: '#0D0C0A',
            }}
          >
            Powering
          </span>
          <span
            style={{
              display: 'block',
              background: 'linear-gradient(135deg, #B8905A 0%, #D4B070 30%, #E8C890 55%, #C8A060 80%, #A07840 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Growth
          </span>
        </h1>

        {/* ── Thin vertical separator ── */}
        <div
          style={{
            width: 1,
            height: 36,
            background:
              'linear-gradient(to bottom, rgba(200,168,130,0.35), transparent)',
            marginTop: 32,
          }}
        />

        {/* ── Tagline with flanking gradient rules ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            marginTop: 14,
          }}
        >
          <div
            style={{
              width: 56,
              height: 1,
              background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.12))',
            }}
          />
          <p
            style={{
              fontSize: 10,
              letterSpacing: '0.52em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.28)',
              margin: 0,
              fontFamily: 'Syne',
              fontWeight: 500,
            }}
          >
            Five Brands · One Vision
          </p>
          <div
            style={{
              width: 56,
              height: 1,
              background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.12))',
            }}
          />
        </div>

        {/* ── Brand category list ── */}
        <p
          style={{
            fontSize: 9,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.16)',
            margin: '20px 0 0',
            fontFamily: 'Syne',
          }}
        >
          Business · Training · IT · Fly8 · Media
        </p>
      </div>

      {/* ── Final Brand Statement ── */}
      <div
        ref={finalStatementRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          pointerEvents: 'none',
        }}
      >
        {/* Radial glow behind text */}
        <div style={{
          position: 'absolute',
          width: '60vw',
          height: '60vh',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(200,168,130,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 18,
              marginBottom: 36,
            }}
          >
            <div
              style={{
                width: 52,
                height: 1,
                background:
                  'linear-gradient(to right, transparent, rgba(200,168,130,0.6))',
              }}
            />
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '5px 18px',
                borderRadius: 100,
                background: 'rgba(200,168,130,0.08)',
                border: '1px solid rgba(200,168,130,0.2)',
                fontSize: 9,
                letterSpacing: '0.52em',
                textTransform: 'uppercase',
                color: 'rgba(160,120,70,0.8)',
                fontFamily: 'Syne',
                fontWeight: 600,
              }}
            >
              Our Legacy
            </span>
            <div
              style={{
                width: 52,
                height: 1,
                background:
                  'linear-gradient(to left, transparent, rgba(200,168,130,0.6))',
              }}
            />
          </div>

          <h2
            style={{
              fontFamily: 'Syne',
              fontSize: 'clamp(2rem,5vw,5rem)',
              fontWeight: 800,
              textAlign: 'center',
              maxWidth: '80%',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#0D0C0A',
              margin: '0 auto',
            }}
          >
            Bepro is a sister concern of
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #B8905A 0%, #D4B070 40%, #C8A060 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Gitanjoli.
            </span>
          </h2>
        </div>
      </div>

      {/* ── The Stack (Left Side) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
        }}
      >
        {BRANDS.map((b, i) => (
          <div
            key={b.id}
            ref={el => (cardRefs.current[i] = el)}
            style={{
              position: 'absolute',
              width: 560,
              height: 400,
              borderRadius: 28,
              overflow: 'hidden',
              boxShadow:
                `0 0 0 1px rgba(0,0,0,0.055),` +
                `0 2px 4px rgba(0,0,0,0.04),` +
                `0 8px 24px rgba(0,0,0,0.09),` +
                `0 28px 72px rgba(0,0,0,0.16),` +
                `inset 0 1px 0 rgba(255,255,255,0.18)`,
            }}
          >
            <img
              src={b.image}
              alt={b.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Subtle screen-door inner border */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 28,
                border: '1px solid rgba(255,255,255,0.14)',
                pointerEvents: 'none',
                zIndex: 8,
              }}
            />

            {/* Top cinematic vignette */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.15) 35%, transparent 60%)',
              }}
            />

            {/* Bottom brand-colour bloom — deeper */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(to top, ${b.color} 0%, ${b.color}cc 18%, ${b.color}77 38%, transparent 68%)`,
              }}
            />

            {/* Number badge pill — glassmorphism */}
            <div
              style={{
                position: 'absolute',
                top: 18,
                left: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: 100,
                padding: '6px 16px 6px 10px',
                boxShadow: '0 2px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,1)',
                border: '1px solid rgba(255,255,255,0.7)',
                zIndex: 5,
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: b.color,
                  boxShadow: `0 0 6px ${b.color}80`,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: 'Syne',
                  color: '#0D0C0A',
                  letterSpacing: '0.08em',
                }}
              >
                {b.num}
              </span>
            </div>

            {/* Card label — bottom left */}
            <div
              style={{
                position: 'absolute',
                bottom: 26,
                left: 26,
                color: '#fff',
                zIndex: 6,
              }}
            >
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  letterSpacing: '0.38em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.62)',
                  display: 'block',
                  marginBottom: 7,
                  fontFamily: 'Syne',
                }}
              >
                {b.tagline}
              </span>
              <h3
                style={{
                  fontSize: 22,
                  fontFamily: 'Syne',
                  fontWeight: 800,
                  margin: 0,
                  letterSpacing: '-0.025em',
                  lineHeight: 1,
                  textShadow: '0 2px 16px rgba(0,0,0,0.3)',
                }}
              >
                {b.name}
              </h3>
            </div>

            {/* Stat — bottom right */}
            <div
              style={{
                position: 'absolute',
                bottom: 30,
                right: 24,
                textAlign: 'right',
                color: '#fff',
                zIndex: 6,
              }}
            >
              <p
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  fontFamily: 'Syne',
                  letterSpacing: '-0.025em',
                  margin: 0,
                  textShadow: '0 2px 16px rgba(0,0,0,0.25)',
                }}
              >
                {b.stat}
              </p>
              <p
                style={{
                  fontSize: 8,
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.56)',
                  margin: '5px 0 0',
                  fontFamily: 'Syne',
                }}
              >
                {b.statLabel}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Details Panel (Right Side) ── */}
      <div
        style={{
          position: 'absolute',
          right: '10%',
          width: '40%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          zIndex: 30,
          pointerEvents: 'none',
        }}
      >
        {BRANDS.map((b, i) => {
          const nameParts = b.name.split(' ');
          return (
            <div
              key={`text-${b.id}`}
              ref={el => (textRefs.current[i] = el)}
              style={{ position: 'absolute', opacity: 0 }}
            >
              {/* Tagline pill — refined */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  marginBottom: 22,
                }}
              >
                <div style={{
                  width: 32,
                  height: 1,
                  background: `linear-gradient(to right, transparent, ${b.color})`,
                }} />
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '5px 16px',
                    borderRadius: 100,
                    background: `${b.color}12`,
                    border: `1px solid ${b.color}50`,
                    boxShadow: `0 2px 12px ${b.color}15, inset 0 1px 0 rgba(255,255,255,0.4)`,
                    fontSize: 8,
                    letterSpacing: '0.38em',
                    textTransform: 'uppercase',
                    color: b.color,
                    fontFamily: 'Syne',
                    fontWeight: 700,
                  }}
                >
                  {b.tagline}
                </span>
              </div>

              {/* Number indicator */}
              <span
                style={{
                  color: 'rgba(0,0,0,0.18)',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.45em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: 16,
                  fontFamily: 'Syne',
                }}
              >
                {b.num} / 05
              </span>

              {/* Brand name — metallic two-tone */}
              <h2
                style={{
                  fontFamily: 'Syne',
                  fontSize: 'clamp(2rem,5vw,5rem)',
                  fontWeight: 800,
                  lineHeight: 0.88,
                  marginTop: 0,
                  marginBottom: 34,
                  letterSpacing: '-0.03em',
                }}
              >
                {nameParts.length > 1 ? (
                  <>
                    <span style={{ color: '#0D0C0A', display: 'block' }}>{nameParts[0]}</span>
                    <span
                      style={{
                        display: 'block',
                        background: `linear-gradient(135deg, ${b.accent} 0%, ${b.color} 50%, ${b.color}cc 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {nameParts.slice(1).join(' ')}
                    </span>
                  </>
                ) : (
                  <span
                    style={{
                      background: `linear-gradient(135deg, ${b.accent} 0%, ${b.color} 60%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {b.name}
                  </span>
                )}
              </h2>

              {/* Description */}
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.9,
                  color: 'rgba(0,0,0,0.42)',
                  maxWidth: 460,
                  margin: 0,
                  letterSpacing: '0.005em',
                }}
              >
                {b.desc}
              </p>

              {/* Glass stat card — true glassmorphism */}
              <div
                style={{
                  marginTop: 40,
                  background: 'rgba(246,242,236,0.75)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: 20,
                  padding: '22px 28px',
                  border: '1px solid rgba(255,255,255,0.88)',
                  boxShadow:
                    '0 8px 32px rgba(0,0,0,0.06),' +
                    '0 2px 8px rgba(0,0,0,0.04),' +
                    'inset 0 1px 0 rgba(255,255,255,1)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 28,
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: 42,
                      fontWeight: 800,
                      fontFamily: 'Syne',
                      background: `linear-gradient(135deg, ${b.accent} 0%, ${b.color} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '-0.03em',
                      margin: 0,
                      lineHeight: 1,
                    }}
                  >
                    {b.stat}
                  </p>
                  <p
                    style={{
                      fontSize: 9,
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: 'rgba(0,0,0,0.28)',
                      margin: '8px 0 0',
                      fontFamily: 'Syne',
                    }}
                  >
                    {b.statLabel}
                  </p>
                </div>

                <div
                  style={{
                    width: 1,
                    height: 48,
                    background: 'rgba(0,0,0,0.06)',
                    flexShrink: 0,
                  }}
                />

                <div>
                  <p
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(0,0,0,0.28)',
                      margin: '0 0 5px',
                      fontFamily: 'Syne',
                    }}
                  >
                    {b.name}
                  </p>
                  <p
                    style={{
                      fontSize: 8,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(0,0,0,0.16)',
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {b.tagline}
                  </p>
                </div>
              </div>

              {/* Visit Website button — premium */}
              <a
                ref={el => (buttonRefs.current[i] = el)}
                href={b.url}
                target={b.url.startsWith('/') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  if (b.url.startsWith('/')) {
                    window.location.href = b.url;
                  } else {
                    window.open(b.url, '_blank', 'noopener,noreferrer');
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 14,
                  marginTop: 32,
                  padding: '14px 36px',
                  background: 'linear-gradient(135deg, #131110 0%, #2a2520 100%)',
                  color: '#F6F2EC',
                  borderRadius: 100,
                  fontSize: 10,
                  letterSpacing: '0.36em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  fontFamily: 'Syne',
                  textDecoration: 'none',
                  pointerEvents: 'none',
                  cursor: 'pointer',
                  border: `1px solid ${b.color}40`,
                  boxShadow: `0 4px 24px rgba(0,0,0,0.14), 0 1px 0 rgba(255,255,255,0.05) inset`,
                  userSelect: 'none',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                Visit Website
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: `${b.color}25`,
                    border: `1px solid ${b.color}50`,
                    fontSize: 12,
                    lineHeight: 1,
                    letterSpacing: 0,
                  }}
                >
                  ↗
                </span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Keeps GSAP ScrollTrigger in sync with Lenis smooth scroll
function ScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

const Hero = () => {
  return (
    <section id="home" style={{ background: '#F6F2EC' }}>
      <ScrollTriggerSync />
      <Noise />
      <CinematicSequence />
    </section>
  );
};

export default Hero;
