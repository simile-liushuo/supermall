<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  // import {Swiper} from "../../components/common/swiper";
  // import {SwiperItem} from "../../components/common/swiper";
  import {Swiper,SwiperItem } from "../../../components/common/swiper"

  export default {
    name: "",
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    },

  }
</script>

<style scoped>

</style>
