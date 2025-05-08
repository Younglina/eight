<template>
  <div class="paper-texture p-4">
    <div class="max-w-4xl mx-auto chinese-card p-8 rounded-lg">
      <h1
        class="text-3xl font-bold text-primary-dark text-center mb-8 font-kai"
      >
        八字分析结果
      </h1>

      <div class="mb-8 text-center">
        <p class="text-lg font-song">
          {{ gender }}，{{ calendar === "公历" ? solarDate : lunarDate }}
        </p>
      </div>

      <div class="chinese-border p-4 rounded-lg bg-background-light mb-8">
        <h2
          class="text-xl font-bold text-primary-dark mb-4 text-center font-kai"
        >
          基本信息
        </h2>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="chinese-border bg-background p-4 rounded-lg">
            <div class="text-lg font-bold text-secondary mb-2 font-kai">
              农历日期
            </div>
            <div class="text-primary-dark font-song">
              {{ lunarDate }} {{ time }}
            </div>
          </div>

          <div class="chinese-border bg-background p-4 rounded-lg">
            <div class="text-lg font-bold text-secondary mb-2 font-kai">
              八字
            </div>
            <div class="text-primary-dark font-song">{{ chineseDate }}</div>
          </div>

          <div class="chinese-border bg-background p-4 rounded-lg flex text-center">
            <div>
              <div class="text-lg font-bold text-secondary mb-2 font-kai">
                星座
              </div>
              <div class="text-primary-dark font-song">{{ sign }}</div>
            </div>
            <div class="ml-2">
              <div class="text-lg font-bold text-secondary mb-2 font-kai">
                生肖
              </div>
              <div class="text-primary-dark font-song">{{ zodiac }}</div>
            </div>
            <div class="ml-2">
              <div class="text-lg font-bold text-secondary mb-2 font-kai">
                命主
              </div>
              <div class="text-primary-dark font-song">{{ soul }}</div>
            </div>
            <div class="ml-2">
              <div class="text-lg font-bold text-secondary mb-2 font-kai">
                身主
              </div>
              <div class="text-primary-dark font-song">{{ body }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="chinese-border p-4 rounded-lg bg-background-light mb-8">
        <h2
          class="text-xl font-bold text-primary-dark mb-4 text-center font-kai"
        >
          五行分析
        </h2>

        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <span class="font-kai text-lg">金</span>
            <div class="w-4/5 bg-gray-200 rounded-full h-4">
              <div
                class="bg-yellow-500 h-4 rounded-full"
                :style="{ width: `${wuxingCount.metal * 20}%` }"
              ></div>
            </div>
            <span class="ml-2 font-song">{{ wuxingCount.metal }}</span>
          </div>

          <div class="flex items-center justify-between mb-2">
            <span class="font-kai text-lg">木</span>
            <div class="w-4/5 bg-gray-200 rounded-full h-4">
              <div
                class="bg-green-500 h-4 rounded-full"
                :style="{ width: `${wuxingCount.wood * 20}%` }"
              ></div>
            </div>
            <span class="ml-2 font-song">{{ wuxingCount.wood }}</span>
          </div>

          <div class="flex items-center justify-between mb-2">
            <span class="font-kai text-lg">水</span>
            <div class="w-4/5 bg-gray-200 rounded-full h-4">
              <div
                class="bg-blue-500 h-4 rounded-full"
                :style="{ width: `${wuxingCount.water * 20}%` }"
              ></div>
            </div>
            <span class="ml-2 font-song">{{ wuxingCount.water }}</span>
          </div>

          <div class="flex items-center justify-between mb-2">
            <span class="font-kai text-lg">火</span>
            <div class="w-4/5 bg-gray-200 rounded-full h-4">
              <div
                class="bg-red-500 h-4 rounded-full"
                :style="{ width: `${wuxingCount.fire * 20}%` }"
              ></div>
            </div>
            <span class="ml-2 font-song">{{ wuxingCount.fire }}</span>
          </div>

          <div class="flex items-center justify-between">
            <span class="font-kai text-lg">土</span>
            <div class="w-4/5 bg-gray-200 rounded-full h-4">
              <div
                class="bg-amber-700 h-4 rounded-full"
                :style="{ width: `${wuxingCount.earth * 20}%` }"
              ></div>
            </div>
            <span class="ml-2 font-song">{{ wuxingCount.earth }}</span>
          </div>
        </div>

        <div class="mt-6 p-4 bg-background-dark rounded-lg">
          <p class="font-song text-center">{{ wuxingAnalysis }}</p>
        </div>
      </div>

      <div class="flex justify-center space-x-6 mt-8">
        <router-link
          to="/calculator"
          class="chinese-btn px-6 py-2 rounded-lg font-kai"
          >重新计算</router-link
        >
        <router-link
          to="/explanation"
          class="chinese-btn px-6 py-2 rounded-lg font-kai bg-secondary"
          >八字详解</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import "../assets/styles.css";

const route = useRoute();

// 从路由参数获取八字信息
const gender = ref(route.query.gender || "");
const calendar = ref(route.query.calendar || "公历");

// 从路由参数获取新的信息
const solarDate = ref(route.query.solarDate || "");
const lunarDate = ref(route.query.lunarDate || "");
const chineseDate = ref(route.query.chineseDate || "");
const time = ref(route.query.time || "");
const sign = ref(route.query.sign || "");
const zodiac = ref(route.query.zodiac || "");
const soul = ref(route.query.soul || "");
const body = ref(route.query.body || "");

// 为了保持五行分析功能，保留原有的年月日时变量
const year = ref("");
const month = ref("");
const day = ref("");

// 五行属性映射
const wuxingMap = {
  甲: "wood",
  乙: "wood",
  丙: "fire",
  丁: "fire",
  戊: "earth",
  己: "earth",
  庚: "metal",
  辛: "metal",
  壬: "water",
  癸: "water",
  子: "water",
  丑: "earth",
  寅: "wood",
  卯: "wood",
  辰: "earth",
  巳: "fire",
  午: "fire",
  未: "earth",
  申: "metal",
  酉: "metal",
  戌: "earth",
  亥: "water",
};

// 计算五行数量
const wuxingCount = computed(() => {
  const count = { metal: 0, wood: 0, water: 0, fire: 0, earth: 0 };

  console.log(year.value, month.value, day.value, time.value);
  // 计算天干五行
  if (year.value[0] && wuxingMap[year.value[0]])
    count[wuxingMap[year.value[0]]]++;
  if (month.value[0] && wuxingMap[month.value[0]])
    count[wuxingMap[month.value[0]]]++;
  if (day.value[0] && wuxingMap[day.value[0]]) count[wuxingMap[day.value[0]]]++;
  if (time.value[0] && wuxingMap[time.value[0]])
    count[wuxingMap[time.value[0]]]++;

  // 计算地支五行
  if (year.value[1] && wuxingMap[year.value[1]])
    count[wuxingMap[year.value[1]]]++;
  if (month.value[1] && wuxingMap[month.value[1]])
    count[wuxingMap[month.value[1]]]++;
  if (day.value[1] && wuxingMap[day.value[1]]) count[wuxingMap[day.value[1]]]++;
  if (time.value[1] && wuxingMap[time.value[1]])
    count[wuxingMap[time.value[1]]]++;

  return count;
});

// 五行分析
const wuxingAnalysis = computed(() => {
  const count = wuxingCount.value;
  const max = Math.max(
    count.metal,
    count.wood,
    count.water,
    count.fire,
    count.earth
  );
  const min = Math.min(
    count.metal,
    count.wood,
    count.water,
    count.fire,
    count.earth
  );

  let maxElement = [];
  let minElement = [];

  if (count.metal === max) maxElement.push("金");
  if (count.wood === max) maxElement.push("木");
  if (count.water === max) maxElement.push("水");
  if (count.fire === max) maxElement.push("火");
  if (count.earth === max) maxElement.push("土");

  if (count.metal === min) minElement.push("金");
  if (count.wood === min) minElement.push("木");
  if (count.water === min) minElement.push("水");
  if (count.fire === min) minElement.push("火");
  if (count.earth === min) minElement.push("土");

  if (max - min >= 3) {
    return `您的八字中${maxElement.join("、")}较旺，${minElement.join(
      "、"
    )}较弱，五行不太均衡。在传统命理学中，需要注意调和五行，使之相生相克，达到平衡。`;
  } else if (max - min >= 2) {
    return `您的八字中${maxElement.join("、")}略强，${minElement.join(
      "、"
    )}略弱，五行相对平衡。在传统命理学中，这种状态被视为较为理想的状态。`;
  } else {
    return `您的八字五行分布均衡，没有明显的偏旺或偏弱。在传统命理学中，这种状态被视为五行调和，有利于各方面的发展。`;
  }
});

onMounted(() => {
  document.title = "生辰八字 - 分析结果";

  // 从四柱中提取年月日时的天干地支
  if (chineseDate.value) {
    const parts = chineseDate.value.split(" ");
    if (parts.length >= 4) {
      year.value = parts[0];
      month.value = parts[1];
      day.value = parts[2];
      time.value = parts[3];
    }
  }
});
</script>
