import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import {createRule} from './rule_string.js';
import {combineRules} from './combine_rules.js';
import {evaluateRule} from './evaluate_rule.js';


const app = express();
app.use(bodyParser.json());

// Database setup
mongoose.connect('mongodb://localhost:27017/ruleEngine', { useNewUrlParser: true, useUnifiedTopology: true });
import { Rule } from './ruleSchema.js'; // Ensure the rule model is in a separate file named `rule.js`

// API Endpoints
app.post('/create_rule', async (req, res) => {
    const ruleString = req.body.ruleString;
    const ast = createRule(ruleString);
    const rule = new Rule({ ruleString, ast });
    
    try {
        await rule.save();
        res.json({ id: rule._id, ast });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/combine_rules', async (req, res) => {
    const ruleStrings = req.body.ruleStrings;
    const combinedAST = combineRules(ruleStrings);
    res.json({ ast: combinedAST });
});

app.post('/evaluate_rule', (req, res) => {
    const ast = req.body.ast;
    const data = req.body.data;
    const result = evaluateRule(ast, data);
    res.json({ result });
});



// Server setup
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
