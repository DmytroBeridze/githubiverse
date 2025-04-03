import { Route, Routes } from "react-router-dom";

import { Homepage } from "../pages/Homepage";
import { DevFinder } from "../pages/DevFinder";
import { RepoFinder } from "../pages/RepoFinder";
import { IssueFinder } from "../pages/IssueFinder";
import IssuesPage from "../pages/RepoFinder/IssuesPage/IssuesPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="devfinder" element={<DevFinder />}></Route>
      <Route path="repofinder" element={<RepoFinder />}></Route>
      <Route path="issuefinder" element={<IssueFinder />}></Route>
      <Route path="repofinder/issuesPage" element={<IssuesPage />}></Route>
    </Routes>
  );
};

export default AppRoutes;
