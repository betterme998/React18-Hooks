// 编写React代码，并且通过React消染出来对应的内容
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
