<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll";

  export default {
    name: "",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default: false
      }
    },
    data(){
      return{
        scroll:null
      }
    },
    mounted(){
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        observerDOM:true,
        observeImage:true,
        probeType:this.probeType,
        pullUpLoad: this.pullUpLoad,
        click:true
      })
    //  2.监听滚动的位置
      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)
      })

    //  3.监听上拉更多
      this.scroll.on('pullingUp', ()=>{
        this.$emit('pullingUp')
      })
    }
  }
</script>

<style scoped>

</style>
