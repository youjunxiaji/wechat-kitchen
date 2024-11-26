import type { Category } from '@/types/menu'

export const menuCategories: Category[] = [
    {
        id: 'home_meat',
        name: '家常菜(荤)',
        items: [
            {
                id: 'hongshaorou',
                name: '红烧肉',
                price: 0.1,
                originalPrice: 29,
                image: '/static/dishes/home_meat/hongshaorou.png',
                category: '家常菜(荤)',
                sold: 0
            },
            {
                id: 'yuxiangrousi',
                name: '鱼香肉丝',
                price: 0.1,
                originalPrice: 26,
                image: '/static/dishes/home_meat/yuxiangrousi.png',
                category: '家常菜(荤)',
                sold: 0
            }
        ]
    },
    {
        id: 'home_veg',
        name: '家常菜(素)',
        items: [
            {
                id: 'qingjiaotudou',
                name: '青椒土豆丝',
                price: 0.1,
                originalPrice: 16,
                image: '/static/dishes/home_veg/qingjiaotudou.png',
                category: '家常菜(素)',
                sold: 0
            }
        ]
    },
    {
        id: 'soup',
        name: '汤类',
        items: [
            {
                id: 'jitangdougu',
                name: '鸡汤豆腐',
                price: 0.1,
                originalPrice: 22,
                image: '/static/dishes/soup/jitangdougu.jpg',
                category: '汤类',
                sold: 0
            }
        ]
    },
    {
        id: 'main_food',
        name: '主食',
        items: [
            {
                id: 'danfan',
                name: '蛋炒饭',
                price: 0.1,
                originalPrice: 12,
                image: '/static/dishes/main_food/danfan.jpg',
                category: '主食',
                sold: 0
            }
        ]
    },
    {
        id: 'side_dish',
        name: '小菜',
        items: [
            {
                id: 'liangban_huanggua',
                name: '凉拌黄瓜',
                price: 0.1,
                originalPrice: 8,
                image: '/static/dishes/side_dish/liangban_huanggua.jpg',
                category: '小菜',
                sold: 0
            }
        ]
    }
]

export const choiceCategories: Category[] = [
    {
        id: 'choice',
        name: '精选',
        items: []
    }
]