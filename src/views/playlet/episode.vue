<template>
  <div class="playlet-container">
    <van-swipe
      ref="videoSwiperRef"
      class="playlet-swipe"
      :show-indicators="false"
      :loop="false"
      @change="changeVideo"
      vertical
    >
      <van-swipe-item v-for="(video, index) in videoList" :key="index">
        <VideoItem
          :index="index"
          :cureentPlayingIndex="cureentPlayingIndex"
          :ref="`videoitem-${index}`"
          :videoItem="video"
          :isMuted="isMuted"
          :showGuide="showGuide"
          :clearScreen="clearScreen"
          @changeMuted="changeMuted"
          @hideGuide="showGuide = false"
          @ended="handlePlayEnded"
          @timeupdate="handleTimeupdate"
        />
      </van-swipe-item>
    </van-swipe>
    <div
      class="playlet-bottom flex align-items-center justify-content-between bottom-safe-area"
    >
      <div
        class="playlet-bottom-left flex justify-content-between"
        @click="handleSelectEpisodes"
      >
        <span>选集·全98集·已完结</span
        ><Icon type="arraw_up" :size="16" color="#ffffff" />
      </div>
      <div
        class="playlet-bottom-right flex flex-column align-items-center"
        @click="clearScreen = !clearScreen"
      >
        <img src="@/assets/images/icons/show.png" />
        <span>{{ clearScreen ? "恢复" : "清屏" }}</span>
      </div>
    </div>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '55vh' }"
      round
      closeable
      :overlay="false"
      @click-close-icon="handleClosePopUp"
    />
  </div>
</template>

<script>
import VideoItem from "@/components/video-item";
import Icon from "@/components/icon.vue";

