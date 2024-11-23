<template>
    <view class="tab-bar">
        <view
            v-for="(item, index) in tabs"
            :key="index"
            class="tab-item"
            :class="{ active: currentTab === index }"
            @tap="switchTab(index)"
        >
            <text
                class="iconfont"
                :class="item.icon"
            ></text>
            <text class="tab-text">{{ item.text }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentTab = ref(0)

const tabs = [
    { text: '首页', icon: 'icon-home' },
    { text: '购物车', icon: 'icon-cart' },
    { text: '消息', icon: 'icon-message' },
    { text: '我的', icon: 'icon-user' }
]

const switchTab = (index: number) => {
    currentTab.value = index
    const pages = ['index', 'cart', 'message', 'profile']
    uni.switchTab({
        url: `/pages/${pages[index]}/${pages[index]}`
    })
}
</script>

<style scoped>
.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 98rpx;
    display: flex;
    background-color: #ffffff;
    border-top: 2rpx solid #f0f0f0;
}

.tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 24rpx;
}

.iconfont {
    font-size: 44rpx;
    color: #333;
    margin-bottom: 4rpx;
}

.tab-text {
    font-size: 20rpx;
    color: #333;
}

.tab-item.active .iconfont,
.tab-item.active .tab-text {
    color: #ff4d4f;
}

/* 首页图标 */
.icon-home::before {
    content: '\e8b9';
    /* 这里需要根据实际的字体图标编码调整 */
}

/* 购物车图标 */
.icon-cart::before {
    content: '\e899';
}

/* 消息图标 */
.icon-message::before {
    content: '\e8bd';
}

/* 我的图标 */
.icon-user::before {
    content: '\e8c8';
}
</style>