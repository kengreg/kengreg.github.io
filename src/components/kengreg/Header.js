import React, { useState, useEffect } from "react";
import TextSizeHandler from "../../components/General/TextSizeHandler";
import HeaderCountry from "./HeaderCountry";
const Header = ({
  translatedData,
  profileData,
  toogleLang,
  lang,
  currentHeader,
}) => {
  const skillsCategories = profileData.skills;
  const softSkillsCategories = profileData.softSkill;
  const languages = profileData.languages;
  const dictionaryCountry = profileData.headerDictionary;

  const getKeyByValue = (obj, value) => {
    // return Object.entries(obj).find(([key, val]) => val === value)?.[0];
    return Object.entries(obj).find(([key, val]) => val.id === value)?.[0];
  };
  return (
    <header
      className={`${
        currentHeader !== 0 ? "country" : ""
      } header-container w-full h-full`}
    >
      {currentHeader === 0 ? (
        <article className="header-wrap relative w-full container-max-width margin-auto h-full">
          <article className="header-wrap-inner relative w-full h-full">
            <article className="profile-data absolute w-full">
              <h1
                className={`relative w-full ${TextSizeHandler(14, 15, 16, 16)}`}
              >
                {profileData.name}
                <span className={`absolute ${TextSizeHandler(13, 14, 15, 15)}`}>
                  {profileData.email}
                </span>
              </h1>
            </article>
            <figure className="profile-img absolute">
              <img src={`${profileData.img}`} alt="" />
            </figure>
            <section className="relative section-skills">
              <header className="skills-header flex justify-around">
                <h2
                  className={`relative font-bold card-subtitle ${TextSizeHandler(
                    14,
                    14,
                    15,
                    15
                  )}`}
                >
                  {profileData.technicianSkill[lang]}
                </h2>
                <h2
                  className={`pc relative font-bold card-subtitle ${TextSizeHandler(
                    14,
                    14,
                    15,
                    15
                  )}`}
                >
                  {profileData.humanSkill[lang]}
                </h2>
              </header>
              <section className="section-skills-wrap w-full grid">
                <article className="skill-box overflow-auto">
                  <ul className="list-skills flex flex-col">
                    {Object.entries(skillsCategories).map(
                      ([skill, subSkills], index) => {
                        return (
                          <li key={index} className="w-full h-full">
                            <h3
                              className={`relative list-subtitle ${TextSizeHandler(
                                14,
                                14,
                                15,
                                15
                              )}`}
                            >
                              {Object.keys(skillsCategories)[index].replace(
                                "_",
                                " "
                              )}
                            </h3>
                            <ul className="list-subskills">
                              {subSkills.map((subskill, subindex) => (
                                <li
                                  key={subindex}
                                  className="w-full h-full pl-1 pr-1 pt-1 pb-2"
                                >
                                  <dl className="flex flex-col w-full">
                                    <dt className="w-full">
                                      <p
                                        className={`relative ${TextSizeHandler(
                                          11,
                                          11,
                                          12,
                                          12
                                        )}`}
                                      >
                                        {subskill[0]}
                                      </p>
                                    </dt>
                                    <dd className="w-full">
                                      <div className={`status-bar w-full`}>
                                        <div
                                          className="status-level"
                                          style={{ width: subskill[1] + "%" }}
                                          data-size={`${subskill[1]}`}
                                        ></div>
                                      </div>
                                    </dd>
                                  </dl>
                                </li>
                              ))}
                            </ul>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </article>
                <article className="softskill-box w-full overflow-auto pl-1 pr-2">
                  <ul className="list-softskills w-full ">
                    {softSkillsCategories.map((soft, index) => {
                      return (
                        <li key={index} className="w-full pt-1 pb-1">
                          <dl className="flex flex-col w-full">
                            <dt className="w-full pb-2">
                              <p
                                className={`relative ${TextSizeHandler(
                                  13,
                                  13,
                                  14,
                                  14
                                )}`}
                              >
                                {soft[0][lang]}
                              </p>
                            </dt>
                            <dd className="w-full">
                              <div className={`status-bar w-full`}>
                                <div
                                  className="status-level-gray"
                                  style={{ width: soft[1] + "%" }}
                                  data-size={`${soft[1]}`}
                                ></div>
                              </div>
                            </dd>
                          </dl>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              </section>
            </section>
          </article>
        </article>
      ) : (
        <HeaderCountry
          currentCountry={getKeyByValue(dictionaryCountry, currentHeader)}
          dictionaryCountry={dictionaryCountry}
          lang={lang}
        />
      )}
      <nav className="navbar fixed w-full">
        <div className="absolute header-title">
          <h3
            className={`font-bold ${TextSizeHandler(20, 22, 24, 26)}`}
            data-text={`${translatedData.sections.header.title}`}
          >
            {translatedData.sections.header.title}
          </h3>
        </div>
        <button className="btn btn-lang absolute" onClick={toogleLang}>
          <span className={`font-bold ${TextSizeHandler(16, 17, 18, 18)}`}>
            {lang === "ja" ? "ENGLISH" : "日本語"}
          </span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
