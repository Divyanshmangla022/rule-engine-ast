import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema({
    ruleString: { type: String, required: true, default: ""},
    ast: { type: Object, required: true, default:{}}
});

export const Rule = mongoose.model('Rule', ruleSchema);
