import h from "./mysnabbdom/h";
import patch from "./mysnabbdom/patch";
const container = document.getElementById('container')
// const btn=document.getElementById('btn')



const vnode1 = h('ul', {}, [
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'D' }, 'D'),
    h('li', { key: 'E' }, 'E'),
])
patch(container, vnode1)


const vnode2 = h('ul', {}, [
    h('li', { key: 'Q' }, 'Q'),
    h('li', { key: 'E' }, 'E'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'D' }, 'D'),
    h('li', { key: 'C' }, 'C'),
])

btn.onclick = function () {
    patch(vnode1, vnode2)
}