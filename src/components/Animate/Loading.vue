<template>
  <div id="body">
    <div id="bg">
      <img src="../../assets/image/ok.gif" alt="" />
      <div id="title">
        <img id="logo" src="../../assets/image/logo_1.svg" alt="" />
      </div>
    </div>
    <div id="box">
      <div id="box_bg"></div>
      <div id="status">{{status}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      typeof: String,
      default: "khởi tạo",
    },
  },
};
</script>

<style lang="scss" scoped>
#body {
  background: black;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  z-index: 9999;
}
#bg {
  display: flex;
  align-items: center;
  justify-content: center;
}

#title {
  font-size: 40px;
  color: #fff;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

#logo {
  width: 35%;
  opacity: 0.5;
  animation: log;
  animation-duration: 2s;
}

#box {
  margin: 0 auto;
  width: 400px;
  height: 40px;
  text-align: center;
  text-transform: uppercase;
  color: #1fd1fe;
}

#box_bg {
  position: relative;
  width: 100%;
  height: 100%;
  background: #1fd1fe;
  opacity: 0;
  top: 0;
  left: 0;
  z-index: 99;
  font-weight: 900;
  animation: log_2;
  animation-fill-mode: forwards;
  animation-duration: 2s;
  animation-delay: 1s;
}
#status {
  animation: log_3;
  animation-fill-mode: forwards;
  animation-duration: 2s;
  animation-delay: 1s;
  opacity: 0;
  font-size: 30px;
}

@keyframes log_2 {
  from {
    width: 0%;
    height: 100%;
    background: #1fd1fe;
    opacity: 0;
  }

  to {
    width: 100%;
    height: 100%;
    background: #1fd1fe;
    opacity: 0.5;
  }
}

@keyframes log {
  from {
    width: 0;
    opacity: 0;
  }

  to {
    width: 35%;
    opacity: 0.5;
  }
}

@keyframes log_3 {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
