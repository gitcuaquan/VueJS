
const routes = [
  {
    path: '/',
    component: () => import('layouts/ClientLayout.vue'),
    children:[
      {path:'', component:()=>import('pages/Client/Home.vue')},
      {path:'/news/', component:()=>import('pages/Client/News/showNews.vue')},
      {path:'/news/:id', component:()=>import('pages/Client/News/detailNew.vue')},
      {path:'/product', component:()=>import('pages/Client/Product/showProduct.vue')},
      {path:'/product/:id', component:()=>import('pages/Client/Product/detailProduct.vue')},
      {path:'/cart', component:()=>import('pages/Client/Cart.vue')},
      
      
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'home', component: () => import('pages/Index.vue') },
      { path: 'userreport', component: () => import('pages/User/UserReport.vue') },
      { path: 'usercomment', component: () => import('pages/User/UserComment.vue') },
      { path: 'addstraff', component: () => import('pages/Staff/AddStraff.vue') },
      { path: 'commodity', component: () => import('pages/Warehouse/Commodity.vue') },
      { path: 'transport', component: () => import('pages/Warehouse/Transport.vue') },
      { path: 'changelogo', component: () => import('pages/DisplayWeb/ChangeLogo.vue') },
      { path: 'banner', component: () => import('pages/DisplayWeb/Banner.vue') },
      { path: 'news', component: () => import('pages/DisplayWeb/News.vue') },

    ]
  },
 
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
  },
  {
    path: '/register',
    component: () => import('pages/Register.vue'),
  },



  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
