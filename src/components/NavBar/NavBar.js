import { useState } from "react";
import { useTranslation } from "react-i18next";
import DOMPurify from "dompurify";

const NavBar = ({ typePage }) => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };
  const handleClose = () => {
    window.close();
  };

  const [navbar, setNavbar] = useState(false);
  const close = `<svg class="w-full"
                enable-background="new 0 0 300 300"
                id="closeicon"
                version="1.1"
                viewBox="0 0 300 300"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <g>
                  <path
                    d="M151.338,14.8c-74.557,0-134.996,60.44-134.996,135.002c0,74.554,60.439,134.998,134.996,134.998   c74.556,0,135.004-60.443,135.004-134.998C286.342,75.241,225.894,14.8,151.338,14.8z M151.338,265.714   c-64.013,0-115.908-51.901-115.908-115.912c0-64.018,51.895-115.911,115.908-115.911c64.016,0,115.909,51.894,115.909,115.911   C267.247,213.813,215.354,265.714,151.338,265.714z"
                    fill="#BF3D27"
                  />
                  <circle
                    cx="151.341"
                    cy="149.802"
                    fill="#BF3D27"
                    r="104.428"
                  />
                  <polygon
                    fill="#FFFFFF"
                    points="213.878,180.6 182.131,212.344 151.338,181.547 120.541,212.344 88.799,180.6 119.586,149.802    88.799,119.013 120.541,87.256 151.338,118.058 182.131,87.256 213.878,119.013 183.077,149.802  "
                  />
                </g>
              </svg>`;

  return (
    <nav className="navbar-top w-full relative">
      <ul className="nav_container flex justify-center items-center">
        <li>
          <article className="flex items-center justify-between py-3 lg:py-5 lg:block"></article>
        </li>
        {typePage === "hint" && (
          <li className="flex justify-end">
            <div className="nav-bar-btn">
              <button
                className="btn btn-close w-100"
                onClick={handleClose}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(close),
                }}
              ></button>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
