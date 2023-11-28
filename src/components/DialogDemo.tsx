import { useState } from "react";

import { Dialog } from "../../";

const DialogDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>

      <Dialog backDropClickCallBack={() => setIsOpen(false)} isOpen={isOpen}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, magni
          libero ea laboriosam rem ab mollitia quis laborum unde iure minus cum!
          Repellat, ut, voluptas nisi iusto nobis ipsa quasi perspiciatis
          eligendi quo esse ex distinctio, tenetur in ipsum itaque expedita
          exercitationem deleniti officia totam. Eius quam culpa velit pariatur.
        </p>
      </Dialog>
    </div>
  );
};

export default DialogDemo;
