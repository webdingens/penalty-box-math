import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Provider } from "./SettingsContext";

const IndexPage = React.lazy(() => import("./pages/IndexPage"));
const StopwatchOverlayPage = React.lazy(() =>
  import("./pages/StopwatchOverlayPage")
);
const SheetPage = React.lazy(() => import("./pages/SheetPage"));

function App() {
  return (
    <Provider>
      <Suspense>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="stopwatch" element={<StopwatchOverlayPage />} />
          <Route path="sheet" element={<SheetPage />} />
        </Routes>
      </Suspense>
    </Provider>
  );
}

export default App;
