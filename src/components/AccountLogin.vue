<template>
  <div class="account-login-cantainer">
    <div class="account-login-bd">
      <div class="companpany-info-container">
        <span>信息发布管理系统</span>
      </div>
      <div class="account-login-mainer">
        <div class="login-tab-container">
          <div
            :class="['login-tab-item', { active: passwordMode }]"
            @click="passwordMode = !passwordMode"
          >
            账号密码登陆
          </div>
        </div>
        <div class="login-form-cantainer">
          <div class="login-form-password" v-show="passwordMode">
            <el-form
              :model="passwordFrom"
              status-icon
              :rules="passwordRules"
              ref="passwordFrom"
            >
              <el-form-item prop="phone">
                <el-input
                  type="number"
                  placeholder="请输手机号"
                  v-model="passwordFrom.phone"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  placeholder="请输入密码"
                  v-model="passwordFrom.password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  style="width: 100%"
                  @click="submitForm"
                  :loading="submitLoad"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userService from "@/global/service/user.js";
import DataStore from "@/global/storage/index.js";

export default {
  data() {
    return {
      passwordMode: true,
      submitLoad: false,
      passwordFrom: {
        phone: "",
        password: ""
      },
      passwordRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs["passwordFrom"].validate(valid => {
        if (!valid) return;
        this.submitLoad = true;
        let data = {
          phone: this.passwordFrom.phone,
          password: this.passwordFrom.password
        };
        userService
          .login(data)
          .then(res => {
            if (res.data.code === 200) {
              let token = res.data.token;
              DataStore.setToken(token);
              DataStore.setStatus(res.data.status);
              this.$router.replace({ name: "Article" });
            } else {
              this.$message.error("账号密码错误,请重新输入");
              this.submitLoad = false;
            }
          })
          .catch(() => {
            this.$message.error("服务器错误，请联系管理员！！");
            this.submitLoad = false;
          });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.companpany-info-container {
  text-align: center;
}
.flex-cell {
  display: flex;
  .flex-cell-bd {
    flex: 1;
  }
  .flex-cell-ft {
    width: 130px;
    margin-left: 8px;
    &:alter {
      display: none;
    }
    &.link {
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      color: #409eff;
      text-decoration: none;
    }
  }
}
.account-login-contaienr {
  display: flex;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
  background-position: center;
  padding-top: 40px;
  box-sizing: border-box;
}
.account-login-bd {
  flex: 1;
  padding: 32px 0;
}
.company-info-container {
  display: flex;
  justify-content: center;
  align-items: center;
  .company-info-logo {
    height: 44px;
    margin-right: 20px;
  }
  .company-info-name {
    line-height: 44px;
    font-size: 33px;
    font-weight: 600;
    font-family: Avenir;
  }
}
.company-info-desc {
  margin: 12px 0 40px;
  font-size: 14px;
  opacity: 0.5;
  text-align: center;
}
.account-login-mainer {
  max-width: 388px;
  margin: 40px auto;
}
.login-tab-container {
  text-align: center;
  margin-bottom: 24px;
  .login-tab-item {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    margin-right: 32px;
    padding: 12px 16px;
    cursor: pointer;
    font-size: 14px;
    line-height: 20px;
    color: #666;
    border-bottom: 2px solid transparent;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:last-child {
      margin-right: 0;
    }
    &.active {
      color: #1890ff;
      font-weight: 500;
      border-color: #1890ff;
    }
  }
}
</style>
