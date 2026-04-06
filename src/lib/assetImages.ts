const assetImages = import.meta.glob("/src/assets/images/**/*.{webp,png,jpg,jpeg,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const normalizeAssetPath = (url: string) => {
  if (!url) {
    return "";
  }

  const normalized = url
    .replace(/^@\//u, "")
    .replace(/^\.\/+/u, "")
    .replace(/^\/+/u, "")
    .replace(/^src\//u, "");

  return `/src/${normalized}`;
};

export const getAssetImage = (url: string): string => {
  const assetKey = normalizeAssetPath(url);

  if (!assetKey) {
    return "";
  }

  const resolvedAsset = assetImages[assetKey];

  if (!resolvedAsset) {
    console.error(`Error loading image: ${url}`);
    return "";
  }

  return resolvedAsset;
};
