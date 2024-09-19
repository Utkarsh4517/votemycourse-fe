import React, { useEffect, useRef } from 'react';

const CarbonDirectLink = ({ siteId }) => {
  const adRef = useRef(null);

  useEffect(() => {
    const loadAd = () => {
      const script = document.createElement('script');
      script.src = `https://10183.xml.4armn.com/direct-link?pubid=940411&siteid=${siteId}`;
      script.async = true;
      script.type = 'text/javascript';
      
      if (adRef.current) {
        adRef.current.appendChild(script);
      }
    };

    loadAd();

    return () => {
      if (adRef.current) {
        const script = adRef.current.querySelector('script');
        if (script) {
          adRef.current.removeChild(script);
        }
      }
    };
  }, [siteId]);

  return <div ref={adRef} className="carbon-direct-link"></div>;
};

export default CarbonDirectLink;