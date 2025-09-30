import React, { forwardRef, Dispatch, SetStateAction } from "react";
import { authors, sanitizeAuthorName } from "../domain/authors";
import { Group, Text, Autocomplete } from "@mantine/core";

interface AuthorInputProps {
  setAuthorValue: Dispatch<SetStateAction<string>>;
  authorValue: string;
  setCurrentGuess: (guess: string) => void;
  easyMode?: boolean;
}

interface ItemProps {
  value: string;
  id: string;
  birthYear?: number;
  deathYear?: number;
  easyMode?: boolean;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  (
    { id, value, birthYear, deathYear, easyMode = false, ...others }: ItemProps,
    ref
  ) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text>
            {value}
            {easyMode && birthYear ? ` (${birthYear}-${deathYear || ""})` : ""}
          </Text>
        </div>
      </Group>
    </div>
  )
);
AutoCompleteItem.displayName = "Autocomplete Item";

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
  easyMode = false,
}: AuthorInputProps) {
  let items = authors
    .map((author) => ({
      name: author.name,
      value: `${author.name}`,
      id: author.code,
      birthYear: author.birth_year,
      deathYear: author.death_year,
      easyMode,
    }))
    .reduce<
      {
        name: string;
        value: string;
        id: string;
        birthYear: number;
        deathYear?: number;
        easyMode: boolean;
      }[]
    >((acc, current) => {
      const x = acc.find((item) => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

  // Sort by birth year in easy mode
  if (easyMode) {
    items = items.sort((a, b) => a.birthYear - b.birthYear);
  }

  return (
    <Autocomplete
      autoComplete="noautocompleteplzz"
      placeholder="Pick an author"
      limit={100}
      itemComponent={AutoCompleteItem}
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
