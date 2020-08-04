import {
  React,
  BrowserRouter as Router,
  Route,
} from "./pages/perbendaharaan/libraries/dependencies";
import "./App.css";
// import { Worker } from "@phuocng/react-pdf-viewer";

// @import pages
import Perbendaharaan from "./pages/perbendaharaan";
import { RekamDokumenPiutang } from "./pages/perbendaharaan/dashboard";

const appRoutes = [
  {
    name: "RekamDokumenPiutang",
    component: RekamDokumenPiutang,
    exact: true,
    path: "/Perekaman",
  },
  {
    name: "Perbendaharaan",
    component: Perbendaharaan,
    exact: true,
    path: "/",
  },
];

function App() {
  return (
    // <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.js">
    <Router>
      {appRoutes.map((route) => (
        <Route key={route.name} {...route} />
      ))}
    </Router>
    // </Worker>
  );
}

export default App;
