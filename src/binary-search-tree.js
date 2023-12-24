const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor () {
    this.treeRoot = null;
  }


  root() {
    return this.treeRoot;
  }

  add(data) {
    let newBranch = new Node(data);

    if(this.treeRoot === null) {
      this.treeRoot = newBranch;
    } else {
      addBranch(this.treeRoot, newBranch);
    };

    function addBranch(oldValue, newValue) {
      if(oldValue.data > newValue.data) {
        if(oldValue.left === null) {
          oldValue.left = newValue;
        } else {
          addBranch(oldValue.left, newValue);
        }
      } else if(oldValue.data < newValue.data) {
        if(oldValue.right === null) {
          oldValue.right = newValue;
        } else {
          addBranch(oldValue.right, newValue);
        }
      };
    };
  };

  has(data) {
    let current = this.treeRoot;

    while(current) {
      if (data === current.data) {
        return true;
      } 

      if(data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  find(data) {
    let current = this.treeRoot;

    while(current.data !== data) {

      if(data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }

      if(current === null) {
        return null;
      }
    }
    return current;
  }

  remove(data) {
    this.treeRoot = removeNode(this.treeRoot, data);

    function removeNode(branch, data) {
      if(branch === null) {
        return null;
      }

      if(data < branch.data) {
        branch.left = removeNode(branch.left, data);
        return branch;
      } else if(branch.data < data) {
        branch.right = removeNode(branch.right, data);
        return branch;
      } else {
        if(branch.left === null && branch.right === null) {
          return null;
        }

        if (branch.left === null) {
          branch = branch.right;
          return branch;
        }
  
        if(branch.right === null) {
          branch = branch.left;
          return branch;
        }
  
        let minRight = branch.right;
        while(minRight.left) {
          minRight = minRight.left;
        }
        branch.data = minRight.data;
  
        branch.right = removeNode(branch.right, minRight.data);
  
        return branch;
      }
    }
  }

  min() {
    let current = this.treeRoot;

    while(current.left) {
      current = current.left;
    }
    return current.data
  }

  max() {
    let current = this.treeRoot;

    while(current.right) {
      current = current.right;
    }
    return current.data
  }
}

module.exports = {
  BinarySearchTree
};