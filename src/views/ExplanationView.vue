<template>
  <div class="paper-texture p-4">
    <div class="max-w-4xl mx-auto chinese-card p-8 rounded-lg">
      <header>
        <h1 class="text-3xl font-bold text-primary-dark text-center mb-8 font-kai">八字详解 - 生辰八字基础知识</h1>
        <p class="text-center text-lg mb-6 font-song">深入了解八字命理学的基础知识，掌握天干地支、五行相生相克等核心概念</p>
      </header>
      
      <main class="space-y-8">
        <article class="chinese-border p-4 rounded-lg bg-background-light">
          <header>
            <h2 class="text-xl font-bold text-primary-dark mb-4 font-kai">什么是生辰八字？</h2>
          </header>
          <p class="text-secondary-dark font-song mb-4">生辰八字，又称四柱八字，是中国传统命理学的重要组成部分。它以一个人出生的年、月、日、时四个时间单位，按照天干地支记时方法，转换为四组天干地支，合计八个字，故称"八字"。</p>
          <p class="text-secondary-dark font-song">四柱分别为：年柱、月柱、日柱和时柱，每柱包含天干和地支两个字，合计八个字。这八个字蕴含着天地自然的规律，被视为一个人命运的密码。</p>
        </article>
        
        <article class="chinese-border p-4 rounded-lg bg-background-light">
          <header>
            <h2 class="text-xl font-bold text-primary-dark mb-4 font-kai">天干地支</h2>
          </header>
          <div class="grid md:grid-cols-2 gap-6">
            <section>
              <h3 class="text-lg font-bold text-secondary mb-2 font-kai">十天干</h3>
              <p class="text-secondary-dark font-song mb-2">天干共有十个：甲、乙、丙、丁、戊、己、庚、辛、壬、癸。</p>
              <div class="grid grid-cols-5 gap-2 mt-4" role="table" aria-label="十天干五行对应表">
                <div class="text-center p-2 bg-green-100 rounded">
                  <span class="font-kai">甲</span>
                  <div class="text-xs mt-1">木</div>
                </div>
                <div class="text-center p-2 bg-green-100 rounded">
                  <span class="font-kai">乙</span>
                  <div class="text-xs mt-1">木</div>
                </div>
                <div class="text-center p-2 bg-red-100 rounded">
                  <span class="font-kai">丙</span>
                  <div class="text-xs mt-1">火</div>
                </div>
                <div class="text-center p-2 bg-red-100 rounded">
                  <span class="font-kai">丁</span>
                  <div class="text-xs mt-1">火</div>
                </div>
                <div class="text-center p-2 bg-amber-100 rounded">
                  <span class="font-kai">戊</span>
                  <div class="text-xs mt-1">土</div>
                </div>
                <div class="text-center p-2 bg-amber-100 rounded">
                  <span class="font-kai">己</span>
                  <div class="text-xs mt-1">土</div>
                </div>
                <div class="text-center p-2 bg-yellow-100 rounded">
                  <span class="font-kai">庚</span>
                  <div class="text-xs mt-1">金</div>
                </div>
                <div class="text-center p-2 bg-yellow-100 rounded">
                  <span class="font-kai">辛</span>
                  <div class="text-xs mt-1">金</div>
                </div>
                <div class="text-center p-2 bg-blue-100 rounded">
                  <span class="font-kai">壬</span>
                  <div class="text-xs mt-1">水</div>
                </div>
                <div class="text-center p-2 bg-blue-100 rounded">
                  <span class="font-kai">癸</span>
                  <div class="text-xs mt-1">水</div>
                </div>
              </div>
            </section>
            
            <section>
              <h3 class="text-lg font-bold text-secondary mb-2 font-kai">十二地支</h3>
              <p class="text-secondary-dark font-song mb-2">地支共有十二个：子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥。</p>
              <div class="grid grid-cols-6 gap-2 mt-4" role="table" aria-label="十二地支五行对应表">
                <div class="text-center p-2 bg-blue-100 rounded">
                  <span class="font-kai">子</span>
                  <div class="text-xs mt-1">水</div>
                </div>
                <div class="text-center p-2 bg-amber-100 rounded">
                  <span class="font-kai">丑</span>
                  <div class="text-xs mt-1">土</div>
                </div>
                <div class="text-center p-2 bg-green-100 rounded">
                  <span class="font-kai">寅</span>
                  <div class="text-xs mt-1">木</div>
                </div>
                <div class="text-center p-2 bg-green-100 rounded">
                  <span class="font-kai">卯</span>
                  <div class="text-xs mt-1">木</div>
                </div>
                <div class="text-center p-2 bg-amber-100 rounded">
                  <span class="font-kai">辰</span>
                  <div class="text-xs mt-1">土</div>
                </div>
                <div class="text-center p-2 bg-red-100 rounded">
                  <span class="font-kai">巳</span>
                  <div class="text-xs mt-1">火</div>
                </div>
                <div class="text-center p-2 bg-red-100 rounded">
                  <span class="font-kai">午</span>
                  <div class="text-xs mt-1">火</div>
                </div>
                <div class="text-center p-2 bg-amber-100 rounded">
                  <span class="font-kai">未</span>
                  <div class="text-xs mt-1">土</div>
                </div>
                <div class="text-center p-2 bg-yellow-100 rounded">
                  <span class="font-kai">申</span>
                  <div class="text-xs mt-1">金</div>
                </div>
                <div class="text-center p-2 bg-yellow-100 rounded">
                  <span class="font-kai">酉</span>
                  <div class="text-xs mt-1">金</div>
                </div>
                <div class="text-center p-2 bg-amber-100 rounded">
                  <span class="font-kai">戌</span>
                  <div class="text-xs mt-1">土</div>
                </div>
                <div class="text-center p-2 bg-blue-100 rounded">
                  <span class="font-kai">亥</span>
                  <div class="text-xs mt-1">水</div>
                </div>
              </div>
            </section>
          </div>
        </article>
        
        <article class="chinese-border p-4 rounded-lg bg-background-light">
          <header>
            <h2 class="text-xl font-bold text-primary-dark mb-4 font-kai">八字计算方法</h2>
          </header>
          <p class="text-secondary-dark font-song mb-4">八字计算是将公历或农历的出生年、月、日、时转换为天干地支的过程。以下是基本原理：</p>
          
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-bold text-secondary mb-2 font-kai">1. 年柱</h3>
              <p class="text-secondary-dark font-song">年柱由年干和年支组成。年干以甲为首，每10年一循环；年支以子为首，每12年一循环。如2023年为癸卯年（癸为天干，卯为地支）。</p>
            </div>
            
            <div>
              <h3 class="text-lg font-bold text-secondary mb-2 font-kai">2. 月柱</h3>
              <p class="text-secondary-dark font-song">月柱由月干和月支组成。月干根据年干和月份推算；月支则根据节气确定，正月为寅，二月为卯，依次类推。</p>
            </div>
            
            <div>
              <h3 class="text-lg font-bold text-secondary mb-2 font-kai">3. 日柱</h3>
              <p class="text-secondary-dark font-song">日柱由日干和日支组成。日干支的推算较为复杂，需要根据特定算法从公元前的甲子日起推算。</p>
            </div>
            
            <div>
              <h3 class="text-lg font-bold text-secondary mb-2 font-kai">4. 时柱</h3>
              <p class="text-secondary-dark font-song">时柱由时干和时支组成。时干根据日干推算；时支则按照传统时辰划分：子时（23:00-00:59）、丑时（01:00-02:59）等。</p>
            </div>
          </div>
        </article>
        
        <article class="chinese-border p-4 rounded-lg bg-background-light">
          <header>
            <h2 class="text-xl font-bold text-primary-dark mb-4 font-kai">五行与相生相克</h2>
          </header>
          <p class="text-secondary-dark font-song mb-4">五行学说是中国古代哲学的重要组成部分，包括金、木、水、火、土五种基本元素，它们之间存在相生相克的关系。</p>
          
          <div class="grid md:grid-cols-2 gap-6">
            <section>
              <h3 class="text-lg font-bold text-secondary mb-2 font-kai">五行相生</h3>
              <ul class="list-disc list-inside space-y-1 text-secondary-dark font-song">
                <li>木生火：木燃烧产生火</li>
                <li>火生土：火焚烧后产生灰烬（土）</li>
                <li>土生金：金属矿藏蕴藏在土中</li>
                <li>金生水：金属在寒冷时会凝结水珠</li>
                <li>水生木：水滋养树木生长</li>
              </ul>
            </section>
            
            <section>
              <h3 class="text-lg font-bold text-secondary mb-2 font-kai">五行相克</h3>
              <ul class="list-disc list-inside space-y-1 text-secondary-dark font-song">
                <li>木克土：树根深入土中</li>
                <li>土克水：土堤可以阻挡水流</li>
                <li>水克火：水可以熄灭火焰</li>
                <li>火克金：火可以熔化金属</li>
                <li>金克木：金属工具可以砍伐树木</li>
              </ul>
            </section>
          </div>
        </article>
      </main>
      
      <div class="flex justify-center mt-8">
        <router-link to="/calculator" class="chinese-btn px-6 py-3 rounded-lg text-lg font-kai">开始测算</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useSEO } from '@/composables/useSEO';
import '../assets/styles.css';

const { setTitle, setDescription, setKeywords } = useSEO();

onMounted(() => {
  setTitle('八字详解 - 生辰八字基础知识大全');
  setDescription('详细介绍八字命理学基础知识，包含天干地支、五行相生相克、八字计算方法等核心概念，帮助您深入理解传统命理文化。');
  setKeywords('八字详解,天干地支,五行相生相克,八字计算方法,命理学基础,生辰八字知识');
});
</script>
