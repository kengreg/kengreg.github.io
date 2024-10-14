import siteData from "../../components/kengreg/siteData.json";
// import jobsDataLocal from "../../components/kengreg/data/jobs.json";
import React, { useState, useEffect } from "react";
import {
  translate,
  getBrowserLanguage,
  toggleLanguage,
} from "../../components/General/language";
import Seo from "../../components/kengreg/Seo";
import { AssetsProvider } from "../../components/General/AssetsContext";
import TextSizeHandler from "../../components/General/TextSizeHandler";
import Header from "../../components/kengreg/Header";
import Sidebar from "../../components/kengreg/Sidebar";
import Jobs from "../../components/kengreg/Jobs";
import { Menu } from "@headlessui/react";
import GridGallery from "../../components/kengreg/GridGallery";
import("../../components/kengreg/index.scss");
const Contents = ({ setNavBar, eventOption, urlName, introScreen }) => {
  // setting up the language and loading
  const imageNames = [];
  const [isLoading, setIsLoading] = useState(false);
  const [translatedData, setTranslatedData] = useState({});
  const [lang, setLang] = useState(getBrowserLanguage());
  //Getting the current dev or prd routes
  const currentDomain = window.location.hostname;
  const local = currentDomain.includes("localhost");
  //DB for app to work
  const [jsonName, setJsonName] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [headerPage, setHeaderPage] = useState(null);
  const [currentHeader, setCurrentHeader] = useState(0);
  const [jsonJobsData, setJsonJobsData] = useState(null);
  const [jsonProfileData, setJsonProfileData] = useState(null);
  const [toggleGallery, setToggleGallery] = useState(false);
  const [viewCompany, setViewCompany] = useState(null);
  const loadingMessage = {
    en: "Charging your save...",
    ja: "セーブデータを読み込んでいます。。。",
  };

  //functions
  const toogleLang = () => {
    const changedLang = toggleLanguage(lang);
    setLang(changedLang);
  };

  const sorting = (sortword) => {
    setCurrentHeader(0);
    setSortBy(sortword);
    setToggleGallery(true);
  };

  const toggleScreen = () => {
    setCurrentHeader(0);
    setSortBy("all");
    setToggleGallery(!toggleGallery);
  };

  const toggleHeaderPage = (head) => {
    const n = headerPage[head].id;
    setCurrentHeader(n);
  };

  const handleClickToCompany = (companyTag) => {
    const index = jsonJobsData.findIndex(
      (item) => item.companyTag === companyTag
    );
    toggleHeaderPage(jsonJobsData[index].country);
    setViewCompany(jsonJobsData[index]);
    setToggleGallery(false);
    setTimeout(() => {
      const targetElement = document.getElementById("projects");
      if (targetElement) {
        const offset = 100; // Adjust this value to give more space at the top
        const elementPosition =
          targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
        targetElement.scrollIntoView({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 300);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    // if (local) {
    //   setIsLoading(true);
    //   setError(null);
    //   setData(jobsDataLocal);
    //   setTimeout(() => {
    //     setIsLoading(false);
    //   }, 3000);
    // } else {
    //   // Fetch data with the provided JSON name
    // }
    fetchData(jsonName);
  };

  const fetchData = async (jsonName) => {
    setIsLoading(true); // Start loading
    setError(null); // Clear previous errors
    try {
      const response = await fetch(
        `https://firebasestorage.googleapis.com/v0/b/tomitakenbridge.appspot.com/o/${jsonName}.json?alt=media&token=bfc4bbe3-3590-486c-acaa-6571dc0934a2`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      const timestamp = Date.now();
      setData(json);
      // Store fetched data in localStorage
      localStorage.setItem("dataPortfolio", JSON.stringify(json));
      localStorage.setItem("dataTimestamp", timestamp);
    } catch (error) {
      console.error("Error fetching JSON:", error);
      setError("The player data is incorrect. Try again."); // Set error message
      setIsLoading(false);
    } finally {
      // Stop loading
      // setIsLoading(false);
    }
  };
  //useeffects===============================================

  // UseEffect to check localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("dataPortfolio");
    const storedTimestamp = localStorage.getItem("dataTimestamp");
    console.log(storedData);
    // if (storedData && !local) {
    if (storedData && storedTimestamp) {
      const currentTime = Date.now();
      const timeDifference = currentTime - parseInt(storedTimestamp, 10);
      const expirationTime = 30 * 60 * 1000;
      // If data exists in localStorage, parse it and set it in state
      if (timeDifference < expirationTime) {
        // If less than 30 minutes have passed, use the stored data
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
      } else {
        // If more than 30 minutes have passed, clear the localStorage
        localStorage.removeItem("dataPortfolio");
        localStorage.removeItem("dataTimestamp");
        setError("The limit time has expired.");
        setJsonJobsData(null);
        setJsonProfileData(null);
        setHeaderPage(null);
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      setJsonJobsData(data.jobsdata);
      setJsonProfileData(data.profile);
      setHeaderPage(data.profile.headerDictionary);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (siteData && lang) {
      const translated = translate(siteData, lang);
      setTranslatedData(translated);
    }
  }, [lang]);
  useEffect(() => {
    if (!toggleGallery) {
      setViewCompany(null);
    }
  }, [toggleGallery]);
  //show loading while verifying the json data
  if (isLoading) {
    return (
      <section className="h-full w-full flex items-center justify-center loader-wrap">
        <div className="load-wrapp">
          <div className="loader-logo">
            <h6 className={`text-inverse ${TextSizeHandler(15, 15, 16, 16)}`}>
              {loadingMessage[lang]}
            </h6>
          </div>
          <div className="load-4">
            <div className="ring-1"></div>
          </div>
        </div>
      </section>
    );
  }

  if (translatedData.sections && (!jsonJobsData || !jsonProfileData)) {
    return (
      <section className="form-container flex flex-col items-center justify-center w-full">
        <article className="lang-container">
          <ul className="flex h-full items-center">
            {["en", "ja"].map((language) => (
              <li key={language} className="h-full flex">
                <button
                  className={`btn retro ${lang === language ? "active" : ""}`}
                  onClick={toogleLang}
                  disabled={lang === language}
                >
                  <span
                    className={`font-bold ${TextSizeHandler(20, 25, 30, 35)}`}
                  >
                    {language.toUpperCase()}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </article>
        <article className="form">
          <h2
            className={`form-subtitle pb-3 ${TextSizeHandler(16, 18, 20, 22)}`}
          >
            {translatedData.sections.form.welcome}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              value={jsonName}
              onChange={(e) => setJsonName(e.target.value)}
              placeholder={`${translatedData.sections.form.password}`}
              className="border rounded px-4 py-2 mb-2"
              required
            />
            <button type="submit" className="button button-retro retro">
              {translatedData.sections.btn.btn_enter_portfolio}
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </article>
      </section>
    );
  }

  if (jsonJobsData && jsonProfileData) {
    return (
      <AssetsProvider urlName={urlName} imageNames={imageNames}>
        <section className={`w-full main-container ${lang}`}>
          <div className={introScreen ? "" : "invisible"}></div>
          <article
            className={
              introScreen
                ? "invisible"
                : "portafolio-container kengreg-container w-full h-full relative"
            }
          >
            <Seo />
            <section className="w-full h-full portafolio-container-wrap">
              <section className="w-full h-full portafolio-container-inner">
                <article className="portafolio-header w-full">
                  <Header
                    translatedData={translatedData}
                    profileData={jsonProfileData}
                    toogleLang={toogleLang}
                    lang={lang}
                    currentHeader={currentHeader}
                  />
                </article>
                <section className="portafolio-body w-full relative container-max-width margin-auto">
                  <article className="panel-container-grid w-full">
                    <article
                      className={`${
                        toggleGallery || currentHeader !== 0 ? "hidden" : ""
                      } panel-menu panel-menu-gridTitle container-max-width`}
                    >
                      <h2
                        className={`section-title text-inverse text-center pt-8 pr-2 pl-2 pb-8 ${TextSizeHandler(
                          17,
                          17,
                          20,
                          20
                        )}`}
                      >
                        {translatedData.sections.body.jobs.title}
                      </h2>
                    </article>
                  </article>
                  <article className="w-full relative flex portafolio-body-inner">
                    <aside className="portafolio-filter flex">
                      <Sidebar
                        jsonProfileData={jsonProfileData}
                        translatedData={translatedData}
                        lang={lang}
                        galleryGrid={toggleGallery}
                        toggleScreen={toggleScreen}
                        sorting={sorting}
                      />
                    </aside>
                    {!toggleGallery ? (
                      <article className="portafolio-grid pt-2 pb-10 pr-2 pl-2">
                        <Jobs
                          translatedData={translatedData}
                          lang={lang}
                          jobsData={jsonJobsData}
                          viewCompany={viewCompany}
                          toggleHeaderPage={toggleHeaderPage}
                          setCurrentHeader={setCurrentHeader}
                        />
                      </article>
                    ) : (
                      <article className="gallery-grid pt-2 pb-10 pr-2 pl-2 w-full">
                        <GridGallery
                          galleryContent={jsonProfileData.gallery}
                          translatedData={translatedData}
                          lang={lang}
                          sort={sortBy}
                          handleClickToCompany={handleClickToCompany}
                          dataFormated={true}
                        />
                      </article>
                    )}
                  </article>
                </section>
              </section>
            </section>
          </article>
        </section>
      </AssetsProvider>
    );
  }

  return null;
};

export default Contents;
