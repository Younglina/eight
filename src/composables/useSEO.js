import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// SEO配置数据
const seoConfig = {
  home: {
    title: '生辰八字在线计算器 - 免费八字排盘分析工具 | 传统命理学',
    description: '专业的生辰八字在线计算器，支持公历农历转换，提供详细的八字排盘、五行分析、命主身主查询。基于传统命理学理论，为您解读人生密码，仅供娱乐参考。',
    keywords: '生辰八字,八字计算,八字排盘,五行分析,命理学,天干地支,四柱八字,在线算命,免费八字,紫微斗数',
    ogType: 'website'
  },
  calculator: {
    title: '八字计算器 - 在线生辰八字排盘工具 | 免费算命',
    description: '输入您的出生年月日时，立即获得专业的八字排盘结果。支持公历农历转换，精确计算天干地支，分析五行属性，了解命理特征。',
    keywords: '八字计算器,生辰八字计算,八字排盘,天干地支计算,五行查询,命理计算,免费算命工具',
    ogType: 'website'
  },
  result: {
    title: '八字分析结果 - 详细命理解读 | 生辰八字',
    description: '查看您的八字分析结果，包含完整的四柱排盘、五行分析、命主身主信息。深入了解您的命理特征和性格特点。',
    keywords: '八字分析结果,命理解读,五行分析,四柱八字,命主身主,性格分析,命运解析',
    ogType: 'article'
  },
  explanation: {
    title: '八字详解 - 生辰八字基础知识大全 | 传统命理学',
    description: '全面介绍生辰八字的基础知识，包括天干地支、五行相生相克、四柱含义等传统命理学概念。帮助您深入理解中华传统文化。',
    keywords: '八字详解,天干地支,五行相生相克,四柱八字,命理学基础,传统文化,中华命理',
    ogType: 'article'
  }
};

export function useSEO() {
  const route = useRoute();
  const currentSEO = ref({});

  // 更新页面SEO信息
  const updateSEO = (routeName, customData = {}) => {
    const config = seoConfig[routeName] || seoConfig.home;
    const seoData = { ...config, ...customData };
    
    // 更新页面标题
    document.title = seoData.title;
    
    // 更新meta标签
    updateMetaTag('description', seoData.description);
    updateMetaTag('keywords', seoData.keywords);
    
    // 更新Open Graph标签
    updateMetaProperty('og:title', seoData.title);
    updateMetaProperty('og:description', seoData.description);
    updateMetaProperty('og:type', seoData.ogType);
    updateMetaProperty('og:url', `https://younglina.github.io/eight${route.fullPath}`);
    
    // 更新Twitter Card标签
    updateMetaTag('twitter:title', seoData.title, 'name');
    updateMetaTag('twitter:description', seoData.description, 'name');
    
    currentSEO.value = seoData;
  };

  // 更新meta标签的通用函数
  const updateMetaTag = (name, content, attribute = 'name') => {
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  // 更新meta property标签
  const updateMetaProperty = (property, content) => {
    updateMetaTag(property, content, 'property');
  };

  // 添加结构化数据
  const addStructuredData = (data) => {
    // 移除现有的结构化数据
    const existingScript = document.querySelector('script[type="application/ld+json"][data-dynamic]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // 添加新的结构化数据
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-dynamic', 'true');
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  };

  // 为八字结果页面添加特殊的结构化数据
  const addBaziResultStructuredData = (baziData) => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "八字分析结果",
      "description": `${baziData.gender || ''}的八字分析结果，包含四柱排盘和五行分析`,
      "author": {
        "@type": "Organization",
        "name": "生辰八字计算器"
      },
      "publisher": {
        "@type": "Organization",
        "name": "生辰八字计算器",
        "logo": {
          "@type": "ImageObject",
          "url": "https://younglina.top/eight/icon.svg"
        }
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://younglina.github.io/eight${route.fullPath}`
      },
      "about": {
        "@type": "Thing",
        "name": "生辰八字",
        "description": "中国传统命理学中的四柱八字分析"
      }
    };
    
    addStructuredData(structuredData);
  };

  // 监听路由变化
  watch(() => route.name, (newRouteName) => {
    if (newRouteName && seoConfig[newRouteName]) {
      updateSEO(newRouteName);
    }
  }, { immediate: true });

  // 单独的SEO设置函数
  const setTitle = (title) => {
    document.title = title;
    updateMetaProperty('og:title', title);
    updateMetaTag('twitter:title', title, 'name');
  };

  const setDescription = (description) => {
    updateMetaTag('description', description);
    updateMetaProperty('og:description', description);
    updateMetaTag('twitter:description', description, 'name');
  };

  const setKeywords = (keywords) => {
    updateMetaTag('keywords', keywords);
  };

  return {
    currentSEO,
    updateSEO,
    addStructuredData,
    addBaziResultStructuredData,
    setTitle,
    setDescription,
    setKeywords
  };
}

// 导出SEO配置供其他地方使用
export { seoConfig };