import { useEffect, useState } from "react";

export function useImageExistence(localSrc: string, fallbackSrc: string) {
  const [src, setSrc] = useState(fallbackSrc);

  useEffect(() => {
    fetch(localSrc)
      .then((res) => {
        if (res.ok) {
          setSrc(localSrc);
        }
      })
      .catch(() => {
        setSrc(fallbackSrc);
      });
  }, [localSrc, fallbackSrc]);

  return src;
}
