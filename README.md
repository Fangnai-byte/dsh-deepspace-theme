# dsh-deepspace-theme

> 已发布到 GitHub：**https://github.com/Fangnai-byte/dsh-deepspace-theme**

给 **DeepSeek Harness Web GUI**（`dsh --profile web`）用的**深空玻璃拟态（彗星蓝 / 靛紫）**主题模板。

这是**适配当前 dsh（`0.1.2-rc.1`）**的写法：**只用官方 token 覆盖 + 稳定选择器，不含构建期哈希类名**，所以能稳定工作、不乱滚动、不坏侧边栏，也不会在 dsh 前端升级后突然失效。

---

## 一、为什么 kimino 装上去会坏（诊断）

你装的那个 `dsh-kimino-theme` 并非为当前 dsh 编写，坏在两点：

1. **它依赖一套叫 `skin-center` / `skin.json` / `SkinHooks` / `data-dsh-skin` 的"皮肤中心"**。当前 dsh 里根本搜不到这些标记——这套系统已不存在，所以主题的 `skin.json`、`hooks.mjs`、壁纸/Logo 的 URL 白名单机制全都用不上。

2. **它的 CSS 用了构建期哈希类名**（`patches.css` 和 `plugin/client.js` 里的 `.Md3f7G_scroll`、`.wSkVaW_root`、`.hHd-Xa_brand`、`.pXSMma_headline`、`.FJxK0a_root`、`.uV2eYG_*`）。这些类是"本次构建"的哈希，dsh 一升级就变。当前版本类名变了，于是：
   - **滚轮上下失灵**：它把 `overflow: hidden` + 滚动下沉到 `.Md3f7G_scroll` 的改写，在旧类名下有意义，新类名下匹配到错位/失效元素，聊天区滚动容器被掐死或不滚动。
   - **右侧导航栏用不了**：`.hHd-Xa_*` 侧边栏选择器失配，覆盖逻辑错位。

> 讽刺的是：kimino 的**配色**（`overrideTokens` 那部分）其实在当前 dsh 能生效，是有 `--dsw-*` token 撑着的；坏就坏在 `styles.insert()` 里那堆哈希类名布局改动。

**本模板的应对**：配色照样用 token，布局/样式只用 `data-*` 属性、`body`、`:root`、`[role=...]` 这类稳定选择器。绝不碰哈希类名。

---

## 二、目录结构

```
deepspace-theme/
├── package.json          # 插件声明：dsh.client/platform=web、bundle.patch、exports.client
├── cordis.patch.yml      # 把插件行插入 web profile 的客户端树
├── assets/
│   ├── wallpaper.jpg     # 主背景壁纸（host 路由 /deepspace-bg/wallpaper.jpg 提供）
│   └── brand.png         # 左上角品牌 Logo（slot 覆盖 sidebar.brand.mark，替换默认鲸鱼+deepseek）
├── plugin/
│   ├── client.js         # 浏览器端：overrideTokens 调色 + 稳定选择器 <style> + slot 品牌覆盖
│   └── host.js           # 服务端：提供壁纸/品牌图片路由
└── bundle/               # 打包产物（由 plugin/ 构建而来，安装时加载的是它）
    ├── client.js
    └── host.js
```

> **重要：安装时实际加载的是 `bundle/`**（`package.json` 的 `main` / `exports.client` 指向它）。`plugin/` 是源码。你需要把 `plugin/` 构建成 `bundle/` 后才能安装——构建方式与 kimino 仓库相同（客户端 bundle 需按 DSH 的 client 打包目标产出 `window.__ModuleLoader__.load(...)` 格式）。
> 开发调试时可先用 `plugin/` 源码 + 动态 runner；正式安装走 `bundle/`。

---

## 三、配色怎么改

所有颜色都来自 `--dsw-*` token。当前 dsh 有 **356 个 token**，可改的主要是这几类（见 `plugin/client.js` 里的 `overrideTokens` 调色，都是 `key → { light, dark }`）：

