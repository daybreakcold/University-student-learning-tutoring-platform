# 大学生学习辅导平台 — 讲解大纲

> **用途**：给别人讲解这个项目时使用的教学大纲，包含讲解思路、演示步骤和互动问题。
> **建议时长**：约 60-90 分钟，可根据听众基础灵活调整。
> **配套文档**：详细知识点参考 `LEARNING_GUIDE.md`（1750 行完整版）。

---

## 讲解前准备

```bash
# 确保项目能正常运行
cd University-student-learning-tutoring-platform
npm install
npm run dev
# 浏览器打开 http://localhost:5173
```

**准备好以下标签页：**
1. 项目在 VS Code 中打开
2. 浏览器打开 localhost:5173
3. 浏览器开发者工具（F12）

---

## 第一部分：项目全局认识（10 分钟）

### 讲解思路

先让听众**看到成果**，再拆解内部结构。不要上来就讲代码。

### 演示步骤

1. **打开浏览器展示运行效果**
   - 点击不同导航链接，展示页面切换（注意地址栏变化，但页面不刷新）
   - 悬停导航链接，展示高亮切换效果
   - 缩小浏览器窗口，展示响应式适配
   - 打开系统暗色模式，展示主题自动切换

2. **抛出核心概念**

   > "大家注意到了吗？页面切换时地址栏变了，但是页面没有白屏闪烁、没有重新加载。
   > 这就是**单页应用（SPA）** 的核心特征。整个项目只有一个 HTML 文件。"

3. **展示项目结构**

   ```
   打开终端，执行 ls src/ 展示目录结构
   重点指出两个目录：
   - components/ → 可复用的组件（导航栏、布局）
   - pages/     → 与 URL 一一对应的页面
   ```

### 互动问题

> "猜一下，这个项目有多少个 HTML 文件？"
> 答案：只有 1 个（index.html），所有"页面"都是 JS 在同一个 HTML 内动态切换的组件。

---

## 第二部分：React 基础概念（20 分钟）

### 2.1 最简单的组件 — 函数返回 JSX

**打开文件：`src/pages/Home.jsx`**

```jsx
export default function Home() {
  return (
    <section>
      <h1>首页</h1>
      <p>大学生学习辅导平台 — 从这里进入课程、计划与问答等模块。</p>
    </section>
  )
}
```

**讲解要点：**

- React 组件 = 一个函数，返回 JSX（看起来像 HTML 的东西）
- 函数名**必须大写开头**（`Home` 不是 `home`），否则 React 以为是 HTML 标签
- `export default` 让别的文件可以 import 这个组件
- JSX 不是 HTML！差异举例：`class` → `className`，`for` → `htmlFor`

**实际操作演示：**

```
在 Home.jsx 中修改文字，保存 → 浏览器自动更新（不用刷新）
这就是 Vite 的 HMR（热模块替换）
```

### 2.2 useState — 组件的记忆

**打开文件：`src/components/Navbar.jsx`，聚焦第 21-22 行**

```jsx
const [hoveredTo, setHoveredTo] = useState(null)
const [query, setQuery] = useState('')
```

**讲解要点：**

> "普通的变量在函数重新执行时就没了。但 useState 创建的变量，React 会帮你'记住'。"

画一个简单图解：

```
useState(null)  →  返回  [当前值, 更新函数]
                          ↓         ↓
                      hoveredTo  setHoveredTo

调用 setHoveredTo('/courses')
  → React 记住新值 '/courses'
  → 重新调用 Navbar 函数
  → 这次 hoveredTo 的值变成了 '/courses'
  → 返回新的 JSX → 更新页面
```

**实际操作演示：**

```
打开浏览器开发者工具 → React DevTools（如果安装了）
悬停不同导航链接，观察 hoveredTo 状态的变化
在搜索框输入文字，观察 query 状态的变化
```

### 2.3 列表渲染 — .map() + key

**打开文件：`src/pages/Courses.jsx`**

```jsx
const demoIds = ['1', '2', '3']

{demoIds.map((id) => (
  <li key={id}>
    <Link to={`/courses/${id}`}>课程详情 #{id}</Link>
  </li>
))}
```

**讲解要点：**

- `.map()` 把数据数组变成 JSX 数组（一对多的转换）
- `key` 是 React 识别列表项身份的标志，**必须唯一且稳定**
- 模板字符串 `` `/courses/${id}` `` 动态拼接路径

