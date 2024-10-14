import React, { useState, useEffect, useRef } from "react";
import TextSizeHandler from "../General/TextSizeHandler";
import {
  PHP,
  html,
  css,
  javascript,
  wordpress,
  jquery,
  photoshop,
  illustrator,
  git,
  aws,
  gcloud,
  dreamweaver,
  seo,
  mobileUI,
  command,
  mysql,
  laravel,
  api,
  rails,
  ios,
  android,
  flutter,
  python,
  django,
  xd,
  tailwind,
  teams,
  windows,
  slack,
  firebase,
  ember,
  reacticon,
  node,
} from "./svg";
// import { Gallery } from "react-grid-gallery";
// import Lightbox from "yet-another-react-lightbox-lite";
// import "yet-another-react-lightbox-lite/styles.css";
import DOMPurify from "dompurify";
import GridGallery from "./GridGallery";

const Modal = ({
  modalSize,
  modalType,
  onClose,
  project,
  lang,
  translatedData,
  children,
}) => {
  const lightboxRef = useRef(null);

  const modalSizeMap = {
    small: "modal-small",
    medium: "modal-medium",
    large: "modal-large",
  };
  let galleryItems = [];
  if (modalType === "modal-project") {
    galleryItems = project.gallery.map((item) => {
      const tagValues = project.keywords.map((keyword) => ({ value: keyword }));
      return item; // Full image path
      // thumb: `https://lh3.googleusercontent.com/d/${item}=w800?authuser=0/view`, // Thumbnail (can be the same or different image)
      // width: 320,
      // height: 212,
      // tags: tagValues,
    });
  }

  //let put default size if no size communicated
  const modalSizeClass = modalSizeMap[modalSize] || "modal-medium";
  const languagesLogos = {
    php: PHP,
    html: html,
    css: css,
    javascript: javascript,
    jquery: jquery,
    photoshop: photoshop,
    illustrator: illustrator,
    wordpress: wordpress,
    git: git,
    aws: aws,
    gcloud: gcloud,
    dreamweaver: dreamweaver,
    seo: seo,
    mobileUI: mobileUI,
    command: command,
    mysql: mysql,
    laravel: laravel,
    api: api,
    rails: rails,
    ios: ios,
    android: android,
    dart: flutter,
    flutter: flutter,
    python: python,
    django: django,
    xd: xd,
    tailwind: tailwind,
    teams: teams,
    windows: windows,
    slack: slack,
    firebase: firebase,
    ember: ember,
    reacticon: reacticon,
    node: node,
  };
  const [indexImage, setIndexImage] = useState(-1);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      // Handle resize logic here
    });

    if (lightboxRef.current) {
      resizeObserver.observe(lightboxRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section className="modal-overlay h-full w-full absolute">
      <div className={`modal ${modalSizeClass} ${modalType}`}>
        <article className="modal-content h-full w-full relative">
          {modalType === "modal-project" ? (
            <section className="modal-content-wrap w-full">
              <h2
                className={`${TextSizeHandler(
                  20,
                  22,
                  24,
                  26
                )} relative text-inverse flex items-center`}
              >
                {project.name[lang]}
              </h2>
              <section className="modal-grid flex w-full p-7 h-full">
                <article className="column-1">
                  {project.url && project.url !== "" && (
                    <>
                      <h6
                        className={`display-inline font-bold text-inverse ${TextSizeHandler(
                          12,
                          12,
                          12,
                          12
                        )}`}
                      >
                        {translatedData.sections.body.general.website}:
                      </h6>
                      <p
                        className={`display-inline text-inverse pl-2 ${TextSizeHandler(
                          12,
                          12,
                          12,
                          12
                        )}`}
                      >
                        <a href={`${project.url}`} target="_blank">
                          {project.url}
                        </a>
                      </p>
                    </>
                  )}

                  <section className="w-full content">
                    <h4 className="font-bold  pt-5 pb-1 mb-3">
                      {translatedData.sections.body.general.duties}:
                    </h4>
                    <ul className="list-duties">
                      {project.duties[lang].map((item, index) => {
                        return (
                          <li key={index}>
                            <p
                              className={`text-inverse ${TextSizeHandler(
                                "normalAll"
                              )}`}
                            >
                              {item}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                    <h4 className="font-bold  pt-5 pb-1 mb-3">
                      {translatedData.sections.body.general.achivements}:
                    </h4>
                    <ul className="list-achivements">
                      {project.achivements[lang].map((item, index) => {
                        return (
                          <li key={index}>
                            <p
                              className={`text-inverse ${TextSizeHandler(
                                "normalAll"
                              )}`}
                            >
                              {item}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                    <article className="languages  pt-3">
                      <h4
                        className={`font-bold pt-5 pb-1 mb-3 ${TextSizeHandler(
                          "normallAll"
                        )}`}
                      >
                        {translatedData.sections.body.general.languages}:
                      </h4>
                      <ul className="project-languages grid">
                        {project.languages.map((item, index) => {
                          return (
                            <li key={index}>
                              <figure
                                className={`${item}`}
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(
                                    languagesLogos[item]
                                  ),
                                }}
                              >
                                {/* <img
                              src={`${logosProgramming[item]}`}
                              alt={`item`}
                            /> */}
                              </figure>
                            </li>
                          );
                        })}
                      </ul>
                    </article>
                    <article className="tools  pt-3">
                      <h4
                        className={`font-bold pt-5 pb-1 mb-3 ${TextSizeHandler(
                          "normallAll"
                        )}`}
                      >
                        {translatedData.sections.body.general.tools}:
                      </h4>
                      <ul className="project-tools grid">
                        {project.tools.map((item, index) => {
                          return (
                            <li key={index}>
                              <figure
                                className={`tools-${item}`}
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(
                                    languagesLogos[item]
                                  ),
                                }}
                              ></figure>
                            </li>
                          );
                        })}
                      </ul>
                    </article>
                  </section>
                </article>
                <article className="column-2" ref={lightboxRef}>
                  <h2
                    className={`gallery-title p-3 text-center w-full relative`}
                  >
                    <span
                      className={`${TextSizeHandler(
                        22,
                        24,
                        26,
                        28
                      )} text-inverse`}
                    >
                      {translatedData.sections.body.general.gallery}
                    </span>
                  </h2>
                  <article className="w-full p-3">
                    <article className="gallery-grid gallery-details pt-2 pb-10 pr-2 pl-2 w-full">
                      <GridGallery
                        galleryContent={galleryItems}
                        translatedData={translatedData}
                        lang={lang}
                        sort={"all"}
                        handleClickToCompany={() => {}}
                        dataFormated={false}
                      />
                    </article>
                  </article>
                </article>
              </section>
            </section>
          ) : (
            <div className="modal-content-inner h-full w-full">{children}</div>
          )}

          <button className="btn btn-closeModal" onClick={onClose}>
            <span className="text-center fs-35px fs-sm-36px fs-md-36px fs-lg-38px">
              ×
            </span>
          </button>
        </article>
      </div>
    </section>
  );
};

export default Modal;
