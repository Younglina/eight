<template>
  <div class="paper-texture p-6">
    <div class="max-w-4xl mx-auto chinese-card p-8 rounded-lg">
      <h1 class="text-3xl font-bold text-primary-dark text-center mb-8 font-kai">八字计算</h1>
      
      <form @submit.prevent="calculateBaZi" class="space-y-6">
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label for="birthDate" class="label font-kai">出生日期</label>
            <input 
              id="birthDate" 
              v-model="birthDate" 
              class="input w-full font-song" 
              placeholder="如 2000-8-16" 
              required
            />
            <div class="text-gray-500 text-sm mt-1">请输入YYYY-M-D 格式，如 2000-8-16</div>
            <div v-if="dateFormatError" class="text-red-500 text-sm mt-1">请使用正确的日期格式：YYYY-M-D</div>
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
const birthDate = ref('');
const birthHour = ref('');
const gender = ref('');
const calendar = ref('公历');
const dateFormatError = ref(false);

// 验证日期格式是否正确 (YYYY-M-D)
const isValidDateFormat = (dateStr) => {
  // 使用正则表达式验证日期格式
  const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
  if (!regex.test(dateStr)) return false;
  
  // 进一步验证日期是否有效
  const [year, month, day] = dateStr.split('-').map(Number);
  
  if (year < 1900 || year > 2100) return false;
  if (month < 1 || month > 12) return false;
  
  // 检查日期是否在当月有效范围内
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) return false;
  
  return true;
};


// 中国传统时辰
const chineseHours = [
  '早子时 (00:00-00:59)',
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
  '亥时 (21:00-22:59)',
  '晚子时 (23:00-23:59)'
];

// 计算八字
const calculateBaZi = () => {
  try {
    // 验证日期格式
    dateFormatError.value = false;
    if (!isValidDateFormat(birthDate.value)) {
      dateFormatError.value = true;
      return;
    }
    
    let result = '';
    const date = birthDate.value;
    
    // 处理子时的特殊情况
    let hourIndex = birthHour.value;
    // 如果选择了早子时或晚子时，需要转换为iztro库识别的子时索引
    if (hourIndex === 0 || hourIndex === 1) {
      hourIndex = 0; // iztro库中子时的索引
    } else {
      // 其他时辰索引需要减1，因为我们现在有13个选项而不是12个
      hourIndex = hourIndex - 1;
    }
    
    if (calendar.value === '公历') {
      result = astro.bySolar(date, hourIndex, gender.value)
    } else {
      // 如果是农历，直接使用
      result = astro.byLunar(date, hourIndex, gender.value);
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
