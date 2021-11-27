<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: ""
  }
</script>

<style scoped>
  #tab-bar{
    display:flex;
    background-color: rgba(186, 183, 183, 0.75);
    position: fixed;
    left :0;
    right: 0;
    bottom: 0;
    box-shadow: 0px -2px 1px rgba(150, 150, 150, 0.5);
  }

</style>
