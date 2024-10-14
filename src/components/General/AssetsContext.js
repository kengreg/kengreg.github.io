//!IMPORTANT DO NOT REMOVE THE replace import or replace useeffect comments
import React, { createContext, useContext, useState, useEffect } from "react";
// replace_import
import { updateImagesData, Assets } from "./Assets";
//replace_end */

const imgPath = "assets/images/events/kengreg/";
const AssetsContext = createContext();

export const AssetsProvider = ({ children, urlName, imageNames }) => {
  const BrowserUrlLocal = window.location.href.includes("localhost");
  const [images, setImages] = useState({});

  // replace_useEffect
  useEffect(() => {
    const loadImageData = async () => {
      await updateImagesData(imageNames, imgPath);
      setImages({ ...Assets.images });
    };

    loadImageData();
  }, []);

  //replace_end */

  const imagesObject = imageNames.reduce((variables, imageName) => {
    const variableName = imageName.replace(/\..+$/, "");
    variables[variableName] = imageName;
    return variables;
  }, {});

  return (
    <AssetsContext.Provider
      value={{
        images,
        setImages,
        imageNames,
        imagesObject,
        urlName,
        BrowserUrlLocal,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
};

export const useAssets = () => {
  return useContext(AssetsContext);
};
