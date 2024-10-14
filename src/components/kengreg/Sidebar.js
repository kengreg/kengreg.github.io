import React, { useState, useEffect } from "react";
import TextSizeHandler from "../General/TextSizeHandler";
const Sidebar = ({
  translatedData,
  lang,
  jsonProfileData,
  galleryGrid,
  toggleScreen,
  sorting,
}) => {
  const uniqueWords = new Set();
  jsonProfileData.gallery.forEach((item) => {
    const tags = item[2];
    tags.forEach((tag) => uniqueWords.add(tag));
  });
  return (
    <aside className="sidebar-container w-full h-full flex pb-4">
      <article className="panel-menu w-full p-5 pt-8">
        <article className="main-buttons w-full flex">
          <button
            className={`btn btn-sub-menu scoop ${!galleryGrid && "active"}`}
            onClick={toggleScreen}
            disabled={!galleryGrid}
          >
            <h3
              className={`relative ${TextSizeHandler(
                17,
                22,
                15,
                15
              )} h-full flex items-center justify-center`}
            >
              {translatedData.sections.body.jobs.companiesTitle}
            </h3>
          </button>
          <button
            className={`btn btn-sub-menu scoop ${galleryGrid && "active"}`}
            onClick={toggleScreen}
            disabled={galleryGrid}
          >
            <h3 className={`relative ${TextSizeHandler(17, 22, 15, 15)}`}>
              {translatedData.sections.body.jobs.featuredTitle}
            </h3>
          </button>
        </article>
        <ul className="list-filter w-full">
          {[...uniqueWords].map((word, index) => (
            <li
              key={index}
              className=""
              onClick={() => {
                sorting(word);
              }}
            >
              <figure className="mr-3 ml-2">
                <img
                  src="https://lh3.googleusercontent.com/d/1Y54zTbFWjHfF5vlhnj_z5LNCd25G05tt=w600?authuser=0/view"
                  alt=""
                />
              </figure>
              <p className={`${TextSizeHandler(15, 16, 16, 17)}`}>
                {word.replace("_", " ")}
              </p>
            </li>
          ))}
        </ul>
      </article>
    </aside>
  );
};

export default Sidebar;
