<template>
  <van-swipe
    ref="videoSwiperRef"
    style="height: 100vh"
    class="home-swipe"
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
        @changeMuted="changeMuted"
        @hideGuide="showGuide = false"
        @ended="handlePlayEnded"
        @timeupdate="handleTimeupdate"
      >
        <template #left>
          <div class="home-swipe-view-all" @click="$router.push('/episode')">
            <span class="home-swipe-view-all-text">查看完整剧集｜全80集</span>
            <Icon type="arraw_r" :size="12" color="rgba(255,255,255, 0.8)" />
          </div>
        </template>
      </VideoItem>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import VideoItem from "@/components/video-item";
import Icon from "@/components/icon.vue";

export default {
  name: "home-index",
  components: {
    VideoItem,
    Icon,
  },
  data() {
    return {
      cureentPlayingIndex: 0,
      isMuted: true,
      showGuide: true,
      videoList: [],
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
        tag: ["霸总", "现代", "霸总", "现代"],
        videoUrl:
          "https://nh-playlet.elinks.cn/2024/12/20/oss/0/ffa0ca38-af7e-484b-b415-e8de703d70c0.mp4",
        coverImage:
          "https://common.acthao.com/2024/12/20/oss/0/bd761ad9-4f22-470a-a4ea-f617d5168e0e.png",
      },
      {
        title: "短剧不错2",
        desc: "是非常的舒适的地方多少发多少发多少分都发多少发多少发地方打算发多少发多少粉丝地方打算的是",
        tag: ["霸总", "现代", "霸总", "现代"],
        videoUrl:
          "https://nh-playlet.elinks.cn/2024/12/20/oss/0/17ce78fe-d5c3-46d7-8574-49c5dfd68b09.mp4",
        coverImage:
          "https://common.acthao.com/2024/12/18/oss/0/bf87eeb5-1694-4a7b-8b15-989489279547.jpg",
      },
      {
        title: "短剧不错3",
        desc: "是非常的舒适的地方多少发多少发多少分都发多少发多少发地方打算发多少发多少粉丝地方打算的是",
        tag: ["霸总", "现代", "霸总", "现代"],
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
    changeMuted(value) {
      console.log(value, "value");
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
    changeVideo(index) {
      this.$refs[`videoitem-${this.cureentPlayingIndex}`][0].pauseVideo();
      this.cureentPlayingIndex = index;
      this.$refs[`videoitem-${index}`][0].playVideo();
    },
  },
};
</script>

<style lang="scss" scoped>
.home-swipe {
  &-view-all {
    width: 197px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 38px;
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    font-family: PingFang SC;
    margin-top: 13px;
    &-text {
      margin-right: 10px;
    }
  }
}
</style>
