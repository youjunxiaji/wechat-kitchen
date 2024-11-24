<template>
  <div class="cart">
    <div v-if="cartItems.length > 0" class="cart-items">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <image :src="item.image" class="item-image" />
        <div class="item-info">
          <text class="item-name">{{ item.name }}</text>
          <text class="item-price">¥{{ item.price }}</text>
          <text class="item-quantity">x{{ item.quantity }}</text>
        </div>
      </div>
      
      <div class="total-bar">
        <text class="total-price">合计：¥{{ totalPrice }}</text>
        <button class="clear-btn" @click="clearCart">清空</button>
      </div>
    </div>
    
    <div v-else class="empty-cart">
      <text>购物车是空的</text>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

// 购物车数据
const cartItems = ref<any[]>([])

// 计算总价
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
})

// 从本地存储获取购物车数据
onMounted(() => {
  const storedCart = uni.getStorageSync('cartItems')
  if (storedCart) {
    cartItems.value = JSON.parse(storedCart)
  }
})

// 清空购物车
const clearCart = () => {
  cartItems.value = []
  uni.setStorageSync('cartItems', '[]')
  uni.showToast({
    title: '购物车已清空',
    icon: 'success'
  })
}
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
  padding: 20rpx;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.1);
}

.total-price {
  font-size: 32rpx;
  color: #ff4400;
}

.clear-btn {
  background: #ff4400;
  color: #fff;
  padding: 20rpx 40rpx;
  border-radius: 40rpx;
}

.empty-cart {
  text-align: center;
  padding: 100rpx 0;
  color: #999;
}
</style>