<template>
  <div class="cart">
    <div
      v-if="cartItems.length > 0"
      class="cart-items"
    >
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="cart-item"
      >
        <image
          :src="item.image"
          class="item-image"
        />
        <div class="item-info">
          <text class="item-name">{{ item.name }}</text>
          <text class="item-price">¥{{ item.price }}</text>
          <text class="item-quantity">x{{ item.quantity }}</text>
        </div>
      </div>
      <!-- DOM 结算栏 -->
      <div class="total-bar">
        <text class="total-price">合计：¥{{ totalPrice.toFixed(2) }}</text>
        <button
          class="clear-btn"
          @click="clearCart"
        >清空</button>
      </div>
    </div>

    <div
      v-else
      class="empty-cart"
    >
      <text>购物车是空的</text>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 购物车数据
const cartItems = ref<CartItem[]>([])

interface CartItem {
  id: string,
  name: string,
  price: number,
  quantity: number,
  image: string,
  originalPrice: number,
  category: string,
  sold: number
}

// 计算总价
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.price
  }, 0)
})

// TITLE 购物车
// FUNC 获取购物车数据的函数
const loadCartItems = () => {
  cartItems.value = []
  const storage = uni.getStorageInfoSync()
  const keys = storage.keys
  keys.forEach(key => {
    const value = uni.getStorageSync(key)
    cartItems.value.push(value)
  })
}

// FUNC 清空购物车
const clearCart = () => {
  cartItems.value = []
  uni.clearStorageSync()
  uni.showToast({
    title: '购物车已清空',
    icon: 'success'
  })
}

// TITLE 切换界面执行的操作
onShow(() => {
  loadCartItems()
})


</script>

<style scoped>
.cart {
  padding: 20rpx;
}

.cart-item {
  display: flex;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.item-image {
  width: 120rpx;
  height: 120rpx;
  margin-right: 20rpx;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 28rpx;
  margin-bottom: 10rpx;
}

.item-price {
  color: #ff4400;
  font-size: 26rpx;
}

.item-quantity {
  font-size: 26rpx;
  color: #666;
  margin-left: 20rpx;
}

.total-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10rpx 0;
  background-color: #fff;
  height: 100rpx;
  border-top: 1rpx solid #f5f5f5;
  box-shadow: none;
}

.total-price {
  font-size: 32rpx;
  color: #ff4400;
  font-weight: bold;
  margin-left: 30rpx;
}

.clear-btn {
  background: #ff4400;
  color: #fff;
  border-radius: 40rpx;
  width: 160rpx;
  height: 70rpx;
  font-size: 28rpx;
  margin-right: 20rpx;
  line-height: 70rpx;
  text-align: center;
  padding: 0;
}

.empty-cart {
  text-align: center;
  padding: 100rpx 0;
  color: #999;
}
</style>