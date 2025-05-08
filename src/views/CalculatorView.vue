<template>
  <div class="paper-texture p-6">
    <div class="max-w-4xl mx-auto chinese-card p-8 rounded-lg">
      <h1 class="text-3xl font-bold text-primary-dark text-center mb-8 font-kai">八字计算</h1>
      
      <form @submit.prevent="calculateBaZi" class="space-y-6">
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label for="birthYear" class="label font-kai">出生年份</label>
            <select id="birthYear" v-model="birthYear" class="input w-full font-song" required>
              <option value="" disabled>请选择年份</option>
              <option v-for="year in years" :key="year" :value="year">{{ year }}年</option>
            </select>
          </div>
          
          <div class="space-y-2">
            <label for="birthMonth" class="label font-kai">出生月份</label>
            <select id="birthMonth" v-model="birthMonth" class="input w-full font-song" required>
              <option value="" disabled>请选择月份</option>
              <option v-for="month in 12" :key="month" :value="month">{{ month }}月</option>
            </select>
          </div>
          
          <div class="space-y-2">
            <label for="birthDay" class="label font-kai">出生日期</label>
            <select id="birthDay" v-model="birthDay" class="input w-full font-song" required>
              <option value="" disabled>请选择日期</option>
              <option v-for="day in days" :key="day" :value="day">{{ day }}日</option>
            </select>
          </div>
          
          <div class="space-y-2">
            <label for="birthHour" class="label font-kai">出生时辰</label>
            <select id="birthHour" v-model="birthHour" class="input w-full font-song" required>
              <option value="" disabled>请选择时辰</option>
              <option v-for="(hour, index) in chineseHours" :key="index" :value="index">{{ hour }}</option>
            </select>
          </div>
          
          <div class="space-y-2">
            <label for="gender" class="label font-kai">性别</label>
            <select id="gender" v-model="gender" class="input w-full font-song" required>
              <option value="" disabled>请选择性别</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
          
          <div class="space-y-2">
            <label for="calendar" class="label font-kai">历法</label>
            <select id="calendar" v-model="calendar" class="input w-full font-song" required>
              <option value="公历">公历（阳历）</option>
              <option value="农历">农历（阴历）</option>
            </select>
          </div>
        </div>
        
        <div class="flex justify-center mt-8">
          <button type="submit" class="chinese-btn px-8 py-3 rounded-lg text-lg font-kai">计算八字</button>
        </div>
      </form>
      
      <div class="mt-8 text-center">
        <router-link to="/" class="text-primary hover:text-primary-dark transition-colors font-kai">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { astro } from "iztro";

// 引入样式
import '../assets/styles.css';

const router = useRouter();

// 表单数据
const birthYear = ref('');
const birthMonth = ref('');
const birthDay = ref('');
const birthHour = ref('');
const gender = ref('');
const calendar = ref('公历');

// 生成年份选项（1900-2100）
const years = Array.from({ length: 201 }, (_, i) => i + 1900);

// 根据年月计算当月天数
const days = computed(() => {
  if (!birthYear.value || !birthMonth.value) return Array.from({ length: 31 }, (_, i) => i + 1);
  
  const year = parseInt(birthYear.value);
  const month = parseInt(birthMonth.value);
  
  // 简单判断月份天数
  if (month === 2) {
    // 闰年2月29天，平年2月28天
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    return Array.from({ length: isLeapYear ? 29 : 28 }, (_, i) => i + 1);
  } else if ([4, 6, 9, 11].includes(month)) {
    // 4,6,9,11月各30天
    return Array.from({ length: 30 }, (_, i) => i + 1);
  } else {
    // 其他月份31天
    return Array.from({ length: 31 }, (_, i) => i + 1);
  }
});

// 中国传统时辰
const chineseHours = [
  '子时 (23:00-00:59)',
  '丑时 (01:00-02:59)',
  '寅时 (03:00-04:59)',
  '卯时 (05:00-06:59)',
  '辰时 (07:00-08:59)',
  '巳时 (09:00-10:59)',
  '午时 (11:00-12:59)',
  '未时 (13:00-14:59)',
  '申时 (15:00-16:59)',
  '酉时 (17:00-18:59)',
  '戌时 (19:00-20:59)',
  '亥时 (21:00-22:59)'
];

// 计算八字
const calculateBaZi = () => {
  try {
    let result = '';
    const date = `${birthYear.value}-${birthMonth.value}-${birthDay.value}`
    
    if (calendar.value === '公历') {
      result = astro.bySolar(date, birthHour.value, gender.value)
    } else {
      // 如果是农历，直接使用
      result = astro.byLunar(date, birthHour.value, gender.value);
    }
    //  // 阳历日期
    //   solarDate: '2000-8-16',
    //   // 农历日期
    //   lunarDate: '二〇〇〇年七月十七',
    //   // 四柱
    //   chineseDate: '庚辰 甲申 丙午 庚寅',
    //   // 时辰
    //   time: '寅时',
    //   // 星座
    //   sign: '狮子座',
    //   // 生肖
    //   zodiac: '龙',
    //     // 命主
    //     soul: '破军',
    //   // 身主
    //   body: '文昌',
    //   // 五行局
    //   fiveElementsClass: '木三局',
    console.log(result)
    const {solarDate, chineseDate, lunarDate, sign, zodiac, soul, body} = result
    // 跳转到结果页面，并传递计算结果
    router.push({
      path: '/result',
      query: {solarDate, chineseDate, lunarDate, sign, zodiac, soul, body, gender: gender.value}
    });
  } catch (error) {
    console.error('计算八字出错：', error);
    alert('计算八字时出错，请检查输入信息是否正确！');
  }
};

onMounted(() => {
  document.title = '生辰八字 - 八字计算';
});
</script>
