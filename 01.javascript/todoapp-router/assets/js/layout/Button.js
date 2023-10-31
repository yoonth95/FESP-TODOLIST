const Button = function (className, type, text) {
  const buttonNode = document.createElement("button");
  buttonNode.setAttribute("class", className);
  buttonNode.innerText = text;
  buttonNode.classList.add("common-button");
  buttonNode.type = type;

  return buttonNode;
};

export default Button;
