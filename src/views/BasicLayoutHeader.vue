<template>
  <div class="header-section">
    <div class="header-hd"><Breadcrumb /></div>
    <div class="header-bd"></div>
    <div class="header-ft">
      <el-dropdown style="height: 100%;" @command="handleCommand">
        <div class="bar-info-container">
          <img src="@/assets/good.gif" />
          <span class="userInfo-name">Jax</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-video-pause" command="out"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/views/BasicBreadcrumb.vue";
import userService from "@/global/service/user.js";
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  components: {
    Breadcrumb
  },
  created() {
    userService.userInfo().then(res => {
      this.userInfo = res;
    });
  },
  methods: {
    handleCommand(command) {
      if (command == "out") this.out();
    },
    out() {
      userService.outLogin();
    }
  }
};
</script>

<style lang="less" scoped>
.header-section {
  position: relative;
  padding: 0 16px;
  height: 64px;
  display: flex;
  z-index: 10;
  background-color: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  .header-bd {
    flex: 1;
  }
}
.header-ft {
  display: flex;
  align-items: center;
}
.bar-info-container img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 30px;
}
.bar-info-container {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: #ecf5ff;
  }
  .userInfo-name {
    font-size: 14px;
    vertical-align: middle;
  }
  .userInfo-avatar {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #ccc;
    border-radius: 50%;
    outline: none;
    margin: 0 10px;
  }
}
</style>
