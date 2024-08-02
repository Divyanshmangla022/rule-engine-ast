

export const evaluateRule = (ast, data) => {
    if (ast.type === 'operand') {
        return evaluateOperand(ast.value, data);
    }
    const leftValue = evaluateRule(ast.left, data);
    const rightValue = evaluateRule(ast.right, data);
    return evaluateOperator(ast.value, leftValue, rightValue);
};

const evaluateOperand = (operand, data) => {
    // Implement operand evaluation logic
    const [key, operator, value] = operand.split(' ');
    switch (operator) {
        case '>':
            return data[key] > parseFloat(value);
        case '<':
            return data[key] < parseFloat(value);
        case '>=':
            return data[key] >= parseFloat(value);
        case '<=':
            return data[key] <= parseFloat(value);
        case '==':
            return data[key] == value;
        case '!=':
            return data[key] != value;
        default:
            throw new Error('Invalid operator');
    }
};

const evaluateOperator = (operator, leftValue, rightValue) => {
    if (operator === '&&') {
        return leftValue && rightValue;
    } else if (operator === '||') {
        return leftValue || rightValue;
    }
    return false;
};
