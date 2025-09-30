import React, { forwardRef, Dispatch, SetStateAction } from "react";
import {
  authors,
  fictionalAuthors,
  sanitizeAuthorName,
} from "../domain/authors";
import { Group, Text, Autocomplete } from "@mantine/core";

interface AuthorInputProps {
  setAuthorValue: Dispatch<SetStateAction<string>>;
  authorValue: string;
  setCurrentGuess: (guess: string) => void;
  isAprilFools: boolean;
}

interface ItemProps {
  value: string;
  id: string;
  isAprilFools: boolean;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, value, isAprilFools = false, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text>{value}</Text>
        </div>
      </Group>
    </div>
  )
);
AutoCompleteItem.displayName = "Autocomplete Item";
const AutoCompleteItemAprilFools = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, value, isAprilFools = false, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text>{value}</Text>
        </div>
      </Group>
    </div>
  )
);
AutoCompleteItemAprilFools.displayName = "Autocomplete Item April Fools";

// export function CountryInput({
//   countryValue,
//   setCountryValue,
//   setCurrentGuess,
//   isAprilFools = false,
// }: CountryInputProps) {
//   const items = isAprilFools
//     ? fictionalCountries.map((country) => ({
//         name: country.name,
//         value: `${country.name}`,
//         id: country.code,
//       }))
//     : countries.map((country) => ({
//         name: country.name,
//         value: `${country.name}`,
//         id: country.code,
//       }));

export function AuthorInput({
  authorValue,
  setAuthorValue,
  setCurrentGuess,
  isAprilFools = false,
}: AuthorInputProps) {
  const items = (isAprilFools ? fictionalAuthors : authors)
    .map((author) => ({
      name: author.name,
      value: `${author.name}`,
      id: author.code,
    }))
    .reduce<{ name: string; value: string; id: string }[]>((acc, current) => {
      const x = acc.find((item) => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

  return (
    <Autocomplete
      autoComplete="noautocompleteplzz"
      placeholder="Pick an author"
      limit={100}
      itemComponent={
        isAprilFools ? AutoCompleteItemAprilFools : AutoCompleteItem
      }
      data={items}
      styles={{ dropdown: { maxHeight: 200, overflowY: `auto` } }}
      filter={(value, item) =>
        item.value
          .toLowerCase()
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .includes(value.toLowerCase().trim()) ||
        item.id.toLowerCase().includes(value.toLowerCase().trim())
      }
      onItemSubmit={(item) => {
        setCurrentGuess(sanitizeAuthorName(item.value));
      }}
      value={authorValue}
      onChange={setAuthorValue}
    />
  );
}

// Backward compatibility export
export const CountryInput = AuthorInput;
