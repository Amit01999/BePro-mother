import { useRef } from 'react';
import Marquee from '../components/Marquee';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ContactSummary = () => {
  const containerRef = useRef(null);
  const items = [
    'Innovation',
    'Precision',
    'Trust',
    'Collaboration',
    'Excellence',
  ];
  const items2 = [
    'partner with bepro',
    'partner with bepro',
    'partner with bepro',
    'partner with bepro',
    'partner with bepro',
  ];

  useGSAP(() => {
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'center center',
        end: '+=800 center',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-between min-h-screen gap-12 mt-16"
    >
      <div className="mt-16">
        <Marquee items={items} />
      </div>

      <div className="overflow-hidden font-light text-center text-[32px] sm:text-[42px] md:text-[52px] lg:text-[76px]">
        <p>
          {'" Let\'s build something '}
          <br />
          <span className="font-normal">extraordinary</span>
          {' & '}
          <span className="italic">lasting</span>
          <br />
          {'together '}
          <span className="text-gold">with BePro</span>
          {' "'}
        </p>
      </div>

      <Marquee
        items={items2}
        reverse={true}
        className="text-black bg-transparent border-y-2"
        iconClassName="stroke-gold stroke-2 text-primary"
        icon="material-symbols-light:square"
      />
    </section>
  );
};

export default ContactSummary;
