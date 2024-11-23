<template>
  <view class="container">
    <!-- 店铺信息 -->
    <view class="shop-info">
      <image class="shop-avatar" :src="shopInfo.avatar" />
      <text class="shop-name">{{ shopInfo.name }}</text>
    </view>

    <!-- 菜品列表 -->
    <view class="menu-container">
      <!-- 左侧分类导航 -->
      <scroll-view class="category-list" scroll-y>
        <view 
          v-for="(category, index) in categories" 
          :key="category.id"
          :class="['category-item', currentCategory === index ? 'active' : '']"
          @tap="switchCategory(index)"
        >
          {{ category.name }}
        </view>
      </scroll-view>

      <!-- 右侧菜品列表 -->
      <scroll-view class="food-list" scroll-y>
        <view v-if="loading" class="loading">
          <uni-load-more status="loading" />
        </view>
        <template v-else>
          <view v-for="item in currentItems" :key="item.id" class="food-item">
            <image class="food-image" :src="item.image" mode="aspectFill" />
            <view class="food-info">
              <text class="food-name">{{ item.name }}</text>
              <view class="price-container">
                <text class="food-price">¥{{ item.price }}</text>
                <text class="food-original-price">¥{{ item.originalPrice }}</text>
              </view>
              <view class="add-btn" @tap="addToCart(item)">+</view>
            </view>
          </view>
        </template>
      </scroll-view>
    </view>

    <!-- 购物车栏 -->
    <view class="cart-bar">
      <view class="total-price">
        合计: ¥{{ Number(totalPrice).toFixed(2) }}
      </view>
      <view class="checkout-btn" @tap="goToCheckout">
        去结算
      </view>
    </view>

    <!-- 底部导航栏 -->
    <TabBar />
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { MenuItem, Category } from '@/types/menu'
import { menuCategories } from '@/data/menuCategories'
import TabBar from '@/components/TabBar.vue'

const shopInfo = ref({
  name: 'LHappyi的私人小餐馆',
  avatar: '/static/shop-avatar.png'
})

const categories = ref<Category[]>([])
const loading = ref(false)
const currentItems = ref<MenuItem[]>([])
const currentCategory = ref(0)
const cartItems = ref<MenuItem[]>([])

// 计算总价
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price, 0)
})

// 加载分类下的菜品
const loadCategoryItems = async (index: number) => {
  loading.value = true
  try {
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 300))
    currentItems.value = categories.value[index].items
  } finally {
    loading.value = false
  }
}

// 切换分类
const switchCategory = async (index: number) => {
  if (currentCategory.value === index) return
  currentCategory.value = index
  await loadCategoryItems(index)
}

// 添加到购物车
const addToCart = (item: MenuItem) => {
  cartItems.value.push(item)
}

// 去结算
const goToCheckout = () => {
  uni.navigateTo({
    url: '/pages/checkout/checkout'
  })
}

// 初始化加载
onMounted(async () => {
  categories.value = menuCategories
  await loadCategoryItems(0)
})
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 100rpx;
}

.shop-info {
  padding: 20rpx;
  display: flex;
  align-items: center;
  background-color: #ff4d4f;
  color: #fff;
}

.shop-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.menu-container {
  flex: 1;
  display: flex;
}

.category-list {
  width: 200rpx;
  background-color: #f5f5f5;
}

.category-item {
  padding: 30rpx 20rpx;
  text-align: center;
  border-bottom: 1rpx solid #eee;
}

.category-item.active {
  background-color: #fff;
  color: #ff4d4f;
}

.food-list {
  flex: 1;
  padding: 20rpx;
}

.food-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
}

.food-image {
  width: 160rpx;
  height: 160rpx;
  margin-right: 20rpx;
}

.food-info {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 60rpx;
}

.food-name {
  font-size: 28rpx;
  margin-bottom: 10rpx;
}

.price-container {
  display: flex;
  align-items: baseline;
}

.food-price {
  color: #ff4d4f;
  font-size: 32rpx;
}

.food-original-price {
  color: #999;
  font-size: 24rpx;
  text-decoration: line-through;
  margin-left: 10rpx;
}

.add-btn {
  position: absolute;
  right: 0;
  bottom: 4rpx;
  width: 50rpx;
  height: 50rpx;
  line-height: 46rpx;
  text-align: center;
  background-color: #ff4d4f;
  color: #fff;
  border-radius: 50%;
  font-size: 32rpx;
}

.cart-bar {
  position: fixed;
  bottom: 100rpx;
  left: 0;
  right: 0;
  height: 100rpx;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  background-color: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.total-price {
  flex: 1;
  font-size: 32rpx;
}

.checkout-btn {
  width: 200rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background-color: #ff4d4f;
  color: #fff;
  border-radius: 40rpx;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100rpx;
}
</style>
