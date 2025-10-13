import { createBrowserRouter } from "react-router-dom";
import About from "@/Ui/views/About";
import Xeya from "@/Xeya";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Xeya />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);
