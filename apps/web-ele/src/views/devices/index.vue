<script lang="ts" setup>
import type { ComponentSize } from 'element-plus';

import type { Device } from '#/api';

import { onMounted, reactive, ref } from 'vue';

import { EllipsisText, Page, useVbenDrawer } from '@vben/common-ui';

import {
  ElButton,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElOption,
  ElPagination,
  ElSelect,
  ElTable,
  ElTableColumn,
} from 'element-plus';

import { getAllDevicesApi, updateDeviceApi } from '#/api';

const voiceMap: Map<string, string> = new Map([
  ['en_female_amanda_mars_bigtts', 'Amanda'],
  ['en_female_anna_mars_bigtts', 'Anna'],
  ['en_female_sarah_mars_bigtts', 'Sarah'],
  ['en_male_adam_mars_bigtts', 'Adam'],
  ['en_male_dryw_mars_bigtts', 'Dryw'],
  ['en_male_jackson_mars_bigtts', 'Jackson'],
  ['en_male_smith_mars_bigtts', 'Smith'],
  ['ICL_zh_female_aojiaonvyou_tob', '傲娇女友'],
  ['ICL_zh_female_aomanjiaosheng_tob', '傲慢娇声'],
  ['ICL_zh_female_bingjiaojiejie_tob', '病娇姐姐'],
  ['ICL_zh_female_bingjiaomengmei_tob', '病娇萌妹'],
  ['ICL_zh_female_bingruoshaonv_tob', '病弱少女'],
  ['ICL_zh_female_chengshujiejie_tob', '成熟姐姐'],
  ['ICL_zh_female_heainainai_tob', '和蔼奶奶'],
  ['ICL_zh_female_huopodiaoman_tob', '活泼刁蛮'],
  ['ICL_zh_female_huoponvhai_tob', '活泼女孩'],
  ['ICL_zh_female_jiaohannvwang_tob', '娇憨女王'],
  ['ICL_zh_female_jiaoruoluoli_tob', '娇弱萝莉'],
  ['ICL_zh_female_jiaxiaozi_tob', '假小子'],
  ['ICL_zh_female_keainvsheng_tob', '可爱女生'],
  ['ICL_zh_female_linjuayi_tob', '邻居阿姨'],
  ['ICL_zh_female_nuanxinxuedie_tob', '暖心学姐'],
  ['ICL_zh_female_tiaopigongzhu_tob', '调皮公主'],
  ['ICL_zh_female_tiexin nvyou_tob', '贴心女友'],
  ['ICL_zh_female_wenrouwenya_tob', '温柔文雅'],
  ['ICL_zh_female_wumeiyujie_tob', '妩媚御姐'],
  ['ICL_zh_female_xingganyujie_tob', '性感御姐'],
  ['ICL_zh_female_zhixingwenwan_tob', '知性温婉'],
  ['ICL_zh_male_aiqilingren_tob', '傲气凌人'],
  ['ICL_zh_male_aomanshaoye_tob', '傲慢少爷'],
  ['ICL_zh_male_bingjiaobailian_tob', '病娇白莲'],
  ['ICL_zh_male_bingjiaodidi_tob', '病娇弟弟'],
  ['ICL_zh_male_bingjiaogege_tob', '病娇哥哥'],
  ['ICL_zh_male_chunzhenxuedi_tob', '纯真学弟'],
  ['ICL_zh_male_fuheigongzi_tob', '腹黑公子'],
  ['ICL_zh_male_guiyishenmi_tob', '诡异神秘'],
  ['ICL_zh_male_guzhibingjiao_tob', '固执病娇'],
  ['ICL_zh_male_hanhoudunshi_tob', '憨厚敦实'],
  ['ICL_zh_male_huoposhuanglang_tob', '活泼爽朗'],
  ['ICL_zh_male_kailangqingkuai_tob', '开朗轻快'],
  ['ICL_zh_male_lengdanshuli_tob', '冷淡疏离'],
  ['ICL_zh_male_lengjunshangsi_tob', '冷峻上司'],
  ['ICL_zh_male_lvchaxiaoge_tob', '绿茶小哥'],
  ['ICL_zh_male_nuanxintitie_tob', '暖心体贴'],
  ['ICL_zh_male_qingsenaigou_tob', '青涩小生'],
  ['ICL_zh_male_ruyacaijun_tob', '儒雅才俊'],
  ['ICL_zh_male_sajiaonianren_tob', '撒娇粘人'],
  ['ICL_zh_male_shaonianjiangjun_tob', '少年将军'],
  ['ICL_zh_male_shenmifashi_tob', '神秘法师'],
  ['ICL_zh_male_shuaizhenxiaohuo_tob', '率真小伙'],
  ['ICL_zh_male_tiexin nanyou_tob', '贴心男友'],
  ['ICL_zh_male_wenrounantongzhuo_tob', '温柔男同桌'],
  ['ICL_zh_male_xiaosasuixing_tob', '潇洒随性'],
  ['ICL_zh_male_xuebanantongzhuo_tob', '学霸男同桌'],
  ['ICL_zh_male_youmodaye_tob', '幽默大爷'],
  ['ICL_zh_male_youmosushu_tob', '幽默叔叔'],
  ['ICL_zh_male_youroubangzhu_tob', '优柔帮主'],
  ['ICL_zh_male_yourougongzi_tob', '优柔公子'],
  ['ICL_zh_male_zhengzhiqingnian_tob', '正直青年'],
  ['multi_female_gaolengyujie_moon_bigtts', 'あけみ'],
  ['multi_female_shuangkuaisisi_moon_bigtts', 'はるこ/Esmeralda'],
  ['multi_male_jingqiangkanye_moon_bigtts', 'かずや/Javier or Álvaro'],
  ['multi_male_wanqudashu_moon_bigtts', 'ひろし/Roberto'],
  ['zh_female_cancan_mars_bigtts', '灿灿'],
  ['zh_female_daimengchuanmei_moon_bigtts', '呆萌川妹'],
  ['zh_female_gaolengyujie_moon_bigtts', '高冷御姐'],
  ['zh_female_gufengshaoyu_mars_bigtts', '古风少御'],
  ['zh_female_gujie_mars_bigtts', '顾姐'],
  ['zh_female_jitangmeimei_mars_bigtts', '鸡汤妹妹'],
  ['zh_female_kailangjiejie_moon_bigtts', '开朗姐姐'],
  ['zh_female_linjianvhai_moon_bigtts', '邻家女孩'],
  ['zh_female_meilinvyou_moon_bigtts', '魅力女友'],
  ['zh_female_meilinvyyou_emo_v2_mars_bigtts', '魅力女友 (多情感)'],
  ['zh_female_mengyatou_mars_bigtts', '萌丫头'],
  ['zh_female_metuo jieer_moon_bigtts', '妹坨洁儿'],
  ['zh_female_peiqi_mars_bigtts', '佩奇猪'],
  ['zh_female_popo_mars_bigtts', '婆婆'],
  ['zh_female_qiaopinvsheng_mars_bigtts', '俏皮女声'],
  ['zh_female_qingchezizi_moon_bigtts', '清澈梓梓'],
  ['zh_female_qingxinnvsheng_mars_bigtts', '清新女声'],
  ['zh_female_roumeinvyou_emo_v2_mars_bigtts', '柔美女友 (多情感)'],
  ['zh_female_sajiaonvyou_moon_bigtts', '柔美女友'],
  ['zh_female_shaoergushi_mars_bigtts', '少儿故事'],
  ['zh_female_shuangkuaisisi_emo_v2_mars_bigtts', '爽快思思 (多情感)'],
  ['zh_female_shuangkuaisisi_moon_bigtts', '爽快思思/Skye'],
  ['zh_female_tianmeixiaoyuan_moon_bigtts', '甜美小源'],
  ['zh_female_tianmeiyueyue_moon_bigtts', '甜美悦悦'],
  ['zh_female_tiexinvsheng_mars_bigtts', '贴心女声'],
  ['zh_female_wanqudashu_moon_bigtts', '湾区大叔'],
  ['zh_female_wanwanxiaohe_moon_bigtts', '湾湾小何'],
  ['zh_female_wenroushunv_mars_bigtts', '温柔淑女'],
  ['zh_female_wenrouxiaoya_moon_bigtts', '温柔小雅'],
  ['zh_female_wuzetian_mars_bigtts', '武则天'],
  ['zh_female_xinlingjitang_moon_bigtts', '心灵鸡汤'],
  ['zh_female_yingtaowanzi_mars_bigtts', '樱桃丸子'],
  ['zh_female_yuanqinvyou_moon_bigtts', '撒娇学妹'],
  ['zh_female_zhixingnvsheng_mars_bigtts', '知性女声'],
  ['zh_male_aojiaobazong_moon_bigtts', '傲娇霸总'],
  ['zh_male_baqiqingshu_mars_bigtts', '霸气青叔'],
  ['zh_male_beijingxiaoye_emo_v2_mars_bigtts', '北京小爷 (多情感)'],
  ['zh_male_beijingxiaoye_moon_bigtts', '北京小爷'],
  ['zh_male_changtianyi_mars_bigtts', '悬疑解说'],
  ['zh_male_chunhui_mars_bigtts', '广告解说'],
  ['zh_male_dongfanghaoran_moon_bigtts', '东方浩然'],
  ['zh_male_dongmanhai mian_mars_bigtts', '亮嗓萌仔'],
  ['zh_male_fanjuanqingnian_mars_bigtts', '反卷青年'],
  ['zh_male_guangxiyuanzhou_moon_bigtts', '广西远舟'],
  ['zh_male_guozhoudege_moon_bigtts', '广州德哥'],
  ['zh_male_haoyuxiaoge_moon_bigtts', '浩宇小哥'],
  ['zh_male_jieshuonansheng_mars_bigtts', '磁性解说男声'],
  ['zh_male_jieshuoxiaoming_moon_bigtts', '解说小明'],
  ['zh_male_jingqiangkanye_moon_bigtts', '京腔侃爷/Harmony'],
  ['zh_male_lanxiaoyang_mars_bigtts', '懒音绵宝'],
  ['zh_male_linjiananhai_moon_bigtts', '邻家男孩'],
  ['zh_male_naiqimengwa_mars_bigtts', '奶气萌娃'],
  ['zh_male_qingcang_mars_bigtts', '擎苍'],
  ['zh_male_qingshuangnanda_mars_bigtts', '清爽男大'],
  ['zh_male_ruyaqingnian_mars_bigtts', '儒雅青年'],
  ['zh_male_shaonianzixin_moon_bigtts', '少年梓辛/Brayan'],
  ['zh_male_shenyboke_moon_bigtts', '深夜播客'],
  ['zh_male_silang_mars_bigtts', '四郎'],
  ['zh_male_sunwukong_mars_bigtts', '猴哥'],
  ['zh_male_tiancaitongsheng_mars_bigtts', '天才童声'],
  ['zh_male_wennuanahu_moon_bigtts', '温暖阿虎/Alvin'],
  ['zh_male_wenrouxiaoge_mars_bigtts', '温柔小哥'],
  ['zh_male_xionger_mars_bigtts', '熊二'],
  ['zh_male_yangguangqingnian_emo_v2_mars_bigtts', '阳光青年 (多情感)'],
  ['zh_male_yangguangqingnian_mars_bigtts', '活力小哥'],
  ['zh_male_yangguangqingnian_moon_bigtts', '阳光青年'],
  ['zh_male_yuanboxiaoshu_moon_bigtts', '渊博小叔'],
  ['zh_male_yuzhouzixuan_moon_bigtts', '豫州子轩'],
]);

