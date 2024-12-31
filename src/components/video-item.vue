<template>
  <div class="video-player">
    <div :id="`mse-${index}`"></div>
    <!-- 播放暂停区域 -->
    <div
      class="video-player-btn-container"
      @click="changePlayStatusClick"
      v-show="!isReduceVideo && !clearScreen"
    >
      <Icon
        v-show="this.playStatus === 'Paused'"
        type="play"
        :size="40"
        color="#ffffff"
      />
    </div>
    <!-- 封面区域 -->
    <img
      class="video-player-poster"
      :src="videoInfo.coverImage"
      v-if="this.playStatus !== 'Playing' && !clearScreen"
    />
    <!-- 自定义左边区域 -->
    <div class="video-player-left" v-show="!isClearScreen">
      <div class="video-player-left-header flex align-items-center">
        <img :src="videoInfo.coverImage" />
        <div class="video-player-left-header-content">
          <div class="video-title">{{ videoInfo.title }}</div>
          <div class="video-tags flex flex-wrap">
            <span v-for="tag in videoInfo.tag">{{ tag }}</span>
          </div>
        </div>
      </div>
      <div class="pos-r video-player-left-desc">
        <div
          class="video-player-left-desc-text"
          :class="{ 'text-ellipsis-3': !expand }"
          v-if="videoInfo.desc"
          ref="descRef"
        >
          <div
            class="video-player-left-desc-toggle-btn-placeholder"
            v-show="!expand"
          ></div>
          <span ref="textRef">{{ videoInfo.desc }}</span>
        </div>
        <span
          v-show="!expand && textOverHide"
          class="video-player-left-desc-expand-btn"
          @click="expand = true"
          >展开</span
        >
        <span
          v-show="expand"
          @click="expand = false"
          class="video-player-left-desc-pack-btn"
          >收起</span
        >
      </div>

      <slot name="left" />
    </div>

    <!-- 右边区域 -->
    <div
      class="video-player-right flex flex-column align-items-center"
      v-show="!isClearScreen"
    >
      <div class="pos-r">
        <div v-show="showMutedGuide" class="video-player-right-muted-hint">
          在这里开启声音
        </div>
        <img
          class="video-player-right-muted"
          :src="
            require(`@/assets/images/icons/${
              videoMuted ? 'muted' : 'no-muted'
            }.png`)
          "
          @click="changeVideoMuted"
        />
      </div>

      <div
        class="video-player-right-collect flex flex-column align-items-center"
        :class="{ active: videoInfo.isCollect }"
        @click="changeCollect"
      >
        <Icon type="shoucang" :size="24" />
        <span class="video-player-right-collect-text"
          >{{ videoInfo.isCollect ? "已" : "" }}追剧</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { I18N } from "xgplayer";
import ZH from "xgplayer/es/lang/zh-cn";
import { SimplePlayer } from "xgplayer";
import "xgplayer/dist/index.min.css";
import Mobile from "xgplayer/es/plugins/mobile";
import Progress from "xgplayer/es/plugins/progress";
import Loading from "xgplayer/es/plugins/loading";
import Poster from "xgplayer/es/plugins/poster";
import { Events } from "xgplayer";
import Icon from "@/components/icon.vue";
import { Toast } from "vant";

