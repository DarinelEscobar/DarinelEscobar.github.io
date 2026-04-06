import { getAssetImage } from "@/lib/assetImages";

export const getProjectAssetImage = (url: string) => {
  return getAssetImage(url);
};

export const getProjectCardImageSource = (url: string, usePreview: boolean) => {
  const src = getProjectAssetImage(url);

  if (!usePreview) {
    return {
      src,
      srcSet: undefined,
    };
  }

  const previewUrl = url.replace(/(\.[a-z0-9]+)$/iu, "-preview$1");
  const previewSrc = getProjectAssetImage(previewUrl);

  return {
    src: previewSrc,
    srcSet: `${previewSrc} 768w, ${src} 1366w`,
  };
};
