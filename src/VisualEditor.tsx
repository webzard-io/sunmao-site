import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { useEffect } from "react";
import { libs } from "./sunmao/lib";
import registerSunmaoEditor from "./SunmaoEditor";
import { getNavigateMethod, setStoreMethod, openHref } from "./sunmao/methods";
import store from "./store";
import "./init";
import "@sunmao-ui/editor/dist/index.css";

function VisualEditor() {
  const navigate = useNavigate();
  const options = {
    libs,
    dependencies: {
      store,
    },
    utilMethods: [getNavigateMethod(navigate), setStoreMethod, openHref],
  };
  const SitePageEditor = registerSunmaoEditor({ name: "site" }, options);

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/site");
    }
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/site" element={<SitePageEditor />} />
    </Routes>
  );
}

export default VisualEditor;
