import { createBrowserRouter } from "react-router-dom";
import publicRouter from "./publicRoute";

const route = createBrowserRouter([...publicRouter]);

export default route;