export default {
  name: "playlet",
  components: {
    VideoItem,
    Icon,
  },
  data() {
    return {
      cureentPlayingIndex: 0, //当前播放的视频索引
      isMuted: true, //是否静音
      showGuide: true, //是否有指引
      clearScreen: false, //是否清屏
      showPopUp: false,
      videoList: [], //视频播放源
      show: false,
    };
  },
  async created() {
    this.videoList = await Promise.resolve([
      {
        title: "短剧不错",
        desc: "是非常的舒适的地方多少发多少发多少分都发多少发多少发地方打算发多少发多少粉丝地方打算的是是非常的舒适的地方多少发多少发多少分都发多少发多少发地方打算发多少发多少粉发思维方法",
        tag: ["霸总", "现代", "霸总", "现代"],
        isCollect: true,
        videoUrl:
          "https://nh-playlet.elinks.cn/2024/12/20/oss/0/5506432b-ef6a-48db-a1ac-d92489ff8ad8.mp4",
        coverImage:
          "https://common.acthao.com/2024/12/18/oss/0/bf87eeb5-1694-4a7b-8b15-989489279547.jpg",
      },
      {
        title: "短剧不错1",
        desc: "是非常的舒适的地方多少发多少发多少分都发多少发多少发地方打算发多少发多少粉丝地方打算的是",
        videoUrl:
          "https://nh-playlet.elinks.cn/2024/12/20/oss/0/ffa0ca38-af7e-484b-b415-e8de703d70c0.mp4",
        coverImage:
          "https://common.acthao.com/2024/12/20/oss/0/bd761ad9-4f22-470a-a4ea-f617d5168e0e.png",
      },
      {
        title: "短剧不错2",
        desc: "是非常的舒适的地方多少发多少发多少分都发多少发多少发地方打算发多少发多少粉丝地方打算的是",
        videoUrl:
          "https://nh-playlet.elinks.cn/2024/12/20/oss/0/17ce78fe-d5c3-46d7-8574-49c5dfd68b09.mp4",
        coverImage:
          "https://common.acthao.com/2024/12/18/oss/0/bf87eeb5-1694-4a7b-8b15-989489279547.jpg",
      },
      {
        title: "短剧不错3",
        desc: "是非常的舒适的地方多少发多少发多少分都发多少发多少发地方打算发多少发多少粉丝地方打算的是",
        videoUrl:
          "https://nh-playlet.elinks.cn/2024/12/20/oss/0/5506432b-ef6a-48db-a1ac-d92489ff8ad8.mp4",
        coverImage:
          "https://common.acthao.com/2024/12/16/oss/0/b51946a5-28cf-4fd7-a94a-6d8663e66aad.jpg",
      },
      {
        title: "短剧不错4",
        desc: "是非常的舒适的地方多少发多少发多少分都发多少发多少发地方打算发多少发多少粉丝地方打算的是",
        tag: ["霸总", "现代", "霸总", "现代"],
        videoUrl:
          "https://nh-playlet.elinks.cn/2024/12/20/oss/0/93432992-47dc-426c-8c84-5df0606445e0.mp4",
        coverImage:
          "https://common.acthao.com/2024/12/13/oss/0/bd0a771c-3f2b-4b68-a134-d54523bb681c.jpg",
      },
      {
        title: "短剧不错5",
        desc: "是非常的舒适的地方多少发多少发多少分都发多少发多少发地方打算发多少发多少粉丝地方打算的是",
        tag: ["霸总", "现代", "霸总", "现代"],
        videoUrl:
          "https://nh-playlet.elinks.cn/2024/12/20/oss/0/6bc31653-3c99-43ce-9b92-f8454c0c8d36.mp4",
        coverImage:
          "https://common.acthao.com/2024/12/18/oss/0/bf87eeb5-1694-4a7b-8b15-989489279547.jpg",
      },
      {
        title: "短剧不错6",
        desc: "是非常的舒适的地方多少发多少发多少分都发多少发多少发地方打算发多少发多少粉丝地方打算的是",
        tag: ["霸总", "现代", "霸总", "现代"],
        videoUrl:
          "https://nh-playlet.elinks.cn/2024/12/20/oss/0/8dee281b-9a39-4edb-86af-20e3b0caebaf.mp4",
        coverImage:
          "https://common.acthao.com/2024/12/13/oss/0/bd0a771c-3f2b-4b68-a134-d54523bb681c.jpg",
      },
      {
        title: "短剧不错7",
        desc: "是非常的舒适的地方多少发多少发多少分都发多少发多少发地方打算发多少发多少粉丝地方打算的是",
        tag: ["霸总", "现代", "霸总", "现代"],
        videoUrl:
          "https://nh-playlet.elinks.cn/2024/12/20/oss/0/5b4de8de-5272-4a9f-a279-45c58657550b.mp4",
        coverImage:
          "https://common.acthao.com/2024/12/18/oss/0/bf87eeb5-1694-4a7b-8b15-989489279547.jpg",
      },
      {
        title: "短剧不错8",
        desc: "是非常的舒适的地方多少发多少发多少分都发多少发多少发地方打算发多少发多少粉丝地方打算的是",
        tag: ["霸总", "现代", "霸总", "现代"],
        videoUrl:
          "https://nh-playlet.elinks.cn/2024/12/20/oss/0/411cf50c-fee9-4496-86f5-4f4ccba3cdbb.mp4",
        coverImage:
          "https://nh-common.elinks.cn/2024/12/03/49d2983e-ecfe-4650-9143-a57b0d39f4de.jpg",
      },
    ]);
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getVideoData() {},
    //关闭剧集
    handleClosePopUp() {
      this.$refs[`videoitem-${this.cureentPlayingIndex}`][0].restoreVideo();
    },
    //选择剧集
    handleSelectEpisodes() {
      this.show = true;
      this.$refs[`videoitem-${this.cureentPlayingIndex}`][0].reduceVideo(
        "45vh"
      );
    },
    //改变静音状态回调
    changeMuted(value) {
      this.isMuted = value;
    },
    //播放完毕
    handlePlayEnded() {
      if (this.cureentPlayingIndex < this.videoList.length - 1) {
        this.$refs.videoSwiperRef.next();
        this.$refs[`videoitem-${this.cureentPlayingIndex}`][0].playVideo();
      }
    },
    //播放时间改变
    handleTimeupdate(event) {
      console.log(event, "event");
    },
    //滑动视频
    changeVideo(index) {
      this.$refs[`videoitem-${this.cureentPlayingIndex}`][0].pauseVideo();
      this.cureentPlayingIndex = index;
      this.$refs[`videoitem-${index}`][0].playVideo();
    },
  },
};
</script>

<style lang="scss" scoped>
.playlet-container {
  width: 100%;
  height: 100%;
  .playlet-swipe {
    height: calc(100% - 58px - constant(safe-area-inset-bottom));
    height: calc(100% - 58px - env(safe-area-inset-bottom));
    transition: all ease 0.3s;
  }
  .playlet-bottom {
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    background: rgb(26, 26, 26);
    height: 58px;
    &-left {
      width: 295px;
      height: 40px;
      padding: 0 15px;
      box-sizing: border-box;
      line-height: 40px;
      border-radius: 40px;
      background: rgba(255, 255, 255, 0.08);
      color: rgb(255, 255, 255);
      font-family: PingFang SC;
      font-size: 14px;
      font-weight: 500;
    }
    &-right {
      img {
        width: 20px;
        height: 20px;
      }
      span {
        color: rgba(255, 255, 255, 0.88);
        font-family: PingFang SC;
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
}
</style>
