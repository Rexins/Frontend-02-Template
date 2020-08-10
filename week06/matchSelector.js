const ID_ATTR = 'id'
const TAG_NAME_ATTR = 'tagName'
const CLASS_NAME_ATTR = 'class'

const parseSelector = (selectorStr) => {
  const selectorAttrs = {
    [ID_ATTR]: '',
    [TAG_NAME_ATTR]: '',
    [CLASS_NAME_ATTR]: []
  }
  let matchAttrName = TAG_NAME_ATTR
  for (let c of selectorStr) {
    if (c === '#') {
      matchAttrName = ID_ATTR
      selectorAttrs[ID_ATTR] = ''
    } else if (c === '.') {
      matchAttrName = CLASS_NAME_ATTR
      selectorAttrs[CLASS_NAME_ATTR].push('')
    } else
    if (matchAttrName === CLASS_NAME_ATTR) {
      const classNames = selectorAttrs[CLASS_NAME_ATTR]
      classNames[classNames.length - 1] += c
    } else
      selectorAttrs[matchAttrName] += c
  }
  return selectorAttrs
}

function matchSelector(selector, element) {
  let match = true;
  for (let key in selector) {
    if (!selector[key].toString()) continue;
    const attrValue = element.getAttribute(key)
    if (key === CLASS_NAME_ATTR) {
      match = attrValue.split(' ').sort().toString() === selector[key].sort().toString()
    } else {
      match = attrValue === selector[key]
    }
    if (!match) return false
  }
  return match
}

function match(selector, element) {
  const selectorParts = selector.split(' ').reverse()

  let matchEl = element
  let matchNum = 0

  if (matchSelector(parseSelector(selectorParts[0]), matchEl)) {
    matchEl = element.parentElement
    matchNum++
  } else {
    return false
  }

  for (let i = 1; i < selectorParts.length; i++) {
    if (matchEl === null) return false
    const selectorStr = selectorParts[i]
    const selector = parseSelector(selectorStr)
    innerWhile: while (matchEl) {
      if (matchSelector(selector, [matchEl, matchEl = match.parentElement][0]))
        break innerWhile
    }
  }
  return matchNum >= (selectorParts.length - 1)
}

match('div#idParent.asdfasdfsd #id.class.abssasa', document.getElementById('id'))
