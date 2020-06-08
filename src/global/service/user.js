import request from "@/global/request/axios";
import API from "@/global/request/api";
import DataStore from "@/global/storage/index";
const user = {
  list: function() {
    return request.GET(API.user);
  },
  insert: function(params) {
    return request.POST(API.user, params);
  },
  update: function(id, params) {
    return request.PUT(API.userItem(id), params);
  },
  delete: function(id) {
    return request.DELETE(API.userItem(id));
  },
  login: function(params) {
    return request.POST(API.login, params);
  },
  outLogin: function() {
    DataStore.clear();
  },
  userInfo() {
    const mapData = DataStore.map.get("userInfo");
    if (mapData) {
      return Promise.resolve(mapData);
    }
    return request.GET(API.userInfo).then(res => {
      DataStore.map.set("userInfo", res);
      return res;
    });
  }
};
export default user;
