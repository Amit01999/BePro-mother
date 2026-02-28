import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Works = () => {
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);
  const brandTagRefs = useRef([]);

  const [currentIndex, setCurrentIndex] = useState(null);

  const text = `Cross-brand solutions built with precision —
    each one a story of ambition
    transformed into measurable impact.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      }
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    // Animate brand tag
    const tag = brandTagRefs.current[index];
    if (tag) {
      gsap.to(tag, { opacity: 1, x: 0, duration: 0.25, ease: "power2.out" });
    }
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });

    const tag = brandTagRefs.current[index];
    if (tag) {
      gsap.to(tag, { opacity: 0, x: 10, duration: 0.2 });
    }
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  return (
    <section id="work" className="flex flex-col min-h-screen bg-[#F6F2EC]">
      <AnimatedHeaderSection
        subTitle={"Selected portfolio · Cross-brand work"}
        title={"Works"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />

      <div
        className="relative flex flex-col font-light"
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            id="project"
            className="relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* Hover overlay — dark fill from bottom */}
            <div
              ref={(el) => { overlayRefs.current[index] = el; }}
              className="absolute inset-0 hidden md:block duration-200 bg-black -z-10 clip-path"
            />

            {/* Title row */}
            <div className="flex items-center justify-between px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white">
              <h2 className="lg:text-[32px] text-[26px] leading-none">
                {project.name}
              </h2>
              <div className="flex items-center gap-6">
                {/* Brand tag — desktop hover reveal */}
                {project.brand && (
                  <span
                    ref={(el) => { brandTagRefs.current[index] = el; }}
                    className="hidden md:block text-[10px] tracking-[0.3em] uppercase opacity-0 translate-x-2.5"
                    style={{ color: "#C8A882" }}
                  >
                    {project.brand}
                  </span>
                )}
                {/* Brand tag — mobile always visible */}
                {project.brand && (
                  <span
                    className="block md:hidden text-[10px] tracking-[0.3em] uppercase text-[#C8A882]"
                  >
                    {project.brand}
                  </span>
                )}
                <Icon
                  icon="lucide:arrow-up-right"
                  className="md:size-6 size-5 transition-colors duration-500 md:group-hover:text-white"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-black/12" />

            {/* Frameworks row */}
            <div className="flex px-10 text-xs leading-loose uppercase transition-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
              {project.frameworks.map((framework) => (
                <p
                  key={framework.id}
                  className="text-black/40 transition-colors duration-500 md:group-hover:text-white/40"
                >
                  {framework.name}
                </p>
              ))}
            </div>

            {/* Mobile preview image */}
            <div className="relative flex items-center justify-center px-10 md:hidden h-[380px]">
              <img
                src={project.bgImage}
                alt={`${project.name}-bg`}
                className="object-cover w-full h-full rounded-md brightness-50"
              />
              <img
                src={project.image}
                alt={`${project.name}`}
                className="absolute bg-center px-14 rounded-xl"
              />
            </div>
          </div>
        ))}

        {/* Desktop floating preview image */}
        <div
          ref={previewRef}
          className="fixed -top-2/6 left-0 z-50 overflow-hidden border-8 border-black pointer-events-none w-[960px] md:block hidden opacity-0"
        >
          {currentIndex !== null && (
            <img
              src={projects[currentIndex].image}
              alt="preview"
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;
