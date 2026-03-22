/**
 * 使用说明页 — 从 README 提取的功能详解与使用流程
 * 支持中英文双语，通过 URL 参数 ?lang=en 切换
 */
(function () {
  var params = new URLSearchParams(window.location.search);
  var lang = params.get("lang") || "zh";

  // ── 双语 UI ──
  if (lang === "en") {
    document.getElementById("guide-title").textContent = "\ud83d\udcd6 User Guide";
    document.getElementById("guide-subtitle").textContent = "MWI Market Mate \u2014 Features & Workflows";
    document.getElementById("backText").textContent = "Back to Home";
    document.getElementById("communityText").textContent = "Community";
    document.title = "User Guide \u2014 MWI Market Mate";
    var communityLink = document.getElementById("communityLink");
    if (communityLink) communityLink.href = "../community/?lang=en";
  }

  // ── 内容 ──
  var content = lang === "en" ? buildEnglish() : buildChinese();
  document.getElementById("guideContent").innerHTML = content;

  function buildChinese() {
    return ''
    + '<h2>一、功能详解</h2>'

    + '<h3>1. 缺少材料自动计算</h3>'
    + '<p>打开游戏中任意技能的制作/行动详情后，插件会自动读取以下信息：</p>'
    + '<ul><li>当前设定的<b>行动次数</b></li><li>每种材料的<b>单次需求数量</b>（自动计算工匠茶减免）</li><li>你当前<b>背包中的库存数量</b>（通过 WebSocket 精确获取）</li></ul>'
    + '<p>根据上述数据，插件会自动计算每种材料的<b>总需求量</b>和<b>缺口数量</b>（总需 - 库存）。</p>'
    + '<p>插件会直接在制作弹窗的材料列表中注入<b>缺料提示徽章</b>：</p>'
    + '<ul><li>材料不足时显示红色「<b>缺 X</b>」</li><li>材料充足且有余量时显示蓝色「<b>余 X</b>」</li><li>材料刚好够用时显示绿色「<b>缺 0</b>」</li></ul>'

    + '<h3>2. 工匠茶 & 暴饮袋子自动计算</h3>'
    + '<p>插件会自动读取当前技能茶水栏中的工匠茶配置和暴饮袋子的强化等级，计算材料消耗减免。</p>'
    + '<ul><li><b>工匠茶</b>：对生产类技能减免 10% × 浓缩倍率</li><li><b>暴饮袋子</b>：根据强化等级计算浓缩倍率加成</li></ul>'

    + '<h3>3. "当前行动"界面支持</h3>'
    + '<p>在炼金、强化等场景下，玩家通常会停留在"当前行动"标签页挂机。该界面没有原生的行动次数输入框，插件会自动识别此状态，并在汇总面板中显示一个<b>"计划次数"</b>手动输入框。</p>'

    + '<h3>4. 弹窗内汇总面板</h3>'
    + '<p>在制作弹窗的行动按钮上方，插件会插入一个<b>汇总面板</b>，内容包括：当前缺料种类数与总缺少数量、数据来源指示和茶水 buff 百分比、当前配方已有制作计划时显示「已有计划」标签、以及<b>加入购物清单</b>按钮。</p>'

    + '<h3>5. 购物清单（浮动侧边栏）</h3>'
    + '<p>插件会在页面右侧注入一个<b>可拖拽的浮动按钮</b>，点击后展开购物清单抽屉：</p>'
    + '<ul><li><b>持久化存储</b>：清单数据保存在浏览器 localStorage 中，刷新页面后不会丢失</li><li><b>累加逻辑</b>：同一物品多次加入时，数量自动叠加</li><li><b>收藏保护</b>：收藏物品库存同步补齐后保留为"✓ 已补齐"状态</li><li><b>常备数量</b>：收藏物品可设置常备阈值，库存低于该值时自动回填</li><li><b>清空分级</b>：主按钮仅清非收藏，下拉菜单可清空全部</li><li><b>物品搜索</b>：支持按名称搜索</li><li><b>数量可编辑</b>：缺料数量支持手动修改</li><li><b>从背包添加</b>：点选背包中的物品直接添加到清单</li></ul>'

    + '<h3>6. 市场一键跳转</h3>'
    + '<p>购物清单中每个物品旁边都有一个「<b>直达市场</b>」按钮。点击后，插件调用游戏 React 组件树中的市场跳转方法，实现与游戏内原生跳转完全一致的效果。</p>'

    + '<h3>7. 市场弹窗预填数量</h3>'
    + '<p>打开市场购买弹窗时，插件会自动识别当前物品是否在购物清单中，若匹配则将缺料数量<b>自动填入数量输入框</b>。支持所有购买类弹窗。</p>'

    + '<h3>8. 采购导航条</h3>'
    + '<p>市场弹窗打开期间，插件会在弹窗正下方显示一条<b>采购导航条</b>，列出购物清单中所有待采购的物品。点击导航条中的物品可快速跳转到该物品的市场页面。全部购齐时显示完成提示。</p>'

    + '<h3>9. 市场高亮定位</h3>'
    + '<p>当市场面板打开时，购物清单中的物品会在市场界面内自动被标记为<b>橙色高亮边框</b>，帮助你快速定位需要采购的目标。</p>'

    + '<h3>10. 背包库存实时同步</h3>'
    + '<p>插件通过 WebSocket 拦截精确追踪库存变化：购买材料后自动扣减购物清单数量，补齐的物品自动移除（收藏物品保留），常备数量物品库存低于阈值时自动回填。</p>'

    + '<h3>11. 房屋建造面板支持</h3>'
    + '<p>打开房屋升级弹窗时，插件同样会自动计算升级所需的材料缺口，支持一键加入购物清单。</p>'

    + '<h3>12. 制作计划与库存锁定</h3>'
    + '<p>当制作物品 A 和 B 都需要材料 C 时，制作计划机制可以避免库存被重复计算：</p>'
    + '<ul><li>点击「加入购物清单」时自动创建制作计划，记录每种材料的锁定量</li><li>其他配方面板计算缺料时，先扣除已有计划的锁定量</li><li>制作计划面板可独立拖曳，支持进度追踪</li><li>通过 WS 监听制作完成事件，自动更新进度</li></ul>'

    + '<h3>13. 双语支持</h3>'
    + '<p>插件界面支持<b>中文</b>和<b>英语</b>两种语言，可在设置面板底部切换。物品名称根据当前语言自动解析。</p>'

    + '<h3>14. Z-score 安全边际</h3>'
    + '<p>基于二项分布的材料安全边际概率模型，可选 Z-90%/95%/99%/99.9% 四档置信度。缺料徽章显示为 <code>需求量⁺安全边际</code> 格式。</p>'

    + '<h3>15. 升级链展示</h3>'
    + '<p>当查看的配方属于升级链时，摘要面板自动显示完整的升级链树。每步列出所需非升级材料及其数量与缺口。支持展开/收起，「<b>加入全链材料</b>」按钮一键将全链所有步骤的叶子材料汇总加入购物清单。每个步骤前有<b>复选框</b>，可自由选择要加入哪些步骤的材料。</p>'

    + '<h3>16. 任务追踪面板</h3>'
    + '<p>购物清单头部新增任务追踪按钮，展开后显示当前活跃的生产类任务，包括进度条和剩余次数。提供「<b>补缺料</b>」和「<b>建计划</b>」快捷按钮。</p>'

    + '<h2>二、使用流程</h2>'

    + '<h3>场景一：制作页面补料</h3>'
    + '<ol><li>打开游戏，进入任意制作/技能页面，点击一个制作项目打开详情弹窗</li><li>插件自动计算缺料（含工匠茶减免），弹窗内出现<b>红色缺料标签</b>和<b>汇总面板</b></li><li>确认缺料信息后，点击汇总面板中的「<b>加入购物清单</b>」按钮</li><li>购物清单抽屉自动弹出，显示所有需要采购的物品及数量</li><li>点击某物品旁的「<b>直达市场</b>」按钮，游戏自动跳转到该物品的市场页面</li><li>市场购买弹窗打开后，数量框<b>自动填入缺料数量</b>，直接确认购买即可</li><li>购买完成后，购物清单自动核减数量，手动点击「<b>采购下一个 ▶</b>」跳转到下一个待购物品</li><li>重复步骤 6-7 直至全部采购完成</li></ol>'

    + '<h3>场景二：多配方共用材料</h3>'
    + '<ol><li>打开配方 A 的详情弹窗，点击「加入购物清单」</li><li>插件自动创建制作计划，锁定配方 A 所需的材料数量</li><li>打开配方 B 的详情弹窗，插件计算缺料时会扣除配方 A 已锁定的库存</li><li>配方 B 的缺口显示为正确的数值</li><li>在购物车头部点击剪贴板图标可查看所有制作计划及锁定详情</li></ol>'

    + '<h3>场景三：挂机途中补料</h3>'
    + '<ol><li>在"当前行动"标签页挂机时，插件自动识别该界面并显示<b>"计划次数"</b>输入框</li><li>输入你接下来计划制作的次数，插件实时计算缺料</li><li>点击「<b>加入购物清单</b>」，然后前往市场逐一采购</li><li>全程无需切换到制作页面，也无需中断当前行动</li></ol>';
  }

  function buildEnglish() {
    return ''
    + '<h2>II. Features</h2>'

    + '<h3>1. Automatic Material Shortage Calculation</h3>'
    + '<p>When you open any skill\'s crafting/action detail panel, the plugin reads:</p>'
    + '<ul><li>The current <b>action count</b></li><li>Each material\'s <b>per-action requirement</b> (with Artisan Tea reduction applied automatically)</li><li>Your current <b>inventory count</b> (precisely obtained via WebSocket)</li></ul>'
    + '<p>Based on this data, the plugin calculates each material\'s <b>total requirement</b> and <b>shortage</b> (total needed \u2212 inventory).</p>'
    + '<p>The plugin injects <b>shortage badges</b> directly into the crafting panel\'s material list:</p>'
    + '<ul><li>Insufficient materials show a red "<b>Need X</b>" badge</li><li>Surplus materials show a blue "<b>+X</b>" badge</li><li>Exactly sufficient materials show a green "<b>Need 0</b>" badge</li></ul>'

    + '<h3>2. Artisan Tea & Guzzling Pouch Auto-Calculation</h3>'
    + '<p>The plugin reads the current skill\'s drink slot configuration and Guzzling Pouch enhancement level to calculate material cost reductions.</p>'
    + '<ul><li><b>Artisan Tea</b>: 10% \u00d7 concentration multiplier reduction for production skills</li><li><b>Guzzling Pouch</b>: Concentration multiplier based on enhancement level</li></ul>'

    + '<h3>3. "Current Action" Tab Support</h3>'
    + '<p>In scenarios like Alchemy or Enhancement, players typically idle on the "Current Action" tab. The plugin detects this state and shows a <b>"Planned actions"</b> input field in the summary panel.</p>'

    + '<h3>4. In-Panel Summary</h3>'
    + '<p>Above the action button in the crafting panel, the plugin inserts a <b>summary panel</b> showing: shortage types and total missing quantity, data source indicator and tea buff percentage, "Has Plan" tag when applicable, and the <b>Add to Shopping List</b> button.</p>'

    + '<h3>5. Shopping List (Floating Sidebar)</h3>'
    + '<p>The plugin injects a <b>draggable floating button</b> on the right side of the page. Clicking it opens the shopping list drawer:</p>'
    + '<ul><li><b>Persistent storage</b>: Data saved in browser localStorage, survives page refresh</li><li><b>Stacking logic</b>: Adding the same item increases quantity instead of creating duplicates</li><li><b>Star protection</b>: Starred items are kept as "\u2713 Fulfilled" after being fully stocked</li><li><b>Reserve quantity</b>: Starred items can have a reserve threshold</li><li><b>Tiered clearing</b>: Main button clears non-starred only; dropdown can clear everything</li><li><b>Item search</b>: Search within the list by name</li><li><b>Editable quantities</b>: Shortage amounts can be manually adjusted</li><li><b>Pick from inventory</b>: Click items in your inventory to add them directly</li></ul>'

    + '<h3>6. One-Click Market Navigation</h3>'
    + '<p>Each item in the shopping list has a "<b>Go to Market</b>" button. When clicked, the plugin calls the market navigation method in the game\'s React component tree with the item\'s HRID.</p>'

    + '<h3>7. Market Dialog Quantity Pre-fill</h3>'
    + '<p>When opening a market buy dialog, the plugin checks if the item is in your shopping list and, if so, <b>auto-fills the shortage quantity</b> into the input field. Works with all buy dialog types.</p>'

    + '<h3>8. Purchase Navigation Bar</h3>'
    + '<p>While a market dialog is open, the plugin shows a <b>navigation bar</b> below it, listing all items awaiting purchase. Click any item to jump to its market page. All navigation requires a manual player click.</p>'

    + '<h3>9. Market Highlight & Locate</h3>'
    + '<p>When the market panel is open, items from your shopping list are automatically marked with an <b>orange highlight border</b>.</p>'

    + '<h3>10. Real-Time Inventory Sync</h3>'
    + '<p>The plugin tracks inventory changes via WebSocket interception: automatically deducts purchased materials, auto-removes fulfilled items, and auto-refills reserve quantity items when stock drops below threshold.</p>'

    + '<h3>11. House Building Panel Support</h3>'
    + '<p>When opening a house upgrade dialog, the plugin calculates material shortages and supports Add to Shopping List.</p>'

    + '<h3>12. Crafting Plans & Inventory Locking</h3>'
    + '<p>When items A and B both require material C, crafting plans prevent double-counting:</p>'
    + '<ul><li>Clicking "Add to Shopping List" auto-creates a crafting plan with locked quantities</li><li>Other recipe panels deduct locked quantities before calculating shortages</li><li>Plans panel supports independent dragging and progress tracking</li><li>WS events track crafting progress; plans auto-complete on finish</li></ul>'

    + '<h3>13. Bilingual Support</h3>'
    + '<p>The plugin supports both <b>Chinese</b> and <b>English</b>, switchable via settings. Item names resolve from the game\'s i18n resources based on current language.</p>'

    + '<h3>14. Z-score Safety Margin</h3>'
    + '<p>Binomial distribution-based material safety margin model with four confidence levels: Z-90%/95%/99%/99.9%. Shortage badges display as <code>requirement\u207a margin</code> format.</p>'

    + '<h3>15. Upgrade Chain Display</h3>'
    + '<p>When viewing a recipe in an upgrade chain, the summary panel shows the full chain tree. Each step lists required materials and shortages. "<b>Add Full Chain Materials</b>" button adds all leaf materials to the shopping list. Each step has a <b>checkbox</b> for selective inclusion.</p>'

    + '<h3>16. Quest Tracking Panel</h3>'
    + '<p>A quest tracking button reveals active production quests with progress bars and remaining counts. Provides "<b>Add Missing</b>" and "<b>Create Plan</b>" shortcut buttons.</p>'

    + '<h2>III. Workflows</h2>'

    + '<h3>Scenario 1: Restocking for Crafting</h3>'
    + '<ol><li>Open any crafting/skill page and click a recipe to open its detail panel</li><li>The plugin auto-calculates shortages; <b>red shortage badges</b> and a <b>summary panel</b> appear</li><li>Click "<b>Add to Shopping List</b>"</li><li>The shopping list drawer opens, showing all items to buy</li><li>Click "<b>Go to Market</b>" next to any item</li><li>The market buy dialog opens with quantity <b>pre-filled</b> \u2014 just confirm</li><li>After buying, the list auto-deducts; click "<b>Next item \u25b6</b>" to proceed</li><li>Repeat until everything is purchased</li></ol>'

    + '<h3>Scenario 2: Multiple Recipes Sharing Materials</h3>'
    + '<ol><li>Open Recipe A\'s detail panel and click "Add to Shopping List"</li><li>The plugin creates a crafting plan, locking Recipe A\'s material quantities</li><li>Open Recipe B \u2014 the plugin deducts A\'s locked inventory when calculating B\'s shortages</li><li>Recipe B\'s shortage shows the correct amount</li><li>Click the clipboard icon to view all crafting plans</li></ol>'

    + '<h3>Scenario 3: Restocking While Idling</h3>'
    + '<ol><li>While on the "Current Action" tab, the plugin shows a <b>"Planned actions"</b> input</li><li>Enter how many actions you plan to perform \u2014 shortages are calculated in real-time</li><li>Click "<b>Add to Shopping List</b>", then head to the market</li><li>No need to switch to the crafting page or interrupt your current action</li></ol>';
  }
})();
