<script setup>
import SideBar from '@/components/SideBar.vue'
import TopSearch from '@/components/TopSearch.vue'
import RoomAdd from '@/components/webrtc/RoomAdd.vue'
</script>

<template>
  <SideBar />
  <TopSearch id="top-items" />
  <RoomAdd id="room-add" />
  <AiChat id="ai-assist" />
  <main>
    <!-- <TheWelcome /> -->
    <router-view id="mypage-contents" />
  </main>
</template>

<style>
#top-items {
  z-index: 100;
}

#room-add {
  z-index: 101;
}

#ai-assist {
  z-index: 102;
}

#mypage-contents {
  position: absolute;
  top: 120px;
  left: calc(50vw - 480px);
  width: 960px;

  color: var(--hl-light);

  /* background-color: rgba(170, 170, 170, 0.123); */
}

@media (max-width: 1360px) {
  #mypage-contents {
    left: 200px;
  }
}

.mypage-content-title {
  margin: 0;
  color: var(--hl-light);
}

.mypage-content {
  position: relative;

  background-color: var(--background-window);
  border-radius: 10px;

  margin-bottom: 20px;
  padding-bottom: 30px;
  padding-left: 30px;

  border: 1px solid var(--border-color);
}
</style>
