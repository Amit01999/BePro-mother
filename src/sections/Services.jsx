import { useRef } from 'react';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import { servicesData } from '../constants';
import { useMediaQuery } from 'react-responsive';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Palette — muted brand accents on deep-dark editorial backgrounds
const BRAND_PALETTE = [
  { // Business — warm gold
    bg: '#100E0C',
    accent: '#D4B48E',
    text: '#F6F2EC',
    textMuted: 'rgba(246,242,236,0.52)',
    divider: 'rgba(212,180,142,0.22)',
    border: 'rgba(212,180,142,0.18)',
  },
  { // Training — sage green
    bg: '#0B0F0B',
    accent: '#8FBA8C',
    text: '#F6F2EC',
    textMuted: 'rgba(246,242,236,0.52)',
    divider: 'rgba(143,186,140,0.22)',
    border: 'rgba(143,186,140,0.18)',
  },
  { // IT — steel blue
    bg: '#0B0D10',
    accent: '#8CAED8',
    text: '#F6F2EC',
    textMuted: 'rgba(246,242,236,0.52)',
    divider: 'rgba(140,174,216,0.22)',
    border: 'rgba(140,174,216,0.18)',
  },
  { // Fly8 — warm olive
    bg: '#0F100B',
    accent: '#D4CC8E',
    text: '#F6F2EC',
    textMuted: 'rgba(246,242,236,0.52)',
    divider: 'rgba(212,204,142,0.22)',
    border: 'rgba(212,204,142,0.18)',
  },
  { // Media — dusty rose
    bg: '#100B0E',
    accent: '#D490B0',
    text: '#F6F2EC',
    textMuted: 'rgba(246,242,236,0.52)',
    divider: 'rgba(212,144,176,0.22)',
    border: 'rgba(212,144,176,0.18)',
  },
  { // Jobs — slate teal
    bg: '#0B0F10',
    accent: '#7EC8C8',
    text: '#F6F2EC',
    textMuted: 'rgba(246,242,236,0.52)',
    divider: 'rgba(126,200,200,0.22)',
    border: 'rgba(126,200,200,0.18)',
  },
];

