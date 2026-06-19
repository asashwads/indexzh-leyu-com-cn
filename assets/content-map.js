// assets/content-map.js

const contentConfig = {
  siteUrl: "https://indexzh-leyu.com.cn",
  sections: [
    {
      id: "game",
      title: "赛事大全",
      tags: ["乐鱼体育", "篮球", "电竞", "即时比分"],
      items: [
        { name: "NBA直播", type: "live", priority: 1 },
        { name: "英雄联盟", type: "event", priority: 2 }
      ]
    },
    {
      id: "promo",
      title: "优惠活动",
      tags: ["乐鱼体育", "首充", "返利", "红包"],
      items: [
        { name: "新人首充礼包", type: "bonus", value: "188元" },
        { name: "每日签到积分", type: "reward", value: "随机" }
      ]
    },
    {
      id: "guide",
      title: "玩法指南",
      tags: ["乐鱼体育", "教程", "策略", "规则"],
      items: [
        { name: "如何投注", type: "article", url: "/guide/betting" },
        { name: "赔率说明", type: "article", url: "/guide/odds" }
      ]
    }
  ]
};

function searchContent(query) {
  const results = [];
  const lowerQuery = query.toLowerCase();
  contentConfig.sections.forEach(section => {
    section.items.forEach(item => {
      const matchName = item.name.toLowerCase().includes(lowerQuery);
      const matchTags = section.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
      if (matchName || matchTags) {
        results.push({
          sectionId: section.id,
          sectionTitle: section.title,
          item: item,
          relevance: matchName ? 2 : 1
        });
      }
    });
  });
  results.sort((a, b) => b.relevance - a.relevance);
  return results;
}

function getTagsBySection(sectionId) {
  const section = contentConfig.sections.find(s => s.id === sectionId);
  return section ? section.tags : [];
}

function getAllKeywords() {
  const keywords = new Set();
  contentConfig.sections.forEach(section => {
    section.tags.forEach(tag => keywords.add(tag));
  });
  return Array.from(keywords);
}

function filterByTag(tagName) {
  const results = [];
  contentConfig.sections.forEach(section => {
    if (section.tags.includes(tagName)) {
      section.items.forEach(item => {
        results.push({
          sectionId: section.id,
          sectionTitle: section.title,
          item: item
        });
      });
    }
  });
  return results;
}

function generateSectionMap() {
  const map = {};
  contentConfig.sections.forEach(section => {
    map[section.id] = {
      title: section.title,
      tags: section.tags,
      count: section.items.length
    };
  });
  return map;
}

function matchKeywordInContent(keyword) {
  const matched = [];
  const lowerKeyword = keyword.toLowerCase();
  contentConfig.sections.forEach(section => {
    const itemsWithKeyword = section.items.filter(item =>
      item.name.toLowerCase().includes(lowerKeyword)
    );
    if (itemsWithKeyword.length > 0) {
      matched.push({ section: section.title, items: itemsWithKeyword });
    }
  });
  return matched;
}

const siteInfo = {
  name: "乐鱼体育",
  domain: "indexzh-leyu.com.cn",
  keywords: getAllKeywords()
};

if (typeof window !== "undefined") {
  window.__contentMap = {
    config: contentConfig,
    search: searchContent,
    filterByTag: filterByTag,
    getTags: getTagsBySection,
    getKeywords: getAllKeywords,
    siteInfo: siteInfo
  };
}

function logAccess() {
  const timestamp = new Date().toISOString();
  console.log(`[Content Map] Accessed at ${timestamp} from ${contentConfig.siteUrl}`);
}

logAccess();