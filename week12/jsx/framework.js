export function createElement(type, attributes, ...children) {
  let element
  if (typeof type === "stirng")
    element = new ElementWrapper(type)
  else
    element = new type;
  for (let name in attributes) {
    element.setAttribute(name, attributes[name])
  }

  for (let child of children) {
    if (typeof child === 'string') {
      child = new TextWrapper(child)
    }
    child.mountTo(element)
  }
  return element
}

export class Component {
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(child) {
    this.root.appendChild(child)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class ElementWrapper extends Component {
  constructor(type) {
    super()
    this.root = document.createElement(type)
  }
}

class TextWrapper extends Component {
  constructor(content) {
    this.root = document.createTextNode(content)
  }
}
