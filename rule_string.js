import { Node } from "./main.js";


const tokenize = (ruleString) => {
    // Implement tokenization logic
    // This is a simplified tokenizer
    return ruleString.match(/([a-zA-Z_]+|[<>=!]=?|&&|\|\||[()])/g);
};

const parseTokens = (tokens) => {
    // Implement parsing logic to create AST
    // This is a simplified parser
    const stack = [];
    for (let token of tokens) {
        if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            let right = stack.pop();
            let operator = stack.pop();
            let left = stack.pop();
            stack.pop();  // pop '('
            stack.push(new Node('operator', operator, left, right));
        } else if (token === '&&' || token === '||') {
            let right = stack.pop();
            let left = stack.pop();
            stack.push(new Node('operator', token, left, right));
        } else {
            stack.push(new Node('operand', token));
        }
    }
    return stack[0];
};

export const createRule = (ruleString) => {
    // Tokenize the rule string
    const tokens = tokenize(ruleString);
    // Parse the tokens into an AST
    const ast = parseTokens(tokens);
    return ast;
};

