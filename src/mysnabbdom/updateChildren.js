import createElement from "./creatElement";
import patchVnode from "./patchVnode";

function checkSameVnode(a, b) {
    return a.sel === b.sel && a.key === b.key;
}

export default function updateChildren(parentElm, oldCh, newCh) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let newEndIdx = newCh.length - 1; // 四个指针

    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx]; // 四个节点
    let keymap = null;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        // 首先略过标记为 undefined 的东西
        if (oldStartVnode == null || oldCh[oldStartIdx] == undefined) {
            oldStartVnode = oldCh[++oldStartIdx];
        } else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
            oldEndVnode = oldCh[--oldEndIdx];
        } else if (newStartVnode == null || newCh[newStartIdx] == undefined) {
            newStartVnode = newCh[++newStartIdx];
        } else if (newEndVnode == null || newCh[newEndIdx] == undefined) {
            newEndVnode = newCh[--newEndIdx];
        }

        if (checkSameVnode(oldStartVnode, newStartVnode)) {
            // 新前与旧前
            patchVnode(oldStartVnode, newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
            // 新后与旧后
            patchVnode(oldEndVnode, newEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
            // 新后与旧前
            console.log('新后与旧前');
            patchVnode(oldStartVnode, newEndVnode);
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
            // 新前与旧后
            patchVnode(oldEndVnode, newStartVnode);
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        } else {
            // 四种都没有命中
            // 寻找 key 的 map
            if (!keymap) {
                keymap = {};
                for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                    const key = oldCh[i].key;
                    if (key !== undefined) {
                        keymap[key] = i;
                    }
                }
            }
            const idxInOld = keymap[newStartVnode.key];
            if (idxInOld === undefined) {
                // 如果找不到对应的旧节点，则创建新的节点
                parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
            } else {
                // 找到了对应的旧节点，将其移到正确的位置
                const vnodeToMove = oldCh[idxInOld];
                oldCh[idxInOld] = undefined; // 标记为已处理
                parentElm.insertBefore(vnodeToMove.elm, oldStartVnode.elm);
                patchVnode(vnodeToMove, newStartVnode);
            }
            newStartVnode = newCh[++newStartIdx];
        }
    }

    if (newStartIdx <= newEndIdx) {
        // 新节点还有剩余，需要添加
        // const before = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null;
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm);
        }
    } else if (oldStartIdx <= oldEndIdx) {
        // 旧节点还有剩余，需要删除
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            if (oldCh[i]) { // 只删除未标记为 undefined 的节点
                parentElm.removeChild(oldCh[i].elm);
            }
        }
    }
}