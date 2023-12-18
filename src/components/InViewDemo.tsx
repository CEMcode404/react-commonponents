import { InView } from "../../dist/main";

const InViewDemo = () => {
  return (
    <div style={{ height: "150vh" }}>
      <InView>
        {({ inView }) => (
          <p
            data-testid="box"
            style={
              inView
                ? { background: "red", height: "50vh" }
                : { background: "blue", height: "50vh" }
            }
          >
            Yeah
          </p>
        )}
      </InView>
    </div>
  );
};

export default InViewDemo;
