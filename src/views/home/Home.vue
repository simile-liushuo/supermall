<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import {getHomeMultidata} from "../../network/home";
  import HomeSwiper from "./childrenComps/HomeSwiper";

  // import {Swiper} from "../../components/common/swiper";
  // import {SwiperItem} from "../../components/common/swiper";
  import {Swiper ,SwiperItem} from "../../components/common/swiper"
  import RecommendView from "./childrenComps/RecommendView";

  export default {
    name: "",
    data(){
      return({
        banners:[],
        recommends:[]
      })
    },
    components:{
      NavBar,
      HomeSwiper,
      RecommendView
    },
    created() {
      //1.请求多个数据
      getHomeMultidata().then(res =>{
        // console.log(res);
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      })
    }
  }
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color:white;
}
</style>
