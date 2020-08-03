function parseSelector(selectorParts) {
    return selectorParts.map(selector => {
        const result = {
            tagName: '',
            class: '',
            id: ''
        }
    })
}

function match(selector, element) {
    const selectorParts = selector.split(' ').reverse()

    const elList = [element]

    while (element.parentNode) {
        elList.push(element.parentNode)
    }

}