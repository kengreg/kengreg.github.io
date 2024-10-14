import ImageDefault from "../../assets/images/default-placeholder.png";

const loadImage = async (imageName, path) => {
  // console.log("Attempting to load image:", `${path}/${imageName}`);
  try {
    const imageModule = await import(`../../${path}/${imageName}`);

    return imageModule.default; // Assuming images are exported as default
  } catch (err) {
    console.error(`Error loading image: ${imageName}, ${err}`);
    return ImageDefault;
  }
};

let images = {};
let videos = {};

export const updateImagesData = async (newImageNames, path) => {
  await Promise.all(
    newImageNames.map(async (imageName) => {
      const imageKey = `${imageName.replace(/\.[^/.]+$/, "")}`;
      images[imageKey] = await loadImage(imageName, path);
    })
  );
};

export const Assets = {
  images: images,
  videos: videos,
};
