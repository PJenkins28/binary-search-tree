class Node {
  constructor(value) {
    this.value = value;
    this.left = null; //pointer
    this.right = null; //pointer
  }
}

class BST {
  constructor(value) {
    this.value = value;
    this.root = new Node(value);
    this.count = 1;
  }

  size() {
    return this.count;
  }
  insert(value) {
    // takes in a value, increments count, and creates a new node with value
    this.count++;

    let newNode = new Node(value);
    // compare value with root node
    // if value is less than root node, go left; if it is greater, go right
    const searchTree = (node) => {
      //if value is less than node.value, go left
      if (value < node.value) {
        if (!node.left) {
          //if there is no left child, insert the new node here
          node.left = newNode;
        } else {
          //if there is a left child, call searchTree to look left again
          searchTree(node.left);
        }
      }
      //if value is greater than node.value, go right
      else if (value > node.value) {
        if (!node.right) {
          node.right = newNode;
        } else {
        }
        searchTree(node.right);
      }
    };
    searchTree(this.root);
  }
  min() {
    // traverse the the ttree, but only going left
    let currentNode = this.root;
    while (currentNode.left) {
      //while a left child node exists, search left
      currentNode = currentNode.left;
    }
    return currentNode.value;
  }
  max() {
    let currentNode = this.root;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.value;
  }
  contain(value) {
    //checks whether value exists in the tree
    let currentNode = this.root;
    while (currentNode) {
      if (value === currentNode.value) {
        return true;
      }
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    // exit while loop without finding loop ?
    return false;
  }

  //depth first search - looking branch by branch

  //in order
  dfsInOrder() {
    // left, root, right
    let result = [];

    const traverse = (node) => {
      if (node.left) {
        //if there is a left node, traverse the tree again
        traverse(node.left);
      }
      //capture root node value
      result.push(node.value);
      if (node.right) {
        traverse(node.right);
      }
    };
    traverse(this.root); // calls on root node
    return result;
  }

  //pre order
  dfsPreOrder() {
    //root, left, right
    let result = [];
    const traverse = (node) => {
      //capture root node value
      result.push(node.value);
      if (node.left) {
        //if there is a left node, traverse the tree again
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
    };
    traverse(this.root);
    return result;
  }

  //post order
  dfsPostOrder() {
    //left, right, root
    let result = [];
    const traverse = (node) => {
      if (node.left) {
        //if there is a left node, traverse the tree again
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
      //capture root node value
      result.push(node.value);
    };
    traverse(this.root);
    return result;
  }

  //breadth first search - looking level by level
  breadthFirst() {
    //use a queue to return values by level
    let result = [];
    let queue = [];

    queue.push(this.root);
    while (queue.length != 0) {
      let currentNode = queue.shift(); // takes first item out of queue
      result.push(currentNode.value); // pushes taken node into the result array

      if (currentNode.left) {
        //if current node has left child, push it into the queue
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        //if current node has right child, push it into the queue
        queue.push(currentNode.right);
      }
    }
    return result;
  }
}

// Testing

const bst = new BST(15);

bst.insert(3);
bst.insert(36);
bst.insert(2);
bst.insert(12);
bst.insert(28);
bst.insert(39);

console.log(bst);

console.log(bst.size());
console.log(bst.min());
console.log(bst.max());

console.log(bst.contain(2));
console.log(bst.contain(100));

console.log(bst.dfsInOrder()); // [2, 3, 12, 15, 28, 36, 39]
console.log(bst.dfsPostOrder()); // [2, 12, 3, 28, 39, 36, 15]
console.log(bst.dfsPreOrder()); // [15, 3, 2, 12, 36, 28, 39]
console.log(bst.breadthFirst()); // [15, 3, 2, 12, 36, 28, 39]
