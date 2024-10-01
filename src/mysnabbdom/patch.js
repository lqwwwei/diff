import vnode from "./vnode"
import creatElement from "./creatElement"
import patchVnode from "./patchVnode"
export default function patch(oldVnode, newVnode) {
    //判断第一个参数，是dom节点还是虚拟节点
    if (oldVnode.sel == '' || oldVnode.sel == undefined) {
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, []
            , undefined, oldVnode)
    }
    if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
        console.log('是同一个节点')
        patchVnode(oldVnode,newVnode)
        
    } else {
        //不是同一个节点，要暴力输出，插入新的
        let newVnodeElm = creatElement(newVnode);
        if (oldVnode.elm.parentNode && newVnodeElm) {
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
        }
        //删除老节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm);
    }
}