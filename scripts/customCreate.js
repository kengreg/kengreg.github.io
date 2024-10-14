const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const path = require("path");
const fs = require("fs");
const eventList = require("../src/config/eventList.json");

const redColor = "\x1b[31m";
const resetStyle = "\x1b[0m";
const BGblue = "\x1b[44m";
const BGgreen = "\x1b[42m";

let eventName = "";
let labelName = "";
let urlName = "";

const dirPathContainer = path.join(__dirname, "..", "src", "containers");
const dirPathComponents = path.join(__dirname, "..", "src", "components");

function displayMenu() {
  console.log("0. Landing Page");
  console.log("1. hint");
  console.log("2. share");
  console.log("3. special");
}

function generateFileContent(contentType, data) {
  const contentMap = {
    hint: `import Page from "../../components/${data.code}/hint/Hint.js";
      import("../../components/${data.code}/hint/hint.scss");

      const Contents = ({ setNavBar, eventOption, urlName, introScreen }) => {
        return (
          <section
            className={introScreen ? "invisible" : "${data.code}-container w-full h-full"}
            data-theme="theme-color"
          >
            <Page />
          </section>
        );
      };

      export default Contents;
    `,
    hintComponent: `
    import { useEffect, useState } from "react";
    const Page = () => {
      const [showModal, setShowModal] = useState(false);
      const [dataModal, setDataModal] = useState(null);
      return (
        <div className="page w-full container-max-width h-full">
          
        </div>
      );
    };

    export default Page;`,
    seo: `import { Helmet } from "react-helmet";
    const Seo = () => {
      const { t } = useTranslation();
      let banner = "";
      return (
        <Helmet
          script={[
            {
              "@context": "https://schema.org",
              "@type": "Event",
              name: "",
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
              image: [banner],
              description:
                "",
              organizer: {
                "@type": "Organization",
                name: "SphereMystica株式会社",
                url: "https://spheremystica.com/",
              },
            },
          ]}
        >
          <div itemscope itemtype="http://schema.org/Event">
            <h1 itemprop="name">
              
            </h1>
            <p>
              Date:{" "}
              <time itemprop="startDate" datetime="">
              </time>{" "}
              ～{" "}
              <time itemprop="endDate" datetime="">
              </time>
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
                  <span itemprop="streetAddress">
                  
                  </span>
                  ,<span itemprop="addressLocality"></span>,
                  <span itemprop="postalCode"></span>,
                  <span itemprop="addressRegion"></span>,
                  <span itemprop="addressCountry">日本</span>
                </span>
              </span>
            </p>
            <p itemprop="description">
            
            </p>
          </div>
          <title></title>
          <link
            rel="canonical"
            href=""
          />
          <meta
            name="description"
            content=""
          />
          <link rel="icon" href="" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={\`\${banner}\`}></meta>
          <meta
            name="twitter:title"
            content=""
          />
          <meta
            property="og:url"
            content=""
          />
          <meta
            property="og:title"
            content=""
          />
          <meta property="og:type" content="product" />
          <meta
            property="og:site_name"
            content=""
          />
          <meta property="og:image" content={\`\${banner}\`}/>
          <meta
            property="og:description"
            content=""
          />
        </Helmet>
      );
    };
        export default Seo;
    `,
    homeContainer: `  import { useState } from "react";
      import Contents from "./${data.code}/Home";
      const ${
        data.code.charAt(0).toUpperCase() + data.code.slice(1)
      } = ({ setNavBar, eventOption, urlName }) => {
        const [introScreen, setIntroScreen] = useState(false);
        setTimeout(() => {
          setIntroScreen(false);
          setNavBar(true);
        }, 1500);
        return (
          <Contents
            setNavBar={setNavBar}
            eventOption={eventOption}
            urlName={urlName}
            introScreen={introScreen}
          />
        );
      };

      export default ${data.code.charAt(0).toUpperCase() + data.code.slice(1)};
  `,
    homeInner: `
      import Seo from "../../components/${data.code}/Seo";
    import { AssetsProvider } from "../../components/General/AssetsContext";
    import("../../components/${data.code}/index.scss");
    const Contents = ({ setNavBar, eventOption, urlName, introScreen }) => {
      const imageNames = [];
      return (
        <AssetsProvider urlName={urlName} imageNames={imageNames}>
          <section>
            <div className={introScreen ? "" : "invisible"}></div>
            <article
              className={
                introScreen
                  ? "invisible"
                  : "event-container ${data.code}-container w-full h-full relative"
              }
            >
              <Seo />
              <section className="w-full h-full event-container-wrap container-max-width">
                <section className="w-full h-full event-container-inner"></section>
              </section>
            </article>
          </section>
        </AssetsProvider>
      );
    };

    export default Contents;
  `,
    json: `[{
    "title": "タイトル",
    "open": false,
    "subQuestions": [
      {
        "title": "中タイトル",
        "thiQuestions": [
          { "answer": "ヒント" },
          { "answer": "ヒント" }
        ]
      },
      {
        "title": "中タイトル",
        "thiQuestions": [
          { "answer": "ヒント" },
        ]
      }
    ]
  },]`,
    // Add more content options here
  };
  return contentMap[contentType] || "";
}

