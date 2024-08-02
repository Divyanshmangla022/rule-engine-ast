import assert from 'assert'
import {createRule} from './rule_string.js'
import {combineRules }from './combine_rules.js'
import {evaluateRule} from './evaluate_rule.js'
// Test createRule function
const rule1 = "((age > 30 && department == 'Sales') || (age < 25 && department == 'Marketing')) && (salary > 50000 || experience > 5)";
const rule2 = "((age > 30 && department == 'Marketing')) && (salary > 20000 || experience > 5)";
const ast1 = createRule(rule1);
const ast2 = createRule(rule2);

// Test combineRules function
const combinedAST = combineRules([rule1, rule2]);

// Test evaluateRule function
const data = { age: 35, department: 'Sales', salary: 60000, experience: 3 };
assert.strictEqual(evaluateRule(ast1, data), true);
assert.strictEqual(evaluateRule(ast2, data), false);
assert.strictEqual(evaluateRule(combinedAST, data), true);
