import { useEffect, useState } from "react";

export default function Tweet({ tweetID }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load Twitter script if not already loaded
    const loadTwitterScript = () => {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => {
        renderTweet();
      };
      document.body.appendChild(script);
    };

    const renderTweet = () => {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets
          .createTweet(tweetID, document.getElementById(tweetID), {
            align: "center",
            conversation: "none",
            dnt: true,
            theme: "dark",
          })
          .then(() => setIsLoading(false));
      }
    };

    // Check if Twitter widgets script is already loaded
    if (window.twttr && window.twttr.widgets) {
      renderTweet();
    } else {
      loadTwitterScript();
    }
  }, [tweetID]);

  return (
    <div className="w-full animate-fadeIn" id={tweetID}>
      {isLoading && <p>LOADING</p>}
    </div>
  );
}
