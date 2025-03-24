<script lang="ts" setup>
import type { ComponentSize } from 'element-plus';

import type { Device } from '#/api';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { ElCard, ElPagination, ElTable, ElTableColumn } from 'element-plus';

import { getAllDevicesApi } from '#/api';

const tableData = ref<Device[]>([]);

const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const size = ref<ComponentSize>('default');
const background = ref(false);
const disabled = ref(false);

const refreshData = async () => {
  tableData.value.splice(0, tableData.value.length);
  const res = await getAllDevicesApi(currentPage.value, pageSize.value);
  tableData.value.push(...res.items);
  currentPage.value = res.page;
  total.value = res.total;
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  refreshData();
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  refreshData();
};

onMounted(async () => {
  await refreshData();
});
</script>

<template>
  <Page :auto-content-height="true">
    <ElCard
      class="h-full"
      shadow="never"
      body-class="flex flex-col justify-between h-full"
    >
      <ElTable :data="tableData" class="flex-grow">
        <ElTableColumn prop="id" label="ID" width="50" />
        <ElTableColumn prop="mac" label="Mac" width="180" />
        <ElTableColumn prop="voice" label="语音类型" width="300" />
        <ElTableColumn prop="role" label="角色定义" />
        <ElTableColumn prop="memory" label="聊天记忆" />
      </ElTable>
      <ElPagination
        class="mt-5 justify-end"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </ElCard>
  </Page>
</template>

<style scoped></style>
