// header导航栏控制nav Icon 照片视频配置文件
const navIconConfig = [
  {
    posters: {
      poster: require("@/assets/img/house-selected.avif"),
      posterActive: require("@/assets/img/house-selected-active.avif"),
    },
    videoSrc: [
      {
        src: require("@/assets/video/static-resources/house-selected.mov"),
        srcTwirl: require("@/assets/video/static-resources/house-twirl-selected.mov"),
        type: "video/mp4; codecs='hvc1'",
      },
      {
        src: require("@/assets/video/static-resources/house-selected.webm"),
        srcTwirl: require("@/assets/video/static-resources/house-twirl-selected.webm"),
        type: "video/webm",
      },
    ],
    key: 1,
  },
  {
    posters: {
      poster: require("@/assets/img/balloon-selected.avif"),
      posterActive: require("@/assets/img/balloon-selected-active.avif"),
    },
    videoSrc: [
      {
        src: require("@/assets/video/static-resources/balloon-selected.mov"),
        srcTwirl: require("@/assets/video/static-resources/balloon-twirl.mov"),
        type: "video/mp4; codecs='hvc1'",
      },
      {
        src: require("@/assets/video/static-resources/balloon-selected.webm"),
        srcTwirl: require("@/assets/video/static-resources/balloon-twirl.webm"),
        type: "video/webm",
      },
    ],
    key: 2,
  },
  {
    posters: {
      poster: require("@/assets/img/consierge-selected.avif"),
      posterActive: require("@/assets/img/consierge-selected-active.avif"),
    },
    videoSrc: [
      {
        src: require("@/assets/video/static-resources/consierge-selected.mov"),
        srcTwirl: require("@/assets/video/static-resources/consierge-twirl.mov"),
        type: "video/mp4; codecs='hvc1'",
      },
      {
        src: require("@/assets/video/static-resources/consierge-selected.webm"),
        srcTwirl: require("@/assets/video/static-resources/consierge-twirl.webm"),
        type: "video/webm",
      },
    ],
    key: 3,
  },
];

export default navIconConfig;
