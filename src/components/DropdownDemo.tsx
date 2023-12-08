import { Dropdown } from "../../";
import { useState } from "react";

const DropdownDemo = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [list, setList] = useState<Array<string>>([]);

  return (
    <div style={{ border: "1px solid red", padding: "1rem" }}>
      <button
        onClick={() => setIsHidden(!isHidden)}
        style={{ marginRight: "1rem" }}
      >
        Toggle Dropdown
      </button>

      <button
        onClick={() => setList(["new text", ...list])}
        style={{ marginRight: "1rem" }}
      >
        Add Content
      </button>
      <Dropdown isHidden={isHidden}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quis
          delectus alias, id excepturi ullam temporibus veritatis qui est enim
          voluptates iste quibusdam voluptatum illum, error sunt, sed placeat
          numquam at dicta. Dignissimos autem velit aut adipisci beatae quaerat
          ea accusamus ipsa rerum voluptatem, enim corporis accusantium
          asperiores, deserunt culpa maiores aliquam tenetur a voluptatum.
          <span data-testid="content edge">edge</span>
        </p>
        {list.map((item) => (
          <p data-testid="added content">{item}</p>
        ))}
      </Dropdown>
    </div>
  );
};

export default DropdownDemo;
