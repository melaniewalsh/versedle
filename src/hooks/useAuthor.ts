import { csv } from "d3-fetch";
import { useEffect, useMemo, useState } from "react";
import { authors, Author, onAuthorsLoaded } from "../domain/authors";

interface DateAuthor {
  country: string; // keeping 'country' key for backward compatibility with CSV
  date: string;
}

export function useAuthor(dayString: string): [Author | undefined] {
  const [forcedAuthorCode, setForcedAuthorCode] = useState("");
  const [authorsReady, setAuthorsReady] = useState(false);

  useEffect(() => {
    onAuthorsLoaded(() => {
      setAuthorsReady(true);
    });
  }, []);

  useEffect(() => {
    csv(`${process.env.PUBLIC_URL}/data.csv`, (d) => {
      return { country: d.country, date: d.date }; // CSV still uses 'country' column
    }).then((data) => {
      setForcedAuthorCode(
        data.length
          ? (
              data.find((el) => el.date === dayString) as DateAuthor
            )?.country.toUpperCase() || ""
          : ""
      );
    });
  }, [dayString]);

  const author = useMemo(() => {
    if (!authorsReady) return undefined;
    const forcedAuthor =
      forcedAuthorCode !== ""
        ? authors.find((author) => author.code === forcedAuthorCode)
        : undefined;
    return forcedAuthor;
  }, [forcedAuthorCode, authorsReady]);
  return [author];
}

// Backward compatibility export
export const useCountry = useAuthor;
