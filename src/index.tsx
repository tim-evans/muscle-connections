import { createRoot } from "react-dom/client";
import { App } from "./App";
import muscles from "../muscles.json";

let root = createRoot(document.querySelector("#app")!);
root.render(<App data={muscles} />);
