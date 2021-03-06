<template>
  <div>
    <h2>About</h2>
    <p>{{msg}}</p>
    <input type="text">
  </div>
</template>

<script>
  export default {
  //  这里接收来自router-view的数据

    props: {
      msg: String
    }
  }
</script>

<style>

</style>