**互动问题：**

> "如果我把 key={id} 去掉会怎样？"
> 答案：控制台会报 warning。更重要的是，当列表增删时 React 可能错误地复用 DOM 节点，导致 UI bug。

### 2.4 事件处理与条件渲染

**打开文件：`src/components/Navbar.jsx`，聚焦第 13-18 行和第 50-54 行**

```jsx
// 条件判断函数
function shouldShowActive(isRouteActive, hoveredTo, to) {
  if (!isRouteActive) return false
  if (hoveredTo == null) return true
  return hoveredTo === to
}

// 在 JSX 中用三元运算符
className={({ isActive }) =>
  shouldShowActive(isActive, hoveredTo, to)
    ? 'app-nav-link app-nav-link--active'
    : 'app-nav-link'
}
```

**讲解要点：**

> "这个函数解决了一个 UX 问题：用户在首页时，如果鼠标移到'课程'上，
> 我们希望只有'课程'高亮，首页的高亮暂时消失。"

用三个场景举例：
1. 在首页，不悬停 → 首页高亮 ✓
2. 在首页，悬停"课程" → 首页高亮消失，课程有 hover 样式 ✓
3. 鼠标移出导航栏 → 首页高亮恢复 ✓

---

## 第三部分：路由系统（15 分钟）

### 3.1 路由的整体架构

**打开文件：`src/App.jsx`**

**讲解要点：**

> "React Router 做了一件事：根据浏览器地址栏的 URL，决定显示哪个组件。"

在白板或屏幕上画：

```
URL: /courses/42

匹配过程：
  Routes 开始匹配
    → Route (Layout)  ← 没有 path，是布局壳子
      → Route path="/"         ❌ 不匹配
      → Route path="/courses"  ❌ 不精确匹配
      → Route path="/courses/:id" ✅ 匹配！ (id=42)

渲染结果：
  <Layout>
    <Navbar />          ← 始终渲染
    <main>
      <CourseDetail />  ← Outlet 位置渲染匹配的页面
    </main>
  </Layout>
```

### 3.2 嵌套路由 — 布局的秘密

**打开文件：`src/components/Layout.jsx`**

```jsx
export default function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Outlet />    ← 这里是关键！
      </main>
    </div>
  )
}
```

**讲解要点：**

> "`<Outlet />` 是一个'插槽'。React Router 根据当前 URL，
> 把匹配到的页面组件塞进这个插槽里。
> 导航栏在 Outlet 外面，所以页面怎么切换，导航栏都不会重新渲染。"

**实际操作演示：**

```
在浏览器中快速切换页面，打开开发者工具的 Elements 面板
观察：<header> 部分的 DOM 不变，只有 <main> 内部在变化
```

### 3.3 动态路由参数

**打开文件：`src/pages/CourseDetail.jsx`**

```jsx
const { id } = useParams()
```

**实际操作演示：**

```
在浏览器中访问 /courses/42，/courses/hello，/courses/任意值
观察页面都能正确显示不同的 id
```

**讲解要点：**

> "`:id` 是个占位符，能匹配任何值。`useParams()` 把它取出来。
> 未来接上后端后，就可以用这个 id 去请求对应课程的数据。"

### 3.4 NavLink vs Link

**互动问题：**

> "项目里有两种链接组件 NavLink 和 Link，猜一下区别是什么？"

答案：
- `NavLink` 知道当前页面是不是自己指向的页面（`isActive` 参数），用于导航栏高亮
- `Link` 是普通链接，只负责跳转，用于页面内的"返回"、"查看详情"等

---

## 第四部分：CSS 现代技巧（15 分钟）

### 4.1 CSS 变量 — 一处定义，处处使用

**打开文件：`src/index.css`，聚焦第 1-16 行**

**实际操作演示：**

```
在开发者工具中修改 :root 的 --accent 值
例如改成 #ff6600（橙色）
→ 所有使用 var(--accent) 的地方同时变色
```

> "改一个变量，整个站点的强调色就变了。这就是 CSS 变量的威力。"

### 4.2 暗色模式 — 变量覆盖

**打开文件：`src/index.css`，聚焦第 33-49 行**

**实际操作演示：**

```
开发者工具 → Rendering → 勾选 "prefers-color-scheme: dark"
→ 整个页面切换为暗色主题
```

