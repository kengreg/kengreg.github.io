import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import TextSizeHandler from "../General/TextSizeHandler";
import Modal from "./Modal";
import { circleArrowRight } from "./svg";
const GridGallery = ({
  translatedData,
  lang,
  galleryContent,
  sort,
  handleClickToCompany,
  dataFormated,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [scrollPosition, setScrollPosition] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  console.log(galleryContent);

  const handleClick = (data, index) => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    setDataModal({
      size: "medium",
      type: "modal-gallery",
      onclose: setShowModal,
      content: data,
      lang: lang,
    });
    setCurrentIndex(index);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    if (currentIndex < galleryContent.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setDataModal({
        ...dataModal,
        content: galleryContent[nextIndex],
      });
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setDataModal({
        ...dataModal,
        content: galleryContent[prevIndex],
      });
    }
  };

  useEffect(() => {
    if (Object.keys(dataModal).length > 0) {
      setShowModal(true);
    }
  }, [dataModal]);

  useEffect(() => {
    if (Object.keys(dataModal).length > 0) {
      setShowModal(true);
    }
  }, [dataModal]);

  return (
    <section className="gallery-container-inner w-full h-full ">
      <article className="w-full h-full">
        <ul className="list-galleryGrid w-full grid h-full ">
          {galleryContent.map((item, index) => {
            return (
              <li
                key={index}
                className={`${
                  sort !== "all" && item[2].includes(sort)
                    ? ""
                    : sort !== "all"
                    ? "hidden"
                    : ""
                }`}
                onClick={() => {
                  handleClick(item, index);
                }}
              >
                <img
                  src={`https://lh3.googleusercontent.com/d/${
                    dataFormated ? item[0] : item
                  }=w600?authuser=0/view`}
                  alt=""
                />
              </li>
            );
          })}
        </ul>
      </article>
      {showModal && (
        <Modal
          modalSize={dataModal.size}
          modalType={dataModal.type}
          isOpen={dataModal.open}
          project={dataModal.data}
          lang={lang}
          translatedData={translatedData}
          onClose={() => {
            window.scrollTo({
              top: scrollPosition,
              behavior: "smooth", // Optional, for smooth scrolling
            });
            dataModal.onclose(false); // Close the modal using the setShowModal function
          }}
        >
          <section className="gallery-img margin-auto relative h-full">
            {dataFormated && (
              <article className="panel-story w-full absolute">
                <article className="panel-story-inner w-full relative">
                  <div className="separator">
                    <span></span>
                  </div>
                  <section className="panel-story-text w-full">
                    <h4
                      className={`text-inverse ${TextSizeHandler(
                        15,
                        15,
                        16,
                        16
                      )}`}
                    >
                      {translatedData.sections.body.jobs.modalFeaturedTitle}
                      <span className="text-inverse">
                        {dataModal.content?.[1]}
                      </span>
                    </h4>
                  </section>
                  <article className="absolute back-container">
                    <button
                      onClick={() => {
                        handleClickToCompany(dataModal.content?.[1]);
                      }}
                      className="btn btn-back"
                    >
                      <figure
                        className="btn-back-icon"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(circleArrowRight),
                        }}
                      ></figure>
                      <p
                        className={`${TextSizeHandler(
                          15,
                          15,
                          17,
                          17
                        )} font-bold`}
                      >
                        {translatedData.sections.btn.btn_viewCompany}
                      </p>
                    </button>
                  </article>
                </article>
              </article>
            )}

            <figure className="relative">
              <img
                src={`https://lh3.googleusercontent.com/d/${
                  dataFormated ? dataModal.content?.[0] : dataModal.content
                }=w600?authuser=0/view`}
                alt=""
              />
            </figure>

            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="left-arrow absolute nav-arrow"
            >
              <figure
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(circleArrowRight),
                }}
              ></figure>
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === galleryContent.length - 1}
              className="right-arrow absolute nav-arrow"
            >
              <figure
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(circleArrowRight),
                }}
              ></figure>
            </button>
          </section>
        </Modal>
      )}
    </section>
  );
};

export default GridGallery;
