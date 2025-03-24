<script lang="ts" setup>
import { AuthPageLayout } from '@vben/layouts';

import sloganImg from '../assets/slogan.png';
import logoImg from '../assets/zhige_logo.svg';

// const appName = computed(() => preferences.app.name);
// const logo = computed(() => preferences.logo.source);
</script>

<template>
  <AuthPageLayout
    app-name="知阁AI"
    :logo="logoImg"
    :slogan-image="sloganImg"
    page-description="后台管理终端"
    page-title="智能AI语音模块解决方案"
  >
    <!-- 自定义工具栏 -->
    <!-- <template #toolbar></template> -->
  </AuthPageLayout>
</template>
