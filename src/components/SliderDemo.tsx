import { Slider } from "../../";

const SliderDemo = () => {
  return (
    <div>
      <Slider gap="5rem">
        <img
          data-testid="slider1FirstItem"
          src="/user.webp"
          style={{ border: "5px solid red" }}
        />
        <img src="/user.webp" style={{ border: "5px solid red" }} />
        <img src="/user.webp" style={{ border: "5px solid red" }} />
        <img src="/user.webp" style={{ border: "5px solid red" }} />
        <img src="/user.webp" style={{ border: "5px solid red" }} />
      </Slider>

      <Slider>
        <ComponentWithoutStyleProps />
        <ComponentWithoutStyleProps />
        <ComponentWithoutStyleProps />
        <ComponentWithoutStyleProps />
        <ComponentWithoutStyleProps />
      </Slider>
    </div>
  );
};

function ComponentWithoutStyleProps() {
  return (
    <img
      data-testid="slider2Items"
      src="/user.webp"
      style={{ border: "5px solid red" }}
    />
  );
}

export default SliderDemo;
