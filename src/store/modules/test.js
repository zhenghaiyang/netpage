const state={
    userInfo:{
        name:"1212"
    }
}

const mutations={
        
}

const actions={

}
export default {
    namespaced:true,//namespaced为false的时候，state,mutations,actions全局可以调用，为true，生成作用域，模块下可以调用
    state,
    mutations,
    actions
}