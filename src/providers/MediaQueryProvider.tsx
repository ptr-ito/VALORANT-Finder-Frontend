import React, { createContext, useContext, useMemo } from "react";
import useMedia from "use-media";

interface Props {
  children: React.ReactNode;
}

interface Context {
  // モバイルの判定
  isMobileSite: boolean;
  // PCの判定
  isPcSite: boolean;
}

// Contextの生成
// デフォルトはPC
const MediaQueryContext = createContext<Context>({
  isMobileSite: false,
  isPcSite: true,
});

// 各デバイスでのサイズを定義
const mediaQueries = {
  mobile: "(max-width: 959px)",
  pc: "(min-width: 960px)",
};

export const MediaQueryProvider = ({ children }: Props) => {
  const isMobileSite = useMedia(mediaQueries.mobile);
  const isPcSite = useMedia(mediaQueries.pc);
  const value = useMemo(() => ({ isMobileSite, isPcSite }), [isMobileSite, isPcSite]);

  return <MediaQueryContext.Provider value={value}>{children}</MediaQueryContext.Provider>;
};

export const useMediaQueryContext = (): Context => useContext(MediaQueryContext);
