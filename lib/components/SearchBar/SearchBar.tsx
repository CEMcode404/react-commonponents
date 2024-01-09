import { useState, useEffect, useRef, ReactElement, cloneElement } from "react";

import findIcon from "./find_icon.svg";
import style from "./searchBar.module.css";

type Waiting = "waiting";

interface SearchBarProps<T> {
  className?: string;
  disabled?: boolean;
  formatFunc: (map: T) => ReactElement;
  findIconColor?: string;
  hideFindIcon?: boolean;
  id: string;
  onChange: (helper: {
    inputValue: string;
    resolveCallback: (data: T[]) => void;
    waitForCallback: () => Waiting;
  }) => T[] | Promise<T[]> | Waiting;
  onChangeDelay?: number;
  placeholder?: string;
}

export const SearchBar = <T,>({
  className = "",
  disabled = false,
  formatFunc,
  findIconColor = "",
  hideFindIcon = false,
  id,
  onChange,
  onChangeDelay = 1000,
  placeholder = "search . . .",
}: SearchBarProps<T>) => {
  const onChangeTimeOutDelay =
    Number.isInteger(onChangeDelay) && onChangeDelay > -1
      ? onChangeDelay
      : 1000;

  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSearchResultsHidden, setIsSearchResultsHidden] = useState(true);
  const [searchResults, setSearchResults] = useState<T[]>([]);

  const inputElementRef = useRef<null | HTMLInputElement>(null);
  const timeOutHandleRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (disabled) return;

    //use a timeout here to prevent multiple request while typing which is expensive
    clearTimeout(timeOutHandleRef.current);
    hideSearchResults();
    !inputValue ? setIsTyping(false) : setIsTyping(true);

    const isValidInput = inputValue.trim();
    timeOutHandleRef.current = setTimeout(() => {
      if (isValidInput) {
        const response = onChange({
          inputValue: isValidInput,
          resolveCallback: showSearchResults,
          waitForCallback,
        });

        if (response === waitForCallback()) return;
        else showSearchResults(response);
      } else setIsTyping(false);
    }, onChangeTimeOutDelay);
  }, [inputValue]);

  function hideSearchResults() {
    setIsSearchResultsHidden(true);
    setSearchResults([]);
  }

  async function showSearchResults(data: T[] | Promise<T[]>) {
    data = await data;
    setIsTyping(false);

    if (data && Array.isArray(data) && data.length > 0) {
      setSearchResults(data);

      //Prevents search result from showing if input element is not active
      //This prevents bug where doing onblur while querying will make the search results show and will be
      //stuck unless input element is refocus again
      if (document.activeElement?.id === inputElementRef.current?.id)
        setIsSearchResultsHidden(false);
    }
  }

  function waitForCallback() {
    return "waiting" as Waiting;
  }

  function handleOnBlur() {
    // Set time out give enough time so that onclick functions in the search results can be executed before closing
    setTimeout(() => {
      setIsTyping(false);
      setIsSearchResultsHidden(true);
    }, 150);
  }

  return (
    <div className={`${style["search-bar"]} ${className}`}>
      <div className={style["input-wrapper"]}>
        <input
          autoComplete="off"
          className={style.input}
          disabled={disabled}
          id={id}
          onBlur={handleOnBlur}
          onFocus={() => setIsSearchResultsHidden(false)}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          ref={inputElementRef}
          type="search"
          value={inputValue}
        />

        <div className={style.popups}>
          {isTyping && (
            <div className={style["is-typing-notif"]}>
              <p>typing...</p>
            </div>
          )}

          {!(isSearchResultsHidden || searchResults.length < 1) && (
            <div
              className={style["search-results"]}
              data-testid="search results"
            >
              {searchResults.map((searchResult, index) =>
                cloneElement(formatFunc(searchResult), {
                  key: index,
                })
              )}
            </div>
          )}
        </div>
      </div>
      {!hideFindIcon && (
        <img
          alt="search icon"
          style={{ background: findIconColor }}
          className={style["find-icon"]}
          src={findIcon}
        />
      )}
    </div>
  );
};
