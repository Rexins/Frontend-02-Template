const EOF = Symbol('EOF')

function start(c) {
    if (c.charAt(0) === 'a') {
        return foundA
    } else {
        return start
    }
}

function foundA(c) {
    if (c.charAt(0) === 'b') {
        return foundB
    } else {
        return start(c)
    }
}
function foundB(c) {
    if (c.charAt(0) === 'a') {
        return foundA2
    } else {
        return start(c)
    }
}
function foundA2(c) {
    if (c.charAt(0) === 'b') {
        return foundB2
    } else {
        return start(c)
    }
}
function foundB2(c) {
    if (c.charAt(0) === 'a') {
        return foundA3
    } else {
        return start(c)
    }
}
function foundA3(c) {
    if (c.charAt(0) === 'b') {
        return foundB3
    } else {
        return start(c)
    }
}
function foundB3(c) {
    if (c.charAt(0) === 'x') {
        return EOF
    } else {
        return foundB2(c)
    }
}

function match(text) {
    let state = start

    for (let c of text) {
        state = state(c)
    }
    return state === EOF
}


console.log(match('ababababababx'))