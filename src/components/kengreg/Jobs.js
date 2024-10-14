import React, { useState } from "react";

import Project from "./Projects";
import "./index.scss"; // SCSS file for grid styling
import TextSizeHandler from "../General/TextSizeHandler";

const Jobs = ({
  translatedData,
  lang,
  jobsData,
  viewCompany,
  toggleHeaderPage,
  setCurrentHeader,
}) => {
  const [selectedCompany, setSelectedCompany] = useState(viewCompany || null);

  // Handle click on a company
  const handleClick = (company) => {
    setSelectedCompany(company);
    toggleHeaderPage(company.country);
  };

  // If a company is selected, render the Project component
  if (selectedCompany) {
    return (
      <Project
        company={selectedCompany}
        onBack={() => {
          setSelectedCompany(null);
          setCurrentHeader(0);
        }}
        translatedData={translatedData}
        lang={lang}
      />
    );
  }
  return (
    <section className="job-container w-full">
      <ul className="job-grid-container mx-auto max-w-6xl px-4 w-full container-max-width">
        {jobsData.map((company, index) => (
          <li
            key={index}
            className="job-item flex flex-col text-center relative"
            onClick={() => handleClick(company)}
            data-country={`${company.country}`}
          >
            <figure className="pt-4 pl-4 pr-4">
              <div className="w-full img-wrap flex items-center">
                <img
                  src={company.companyLogo}
                  alt={company.companyName}
                  className="company-logo w-full object-cover rounded-lg cursor-pointer"
                />
              </div>
            </figure>
            <h3
              className={`text-center pt-3 pb-3 pr-2 pl-2 font-bold ${TextSizeHandler(
                12,
                13,
                14,
                15
              )}`}
            >
              {company.companyName}
            </h3>
            <h6
              className={`pb-2 pt-2 text-inverse ${TextSizeHandler(
                10,
                11,
                12,
                12
              )}`}
            >
              {translatedData.sections.body.general.numberOfProjects}{" "}
              <span className={`font-bold ${TextSizeHandler(15, 15, 16, 16)}`}>
                {company.projects.length}
              </span>
            </h6>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Jobs;
