import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";
import { useRef } from "react";

const Contact = () => {
  const text = `Ready to grow, scale, or transform?
    Tell us your vision and we will show you the path forward.`;

  const closingRef = useRef(null);
  const dividerRefs = useRef([]);

  const items = [
    "BePro · Five Brands · One Vision",
    "BePro · Five Brands · One Vision",
    "BePro · Five Brands · One Vision",
    "BePro · Five Brands · One Vision",
    "BePro · Five Brands · One Vision",
  ];

  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });

    // Closing statement — no extra trigger, just scroll-triggered once
    if (closingRef.current) {
      gsap.from(closingRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: closingRef.current,
          start: "top 95%",
        },
      });
    }
  }, []);

  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-[#F0EBE3]"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"Start the conversation"}
          title={"Contact"}
          text={text}
          textColor={"text-black"}
          withScrollTrigger={true}
        />

        {/* Contact channels */}
        <div className="flex px-10 font-light text-black uppercase lg:text-[32px] text-[26px] leading-none mb-16">
          <div className="flex flex-col w-full gap-10">
            {/* E-mail */}
            <div className="social-link">
              <h2 className="text-black/40 text-sm tracking-[0.4em] uppercase mb-3">
                E-mail
              </h2>
              <div
                ref={(el) => (dividerRefs.current[0] = el)}
                className="w-full h-px bg-black/12 mb-4"
              />
              <a
                href="mailto:contact.beprobd@gmail.com"
                className="text-xl tracking-wide lowercase md:text-2xl lg:text-3xl text-black/70 hover:text-[#C8A882] transition-colors duration-300"
              >
                contact.beprobd@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="social-link">
              <h2 className="text-black/40 text-sm tracking-[0.4em] uppercase mb-3">
                Phone
              </h2>
              <div
                ref={(el) => (dividerRefs.current[1] = el)}
                className="w-full h-px bg-black/12 mb-4"
              />
              <a
                href="tel:+8801626085837"
                className="text-xl lowercase md:text-2xl lg:text-3xl text-black/70 hover:text-[#C8A882] transition-colors duration-300"
              >
                +880 1626-085837
              </a>
            </div>

            {/* Location */}
            <div className="social-link">
              <h2 className="text-black/40 text-sm tracking-[0.4em] uppercase mb-3">
                Location
              </h2>
              <div
                ref={(el) => (dividerRefs.current[2] = el)}
                className="w-full h-px bg-black/12 mb-4"
              />
              <p className="text-xl lowercase md:text-2xl lg:text-3xl text-black/70">
                6th Floor, United Tower, 4 KDA Avenue (Shib bari Mor), Khulna
              </p>
            </div>

            {/* Socials */}
            <div className="social-link">
              <h2 className="text-black/40 text-sm tracking-[0.4em] uppercase mb-3">
                Follow BePro
              </h2>
              <div
                ref={(el) => (dividerRefs.current[3] = el)}
                className="w-full h-px bg-black/12 mb-4"
              />
              <div className="flex flex-wrap gap-3">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs leading-loose tracking-widest uppercase md:text-sm text-black/45 hover:text-[#C8A882] transition-colors duration-300"
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Closing brand statement */}
        <div
          ref={closingRef}
          className="px-10 pb-12 flex items-end justify-between gap-4 border-t border-black/8 pt-12"
        >
          <div>
            <span
              style={{ fontFamily: "Syne, sans-serif" }}
              className="text-5xl md:text-7xl lg:text-9xl font-black text-black/8 uppercase tracking-tight leading-none select-none"
            >
              Be<span style={{ color: "#C8A882", opacity: 0.2 }}>Pro</span>
            </span>
          </div>
          <p className="text-[10px] tracking-[0.35em] uppercase text-black/25 font-light text-right max-w-xs">
            A Gitanjoli Group company
            <br />
            Five brands · One vision
          </p>
        </div>
      </div>

      {/* Bottom marquee */}
      <Marquee
        items={items}
        className="text-black bg-transparent border-t border-black/10"
        icon="mdi:star-four-points"
        iconClassName="text-[#C8A882]"
      />
    </section>
  );
};

export default Contact;
