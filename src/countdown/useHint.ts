import { useEffect, useState } from "react";

export const useHint = (initialValue: boolean) => {
  const [hint, setHint] = useState(initialValue);

  useEffect(() => {
    if (!hint) return;

    const timer = setTimeout(() => {
      setHint(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [hint]);

  return [hint, setHint] as ReturnType<typeof useState<boolean>>;
};