**讲解要点：**

> "实现暗色模式不需要写两套样式。只需要在 `@media (prefers-color-scheme: dark)` 里
> 重新赋值 CSS 变量。所有用 `var(--xxx)` 的地方自动切换。零 JS 开销。"

### 4.3 Flexbox 三栏布局

**打开文件：`src/components/Layout.css`，聚焦第 37-67 行**

在白板上画：

```
┌─────────────────────────────────────────────────┐
│  app-header__inner (display: flex)               │
│                                                   │
│  ┌──────────┐ ┌──────────────┐ ┌──────────────┐ │
│  │   left    │ │    center    │ │     right    │ │
│  │ min:220px │ │   flex: 1    │ │  min:320px   │ │
│  │  品牌logo │ │  导航链接     │ │ 搜索+按钮    │ │
│  └──────────┘ └──────────────┘ └──────────────┘ │
│                                                   │
│  justify-content: space-between （两端对齐）       │
│  align-items: center （垂直居中）                  │
└─────────────────────────────────────────────────┘
```

### 4.4 响应式适配

**实际操作演示：**

```
边拖动浏览器窗口边讲解每个断点的变化：

> 1214px    : 完整布局（Logo + 文字 + 导航 + 搜索 + 按钮）
  ↓ 缩小
> 1213px    : 品牌文字消失，只剩 Logo 图标
  ↓ 缩小
> 980px     : Logo 区消失，导航和功能按钮占满一行
  ↓ 缩小
> 817px     : 三段式布局（导航 / 搜索 / 按钮各一行）
  ↓ 缩小
> 640px     : 全宽移动端布局
  ↓ 缩小
> 420px     : 语言切换按钮隐藏，搜索框缩窄
```

**讲解要点：**

> "注意每个断点的 `min-width` 和 `max-width` 都不重叠。
> 比如 `(max-width: 980px) and (min-width: 818px)`，
> 这样保证在任何宽度下只有一组样式生效，不会冲突。"

### 4.5 渐变背景 — 导航栏的视觉质感

**打开文件：`src/components/Layout.css`，聚焦第 20-31 行**

**讲解要点：**

> "导航栏的背景叠加了三层：
> 最底层是深蓝色 `#0b1b2a`，
> 中间是右上角的紫色光晕，
> 最上面是左上角的青色光晕。
> CSS 支持多背景叠加，用逗号分隔。"

---

## 第五部分：工程化工具链（10 分钟）

### 5.1 Vite 的作用

**讲解要点（用类比）：**

> "Vite 就像一个翻译官。浏览器不认识 JSX 语法（`<div>` 写在 JS 里），
> Vite 把它实时翻译成浏览器能懂的 JavaScript。
>
> 开发时：按需翻译，改一个文件就翻译一个，非常快。
> 发布时：把所有文件打包压缩成最小的 CSS + JS 文件。"

**实际操作演示：**

```bash
npm run build
ls dist/
# 展示产物：一个 HTML + 一个 CSS + 一个 JS
# JS 只有 75KB（gzip），包含了 React + Router + 所有页面代码
```

### 5.2 ESLint 的作用

**实际操作演示：**

```
故意在代码中引入一个错误：
  const unused = 'hello'  // 声明但不使用

运行 npm run lint → 报错提示未使用变量
修复后重新运行 → 通过
```

> "ESLint 是你的'代码审查助手'，自动发现常见错误和坏味道。"

### 5.3 package.json — 项目的身份证

**打开文件：`package.json`**

```
dependencies（生产依赖）：打包后代码中仍需要的
  - react：UI 框架
  - react-dom：让 React 操作浏览器 DOM
  - react-router-dom：路由

devDependencies（开发依赖）：只在开发时需要的
  - vite：构建工具
  - eslint：代码检查
  - @vitejs/plugin-react：让 Vite 理解 JSX
```

> "为什么区分？因为 `npm run build` 打包时只处理 dependencies，
> devDependencies 不会进入最终产物，可以减小体积。"

---

## 第六部分：无障碍与最佳实践（5 分钟，可选）

### 快速讲解项目中的无障碍实践

