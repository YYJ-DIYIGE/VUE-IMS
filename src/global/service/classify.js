import request from "@/global/request/axios";
import API from "@/global/request/api";

const classify = {
  list: function() {
    return request.GET(API.classify);
  },
  insert: function(params) {
    return request.POST(API.classify, params);
  },
  update: function(id, params) {
    return request.PUT(API.classifyItem(id), params);
  },
  delete: function(id) {
    return request.DELETE(API.classifyItem(id));
  }
};
export default classify;