| 类别 | 前缀 | 例子 |
|---|---|---|
| 表面/基底 | `--dsw-alias-bg-*` | `bg-base` 透明露出壁纸；`bg-layer-1/2/3` 毛玻璃层 |
| 描边 | `--dsw-alias-border-*` | `border-l1/l2/l3` 低饱和蓝描边 |
| 文字 | `--dsw-alias-label-*` | `label-primary/secondary/tertiary/caption` |
| 按钮 | `--dsw-alias-button-*` | `button-info-fill/hover`、`button-primary-*` |
| 交互态 | `--dsw-alias-interactive-*` | `interactive-bg-hover/active` |
| 状态色 | `--dsw-alias-state-*` | `state-error/success/warn/business` |
| 代码/滚动条 | `--dsw-alias-markdown-*`、`--dsw-alias-scrollbar-*` | `markdown-code-block`、`scrollbar-bg-l2/hover-l2` |
| 组件专属 | `--dsw-specific-*` | `sidebar-fill`、`sidebar-nav-item-*`、`bubble`、`menu`、`input-major`、`tip` |
| 阴影 | `--dsw-shadow-*` | `shadow-lv2` |

改法：改 `plugin/client.js` 里 `overrideTokens` 对象的值即可。深空蓝紫的基准色：
- 主交互/强调色：`#93C5FD`（彗星蓝）
- 玻璃表面：`rgba(15,23,42,*)`（slate-900）
- 菜单/输入卡：`rgba(37,58,125,*)`（藏蓝）
- 弱化文字/统计栏：`#A5B4FC`（蓝紫）

---

## 四、安装 + 测试

```powershell
# 从 GitHub 安装（已发布）
dsh plugin --profile web add github:Fangnai-byte/dsh-deepspace-theme

# 或本地路径（开发用）
# dsh plugin --profile web add ./dsh-deepspace-theme
# dsh plugin --profile web add file:./dsh-deepspace-theme

# 停掉占用 3080 的旧实例，再重启加载
#   1) netstat -ano | findstr :3080     找 PID
#   2) taskkill /PID <PID> /F
dsh web
```

---

## 五、参考：安全地做布局微调（避免哈希类名）

如果你也想做"滚动重构 / 底部渐变蒙版 / 侧边栏 Logo"这类布局，**别照抄 kimino 的哈希类名**。用稳定选择器 + 通用事件处理，比如：

- **定位组件**：优先用 `data-*` 属性（如 `[data-composer-card]`、`[data-input-scroll]`、`[data-chat-flow]`）。这些是组件声明的稳定属性，不随构建改变。不确定时，在浏览器 DevTools 里看到组件根节点实际带 `data-*` 就用它。
- **滚动容器**：用 `closest('[data-...]')` 而非 `.某种哈希类` 去查找滚动器。改 `overflow` 前先找出真正的滚动节点（`scrollHeight > clientHeight` 的那个）。
- **侧边栏**：纯配色直接靠 `--dsw-specific-sidebar-*` token 就够了；要换 Logo 才需要碰侧边栏 DOM——此时对根节点挂 `data-*` 标记后按属性选择器写，别用哈希类。

> 关键原则：**凡是 `_xx` 之类带下划线后缀、形如 `.XxxYyy_*` 的类名都是构建期哈希，绝不可依赖。** 稳定的是 `data-*`、原生角色（`[role]`）、`body`、`:root`。

---

## 六、已知事项

- 主题是**客户端覆盖层**，会在设置「外观」之外直接生效（`overrideTokens` 叠加到活动快照）。当前 dsh 不会验证你的覆盖是否完整——没覆盖到的 token 沿用内置调色板。
- 换壁纸：直接替换 `assets/wallpaper.jpg`，或改 `host.js` 里 `path: '/deepspace-bg/wallpaper.jpg'` 对应的文件名，再同步改 `client.js` 的 `background-image: url(...)`。
- 安装后需**重启 dsh web**（停旧实例再 `dsh web`）才会加载新主题；因为安装用的是本地 `link:`，改完 `bundle/` 后重启即生效，无需重新 `dsh plugin add`。
