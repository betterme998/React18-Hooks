// header导航栏控制nav Icon 照片视频配置文件
const navIconConfig = [
  {
    poster: require("@/assets/img/house-selected.avif"),
    videoSrc: [
      {
        src: require("@/assets/video/static-resources/house-selected.mov"),
        type: "video/mp4; codecs='hvc1'",
      },
      {
        src: require("@/assets/video/static-resources/house-selected.webm"),
        type: "video/webm",
      },
    ],
    key: 1,
  },
  {
    poster: require("@/assets/img/balloon-selected.avif"),
    videoSrc: [
      {
        src: require("@/assets/video/static-resources/balloon-selected.mov"),
        type: "video/mp4; codecs='hvc1'",
      },
      {
        src: require("@/assets/video/static-resources/balloon-selected.webm"),
        type: "video/webm",
      },
    ],
    key: 2,
  },
  {
    poster: require("@/assets/img/consierge-selected.avif"),
    videoSrc: [
      {
        src: require("@/assets/video/static-resources/consierge-selected.mov"),
        type: "video/mp4; codecs='hvc1'",
      },
      {
        src: require("@/assets/video/static-resources/consierge-selected.webm"),
        type: "video/webm",
      },
    ],
    key: 3,
  },
];

export default navIconConfig;
