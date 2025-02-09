

export const getAssetImage = (url: string): string => {
  try {
    const assetPath = url.replace("@/", "./");
    return new URL(`/src/${assetPath}`, import.meta.url).href;
  } catch (error) {
    console.error("Error loading image:", error);
    return "";
  }
};
