import qs from "querystring"
const local = {
    setLocal(key,obj){
        console.log(qs.stringify(obj));
        localStorage.setItem(key,qs.stringify(obj));
    },
    getLocal(key){
        const result = localStorage.getItem(key);
        return qs.parse(result);
    },
    removeLocal(key){
        localStorage.removeItem(key)
    }
}
export default local