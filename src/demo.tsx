import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import DialogDemo from "./components/DialogDemo";
import "./demo.css";

function Demo() {
  const navigate = useNavigate();
  let { pathname } = useLocation();

  pathname = pathname.replace("/", "");
  const navItems = [
    { component: DialogDemo, title: "Dialog", path: "/dialog" },
  ];

  return (
    <div className="demo-page">
      <main className="demo-page__main">
        <aside aria-label="demo page navigation" className="demo-page__nav">
          {navItems.map(({ title, path }) => (
            <p
              className={`demo-page__nav-item ${
                isIdenticalString(pathname, title)
                  ? "demo-page__nav-item--active"
                  : ""
              }`}
              key={title}
              onClick={() => {
                navigate(path);
              }}
            >
              {title}
            </p>
          ))}
        </aside>

        <div className="demo-page__component-demo">
          <h1 className="demo-page__h1">
            {pathname && capitalizeWords("-", pathname)}
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