const deviceInfoForm = reactive({
  id: 0,
  create_time: '',
  update_time: '',
  mac: '',
  voice: '',
  role: '',
  memory: '',
});

const onEditSubmit = async () => {
  if (
    await updateDeviceApi({
      id: deviceInfoForm.id,
      create_time: deviceInfoForm.create_time,
      update_time: deviceInfoForm.update_time,
      mac: deviceInfoForm.mac,
      voice: deviceInfoForm.voice,
      role: deviceInfoForm.role,
      memory: deviceInfoForm.memory,
    })
  ) {
    ElMessage({ message: '更新成功！' });
    drawerApi.close();
  }
};

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

const [Drawer, drawerApi] = useVbenDrawer({ onConfirm: onEditSubmit });

const handleEditClick = (row: Device) => {
  deviceInfoForm.id = row.id;
  deviceInfoForm.create_time = row.create_time;
  deviceInfoForm.update_time = row.update_time;
  deviceInfoForm.mac = row.mac;
  deviceInfoForm.voice = row.voice;
  deviceInfoForm.role = row.role;
  deviceInfoForm.memory = row.memory;
  drawerApi.open();
};

onMounted(async () => {
  await refreshData();
});
</script>

<template>
  <Drawer class="w-[600px]" title="编辑设备详情">
    <ElForm :model="deviceInfoForm" label-width="auto">
      <ElFormItem label="MAC地址">
        <ElInput v-model="deviceInfoForm.mac" />
      </ElFormItem>
      <ElFormItem label="角色语音">
        <ElSelect
          v-model="deviceInfoForm.voice"
          placeholder="请选择或输入语音"
          filterable
        >
          <ElOption
            v-for="pair in voiceMap"
            :key="pair[0]"
            :label="pair[1]"
            :value="pair[0]"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="角色定义">
        <ElInput
          v-model="deviceInfoForm.role"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 10 }"
        />
      </ElFormItem>
      <ElFormItem label="聊天记忆">
        <ElInput
          v-model="deviceInfoForm.memory"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 10 }"
        />
      </ElFormItem>
    </ElForm>
  </Drawer>
  <Page :auto-content-height="true">
    <ElCard
      class="h-full"
      shadow="never"
      body-class="flex flex-col justify-between h-full"
    >
      <ElTable :data="tableData" class="flex-grow">
        <ElTableColumn prop="id" label="ID" width="50" />
        <ElTableColumn prop="mac" label="Mac" width="180" />
        <ElTableColumn prop="voice" label="语音类型" width="200">
          <template #default="scope">
            {{ voiceMap.get(scope.row.voice) }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="role" label="角色定义">
          <template #default="scope">
            <EllipsisText :line="1" :tooltip-max-width="500">
              {{ scope.row.role }}
            </EllipsisText>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="memory" label="聊天记忆">
          <template #default="scope">
            <EllipsisText :line="1" :tooltip-max-width="500" expand>
              {{ scope.row.memory }}
            </EllipsisText>
          </template>
        </ElTableColumn>
        <ElTableColumn fixed="right" label="操作" width="200">
          <template #default="scope">
            <ElButton
              type="default"
              size="small"
              @click="handleEditClick(scope.row)"
            >
              编辑
            </ElButton>
            <ElButton type="danger" size="small">删除</ElButton>
          </template>
        </ElTableColumn>
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
