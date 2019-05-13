const storage = {}

const getLocalStorage=function(str){
    if(!str){
      return  new Error("Must localStorage str!")
    }
  return  JSON.parse(window.localStorage.getItem(str))
}

const setLocalStorage=function(str,val) {
    if(!str||!val) {
        return  new Error("Must localStorage str and val")
    }
    window.localStorage.setItem(str,JSON.stringify(val))
}
storage.getLocalStorage=getLocalStorage
storage.setLocalStorage=setLocalStorage
export default storage;