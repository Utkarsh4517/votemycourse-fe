import Script from "next/script";

type Props = {
  pId: string;
};

const GoogleAdsense: React.FC<Props> = ({ pId }) => {
  // if (process.env.NODE_ENV !== "production") {
  //   return null;
  // }
  return (
    // <Script
    //   async
    //   src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
    //   crossOrigin="anonymous"
    //   strategy="afterInteractive"
    // />
    <Script
    type="module"
    src="https://richinfo.co/richpartners/push/js/rp-cl-ob.js?pubid=940411&siteid=351360&niche=33"
    async
    data-cfasync="false"
    crossOrigin="anonymous"
    strategy="lazyOnload"
  />
  );
};

export default GoogleAdsense;