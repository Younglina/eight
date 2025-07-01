<template>
  <div class="paper-texture p-6">
    <div class="max-w-4xl mx-auto chinese-card p-8 rounded-lg">
      <header>
        <h1 class="text-3xl font-bold text-primary-dark text-center mb-8 font-kai">八字计算器</h1>
        <p class="text-center text-lg mb-6 font-song">输入您的出生信息，获得专业的八字排盘分析</p>
      </header>
      
      <main>
        <form @submit.prevent="calculateBaZi" class="space-y-6" role="form" aria-label="八字计算表单">
          <fieldset class="grid md:grid-cols-2 gap-6">
            <legend class="sr-only">出生信息输入</legend>
            
            <div class="space-y-2">
              <label for="birthDate" class="label font-kai">出生日期</label>
              <input 
                id="birthDate" 
                v-model="birthDate" 
                class="input w-full font-song" 
                placeholder="YYYY-M-D 格式，如 2000-8-16" 
                aria-describedby="date-help date-error"
                required
              />
              <div id="date-help" class="text-sm text-gray-600">支持公历和农历日期格式</div>
              <div v-if="dateFormatError" id="date-error" class="text-red-500 text-sm mt-1" role="alert">请使用正确的日期格式：YYYY-M-D</div>
            </div>
            
            <div class="space-y-2">
              <label for="birthHour" class="label font-kai">出生时辰</label>
              <select id="birthHour" v-model="birthHour" class="input w-full font-song" aria-describedby="hour-help" required>
                <option value="" disabled>请选择时辰</option>
                <option v-for="(hour, index) in chineseHours" :key="index" :value="index">{{ hour }}</option>
              </select>
              <div id="hour-help" class="text-sm text-gray-600">选择您的出生时辰，影响八字计算准确性</div>
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
              <select id="calendar" v-model="calendar" class="input w-full font-song" aria-describedby="calendar-help" required>
                <option value="公历">公历（阳历）</option>
                <option value="农历">农历（阴历）</option>
              </select>
              <div id="calendar-help" class="text-sm text-gray-600">请选择您出生日期对应的历法</div>
            </div>
          </fieldset>
          
          <div class="flex justify-center mt-8">
            <button type="submit" class="chinese-btn px-8 py-3 rounded-lg text-lg font-kai" aria-describedby="submit-help">
              计算八字
            </button>
          </div>
          <div id="submit-help" class="text-center text-sm text-gray-600 mt-2">点击计算获得您的八字排盘结果</div>
        </form>
      </main>
      
      <section v-if="result" class="mt-12 chinese-card p-8 rounded-lg" role="region" aria-labelledby="result-title">
        <header>
          <h2 id="result-title" class="text-2xl font-bold text-primary-dark text-center mb-6 font-kai">八字排盘结果</h2>
        </header>
        
        <div class="grid md:grid-cols-2 gap-8">
          <article class="space-y-4">
            <h3 class="text-xl font-bold text-primary-dark font-kai">基本信息</h3>
            <dl class="space-y-2 font-song">
              <div><dt class="font-bold inline">姓名：</dt><dd class="inline">{{ result.name || '未填写' }}</dd></div>
              <div><dt class="font-bold inline">性别：</dt><dd class="inline">{{ result.gender }}</dd></div>
              <div><dt class="font-bold inline">出生日期：</dt><dd class="inline">{{ result.solar }}</dd></div>
              <div><dt class="font-bold inline">农历日期：</dt><dd class="inline">{{ result.lunar }}</dd></div>
              <div><dt class="font-bold inline">时辰：</dt><dd class="inline">{{ result.time }}</dd></div>
            </dl>
          </article>
          
          <article class="space-y-4">
            <h3 class="text-xl font-bold text-primary-dark font-kai">八字四柱</h3>
            <div class="grid grid-cols-4 gap-2 text-center font-song" role="table" aria-label="八字四柱表格">
              <div class="space-y-2" role="columnheader">
                <div class="font-bold text-primary-dark">年柱</div>
                <div class="text-lg" role="cell">{{ result.fourPillars.year.heavenlyStem }}{{ result.fourPillars.year.earthlyBranch }}</div>
              </div>
              <div class="space-y-2" role="columnheader">
                <div class="font-bold text-primary-dark">月柱</div>
                <div class="text-lg" role="cell">{{ result.fourPillars.month.heavenlyStem }}{{ result.fourPillars.month.earthlyBranch }}</div>
              </div>
              <div class="space-y-2" role="columnheader">
                <div class="font-bold text-primary-dark">日柱</div>
                <div class="text-lg" role="cell">{{ result.fourPillars.day.heavenlyStem }}{{ result.fourPillars.day.earthlyBranch }}</div>
              </div>
              <div class="space-y-2" role="columnheader">
                <div class="font-bold text-primary-dark">时柱</div>
                <div class="text-lg" role="cell">{{ result.fourPillars.hour.heavenlyStem }}{{ result.fourPillars.hour.earthlyBranch }}</div>
              </div>
            </div>
          </article>
        </div>
        
        <article class="mt-8 space-y-4">
          <h3 class="text-xl font-bold text-primary-dark font-kai">五行分析</h3>
          <div class="grid md:grid-cols-5 gap-4 text-center font-song" role="table" aria-label="五行分布表格">
            <div v-for="(count, element) in result.fiveElements" :key="element" class="space-y-2" role="cell">
              <div class="font-bold text-primary-dark">{{ element }}</div>
              <div class="text-lg">{{ count }}</div>
            </div>
          </div>
        </article>
        
        <article class="mt-8 space-y-4">
          <h3 class="text-xl font-bold text-primary-dark font-kai">命理解析</h3>
          <div class="space-y-4 font-song text-gray-700">
            <section>
              <h4 class="font-bold text-primary-dark mb-2">日主分析</h4>
              <p>{{ result.analysis.dayMaster }}</p>
            </section>
            <section>
              <h4 class="font-bold text-primary-dark mb-2">五行特点</h4>
              <p>{{ result.analysis.fiveElementsAnalysis }}</p>
            </section>
            <section>
              <h4 class="font-bold text-primary-dark mb-2">性格特征</h4>
              <p>{{ result.analysis.personality }}</p>
            </section>
          </div>
        </article>
      </section>
      
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
import { useSEO } from '@/composables/useSEO';

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

const { setTitle, setDescription, setKeywords } = useSEO();

onMounted(() => {
  setTitle('八字计算器 - 专业生辰八字排盘分析');
  setDescription('免费在线八字计算器，输入出生日期时辰，获得专业的八字排盘分析，包含四柱、五行、命理解析等详细信息。');
  setKeywords('八字计算,生辰八字,八字排盘,四柱八字,五行分析,命理分析');
});
</script>
