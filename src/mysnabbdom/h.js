import vnode from "./vnode.js";
// h('div',{},'文字');
// h('div',{},[]);
// h('div',{},h());
export default function (sel, data, c) {
    if (arguments.length != 3)
        throw new Error('参数必须为3')
    if (typeof c == 'string'|typeof c == 'number') {
        //形态1
        return vnode(sel,data, undefined,c,undefined)
    }else if(Array.isArray(c)){
        //形态2
        let children=[]
        for(let i=0;i<c.length;i++){
                if(!(typeof c[i]=='object' && c[i].hasOwnProperty('sel')))
                 throw new Error('传入的数组参数不对')
                children.push(c[i])
        }
        return vnode(sel,data, children,undefined,undefined)  
    }else if(typeof c=='object'&&c.hasOwnProperty('sel')){
        //形态3
        let children=[c]
        return vnode(sel,data, children,undefined,undefined)  
    }else{
        console.log('h函数参数不对')
    }
}