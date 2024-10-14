import React, { useState, useEffect } from "react";
import TextSizeHandler from "../../components/General/TextSizeHandler";
import Modal from "./Modal";
import { circleArrowRight } from "./svg";
import DOMPurify from "dompurify";
const Project = ({ company, onBack, translatedData, lang }) => {
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [scrollPosition, setScrollPosition] = useState(null);

  const handleClick = (project) => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    setDataModal({
      size: "large",
      type: "modal-project",
      onclose: setShowModal,
      content: project,
      lang: lang,
    });
    setShowModal(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional, for smooth scrolling
    });
  };

  return (
    <div id="projects" className="max-w-6xl mx-auto px-4 projects-wrap">
      <section className="mb-10 relative">
        <article className="absolute back-container">
          <button onClick={onBack} className="btn btn-back">
            <figure
              className="btn-back-icon"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(circleArrowRight),
              }}
            ></figure>
            <p className={`${TextSizeHandler(15, 15, 17, 17)} font-bold`}>
              {translatedData.sections.btn.back}
            </p>
          </button>
        </article>
        <article className="panel-menu container-max-width p-5">
          <h2
            className={`${TextSizeHandler(
              20,
              24,
              26,
              28
            )} text-inverse font-bold mb-2`}
          >
            {company.companyName}
          </h2>
          <p className={`${TextSizeHandler("normalAll")} text-inverse mb-4`}>
            {company.companyDescription[lang]}
          </p>
          {company.companyUrl !== "" && (
            <a
              href={company.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative  link-company font-bold ${TextSizeHandler(
                "normalAll"
              )}`}
            >
              <span className={``}>
                {translatedData.sections.btn.visit_company}
              </span>
            </a>
          )}
        </article>
      </section>

      {/* Projects Grid */}
      <section className="projects grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {company.projects
          .slice()
          .reverse()
          .map((project, index) => {
            return (
              <article
                key={index}
                className={`border rounded-lg project-item relative`}
                data-year={`${project.year}${lang === "en" ? "" : "年"}`}
                style={{
                  "--backgroundImage": `url(https://lh3.googleusercontent.com/d/${project.img}=w600?authuser=0/view)`,
                }}
                onClick={() => {
                  handleClick(project);
                }}
              >
                <article className="project-item-inner relative">
                  <header className="relative project-header mb-8">
                    <h3
                      className={`${TextSizeHandler(
                        20,
                        22,
                        24,
                        25
                      )} project-title font-semibold  relative`}
                    >
                      {project.name[lang]}
                    </h3>
                    <button className="btn btn-project btn-purple margin-auto absolute">
                      <span>{translatedData.sections.btn.btn_project}</span>
                    </button>
                  </header>
                  <section className="project-item-text">
                    <p
                      className={`project-description pt-4 pb-4 ${TextSizeHandler(
                        14,
                        14,
                        13,
                        12
                      )}`}
                    >
                      {project.description[lang]}
                    </p>
                    {/* <hr className="separator-bottom" /> */}
                    {/* <article className={`mt-4`}>
                      <h5 className={`${TextSizeHandler(14, 15, 15, 15)}`}>
                        <strong>
                          {translatedData.sections.body.jobs.languagesTitle}:
                        </strong>
                      </h5>

                      <ul className="list-programmin flex flex-wrap mb-2">
                        {project.languages.map((item, index) => {
                          return (
                            <li key={index}>
                              <p className={`${TextSizeHandler("normalAll")}`}>
                                {item}
                                {index === project.languages.length - 1
                                  ? "."
                                  : ", "}
                              </p>
                            </li>
                          );
                        })}
                      </ul>

                      <p className={`${TextSizeHandler("normalAll")}`}>
                        <strong>
                          {translatedData.sections.body.jobs.toolstitle}:
                        </strong>
                      </p>
                      <ul className="list-tools flex flex-wrap mb-2">
                        {project.tools.map((item, index) => {
                          return (
                            <li key={index}>
                              <p className={`${TextSizeHandler("normalAll")}`}>
                                {item}
                                {index === project.tools.length - 1
                                  ? "."
                                  : ", "}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </article> */}
                  </section>
                </article>
              </article>
            );
          })}
      </section>
      {showModal && (
        <Modal
          modalSize={dataModal.size}
          modalType={dataModal.type}
          isOpen={dataModal.open}
          project={dataModal.content}
          lang={lang}
          translatedData={translatedData}
          onClose={() => {
            window.scrollTo({
              top: scrollPosition,
              behavior: "smooth",
            });
            dataModal.onclose(false);
          }}
        ></Modal>
      )}
    </div>
  );
};

export default Project;
