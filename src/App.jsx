import { BrowserRouter } from "react-router-dom";
import BaseRouter from "./routes";
import "./App.css";


function App() {
  return (
        <BrowserRouter>
          <BaseRouter />
        </BrowserRouter>

  );
}

export default App;