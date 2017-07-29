function addEventHandler(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
}
//这是最通用的事件监听方法，可以跨浏览器

var tree1 = document.getElementById("chart-wrap");

require(['BinarySearchTree'], function() {
        //采用require.js实现模块化
        var nodeArr1 = document.getElementById("input-node");
        var btn = document.getElementById("submit1");
        var submit = addEventHandler(btn, "click", function() {
            var nodeArr = Number(nodeArr1.value);
            console.log(nodeArr);
            tree1.style.overflow = 'auto';
            create(nodeArr);
            nodeArr1.value='';
        });
        //在二叉树的外部定义的头节点，这样可扩展性较强，可以随时增加属性
        //
        var tree = new BinarySearchTree();
        function Node(key) {
            this.key = key;
            this.offsetL = 0;  //节点距离画布左边的距离
            this.offsetT = 0;  //节点距离画布左边的距离
            this.floor = 0;   //二叉树的层数,这个为了画的树更美观，不会挤在中间，第二层要画的稍远些
            this.drawleft = false;  //记录二叉树的左边线是否画
            this.drawright = false;  //记录二叉树的右边线是否画了
            this.struct = null;   //存的是每个节点的div元素，为了改变div显示的颜色，也是煞费苦心。。。
        }
        // var objArr=[];
        // for (var i = 0; i < nodeArr.length; i++) {
        //     objArr[i] = new Node(nodeArr[i]);
        //     tree.insert(objArr[i]);
        // }
        //之前采用的是将所有的节点都存在数组里，统一插入树中，后来为了通用，每输入一个节点就画一个节点
        function create(nodeArr){
            var objArr = new Node(nodeArr);
            tree.insert(objArr);
            tree.drawTree(draw);  //将draw函数作为回调函数
        }
        function draw(node) {
            var node_top = document.createElement("div");
            node_top.className = "circle";
            var left_line = document.createElement("div");
            var right_line = document.createElement("div");
            //先画根节点，判断根节点的信息是根节点没有父亲节点，并且处在第一层
            if (!node.parent && node.floor == 1) {
                node.offsetL = 475;
                node.offsetT = 50;
            } else {
                if (node.floor == 2) {
                    if (!node.parent.drawleft && node.key < node.parent.key) {
                        node.offsetL = node.parent.offsetL - 250;
                        node.offsetT = node.parent.offsetT + 100;
                        node.parent.drawleft = true;
                        left_line.className = "left-line";
                    } else if (!node.parent.drawright && node.key > node.parent.key) {
                        node.offsetL = node.parent.offsetL + 250;
                        node.offsetT = node.parent.offsetT + 100;
                        node.parent.drawright = true;
                        right_line.className = "right-line";
                    }
                } else {
                    if (!node.parent.drawleft && node.key < node.parent.key) {
                        node.offsetL = node.parent.offsetL - 100;
                        node.offsetT = node.parent.offsetT + 100;
                        node.parent.drawleft = true;
                        left_line.className = "left-little-line";

                    } else if (!node.parent.drawright && node.key > node.parent.key) {
                        node.offsetL = node.parent.offsetL + 100;
                        node.offsetT = node.parent.offsetT + 100;
                        node.parent.drawright = true;
                        right_line.className = "right-little-line";
                    }
                }
            }
            //画圆的位置
            node_top.style.left = node.offsetL + 'px';
            //画线的位置
            if (left_line.className == "left-line") {
                left_line.style.left = 25 + 'px';
                left_line.style.top = -51 + 'px';
            } else {
                left_line.style.left = 25 + 'px';
                left_line.style.top = -51 + 'px';
            }
            node_top.style.top = node.offsetT + 'px';
            if (right_line.className == "right-line") {
                right_line.style.left = -225 + 'px';
                right_line.style.top = -51 + 'px';
            } else {
                right_line.style.left = -75 + 'px';
                right_line.style.top = -51 + 'px';
            }
            node_top.style.backgroundColor = '#fff';
            tree1.appendChild(node_top);
            var innerspan = document.createElement("span");
            innerspan.className = "text";
            innerspan.innerHTML = node.key;
            node_top.appendChild(innerspan);
            node_top.appendChild(left_line);
            node_top.appendChild(right_line);
            node.struct = node_top;
        }
        //想把draw作为callback 函数，这样遍历的时候将树画出来
       
        //树的遍历（1）中序遍历：也是中根遍历
        // tree.inOrderTraverse(printNode);
        // 树的遍历 （2）先序遍历
        // tree.preOrderTraverse(printNode);
        // 输的遍历（3）后序遍历
        //tree.postOrderTraverse(draw);
        var preBtn = document.getElementById("preorder"); //前序遍历事件
        var inBtn = document.getElementById("inorder"); //中序遍历事件
        var postBtn = document.getElementById("postorder");  //后序遍历事件
        var resBtn = document.getElementById("reset");//重置事件
        var divList = [];
        var timer = null;

        function printNode(node) {
            divList.push(node);
        }

        function reset() {
            divList = [];
            clearInterval(timer);
        }
        addEventHandler(preBtn, "click", function() {
            reset();
            tree.preOrderTraverse(printNode);
            changeColor(divList);
        });
        addEventHandler(inBtn, "click", function() {
            reset();
            tree.inOrderTraverse(printNode);
            changeColor(divList);
        });
        addEventHandler(postBtn, "click", function() {
            reset();
            tree.postOrderTraverse(printNode);
            changeColor(divList);
        });
        addEventHandler(resBtn, "click", function() {
            tree = new BinarySearchTree();
            tree1.innerHTML = '';
        });
        //二叉树改变颜色
        function changeColor(node) {
            var i = 0;
            divList[i].struct.style.backgroundColor = 'orange';
            timer = setInterval(function(argument) {
                i++;
                if (i <= divList.length-1) {
                    divList[i - 1].struct.style.backgroundColor = '#fff';
                    divList[i].struct.style.backgroundColor = 'orange';
                } else {
                    divList[divList.length-1].struct.style.backgroundColor='#48D1CC';
                   // 没见过这么邪门的代码，刚刚这样写就不行，写个循环，再去掉就好了。。。。
                   //在这里的进度最差。。。。。
                    clearInterval(timer);
                }
            }, 500);
        }
        //查找功能实现
        var searchaNode = document.getElementById("searchANode");
        var searchBtn = document.getElementById("searchNode");
        addEventHandler(searchBtn,"click",function(){
            var newNode = new Node(Number(searchaNode.value));
            //console.log(newNode);
            tree.search(newNode,printNode);
            console.log(divList);
            if(divList){
                changeColor(divList);
                searchaNode.value='';
            }
            else {
                alert('请输入正确的节点');
                searchaNode.value='';
            }
        });
        //删除功能实现
        //tree.remove();
});