export default {
  name: "VideoItem",
  components: {
    Icon,
  },
  props: {
    videoItem: Object, //视频信息
    isMuted: Boolean, //是否静音
    index: Number, //索引
    cureentPlayingIndex: Number,
    showGuide: Boolean,
    clearScreen: Boolean, //是否清屏
  },
  data() {
    return {
      player: null,
      timer: null,
      expand: false,
      textOverHide: false, //超出3行显示展开
      isReduceVideo: false, //是否缩小视频
      playStatus: "", //播放状态
    };
  },
  computed: {
    videoMuted() {
      console.log(this.isMuted, "this.isMuted");
      return this.isMuted;
    },
    showMutedGuide() {
      return this.showGuide;
    },
    isClearScreen() {
      return this.clearScreen;
    },
    videoInfo() {
      return {
        ...this.videoItem,
        desc: this.videoItem.desc
          ? `第${24}集 ·简介：${this.videoItem.desc}`
          : "",
      };
    },
  },
  mounted() {
    //初始化当前播放器
    console.log("初始化开始创建播放器实例");
    this.createPlayer();
    document.addEventListener("visibilitychange", this.playerVisibilityPause);
    // 判断是否显示展开收起按钮
    this.textOverHide =
      this.$refs.textRef.offsetHeight > this.$refs.descRef.offsetHeight;
    //首次进入静音，提示才会隐藏
    if (this.isMuted) {
      this.timer = setTimeout(() => {
        this.$emit("hideGuide");
      }, 3000);
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    document.removeEventListener(
      "visibilitychange",
      this.playerVisibilityPause
    );
  },
  methods: {
    //页面隐藏暂停播放
    playerVisibilityPause() {
      if (document.visibilityState === "visible") {
        this.player.play();
      } else {
        this.player.pause();
      }
    },
    //改变播放状态
    changePlayStatusClick() {
      if (!this.player.paused) {
        this.playStatus = "Paused";
        this.player.pause();
      } else {
        this.playStatus = "Playing";
        this.player.play();
      }
    },
    //缩小视频
    reduceVideo(height) {
      this.isReduceVideo = true;
      document.getElementById(`mse-${this.index}`).firstChild.style.height =
        height;
      document.getElementById(`mse-${this.index}`).firstChild.style.objectFit =
        "contain";
    },
    //还原视频
    restoreVideo() {
      this.isReduceVideo = false;
      document.getElementById(`mse-${this.index}`).firstChild.style.height =
        "100%";
      document.getElementById(`mse-${this.index}`).firstChild.style.objectFit =
        "cover";
    },
    //改变视频静音状态
    changeVideoMuted() {
      this.player.muted = !this.player.muted;
      this.$emit("changeMuted", this.player.muted);
    },
    //播放视频
    playVideo() {
      this.player.muted = this.isMuted;
      this.player.play();
    },
    //暂停视频
    pauseVideo() {
      this.player.pause();
    },
    //改变追剧状态
    changeCollect() {
      this.$set(this.videoItem, "isCollect", !this.videoItem.isCollect);
      Toast.success(`${this.videoItem.isCollect ? "添加" : "取消"}成功`);
    },
    //创建播放器
    createPlayer() {
      console.log("开始初始化播放器组件");
      if (!this.player) {
        I18N.use(ZH);
        this.player = new SimplePlayer({
          id: `mse-${this.index}`,
          url: this.videoInfo.videoUrl,
          autoplayMuted: this.isMuted, //静音自动播放
          autoplay: this.index === this.cureentPlayingIndex,
          videoFillMode: "fillWidth",
          playsinline: true,
          width: "100%",
          height: "100%",
          plugins: [Mobile, Progress, Loading, Poster],
          controls: {
            autoHide: false,
            mode: "bottom",
          },
          "x5-video-player-type": "h5",
          "x5-video-orientation": "portraint",
          poster: {
            poster: this.videoInfo.coverImage,
          },
          playbackrate: {
            hidePortrait: true,
          },
          allowSeekAfterEnded: false,
          mobile: {
            pressRate: 2,
            disablePress: false,
            gradient: "none",
          },
        });
        this.player.on(Events.LOAD_START, (event) => {
          console.log("视频内容开始加载", event);
        });
        this.player.on(Events.LOADED_DATA, (event) => {
          console.log("视频起播数据加载完成", event);
          this.playStatus = "Playing";
        });
        this.player.on(Events.PLAY, (event) => {
          this.playStatus = "Playing";
          console.log("播放", event.player.paused);
        });
        this.player.on(Events.TIME_UPDATE, (event) => {
          this.$emit("timeupdate", event);
        });
        this.player.on(Events.PAUSE, (event) => {
          this.playStatus = "Paused";
          console.log("暂停", event.player.paused);
        });
        this.player.on(Events.ENDED, (event) => {
          this.playStatus = "Ended";
          this.$emit("ended");
          console.log("结束", event.player.paused);
        });
        this.player.on(Events.ERROR, (event) => {
          this.playStatus = "Error";
          console.log("播放出错", event);
        });
      }
      return this.player;
    },
  },
};
</script>

<style lang="scss" scoped>
.video-player {
  width: 100%;
  height: 100%;
  position: relative;
  &-poster {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    object-fit: cover;
  }
  &-btn-container {
    width: 100%;
    height: calc(100% - 200px);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    span {
      transition: all ease 0.3s;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%);
    }
  }
  &-right {
    position: absolute;
    right: 10px;
    bottom: 60px;
    z-index: 2;
    color: #ffffff;
    gap: 20px 0;
    transition: all ease 0.3s;

    &-muted {
      width: 24px;
      height: 24px;
      &-hint {
        transition: all ease 0.3s;
        width: 86px;
        height: 21px;
        line-height: 21px;
        text-align: center;
        font-size: 10px;
        font-weight: 500;
        position: absolute;
        border-radius: 30px;
        background: rgba(0, 0, 0, 0.7);
        color: #ffffff;
        border: 1px solid rgb(0, 0, 0);
        box-sizing: border-box;
        right: 0;
        &::after {
          content: "";
          position: absolute;
          bottom: -5px; /* 调整三角形的位置 */
          right: 10px;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid rgba(0, 0, 0, 0.7); /* 小三角的颜色与背景一致 */
        }
      }
    }
    .active {
      color: #ff6633;
    }
    &-collect {
      width: 36px;
      &-text {
        font-weight: 400;
        font-size: 12px;
        margin-top: 3px;
      }
    }
  }
  &-left {
    width: 256px;
    position: absolute;
    left: 10px;
    bottom: 18px;
    z-index: 2;
    transition: all ease 0.3s;

    &-header {
      img {
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 6px;
        width: 34px;
        height: 48px;
        margin-right: 8px;
        object-fit: cover;
      }
      &-content {
        margin-top: 6px;
        margin-bottom: 3px;
        .video-title {
          color: #ffffff;
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 4px;
        }
        .video-tags {
          gap: 5px;
          span {
            width: 32px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 4px;
            background: rgba(255, 255, 255, 0.2);
            font-size: 10px;
            font-weight: 400;
            color: #ffffff;
          }
        }
      }
    }
    &-desc {
      margin-top: 15px;
      &-text {
        font-size: 14px;
        font-weight: 400;
        transition: all ease 0.3s;
        color: #ffffff;
      }
      &-text::before {
        content: "";
        float: right;
        width: 0; /*设置为0，或者不设置宽度*/
        height: 42px; /*先随便设置一个高度*/
      }
      &-toggle-btn-placeholder {
        width: 45px;
        height: 17px;
        float: right;
        clear: both;
      }
      &-pack-btn {
        float: right;
        color: #ffffff;
        font-size: 12px;
        font-weight: bold;
      }
      &-expand-btn {
        color: #ffffff;
        font-size: 12px;
        font-weight: bold;
        position: absolute;
        right: 0;
        bottom: 1px;
      }
    }
  }

  ::v-deep .xgplayer .xgplayer-controls {
    height: 5px;
  }
  ::v-deep .xgplayer .xg-inner-controls {
    height: 5px;
    left: 10px;
    right: 10px;
  }
  ::v-deep .xgplayer .bottom-controls .xg-center-grid {
    top: 0;
  }
  ::v-deep .xgplayer .xgplayer-progress {
    height: 5px;
  }
  ::v-deep .xgplayer .xgplayer-progress-bottom .xgplayer-progress-outer {
    top: 0;
  }
  //进度条按钮
  ::v-deep .xgplayer .xgplayer-progress-btn {
    width: 3px;
    height: 3px;
    box-shadow: none;
    background: none;
    border-radius: 3px;
  }
  //进度条高度
  ::v-deep
    .xgplayer.xgplayer-mobile
    .xgplayer-progress-bottom
    .xgplayer-progress-outer {
    height: 2px;
  }
  //已播放的背景色
  ::v-deep .xgplayer .xgplayer-progress-played {
    background: #ffffff;
  }
  ::v-deep .xgplayer video {
    height: 100%;
    transition: height ease 0.3s;
  }
}
</style>
