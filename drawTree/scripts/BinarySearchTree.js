/*
* 二叉搜索树，特点是左子树存储比父节点小的值，右子树存储比父节点大或者等于的值。
*/
function BinarySearchTree(){
	var root = null;
	this.insert = function(node){
		var newNode = node;
		if(root === null){
			root = newNode;
			newNode.floor = 1;
		}else{
			insertNode(root,newNode);
		}
	};
	this.inOrderTraverse = function(callback){
		inOrderTraverseNode(root,callback);
	};
	this.preOrderTraverse = function(callback){
		preOrderTraverseNode(root,callback);
	};
	this.postOrderTraverse = function(callback){
		postOrderTraverseNode(root,callback);
	};
	this.min = function(){
		return minNode(root); //查找树的最小值
	};
	this.max = function(){
		return maxNode(root);  //查找树的最大值
	};
	this.search = function(node,callback){
		return searchNode(root,node,callback); //查找树的给定值
	};
	this.searchL = function(){
		return searchNodeL(root);
	};
	this.searchR = function(){
		return searchNodeR(root);
	};
	this.searchP = function(node){
		return searchNodeP(root,node);
	};
	this.drawTree = function(callback){
		createTree(root,callback);
	};
	this.remove = function(node){
		removeNode(root,node);
	};
}
/*
*我们实现的方法包括：
insert(key);
search(key);
inOrderTraverse: 中序遍历所有节点
preOrderTraverse:先序遍历所有节点
postOrderTraverse:后序遍历所有节点
min:返回树中最小的值/键
max:返回树中最大的值/键
remove(key):从树中移除某个键
*/
var insertNode = function(node,newNode){
	if(newNode.key < node.key){
		if(!node.left){
			node.left = newNode;
			newNode.parent = node;
			newNode.floor = node.floor+1;
		}else{
			insertNode(node.left,newNode);
		}
	}else{
		if(!node.right){
			node.right = newNode;
			newNode.parent = node;
			newNode.floor = node.floor+1;
		}else{
			insertNode(node.right,newNode);
		}
	}
};
var inOrderTraverseNode = function(node, callback){
	if(node != null){
		inOrderTraverseNode(node.left,callback);
		callback(node);
		inOrderTraverseNode(node.right,callback);
	}
};
var preOrderTraverseNode = function(node,callback){
	if(node != null){
		callback(node);
		preOrderTraverseNode(node.left,callback);
		preOrderTraverseNode(node.right,callback);
	}
};
var postOrderTraverseNode = function(node,callback){
	if(node != null){
		postOrderTraverseNode(node.left,callback);
		postOrderTraverseNode(node.right,callback);
		callback(node);
	}
};
var minNode = function(node){
	if(node){
		while(node && node.left != null){
			node = node.left;
		}
		return node;
	}
	return null;
};
function maxNode(node){
	if(node){
		while(node && node.right != null){
			node = node.right;
		}
		return node;
	}
	return null;
};
var searchNode=function(node,node1,callback){
	if(node){
		if(node1.key < node.key){
			callback(node);
			searchNode(node.left,node1,callback);
		}else if(node1.key > node.key){
			callback(node);
			searchNode(node.right,node1,callback);
		}else{
			callback(node);
			return ;
		}
	}	
};
var createTree = function(node,callback){
	if(node != null){
		callback(node);
		createTree(node.left,callback);
		createTree(node.right,callback);
	}
};
var removeNode = function(node){
	if(!node.left && !node.right)
	{
		node = null;
		return node;
	}else if(!node.left){
		node = node.right;
		return node;
	}else if(!node.right){
		node = node.left;
		return node;
	}else{
		var aux = min(node.right);
		node.key = aux.key;
		node.right = remove(node.right,aux);
		return node;
	}
}















