
export class Node {
    constructor(type, value = null, left = null, right = null) {
        this.type = type;  // "operator" or "operand"
        this.value = value;  // e.g., 'AND', 'OR', 'age > 30', etc.
        this.left = left;  // left child
        this.right = right;  // right child
    }
}


