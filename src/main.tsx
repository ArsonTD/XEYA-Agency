import React from "react"
import ReactDOM from "react-dom/client"
/* import Xeya from "./Xeya" */
import { RouterProvider } from "react-router-dom"
import {router} from "@/Ui/router"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
{/*     <Xeya /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
)
