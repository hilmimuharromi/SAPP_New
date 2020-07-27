import { React, BrowserRouter as Router, Route } from './pages/perbendaharaan/libraries/dependencies';
import './App.css';

// @import pages
import Perbendaharaan from './pages/perbendaharaan';
import { RekamDokumenPiutang } from './pages/perbendaharaan/dashboard';

const appRoutes = [
  {
    name: "RekamDokumenPiutang",
    component: RekamDokumenPiutang,
    exact: true,
    path: "/Perekaman"
  },
  {
    name: "Perbendaharaan",
    component: Perbendaharaan,
    exact: true,
    path: "/"
  }
];

function App() {
  return (
    <Router>
      {appRoutes.map(route => <Route key={route.name} {...route} />)}
    </Router>
  )
}

export default App;