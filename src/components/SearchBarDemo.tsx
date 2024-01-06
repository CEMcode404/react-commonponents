import { useState } from "react";
import { SearchBar } from "../../";

interface Book {
  author: string;
  title: string;
}

const books = [
  { author: "John Denver", title: "The Ultimate Book" },
  { author: "John Depores", title: "The Useless One" },
  { author: "Ishak Don", title: "Random" },
  { author: "Lily Lilibeth", title: "Data Center" },
  { author: "April June", title: "I Don't" },
  { author: "Yu Tang", title: "You" },
  { author: "Den In", title: "Breathless" },
  { author: "Juan Dela Cruz", title: "Job" },
  { author: "John Smith", title: "Everyday" },
];

const SearchBarDemo = () => {
  const defaultOnChangeDelay = 1000;
  const [isAsync, setIsAsync] = useState(false);
  const [onChangeDelay, setOnChangeDelay] = useState(defaultOnChangeDelay);
  const [response, setResponse] = useState(books);
  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div>
      <p>Selected: {selected}</p>
      <p>Search: {search}</p>
      <input
        id="async"
        onChange={(e) =>
          e.currentTarget.checked ? setIsAsync(true) : setIsAsync(false)
        }
        type="checkbox"
        value="async"
      />
      <label htmlFor="async">Async</label>
      <input
        id="toggle response"
        onChange={(e) =>
          e.currentTarget.checked ? setResponse([]) : setResponse(books)
        }
        type="checkbox"
        value="response"
      />
      <label htmlFor="toggle response">Empty search results</label>

      <label style={{ marginLeft: "1rem" }}>
        onChangeDelay:{" "}
        <select
          onChange={(e) => setOnChangeDelay(parseInt(e.currentTarget.value))}
        >
          <option value={defaultOnChangeDelay}>Default</option>
          <option value={-1}>Invalid</option>
          <option value={3000}>3000</option>
        </select>
      </label>
      <p>
        <em>
          The interactive elements provided above are for test purposes only.
        </em>
      </p>
      <hr />
      {!isAsync && (
        <SearchBar<Book>
          formatFunc={({ author, title }) => (
            <p
              onClick={(e) =>
                setSelected(e.currentTarget.textContent as string)
              }
              onMouseOut={(e) => (e.currentTarget.style.background = "white")}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "lightgray")
              }
              style={{
                cursor: "pointer",
                margin: "0 0 1rem 0",
                width: "100%",
              }}
            >
              {`${title} by ${author}`}
            </p>
          )}
          findIconColor="black"
          id="searchbarSync"
          onChange={({ inputValue }) => {
            setSearch(inputValue);
            return response;
          }}
          onChangeDelay={onChangeDelay}
        />
      )}

      {isAsync && (
        <SearchBar<Book>
          formatFunc={({ author, title }) => (
            <p
              onClick={(e) =>
                setSelected(e.currentTarget.textContent as string)
              }
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "lightgray")
              }
              onMouseOut={(e) => (e.currentTarget.style.background = "white")}
              style={{
                cursor: "pointer",
                margin: "0 0 1rem 0",
                width: "100%",
              }}
            >
              {`${title} by ${author}`}
            </p>
          )}
          findIconColor="black"
          id="searhbarAsync"
          onChange={({ inputValue, resolveCallback, waitForCallback }) => {
            new Promise((resolve) => {
              setTimeout(() => {
                resolve(undefined);
              }, 1500);
            }).then(() => {
              setSearch(inputValue);
              resolveCallback(response);
            });

            return waitForCallback();
          }}
          onChangeDelay={onChangeDelay}
        />
      )}
    </div>
  );
};

export default SearchBarDemo;
