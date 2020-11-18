/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
const hostname = window.location.hostname;

const api = {
  localhost: "http://192.168.43.211:30008/",
  platform: "http://node.toxsl.in:30008/"
};

let apiBase = "";
if (hostname === "localhost") {
  apiBase = api.localhost;
} else {
  apiBase = api.platform;
}
export default apiBase;
