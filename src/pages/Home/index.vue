<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(floor) in floorList" :key="floor.id" :floor="floor" />
    <Brand />
  </div>
</template>

<script>
  //引入其他组件
  import ListContainer from "@/pages/Home/ListContainer"
  import Recommend from "@/pages/Home/Recommend"
  import Rank from "@/pages/Home/Rank"
  import Like from "@/pages/Home/Like"
  import Floor from "@/pages/Home/Floor"
  import Brand from "@/pages/Home/Brand"
  //引入mapState
  import {
    mapState
  } from "vuex"
  export default {
    name: "Home",
    components: {
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand
    },
    mounted() {
      //派发action,获取floor组件的数据
      this.$store.dispatch("getFloorList")
    },
    computed: {
      ...mapState({
        floorList: state => state.home.floorList
      })
    }
  }
</script>

<style>

</style>