```jsx
// 1. aria-label — 给屏幕阅读器的描述
<nav aria-label="主导航">
// 屏幕阅读器会读："主导航，导航区域"

// 2. aria-hidden — 隐藏装饰性元素
<span className="app-brand__logo" aria-hidden="true" />
// 纯装饰的 logo 色块，对视障用户无意义

// 3. 语义化标签
<header>、<nav>、<main>、<section>
// 比全用 <div> 更有结构意义

// 4. focus-visible — 键盘用户可见的焦点样式
.app-nav-link:focus-visible { ... }
// Tab 键切换时显示焦点框，鼠标点击不显示
```

---

## 第七部分：总结与答疑（5-10 分钟）

### 知识点总结脑图

```
这个项目涉及的所有知识点
│
├── React
│   ├── JSX 语法（HTML in JS）
│   ├── 函数组件（返回 JSX 的函数）
│   ├── useState（组件状态）
│   ├── 事件处理（onClick, onChange, onMouseEnter）
│   ├── 条件渲染（三元运算符）
│   ├── 列表渲染（.map() + key）
│   └── 组件组合（Layout 包裹页面）
│
├── React Router
│   ├── BrowserRouter（路由容器）
│   ├── Routes + Route（路由匹配）
│   ├── 嵌套路由 + Outlet（布局模式）
│   ├── NavLink vs Link（导航 vs 普通链接）
│   ├── 动态路由 :id + useParams
│   └── 通配路由 *（404 页面）
│
├── CSS
│   ├── CSS 变量（主题系统）
│   ├── Flexbox（弹性布局）
│   ├── 响应式 @media（5 个断点）
│   ├── position: sticky（粘性定位）
│   ├── 渐变背景（radial-gradient）
│   ├── clamp()（响应式尺寸）
│   ├── transition（过渡动画）
│   └── BEM 命名（Block__Element--Modifier）
│
└── 工程化
    ├── Vite（构建工具 + 开发服务器 + HMR）
    ├── ESLint（代码检查）
    ├── npm（包管理）
    └── ES Modules（模块系统）
```

### 下一步学习建议

> "这个项目的骨架已经搭好了，接下来建议从这个顺序学：
> 1. **状态管理** — 让组件之间能共享数据（用户登录态等）
> 2. **数据获取** — 从后端 API 加载课程数据
> 3. **表单处理** — 实现登录/注册/提问功能
> 4. **TypeScript** — 给代码加上类型安全
>
> 详细的代码示例和学习资源在 LEARNING_GUIDE.md 第八章。"

---

## 附录：常见问题预备

**Q1: 为什么不直接写 HTML/CSS/JS，要用 React？**

> 当页面有大量交互和状态变化时，手动操作 DOM 非常繁琐且容易出错。
> React 让你只关心"数据是什么样的"，UI 自动保持同步。

**Q2: JSX 和 HTML 到底什么关系？**

> JSX 是 JavaScript 的语法扩展，**看起来像 HTML 但不是 HTML**。
> Vite 会把 JSX 编译成 `React.createElement()` 函数调用。
> 例如 `<h1>标题</h1>` 编译成 `React.createElement('h1', null, '标题')`。

**Q3: 什么是 SPA？为什么只有一个 HTML？**

> SPA = Single Page Application。浏览器只加载一次 HTML，
> 之后所有"页面切换"都是 JS 替换页面中的组件内容。
> 优点：切换快、体验流畅、导航栏等公共部分不重复加载。
> 缺点：首次加载稍慢（需要下载整个 JS 包）、SEO 需额外处理。

**Q4: React Router 和浏览器地址栏是怎么联动的？**

> 使用浏览器的 History API（`history.pushState`）。
> 点击 `<Link>` 时不会发起 HTTP 请求，而是用 JS 修改地址栏显示，
> 然后 React Router 匹配新 URL，渲染对应组件。

**Q5: CSS 变量和 Sass 变量有什么区别？**

> CSS 变量是**运行时**的，浏览器真正理解和执行。可以在 JS 中读写，可以在 @media 中重新赋值。
> Sass 变量是**编译时**的，编译后就变成了硬编码的值，无法动态变化。
> 本项目用 CSS 变量实现暗色模式，如果用 Sass 变量就做不到。

**Q6: 为什么不用 Webpack？Vite 有什么优势？**

> Webpack 需要先把所有文件打包成一个 bundle 再启动，项目越大越慢。
> Vite 利用浏览器原生的 ES Modules，按需编译，启动几乎是瞬间的。
> 改一行代码，Vite 只重新编译那一个文件，Webpack 要重新打包整个依赖链。