function makeChoice() {
  const selectedOptions = [];

  return new Promise((resolve) => {
    function askQuestion() {
      rl.question(
        "Choose an option (0/1/2/3), separated by commas. In the case of not choose 0, you will need to change the eventList.json later to enable it:",
        (choice) => {
          const choixNum = parseInt(choice);
          if (!isNaN(choixNum) && choixNum >= 0 && choixNum <= 3) {
            selectedOptions.push(choixNum);
            resolve(selectedOptions);
            rl.close();
          } else {
            console.log("Invalid option, please choose 0, 1, 2, or 3");
            askQuestion(); // Ask the question again
          }
        }
      );
    }

    askQuestion();
  });
}

function chooseEventName() {
  return new Promise((resolve) => {
    rl.question(`${BGblue}Add projectCode: ${resetStyle}`, (event) => {
      eventName = event;
      resolve();
    });
  });
}

function chooseLabelName() {
  return new Promise((resolve) => {
    rl.question(
      `${BGblue}Add projectName (japanese or english): ${resetStyle}`,
      (event) => {
        labelName = event;
        console.log(
          `
        ${BGgreen}*** Select the option(s) for${resetStyle} ${eventName.toUpperCase()} ${BGgreen}***${resetStyle}
        `
        );
        resolve();
      }
    );
  });
}

function chooseUrlName() {
  return new Promise((resolve) => {
    rl.question(
      `${BGblue}Add the urlName (without https, only urlname): ${resetStyle}`,
      (event) => {
        urlName = event;
        resolve();
      }
    );
  });
}

async function main() {
  console.clear();
  await chooseEventName();
  await chooseLabelName();
  await chooseUrlName();
  displayMenu();
  const userChoice = await makeChoice();
  console.log(`
  You have chosen options: ${userChoice} for ${eventName}.  ${BGgreen}Please use npm start${resetStyle}
  `);

  const newData = {
    [eventName]: {
      name: eventName,
      urlName: urlName,
      label: labelName,
      landingPage: userChoice.includes(0) ? true : false,
      hint: userChoice.includes(1) ? true : false,
      share: userChoice.includes(2) ? true : false,
      special: userChoice.includes(3) ? true : false,
    },
  };
  const filePathEventInner = path.join(
    __dirname,
    "..",
    "src",
    "containers",
    eventName
  );
  const combinedData = { ...eventList, ...newData };
  fs.writeFileSync(
    path.join(__dirname, "..", "src", "config", "eventList.json"),
    JSON.stringify(combinedData, null, 4)
  );

  // Ensure directories exist
  const ensureDirExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  };

  // Container creation
  const n =
    eventName.charAt(0).toUpperCase() + eventName.slice(1).toLowerCase();
  //containers folder exists
  const filePathContainer = path.join(dirPathContainer);
  ensureDirExists(filePathContainer);
  const filePathEvent = path.join(filePathContainer, `${n}.js`);

  ensureDirExists(filePathEventInner);
  fs.writeFileSync(
    filePathEvent,
    generateFileContent("homeContainer", {
      code: eventName,
      url: urlName,
      name: labelName,
    })
  );

  fs.writeFileSync(
    path.join(filePathEventInner, "Home.js"),
    generateFileContent("homeInner", {
      code: eventName,
      url: urlName,
      name: labelName,
    })
  );

  //Creation of SEO component
  const seoDirPath = path.join(dirPathComponents, eventName); // Directory path for the Seo component
  ensureDirExists(seoDirPath);
  const seoComponentPath = path.join(seoDirPath, "Seo.js");

  fs.writeFileSync(
    seoComponentPath,
    generateFileContent("seo", {
      code: eventName,
      url: urlName,
      name: labelName,
    })
  );

  // Creation of container for Hint
  if (userChoice.includes(1)) {
    const hintContainerPath = path.join(filePathEventInner, "Hint.js");
    fs.writeFileSync(
      hintContainerPath,
      generateFileContent("hint", {
        code: eventName,
        url: urlName,
        name: labelName,
      })
    );

    const hintComponentPath = path.join(dirPathComponents, eventName, "hint");
    ensureDirExists(hintComponentPath);

    const hintFilePath = path.join(hintComponentPath, "Hint.js");
    const hintDataJson = path.join(hintComponentPath, "hintsData.js");
    fs.writeFileSync(
      hintFilePath,
      generateFileContent("hintComponent", {
        code: eventName,
        url: urlName,
        name: labelName,
      })
    );
    fs.writeFileSync(
      hintDataJson,
      generateFileContent("json", {
        code: eventName,
        url: urlName,
        name: labelName,
      })
    );

    const hintScssPath = path.join(hintComponentPath, "hint.scss");
    fs.writeFileSync(hintScssPath, "");
  } else if (userChoice.includes(3)) {
    const specialComponentPath = path.join(
      dirPathComponents,
      eventName,
      "page"
    );
    ensureDirExists(specialComponentPath);
  }

  // Css File creation && scssComponents
  const indexScssPath = path.join(dirPathComponents, eventName, "index.scss");
  fs.writeFileSync(indexScssPath, "");

  const scssComponentsPath = path.join(
    dirPathComponents,
    eventName,
    "scsscomponents"
  );
  ensureDirExists(scssComponentsPath);

  rl.close();
}

main();
