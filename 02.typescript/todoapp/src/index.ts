import "./index.css";
import "./global.css";
import App from "./App";
const root = document.querySelector("#root");

(async function () {
  root!.appendChild(await App()); // root는 null이 아님을 보장해서 컴파일러에게 전달함
})();

console.log("TODO App", location.href);
