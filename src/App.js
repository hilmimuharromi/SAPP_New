import { React } from "./libraries/dependencies";
import "./App.css";
import { Provider } from "react-redux";
import store from "./stores";
// @import pages
import PageAll from "./pages";

function App(props) {
  return (
    <Provider store={store}>
      <PageAll />
    </Provider>
  );
}

export default App;