const Services = () => {
  const text = `Six specialisations.
    One unified ecosystem.
    Built to serve enterprise ambition at every level.`;

  const serviceRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: '48rem' });

  useGSAP(() => {
    serviceRefs.current.forEach(el => {
      if (!el) return;
      gsap.from(el, {
        y: 200,
        scrollTrigger: { trigger: el, start: 'top 80%' },
        duration: 1,
        ease: 'circ.out',
      });
    });
  }, []);

  return (
    <section id="services" className="min-h-screen bg-[#F6F2EC] rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={'Our Ecosystem · Six Specialisations'}
        title={'Brands'}
        text={text}
        textColor={'text-black'}
        withScrollTrigger={true}
      />

      {servicesData.map((service, index) => {
        const p = BRAND_PALETTE[index];
        return (
          <div
            ref={el => (serviceRefs.current[index] = el)}
            key={index}
            className="sticky"
            style={
              isDesktop
                ? {
                    backgroundColor: p.bg,
                    borderTop: `1px solid ${p.border}`,
                    top: `calc(10vh + ${index * 5}em)`,
                    marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
                    overflow: 'hidden',
                  }
                : {
                    backgroundColor: p.bg,
                    borderTop: `1px solid ${p.border}`,
                    top: 0,
                    overflow: 'hidden',
                  }
            }
          >
            {/* ── Noise grain texture ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                opacity: 0.032,
                mixBlendMode: 'screen',
                pointerEvents: 'none',
              }}
            />

            {/* ── Brand-colour radial bloom — top-right ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse 60% 70% at 96% 4%, ${p.accent}38 0%, transparent 65%)`,
                pointerEvents: 'none',
              }}
            />

            {/* ── Secondary bloom — bottom-left ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse 40% 50% at 4% 96%, ${p.accent}18 0%, transparent 65%)`,
                pointerEvents: 'none',
              }}
            />

            {/* ── Dot grid ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `radial-gradient(circle, ${p.accent}38 1px, transparent 1px)`,
                backgroundSize: '44px 44px',
                opacity: 0.55,
                pointerEvents: 'none',
              }}
            />

            {/* ── Ghost number — large background monogram ── */}
            <div
              style={{
                position: 'absolute',
                right: '-0.05em',
                bottom: '-0.2em',
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(10rem, 22vw, 22rem)',
                fontWeight: 800,
                lineHeight: 1,
                color: 'transparent',
                WebkitTextStroke: `1px ${p.accent}20`,
                letterSpacing: '-0.05em',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              {service.number}
            </div>

            {/* ── Corner brackets ── */}
            <div style={{ position: 'absolute', top: 24, left: 28, width: 32, height: 32, borderTop: `1.5px solid ${p.accent}40`, borderLeft: `1.5px solid ${p.accent}40`, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 24, right: 28, width: 32, height: 32, borderTop: `1.5px solid ${p.accent}40`, borderRight: `1.5px solid ${p.accent}40`, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 24, left: 28, width: 32, height: 32, borderBottom: `1.5px solid ${p.accent}40`, borderLeft: `1.5px solid ${p.accent}40`, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 24, right: 28, width: 32, height: 32, borderBottom: `1.5px solid ${p.accent}40`, borderRight: `1.5px solid ${p.accent}40`, pointerEvents: 'none' }} />

            {/* ── Card content ── */}
            <div
              className="flex flex-col md:flex-row"
              style={{
                gap: isDesktop ? '5rem' : '2.5rem',
                padding: isDesktop ? '5.5rem 5rem 7rem' : '4rem 2rem 5.5rem',
                position: 'relative',
              }}
            >
              {/* ── Left — brand identity ── */}
              <div
                className="flex flex-col"
                style={{ gap: '1.5rem', flex: isDesktop ? '0 0 50%' : '1 1 auto' }}
              >
                {/* Eyebrow: number + tagline */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.48em',
                      textTransform: 'uppercase',
                      color: p.accent,
                    }}
                  >
                    {service.number}
                  </span>
                  <div style={{ width: 28, height: 1, background: p.divider }} />
                  <span
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: 9,
                      letterSpacing: '0.38em',
                      textTransform: 'uppercase',
                      color: p.textMuted,
                    }}
                  >
                    {service.tagline}
                  </span>
                </div>

                {/* Brand name */}
                <h2
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 0.92,
                    color: p.text,
                    margin: 0,
                  }}
                >
                  {service.title}
                </h2>

                {/* Thin accent rule */}
                <div
                  style={{
                    width: 52,
                    height: 1,
                    background: `linear-gradient(to right, ${p.accent}, transparent)`,
                  }}
                />

                {/* Description */}
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.85,
                    letterSpacing: '0.005em',
                    color: p.textMuted,
                    margin: 0,
                    maxWidth: 460,
                  }}
                >
                  {service.description}
                </p>
              </div>

              {/* ── Right — capabilities list ── */}
              <div
                className="flex flex-col flex-1"
                style={{ justifyContent: 'center' }}
              >
                {/* Capabilities label */}
                <span
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 9,
                    letterSpacing: '0.44em',
                    textTransform: 'uppercase',
                    color: p.textMuted,
                    display: 'block',
                    marginBottom: 20,
                  }}
                >
                  Capabilities
                </span>

                {service.items.map((item, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 20,
                        padding: '14px 0',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'Syne, sans-serif',
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: '0.2em',
                          color: p.accent,
                          flexShrink: 0,
                          minWidth: 22,
                        }}
                      >
                        0{itemIndex + 1}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'Syne, sans-serif',
                          fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                          fontWeight: 500,
                          letterSpacing: '-0.01em',
                          color: p.text,
                          margin: 0,
                          lineHeight: 1.3,
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    {itemIndex < service.items.length - 1 && (
                      <div style={{ width: '100%', height: 1, background: p.divider }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Services;
