import React, { useEffect } from "react";

const GoogleAd = () => {
  useEffect(() => {
    // Ensure that the adsbygoogle array exists and push the new ad
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="google-ads w-full">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1011569286097191"
        data-ad-slot="8175395802"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default GoogleAd;
