export default function(sel,data,children,text,elm){
    const key=data.key
    return{
        sel:sel,
        data:data,
        children:children,
        text:text,
        elm:elm,
        key:key
    };
}