import ArticleIcon from '@mui/icons-material/Article';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import StoreIcon from '@mui/icons-material/Store';
import LockIcon from '@mui/icons-material/Lock';

import asyncComponentLoader from '@/utils/loader';

import { Routes } from './types';

const isAuthenticated = () => {
  return !!localStorage.getItem('accessKey');
};

type CustomRoute = {
  protected?: boolean;
};

const routes: Array<Routes[number] & CustomRoute> = [
  {
    component: asyncComponentLoader(() => import('@/pages/Login')),
    path: '/login',
    title: 'Login',
    icon: LockIcon,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Welcome')),
    path: '/',
    title: 'Welcome',
    icon: HomeIcon,
    protected: true,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Page1')),
    path: '/page-1',
    title: 'Tin tức',
    icon: ArticleIcon, // Tin tức → Bài báo
    protected: true,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Page2')),
    path: '/page-2',
    title: 'Dự báo',
    icon: ShowChartIcon, // Dự báo → Biểu đồ xu hướng
    protected: true,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Page3')),
    path: '/page-3',
    title: 'Mua vàng ở đâu',
    icon: StoreIcon, // Mua vàng → Cửa hàng
    protected: true,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
    icon: ErrorOutlineIcon, // Trang lỗi
  },
];

const protectedRoutes = routes.map(route => {
  if (route.protected) {
    return {
      ...route,
      component: asyncComponentLoader(() => import('@/pages/Login')),
      path: route.path,
      title: route.title,
      icon: route.icon,
    };
  }
  return route;
});

export default isAuthenticated() ? routes : protectedRoutes;
