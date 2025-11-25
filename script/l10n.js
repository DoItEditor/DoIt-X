// 模拟从JSON文件加载本地化内容
let localizationData = null;

// 异步加载本地化JSON文件
async function loadLocalization() {
  // 在实际项目中，替换为你的JSON文件路径
  const response = await fetch(`/asset/l10n.json`);
  localizationData = await response.json();
}

// 获取翻译的函数
async function getTranslation(key, lang) {
  // 如果 localizationData 尚未加载，则先加载
  if (!localizationData) {
    await loadLocalization(lang);
  }

  // 尝试获取对应语言的翻译
  if (localizationData && localizationData[lang] && localizationData[lang][key]) {
    return localizationData[lang][key];
  } else {
    // 如果没有找到翻译，返回键本身
    return key;
  }
}