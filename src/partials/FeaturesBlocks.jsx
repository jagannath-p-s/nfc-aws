import React, { useState, useEffect, useRef } from 'react';
import Transition from '../utils/Transition';
import wireless from '../images/wireless.png'; 
import nfc from '../images/nfc.png';
import internet from '../images/internet.png';

function FeaturesBlocks() {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [areItemsScrolled, setAreItemsScrolled] = useState(false);
  const featureBlocksRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (featureBlocksRef.current) {
        const { top } = featureBlocksRef.current.getBoundingClientRect();
        setIsHeaderScrolled(top < window.innerHeight * 0.75);
        setAreItemsScrolled(top < window.innerHeight * 0.5);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      className={`relative ${areItemsScrolled ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      ref={featureBlocksRef}
    >
      <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none" aria-hidden="true"></div>
      <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`py-12 md:py-20 ${isHeaderScrolled ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">How White Tap NFC Business Cards Work</h2>
            <p className="text-xl text-gray-600">Put your contact info directly onto customers’ devices with your White Tap NFC smart visiting card.</p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
            {/* 1st item */}
            <Transition
              show={areItemsScrolled}
              enter="transition ease-in-out duration-700 transform order-first"
              enterStart="opacity-0 translate-y-16"
              enterEnd="opacity-100 translate-y-0"
              leave="transition ease-in-out duration-300 transform absolute"
              leaveStart="opacity-100 translate-y-0"
              leaveEnd="opacity-0 -translate-y-16"
            >
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <img src={wireless} className="w-16 h-16 p-1 -mt-1 mb-2" alt="Wireless" /> 
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  Hand holding NFC card
                </h4>
                <p className="text-gray-600 text-center">
                  Put your contact info directly onto customers’ devices with
                  your NFC smart business card.
                </p>
              </div>
            </Transition>
            {/* 2nd item */}
            <Transition
              show={areItemsScrolled}
              enter="transition ease-in-out duration-700 transform order-first"
              enterStart="opacity-0 translate-y-16"
              enterEnd="opacity-100 translate-y-0"
              leave="transition ease-in-out duration-300 transform absolute"
              leaveStart="opacity-100 translate-y-0"
              leaveEnd="opacity-0 -translate-y-16"
            >
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <img src={nfc} className="w-16 h-16 p-1 -mt-1 mb-2" alt="Wireless" />
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  NFC Technology
                </h4>
                <p className="text-gray-600 text-center">
                  People hold their phone over the NFC business card to activate
                  the phone’s built-in scanning technology.
                </p>
              </div>
            </Transition>
            {/* 3rd item */}
            <Transition
              show={areItemsScrolled}
              enter="transition ease-in-out duration-700 transform order-first"
              enterStart="opacity-0 translate-y-16"
              enterEnd="opacity-100 translate-y-0"
              leave="transition ease-in-out duration-300 transform absolute"
              leaveStart="opacity-100 translate-y-0"
              leaveEnd="opacity-0 -translate-y-16"
            >
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <img src={internet} className="w-16 h-16 p-1 -mt-1 mb-2" alt="Wireless" />
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  Website
                </h4>
                <p className="text-gray-600 text-center">
                  Customers can visit your profile on our website to learn more
                  about you and your business.
                </p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesBlocks;
