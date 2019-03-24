<template>
<div class="empty">
  <img src="@/assets/icon/404.png" alt="">
  <div class="message">{{message}}</div>
</div>
</template>

<script>
export default {
  name: 'cnEmpty',
  props: {
    message: ''
  }
}
</script>

<style lang="less" scoped>
.empty {
  width: 100%;
  img {
    display: block;
    margin: 0 auto;
    margin-top: 20px;
  }
  .message {
    color: #c9c9c9;
    margin-top: 20px;
    text-align: center;
  }
}
</style>
