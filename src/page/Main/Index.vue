<template>
    <div>
        Index
            <div :data="test" @click="onlcik">click</div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    methods:{
        test(){
            console.log("22222222")
        },
        onlcik() {
            this.test()
        }
    },
}
</script>
<style lang="less" scope>

</style>
