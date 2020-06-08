import request from "@/global/request/axios";
import API from "@/global/request/api";

export default {
  list() {
    return request.GET(API.article);
  },
  update(id, params) {
    return request.PUT(API.articleItem(id), params);
  },
  insert(params) {
    return request.POST(API.article, params);
  },
  delete(id) {
    return request.DELETE(API.articleItem(id));
  },
  item(id) {
    return request.GET(API.articleItem(id));
  },
  redshow(id) {
    return request.GET(API.articleItem(id));
  }
};
