import { useState } from "react";

import { ImageViewer } from "../../";

const ImageViewerDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sampleImages = [
    "http://localhost:5173/book-no-image.svg",
    "http://localhost:5173/user.webp",
  ];

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Viewer</button>

      <ImageViewer
        isOpen={isOpen}
        imgSrcs={sampleImages}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default ImageViewerDemo;
