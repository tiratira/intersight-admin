import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:round-devices-other',
      keepAlive: true,
      order: 0,
      title: '设备管理',
    },
    name: 'Devices',
    path: '/devices',
    component: () => import('#/views/devices/index.vue'),
  },
];

export default routes;
