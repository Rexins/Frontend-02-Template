function utf8_Encoding1(text) {
    const textEncode = new TextEncoder()
    const bytes = textEncode.encode(text)
    return bytes
}

function utf8_Encoding2(text) {
    const code = encodeURIComponent(text)
    const bytes = []
    for (let i = 0; i < code.length; i++) {
        const c = code.charAt(i);
        if (c === '%') {
            const hex = code.charAt(i + 1) + code.charAt(i+2);
            const hexVal = parseInt(hex, 16)
            console.log(hex, hexVal)
            bytes.push(hexVal)
            i += 2
        } else {
            bytes.push(c.charCodeAt(0))
        }
    }
    return new Uint8Array(bytes)
}

function utf8_Encoding3(text) {
    const bytes = []
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt[i]
        const strCode = String(code)
        if (code >= 0x000000 && code <= 0x00007F) {
            bytes.push(strCode.padStart(8, '0'))
        } else if (code >= 0x000080 && code <= 0x0007FF) {
            bytes.push('110' + strCode.slice(0, -6).padStart(5, '0'))
            bytes.push('10' + strCode.slice(-6))
        } else if (code >= 0x000800 && code <= 0x00FFFF) {
            bytes.push('1110' + strCode.slice(0, -12).padStart(4, '0'))
            bytes.push('10' + strCode.slice(-12, -6))
            bytes.push('10' + strCode.slice(-6))
        } else if (code >= 0x010000 && code <= 0x10FFFF) {
            bytes.push('11110' + strCode.slice(0 -18).padStart(3, '0'))
            bytes.push('10' + strCode.slice(-18, -12))
            bytes.push('10' + strCode.slice(-12, -6))
            bytes.push('10' + strCode.slice(-6))
        }
    }

    return Buffer.from(bytes)
}
