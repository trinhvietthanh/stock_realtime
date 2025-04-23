import ArticleIcon from '@mui/icons-material/Article';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import StoreIcon from '@mui/icons-material/Store';

import asyncComponentLoader from '@/utils/loader';

import { Routes } from './types';

const routes: Routes = [
  {
    component: asyncComponentLoader(() => import('@/pages/Welcome')),
    path: '/',
    title: 'Welcome',
    icon: HomeIcon,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Page1')),
    path: '/page-1',
    title: 'Tin tức',
    icon: ArticleIcon, // Tin tức → Bài báo
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Page2')),
    path: '/page-2',
    title: 'Dự báo',
    icon: ShowChartIcon, // Dự báo → Biểu đồ xu hướng
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Page3')),
    path: '/page-3',
    title: 'Mua vàng ở đâu',
    icon: StoreIcon, // Mua vàng → Cửa hàng
  },
  {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
    icon: ErrorOutlineIcon, // Trang lỗi
  },
];

export default routes;
