<template>
  <div class="paper-texture p-4">
    <div class="max-w-4xl mx-auto chinese-card p-6 rounded-lg">
      <h1 class="text-3xl font-bold text-primary-dark text-center mb-8 font-kai">生辰八字</h1>
      
      <div class="mb-10 text-center">
        <p class="text-lg mb-6 font-song">探索中华传统命理学，了解您的生辰八字</p>
        <div class="flex justify-center space-x-6">
          <router-link to="/calculator" class="chinese-btn px-6 py-3 rounded-lg font-kai">开始测算</router-link>
          <router-link to="/explanation" class="chinese-btn px-6 py-3 rounded-lg font-kai bg-secondary">八字详解</router-link>
        </div>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8 mt-12">
        <div class="chinese-border p-6 rounded-lg bg-background-light">
          <h2 class="text-xl font-bold text-primary-dark mb-4 font-kai">什么是生辰八字？</h2>
          <p class="text-secondary-dark font-song">生辰八字，又称四柱八字，是中国传统命理学的重要组成部分。它以一个人出生的年、月、日、时四个时间单位，按照天干地支记时方法，转换为四组天干地支，合计八个字，故称"八字"。</p>
        </div>
        
        <div class="chinese-border p-6 rounded-lg bg-background-light">
          <h2 class="text-xl font-bold text-primary-dark mb-4 font-kai">八字的意义</h2>
          <p class="text-secondary-dark font-song">在中华传统文化中，八字被视为一个人命运的密码，蕴含着天地自然的规律。通过解读八字，可以了解一个人的性格特点、人生走向以及与他人的相处之道，从而获得自我认知与生活指导。</p>
        </div>
      </div>
      
      <div class="mt-12 text-center">
        <p class="italic text-sm text-gray-600 font-song">本工具仅供娱乐参考，请理性看待</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useSEO } from '../composables/useSEO.js';
import '../assets/styles.css';

const { updateSEO, addStructuredData } = useSEO();

onMounted(() => {
  // 使用SEO组合函数更新页面信息
  updateSEO('home');
  
  // 添加首页特定的结构化数据
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "生辰八字在线计算器",
    "description": "专业的生辰八字在线计算器，支持公历农历转换，提供详细的八字排盘、五行分析、命主身主查询。",
    "url": "https://younglina.wang/eight",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://younglina.wang/eightcalculator",
      "query-input": "required name=search_term_string"
    },
    "author": {
      "@type": "Person",
      "name": "Woung"
    },
    "inLanguage": "zh-CN",
    "about": {
      "@type": "Thing",
      "name": "生辰八字",
      "description": "中国传统命理学，通过出生年月日时计算个人命理特征"
    }
  };
  
  addStructuredData(homeStructuredData);
});
</script>
