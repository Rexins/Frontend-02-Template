/**
 * 四则运算 词法/语法分析 AST 构建
 * TokenNumber [0-9]
 * Operator +、-、*、|
 * Whitespace: <SP>
 * LineTerminator: <LF> <CR>
 *
 * <Express>::=
 *      <AdditiveExpress><EOF>
 *
 * <AdditiveExpress>::=
 *      <MultiplicativeExpress>
 *      |<AdditiveExpress><+><MultiplicativeExpress>
 *      |<AdditiveExpress><-><MultiplicativeExpress>
 *
 * <MultiplicativeExpress>::=
 *      <Number>
 *      |<MultiplicativeExpress><*><Number>
 *      |<MultiplicativeExpress></><Number>
 */

const regExp = /([0-9\.]+)|([ \t\n\r]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g

const dictionary = ['Number', 'Whitespace', 'LineTerminator', '*', '/', '+', '-']

function* tokenize(source) {
    let result = null
    let lastIndex = 0;
    while (true) {
        lastIndex = regExp.lastIndex
        result = regExp.exec(source)

        if (!result)
            break;
        if (regExp.lastIndex - lastIndex > result[0].length) {
            break;
        }

        let token = {
            type: null,
            value: null
        }

        for (var i = 1; i <= dictionary.length; i++) {
            if (result[i])
                token.type = dictionary[i - 1]
        }
        token.value = result[0]
        yield token;
    }

    yield {
        type: 'EOF'
    }
}
