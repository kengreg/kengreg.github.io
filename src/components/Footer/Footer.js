import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="toppage">
      <div className="footer_container">
        <ul>
          <li>
            © {currentYear}{" "}
            <a href="" className="hover:underline">
              Company
            </a>
            . {t("footer:rights")}
          </li>
        </ul>
      </div>
    </footer>
  );
}
