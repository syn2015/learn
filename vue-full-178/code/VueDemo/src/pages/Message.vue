<template>
  <div>
    <ul>
      <li v-for="m in messages" :key="m.id">
        <router-link :to="`/home/message/detail/${m.id}`">{{m.title}}</router-link>
        <button @click="pushShow(m.id)">push查看</button>
        <button @click="replaceShow(m.id)">replace查看</button>
      </li>
    </ul>
    <!-- $router.back()和$router.go(-1)返回上一个记录路由 -->
        <!-- $router.go(1)前进一个记录路由 -->

    <button @click="$router.back()">回退</button>
    <hr>
    <!-- 这里显示messagedetail组件 -->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        messages: [
         /* {id: 1, title: 'Message001'},
          {id: 3, title: 'Message003'},
          {id: 5, title: 'Message005'}*/
        ]
      }
    },

    mounted () {
      setTimeout(() => {
        const messages = [
          {id: 1, title: 'Message001'},
           {id: 3, title: 'Message003'},
           {id: 5, title: 'Message005'}
        ]
        this.messages = messages
      }, 1000)
    },

    methods: {
      pushShow (id) {
        // 操作$router路由器对象，push()和replace()
        this.$router.push(`/home/message/detail/${id}`) //可以返回到当前路由界面
      },

      replaceShow(id) {

        this.$router.replace(`/home/message/detail/${id}`)//不可以返回到当前路由界面
      }
    }
  }
</script>

<style>

</style>
