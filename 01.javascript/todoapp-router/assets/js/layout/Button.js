const Button = function (className, type, text, handleClick) {
  const buttonNode = document.createElement('button');
  buttonNode.setAttribute('class', className);
  buttonNode.innerText = text;
  buttonNode.classList.add('common-button');
  buttonNode.type = type;

  if (handleClick) {
    buttonNode.addEventListener('click', handleClick);
  }

  return buttonNode;
};

export default Button;
