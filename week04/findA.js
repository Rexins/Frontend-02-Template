function findA(text) {
    for (let i =0; i < text.length; i++) {
        if (text.charAt(i) === 'a') {
            return true;
        }
    }
    return false;
}

function findAB(text) {
    const len = text.length
    if (len <= 2) {
        return text === 'ab'
    }
    for (let i = 0; i < len - 1; i++) {
        if (text.charAt(i) + text.charAt(i+1) === 'ab') {
            return true;
        }
    }
    return false;
}

function matchCharacter(text, matchText) {
    let findNum = 0;
    for (let v of text) {
        if (v === matchText.charAt(findNum)) {
            if (findNum === matchText.length - 1) return true;
            findNum++
        } else {
            findNum = 0
        }
    }
    return false
}