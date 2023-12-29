import { Fragment, useState } from "react";
import { Carousel } from "../../";

const CarouselDemo = () => {
  const [childrenCount, setChildrenCount] = useState(4);
  return (
    <Fragment>
      <button
        name="Add Item"
        onClick={() => setChildrenCount((prev) => ++prev)}
        style={{ marginBottom: "1rem", marginRight: "1rem" }}
      >
        Add Item
      </button>
      <button
        onClick={() => setChildrenCount((prev) => --prev)}
        style={{ marginBottom: "1rem" }}
      >
        Remove Item
      </button>
      <div style={{ border: "5px solid gray" }}>
        <Carousel>
          {Array.from(Array(childrenCount).keys()).map((_child, index) => (
            <img
              key={index}
              src="/user.webp"
              style={{ border: "5px solid lightgray" }}
            />
          ))}
          <img
            src="/user.webp"
            style={{ border: "5px solid red", backgroundColor: "red" }}
          />
        </Carousel>
      </div>
    </Fragment>
  );
};

export default CarouselDemo;
