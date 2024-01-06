import { useState } from "react";
import { Pagination } from "../../";

const PaginationDemo = () => {
  const [contents, setContents] = useState<Array<string>>([]);
  return (
    <div>
      <button
        onClick={() => setContents([...contents, "new text"])}
        style={{ marginRight: "1rem" }}
      >
        Add Content
      </button>
      <button onClick={() => setContents([])}>Clear Added Contents</button>
      <Pagination
        insertFooterElement={
          <p
            data-testid={"insertedFooterElement"}
            style={{ color: "gray", fontStyle: "italic" }}
          >
            --FooterElement--
          </p>
        }
        maxItemsPerPage={2}
        noOfPageVisible={3}
      >
        {contents.map((content, index) => (
          <p key={index}>{content}</p>
        ))}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, est?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est impedit
          eum eveniet reprehenderit tempora, vel in quidem facilis atque
          dignissimos.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est impedit
          eum eveniet reprehenderit tempora, vel in quidem facilis atque
          dignissimos.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est impedit
          eum eveniet reprehenderit tempora, vel in quidem facilis atque
          dignissimos.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est impedit
          eum eveniet reprehenderit tempora, vel in quidem facilis atque
          dignissimos.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est impedit
          eum eveniet reprehenderit tempora, vel in quidem facilis atque
          dignissimos.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est impedit
          eum eveniet reprehenderit tempora, vel in quidem facilis atque
          dignissimos.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est impedit
          eum eveniet reprehenderit tempora, vel in quidem facilis atque
          dignissimos.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est impedit
          eum eveniet reprehenderit tempora, vel in quidem facilis atque
          dignissimos.
        </p>
      </Pagination>
    </div>
  );
};

export default PaginationDemo;
