<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll "
            :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"/>
      <goods-list :goods="goods[currentType]"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>

  </div>
</template>

<script>
  //导入的子组件
  import HomeSwiper from "./childrenComps/HomeSwiper";
  import FeatureView from "./childrenComps/FeatureView";
  import RecommendView from "./childrenComps/RecommendView";

  //导入的公共组件
  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  //导入的方法
  import {getHomeMultidata, getHomeGoods} from "../../network/home";



  export default {
    name: "",
    data(){
      return({
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShow:false
      })
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType]
      }
    },
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods:  {
      /*
      * 事件监听的方法
      * */
      tabClick(index){
        switch (index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      contentScroll(position){
        this.isShow = -position.y > 1000
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      /*
      * 网络请求的相关代码
      * */
      getHomeMultidata()
      {
        getHomeMultidata().then(res => {
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.scroll.finishPullUp()
        })
      },
      backClick(){
        //500ms内返回顶部
        this.$refs.scroll.scroll.scrollTo(0,0,500)
      },
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
.home-nav{
  background-color: var(--color-tint);
  color:white;
  position:fixed;
  left:0;
  right:0;
  top: 0;
  z-index:9;
}
.tab-control{
  position: sticky;
  top: 44px;
  z-index: 10;
}
.content{
  /*height: 300px;*/
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/*.content{*/
/*  height: calc(100% - 93px);*/
/*  overflow: hidden;*/
/*  margin-top:44px;*/
/*}*/
</style>
