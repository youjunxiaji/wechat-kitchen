// 菜品类型定义
interface MenuItem {
  id: string
  name: string
  price: number
  originalPrice: number
  image: string
  category: string
  sold: number
  description?: string
}

// 菜品分类
interface Category {
  id: string
  name: string
  items: MenuItem[]
}

export type { MenuItem, Category } 