import creatElement from "./creatElement";
import updateChildren from "./updateChildren";
export default function patchVnode(oldVnode, newVnode) {
    if (oldVnode === newVnode) return;
    if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.
        children.length == 0)) {
        //新vnode有text
        console.log(' //新vnode有text')
        if (newVnode.text != oldVnode.text) {
            oldVnode.elm.innerText = newVnode.text
        }
    } else {
        //新节点没text属性
        console.log("新节点没text属性")
        if (oldVnode.children != undefined && oldVnode.children.length > 0) {
            //老的有children，新的也有children最复杂的情况
            updateChildren(oldVnode.elm,oldVnode.children,newVnode.children)
        } else {
            //老的没有children，新的有
            oldVnode.elm.innerText = '';
            for (let i = 0; i < newVnode.children.length; i++) {
                let dom = creatElement(newVnode.children[i]);
                oldVnode.elm.appendChild(dom);
            }
        }
    }
}