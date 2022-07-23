const h = (type, props, ...children) => {
  return { type, props, children: children.flat() };
};

const createElement = (nodeData) => {
  if (typeof nodeData === "string") {
    return document.createTextNode(nodeData);
  } else if (nodeData instanceof HTMLElement) {
    return nodeData;
  }

  const { type, props, children } = nodeData;

  const $el = document.createElement(type);

  Object.entries(props || {})
    .filter(([_, value]) => value)
    .forEach(([attr, value]) => $el.setAttribute(attr, value));

  const childrens = children.map(createElement);

  childrens.forEach((child) => $el.appendChild(child));

  return $el;
};

export { h, createElement };
