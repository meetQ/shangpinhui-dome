<template>
  <div>
    <Header />
    <!-- 路由组件显示的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>

  </div>
</template>

<script>
  import Header from "@/components/Header/index"
  import Footer from "@/components/Footer/index"
  export default {
    components: {
      Header,
      Footer
    },
    mounted() {
      //派发action(在这里只发送一次)
      this.$store.dispatch("categoryList")
    },
  }
</script>

<style>

</style>