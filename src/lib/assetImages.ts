import { useEffect, useState } from "react";

const assetImageLoaders = import.meta.glob<string>(
  "/src/assets/images/**/*.{webp,png,jpg,jpeg,svg}",
  { import: "default" }
);

const assetImageCache = new Map<string, string>();
const pendingAssetImages = new Map<string, Promise<string>>();

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

  return assetImageCache.get(assetKey) ?? "";
};

export const loadAssetImage = (url: string): Promise<string> => {
  const assetKey = normalizeAssetPath(url);

  if (!assetKey) {
    return Promise.resolve("");
  }

  const cachedAsset = assetImageCache.get(assetKey);

  if (cachedAsset) {
    return Promise.resolve(cachedAsset);
  }

  const assetLoader = assetImageLoaders[assetKey];

  if (!assetLoader) {
    console.error(`Error loading image: ${url}`);
    return Promise.resolve("");
  }

  const pendingAsset =
    pendingAssetImages.get(assetKey) ??
    assetLoader()
      .then((resolvedAsset) => {
        assetImageCache.set(assetKey, resolvedAsset);
        pendingAssetImages.delete(assetKey);
        return resolvedAsset;
      })
      .catch((error) => {
        pendingAssetImages.delete(assetKey);
        console.error(`Error loading image: ${url}`, error);
        return "";
      });

  pendingAssetImages.set(assetKey, pendingAsset);

  return pendingAsset;
};

interface AssetImageState {
  src: string;
  isLoading: boolean;
  hasError: boolean;
}

export const useAssetImage = (url?: string): AssetImageState => {
  const [state, setState] = useState<AssetImageState>(() => {
    const cachedSrc = url ? getAssetImage(url) : "";

    return {
      src: cachedSrc,
      isLoading: Boolean(url && !cachedSrc),
      hasError: false,
    };
  });

  useEffect(() => {
    let isCurrent = true;

    if (!url) {
      setState({ src: "", isLoading: false, hasError: false });
      return () => {
        isCurrent = false;
      };
    }

    const cachedSrc = getAssetImage(url);

    if (cachedSrc) {
      setState({ src: cachedSrc, isLoading: false, hasError: false });
      return () => {
        isCurrent = false;
      };
    }

    setState({ src: "", isLoading: true, hasError: false });

    loadAssetImage(url).then((resolvedSrc) => {
      if (!isCurrent) {
        return;
      }

      setState({
        src: resolvedSrc,
        isLoading: false,
        hasError: !resolvedSrc,
      });
    });

    return () => {
      isCurrent = false;
    };
  }, [url]);

  return state;
};
