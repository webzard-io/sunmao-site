import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { Suspense, lazy, useEffect, useMemo } from "react";
import { libs } from "./sunmao/lib";
import registerSunmaoApp from "./SunmaoApp";
import { getNavigateMethod, setStoreMethod, openHref } from "./sunmao/methods";
import store from "./store";
import type { Schema } from "./types";
import "./init";

function App() {
  const navigate = useNavigate();
  const options = useMemo(
    () => ({
      libs,
      dependencies: {
        store,
      },
      utilMethods: [getNavigateMethod(navigate), setStoreMethod, openHref],
    }),
    [navigate]
  );
  const SitePage = useMemo(
    () =>
      lazy(() =>
        import("./sunmao/site.json").then((site) => ({
          default: registerSunmaoApp(site as Schema, options),
        }))
      ),
    [options]
  );

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/site");
    }
  }, [location.pathname, navigate]);

  return (
    <Suspense fallback={<span>loading</span>}>
      <Routes>
        <Route path="/site" element={<SitePage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
