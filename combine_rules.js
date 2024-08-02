import { Node } from "./main.js";

export const combineRules = (rules) => {
    let combinedAST = null;
    rules.forEach(ruleString => {
        const ast = createRule(ruleString);
        if (combinedAST === null) {
            combinedAST = ast;
        } else {
            combinedAST = new Node('operator', '&&', combinedAST, ast);
        }
    });
    return combinedAST;
};
