import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
const Seo = () => {
  const { t } = useTranslation();
  return (
    <Helmet
      script={[
        {
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Portafolio Online Kengreg",
          startDate: "",
          endDate: "",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: "",
            address: {
              "@type": "PostalAddress",
              streetAddress: "",
              addressLocality: "",
              postalCode: "",
              addressRegion: "",
              addressCountry: "日本",
            },
          },
          description: "",
          organizer: {
            "@type": "Organization",
            name: "",
            url: "",
          },
        },
      ]}
    >
      <div itemscope itemtype="http://schema.org/Event">
        <h1 itemprop="name">Portafolio Online Kengreg</h1>
        <p>
          Date: <time itemprop="startDate" datetime=""></time> ～{" "}
          <time itemprop="endDate" datetime=""></time>
          <br />
          Location:{" "}
          <span
            itemprop="location"
            itemscope
            itemtype="http://schema.org/Place"
          >
            <span itemprop="name"></span>,
            <span
              itemprop="address"
              itemscope
              itemtype="http://schema.org/PostalAddress"
            >
              <span itemprop="streetAddress"></span>,
              <span itemprop="addressLocality"></span>,
              <span itemprop="postalCode"></span>,
              <span itemprop="addressRegion"></span>,
              <span itemprop="addressCountry">日本</span>
            </span>
          </span>
        </p>
        <p itemprop="description"></p>
      </div>
      <title>Portafolio Online Kengreg</title>
      <link rel="canonical" href="" />
      <meta name="description" content="" />
      <link rel="icon" href="" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={``}></meta>
      <meta name="twitter:title" content="Portafolio Online Kengreg" />
      <meta property="og:url" content="" />
      <meta property="og:title" content="Portafolio Online Kengreg" />
      <meta property="og:type" content="product" />
      <meta property="og:site_name" content="Portafolio Online Kengreg" />
      <meta property="og:image" content={``} />
      <meta property="og:description" content="" />
    </Helmet>
  );
};
export default Seo;
