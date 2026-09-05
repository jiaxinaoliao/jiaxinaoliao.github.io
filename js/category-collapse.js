// ===== 分类折叠 - 按分类过滤文章 =====

function initCategoryCollapse() {
  console.log('初始化分类折叠...');
  
  setTimeout(function() {
    const titles = document.querySelectorAll('.category-list-link');
    console.log('找到分类标题数量：', titles.length);
    
    if (titles.length === 0) {
      console.warn('未找到分类元素');
      return;
    }
    
    // 获取所有文章项
    const allArticles = document.querySelectorAll('.article-sort-item');
    console.log('找到文章数量：', allArticles.length);
    
    if (allArticles.length === 0) {
      console.warn('未找到文章元素');
      return;
    }
    
    // 默认隐藏所有文章
    allArticles.forEach(article => {
      article.style.display = 'none';
    });
    
    titles.forEach(title => {
      title.removeEventListener('click', handleClick);
      title.addEventListener('click', handleClick);
    });
    
    console.log('✅ 分类折叠绑定完成');
  }, 500);
}

function handleClick(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const parent = this.closest('.category-list-item');
  if (!parent) return;
  
  // 获取当前分类名称
  const categoryName = this.textContent.trim();
  console.log('点击分类：', categoryName);
  
  // 获取所有文章
  const allArticles = document.querySelectorAll('.article-sort-item');
  
  // 检查当前分类是否已展开
  const isActive = parent.classList.contains('active');
  
  // 先隐藏所有文章
  allArticles.forEach(article => {
    article.style.display = 'none';
  });
  
  // 移除所有分类的 active 状态
  document.querySelectorAll('.category-list-item.active').forEach(item => {
    item.classList.remove('active');
  });
  
  if (!isActive) {
    // 展开当前分类
    parent.classList.add('active');
    
    // 显示该分类下的文章
    // 注意：这里需要匹配文章的分类信息
    // 由于文章列表没有分类标识，我们需要通过文章链接或其他方式匹配
    filterArticlesByCategory(categoryName);
  }
}

function filterArticlesByCategory(categoryName) {
  // 获取所有文章项
  const allArticles = document.querySelectorAll('.article-sort-item');
  
  // 遍历文章，检查是否属于该分类
  // 注意：文章本身可能没有直接显示分类信息
  // 我们需要从文章链接或标签中提取分类信息
  allArticles.forEach(article => {
    // 检查文章是否属于当前分类
    // 方法1：通过文章URL判断（如果URL包含分类名）
    const link = article.querySelector('a[href]');
    if (link) {
      const href = link.getAttribute('href');
      // 检查URL中是否包含分类名（需要根据实际情况调整）
      if (href && href.includes(categoryName)) {
        article.style.display = 'flex';
      }
    }
    
    // 方法2：通过文章标题前的分类标签判断（如果有）
    // 方法3：通过文章所在的DOM位置判断
  });
}

// 首次加载
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCategoryCollapse);
} else {
  initCategoryCollapse();
}

// Pjax 加载完成
document.addEventListener('pjax:complete', function() {
  console.log('Pjax加载完成，重新初始化分类折叠');
  initCategoryCollapse();
});