<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="checkAll"/>
    </label>
    <span>
          <span>已完成{{completeSize}}</span> / 全部{{todos.length}}
        </span>
    <button class="btn btn-danger" v-show="completeSize" @click="deleteAllCompleted">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    props: {
      todos: Array,
      deleteCompleteTodos: Function,
      selectAll: Function
    },

    computed: {
      completeSize () {
        // reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
//注意: reduce() 对于空数组是不会执行回调函数的。
      //pretotal,初始值；todo,当前元素；0是初始值
        return this.todos.reduce((preTotal, todo) => preTotal + (todo.complete?1:0) ,0)
      },
      //是否全选功能
      checkAll: {
        get () { // 决定是否勾选
          return this.completeSize===this.todos.length && this.completeSize>0
        },
        //读取是否全选
        set (value) {// 点击了全选checkbox  value是当前checkbox的选中状态(true/false)
          this.selectAll(value)
        }
      },
    },

    methods: {
      deleteAllCompleted () {
        if(window.confirm('确定清除已完成的吗?')) {
          this.deleteCompleteTodos()
        }
      }
    }
  }
</script>

<style>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }

</style>
