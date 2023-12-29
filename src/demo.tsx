import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import CarouselDemo from "./components/CarouselDemo";
import DialogDemo from "./components/DialogDemo";
import DropdownDemo from "./components/DropdownDemo";
import InViewDemo from "./components/InViewDemo";
import ImageViewerDemo from "./components/ImageViewerDemo";
import PaginationDemo from "./components/PaginationDemo";
import SliderDemo from "./components/SliderDemo";
import SearchBarDemo from "./components/SearchBarDemo";

import "./demo.css";

function Demo() {
  const navigate = useNavigate();
  let { pathname: currentPathName } = useLocation();

  const isCurrentPathRoot = currentPathName === "/";
  const navItems = [
    { component: CarouselDemo, path: "/carousel" },
    { component: DialogDemo, path: "/dialog" },
    { component: DropdownDemo, path: "/dropdown" },
    { component: InViewDemo, path: "/inview" },
    { component: ImageViewerDemo, path: "/image-viewer" },
    { component: PaginationDemo, path: "/pagination" },
    { component: SliderDemo, path: "/slider" },
    { component: SearchBarDemo, path: "/search-bar" },
  ];

  return (
    <div className="demo-page">
      <main className="demo-page__main">
        <aside aria-label="demo page navigation" className="demo-page__nav">
          {navItems.map(({ path }) => (
            <p
              className={`demo-page__nav-item ${
                isIdenticalString(currentPathName, path)
                  ? "demo-page__nav-item--active"
                  : ""
              }`}
              key={path}
              onClick={() => {
                navigate(path);
              }}
            >
              {capitalizeWords("-", path.replace("/", ""))}
            </p>
          ))}
        </aside>

        <div className="demo-page__component-demo">
          <h1 className="demo-page__h1">
            {!isCurrentPathRoot &&
              capitalizeWords("-", currentPathName.replace("/", ""))}
          </h1>
          <div>
            <Routes>
              <Route element={<Navigate to="/dialog" />} path="/" />
              {navItems.map(({ component: SectionComponent, path }) => (
                <Route element={<SectionComponent />} key={path} path={path} />
              ))}
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

function capitalizeWords(delimiter: string, string: string) {
  const trimmedString = string.trim();

  if (!delimiter) throw Error("Delimiter is required");
  if (!trimmedString) throw Error("String is required");

  return trimmedString
    .split(delimiter)
    .map(
      (word) =>
        `${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`
    )
    .join(" ");
}

function isIdenticalString(firstString: string, secondString: string) {
  return firstString.toLowerCase() === secondString.toLowerCase();
}

export default Demo;
