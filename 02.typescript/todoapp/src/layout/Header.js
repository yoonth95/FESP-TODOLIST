const Header = function (title) {
  const headerNode = document.createElement("header");
  headerNode.style.textAlign = "center";
  const h1 = document.createElement("h1");
  const headerTitle = document.createTextNode(title);
  h1.appendChild(headerTitle);
  headerNode.appendChild(h1);
  return headerNode;
};

export default Header;
