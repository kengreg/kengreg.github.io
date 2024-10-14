import TextSizeHandler from "../General/TextSizeHandler";
const HeaderCountry = ({ currentCountry, dictionaryCountry, lang }) => {
  const imagesCountry = {
    panama: "1V9cbjfR4P6bpJjwgOLyRBOEsjEnj1NHc",
    india: "1ur1Za8WE6VrixCu4IPhZ_trBAatnLL0a",
    japan: "12x0elArYBAF286f4T1pa__R15NxrRnHN",
  };
  return (
    <article
      className={`header-${currentCountry} header-country relative w-full h-full`}
    >
      <article className="header-country-wrap container-max-width margin-auto h-full w-full clearfix">
        <h2
          className={`pl-4 pr-4 pb-2 mb-4 text-inverse ${TextSizeHandler(
            28,
            30,
            35,
            40
          )} `}
        >
          {currentCountry}
        </h2>
        <article className="c-wrap w-full">
          <figure>
            <img
              src={`https://lh3.googleusercontent.com/d/${imagesCountry[currentCountry]}=w800?authuser=0/view`}
              alt=""
            />
          </figure>
          <article className="country-content pt-3 pr-4 ">
            {dictionaryCountry[currentCountry].description[lang].map(
              (item, index) => {
                return (
                  <p
                    key={index}
                    className={`pb-2 ${TextSizeHandler("normalAll")} `}
                  >
                    {item}
                  </p>
                );
              }
            )}
          </article>
          <div className="clear"></div>
        </article>
      </article>
    </article>
  );
};

export default HeaderCountry;
