//真正创造节点，将vnode创建成为dom，是孤儿节点，不进行插入
export default function createElement (vnode) {
    console.log('目的是把虚拟节点', vnode)
    let domNode = document.createElement(vnode.sel)
    if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
        domNode.innerText = vnode.text;
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        //内部是子节点，就要递归调用
        for (let i = 0; i < vnode.children.length; i++) {
            let ch = vnode.children[i];
            let chDom=createElement(ch);
            domNode.appendChild(chDom)
        }
    }
    vnode.elm=domNode;
    return vnode.elm;
};