# 大学生学习辅导平台 — 项目学习指南

> 本文档基于项目实际代码，逐行讲解涉及的所有前端知识点。  
> 适合有基础 HTML/CSS/JS 知识、正在学习 React 的开发者阅读。

---

## 目录

- [第一章：项目整体架构](#第一章项目整体架构)
- [第二章：React 核心概念](#第二章react-核心概念)
- [第三章：React Router 路由系统](#第三章react-router-路由系统)
- [第四章：CSS 现代技巧](#第四章css-现代技巧)
- [第五章：工程化工具链](#第五章工程化工具链)
- [第六章：无障碍 (Accessibility) 基础](#第六章无障碍-accessibility-基础)
- [第七章：设计模式与最佳实践](#第七章设计模式与最佳实践)
- [第八章：下一步学习路线](#第八章下一步学习路线)

---

## 第一章：项目整体架构

### 1.1 技术栈概览

本项目使用以下技术：

| 技术 | 版本 | 作用 |
|------|------|------|
| **Vite** | 8.0.4 | 构建工具，提供开发服务器和生产打包 |
| **React** | 19.2.4 | UI 框架，用组件化方式构建界面 |
| **React Router** | 7.14.0 | 客户端路由，实现页面间无刷新跳转 |
| **ESLint** | 9.39.4 | 代码检查工具，自动发现语法和风格问题 |

### 1.2 项目目录结构

```
university-student-learning-platform/
├── index.html                 ← 唯一的 HTML 文件（单页应用入口）
├── package.json               ← 项目配置：依赖、脚本命令
├── vite.config.js             ← Vite 构建配置
├── eslint.config.js           ← ESLint 代码检查规则
├── public/                    ← 静态资源（不经过构建处理）
│   ├── favicon.svg
│   └── icons.svg
└── src/                       ← 源代码（所有开发工作在这里）
    ├── main.jsx               ← JavaScript 入口文件
    ├── App.jsx                ← 根组件（路由定义）
    ├── index.css              ← 全局样式 + CSS 变量
    ├── components/            ← 可复用组件
    │   ├── Layout.jsx         ← 页面布局壳子
    │   ├── Layout.css         ← 布局样式
    │   └── Navbar.jsx         ← 导航栏组件
    └── pages/                 ← 路由页面组件
        ├── Home.jsx           ← 首页
        ├── Courses.jsx        ← 课程列表
        ├── CourseDetail.jsx   ← 课程详情
        ├── Plan.jsx           ← 学习计划
        ├── Progress.jsx       ← 学习进度
        ├── QA.jsx             ← 提问
        ├── Profile.jsx        ← 个人中心
        └── NotFound.jsx       ← 404 页面
```

**为什么这样组织？**

- `components/` — 放可以在**多个页面复用**的组件（如导航栏、布局）
- `pages/` — 放**与路由一一对应**的页面组件（每个文件对应一个 URL）
- 这种分离让代码职责清晰：找页面去 `pages/`，找可复用 UI 去 `components/`

### 1.3 文件间的数据流

```
index.html
  └── 加载 src/main.jsx
        ├── 导入 index.css（全局样式）
        ├── 创建 <BrowserRouter>（路由容器）
        └── 渲染 <App />
              └── <Routes>（路由匹配器）
                    └── <Layout>（布局壳子）
                          ├── <Navbar />（导航栏）
                          └── <Outlet />（根据 URL 渲染对应页面）
                                ├── "/" → <Home />
                                ├── "/courses" → <Courses />
                                ├── "/courses/123" → <CourseDetail />
                                ├── "/plan" → <Plan />
                                ├── "/progress" → <Progress />
                                ├── "/qa" → <QA />
                                ├── "/profile" → <Profile />
                                └── "*" → <NotFound />
```

### 1.4 执行 `npm run dev` 时发生了什么？

1. npm 执行 `vite` 命令（定义在 `package.json` 的 `scripts.dev`）
2. Vite 启动开发服务器（默认 `http://localhost:5173`）
3. 浏览器请求 `index.html`
4. HTML 中的 `<script type="module" src="/src/main.jsx">` 触发 Vite 按需编译
5. Vite 将 JSX 实时转换为浏览器能理解的 JavaScript
6. React 在 `<div id="root">` 中挂载整个应用
7. 修改代码时，Vite 通过 **HMR（热模块替换）** 实时更新，无需刷新页面

> **关键理解**：整个应用只有 **一个 HTML 文件**。所有"页面切换"都是 JavaScript 在同一个页面内替换组件内容，这就是 **SPA（单页应用）** 的核心思想。

---

## 第二章：React 核心概念

### 2.1 JSX 语法

JSX 是 JavaScript 的语法扩展，让你可以在 JS 中写类似 HTML 的代码。

**项目示例 — `src/pages/Home.jsx`：**

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

**逐行解析：**

| 行 | 代码 | 说明 |
|:--:|------|------|
| 1 | `export default function Home()` | 定义并导出一个名为 Home 的函数组件 |
| 2 | `return (` | 返回 JSX（括号允许多行书写） |
| 3 | `<section>` | HTML 语义标签，表示一个独立的内容区域 |
| 4 | `<h1>首页</h1>` | 一级标题 |
| 5 | `<p>大学生学习辅导平台...</p>` | 段落文本 |
| 6 | `</section>` | 关闭标签 |
| 7 | `)` | return 结束 |

**JSX vs HTML 的关键区别：**

| HTML | JSX | 原因 |
|------|-----|------|
| `class="app"` | `className="app"` | `class` 是 JS 保留字 |
| `for="input"` | `htmlFor="input"` | `for` 是 JS 保留字 |
| `<br>` | `<br />` | JSX 要求所有标签必须闭合 |
| `style="color:red"` | `style={{color:'red'}}` | JSX 中 style 接收对象 |
| `onclick="fn()"` | `onClick={fn}` | 驼峰命名 + 花括号传函数引用 |

**在 JSX 中嵌入 JavaScript 表达式 — 使用 `{}`：**

```jsx
// src/pages/CourseDetail.jsx
<p>
  当前课程 ID：<code>{id}</code>
</p>
```

花括号 `{}` 内可以放任何 JavaScript 表达式：变量、函数调用、三元运算、数组方法等。

> **常见错误**：JSX 中不能写 `if/else` 语句（因为它不是表达式），要用三元运算 `? :` 或 `&&` 短路运算代替。

### 2.2 函数组件

React 组件就是一个**返回 JSX 的函数**。函数名必须**大写字母开头**。

**最简组件 — `src/pages/Plan.jsx`：**

```jsx
export default function Plan() {
  return (
    <section>
      <h1>学习计划</h1>
      <p>后续用 useState + LocalStorage 管理任务列表。</p>
    </section>
  )
}
```

这是项目中最简单的组件形态 —— 无状态、无交互，只负责展示固定内容。类似的还有 `Progress.jsx`、`QA.jsx`、`Profile.jsx`。

**组件的核心规则：**
1. 组件名**必须大写**（`Home` 不是 `home`），否则 React 会当成 HTML 标签
2. 必须返回**单个根元素**（可以用 `<>...</>` 即 Fragment 包裹多个元素）
3. 组件是**纯函数**：相同的输入（props）应该产生相同的输出（JSX）

### 2.3 Props（属性）

Props 是组件之间传递数据的方式，类似函数参数。

虽然当前项目页面组件没有显式使用 props，但 React Router 的 `NavLink` 组件大量使用了 props：

```jsx
// src/components/Navbar.jsx
<NavLink
  key={to}                    // key prop（列表渲染必需）
  to={to}                     // 传递目标路径
  className={({ isActive }) => // 传递函数作为 prop
    shouldShowActive(isActive, hoveredTo, to)
      ? 'app-nav-link app-nav-link--active'
      : 'app-nav-link'
  }
  end={to === '/'}            // 布尔值 prop
  onMouseEnter={() => setHoveredTo(to)}  // 事件处理函数 prop
>
  {label}                     {/* children prop（标签之间的内容） */}
</NavLink>
```

**Props 的核心规则：**
1. Props 是**只读的** —— 组件不能修改接收到的 props
2. 数据流是**单向的** —— 只能从父组件流向子组件
3. 任何 JS 值都可以作为 prop：字符串、数字、布尔值、对象、数组、函数、JSX

### 2.4 useState Hook

`useState` 是 React 中最基础的 Hook，用于在组件中添加**可变状态**。

**项目示例 — `src/components/Navbar.jsx`：**

```jsx
import { useState } from 'react'

export default function Navbar() {
  const [hoveredTo, setHoveredTo] = useState(null)
  const [query, setQuery] = useState('')
  // ...
}
```

**逐行解析：**

```
const [hoveredTo, setHoveredTo] = useState(null)
 │      │            │                      │
 │      │            │                      └── 初始值：null（无悬停）
 │      │            └── 更新函数：调用它来改变 hoveredTo 的值
 │      └── 当前状态值：当前鼠标悬停在哪个导航链接上
 └── 数组解构赋值
```

**两个状态的用途：**

| 状态 | 初始值 | 用途 |
|------|--------|------|
| `hoveredTo` | `null` | 记录鼠标当前悬停的导航链接路径（如 `'/courses'`） |
| `query` | `''` | 记录搜索框的输入内容 |

**状态更新触发重新渲染：**

```jsx
// 鼠标悬停到某个链接时
onMouseEnter={() => setHoveredTo(to)}
// → React 用新的 hoveredTo 值重新调用 Navbar 函数
// → 返回新的 JSX → 更新 DOM

// 搜索框输入时
onChange={(e) => setQuery(e.target.value)}
// → React 用新的 query 值重新调用 Navbar 函数
// → input 显示最新输入内容
```

**useState 的规则：**
1. 只能在**组件函数顶层**调用，不能在 if/for/回调中调用
2. 调用 `setXxx` 后，**当前这次渲染**中变量值不变，要等**下次渲染**才更新
3. 如果新值与旧值相同（Object.is 比较），React 会跳过重新渲染

> **延伸阅读**：[React 官方文档 - useState](https://react.dev/reference/react/useState)

### 2.5 事件处理

React 的事件处理与 HTML 类似，但使用**驼峰命名**，并传递**函数引用**而非字符串。

**项目中的事件处理 — `src/components/Navbar.jsx`：**

```jsx
<header
  className="app-header"
  onMouseLeave={() => setHoveredTo(null)}   // 鼠标离开整个 header
>
```

```jsx
<NavLink
  onMouseEnter={() => setHoveredTo('/')}    // 鼠标进入品牌 logo
>
```

```jsx
<input
  className="app-search__input"
  value={query}
  onChange={(e) => setQuery(e.target.value)} // 输入框内容变化
  placeholder="搜索课程/问题"
/>
```

**事件流程图解：**

```
用户鼠标移到 "课程" 链接
  ↓
触发 onMouseEnter
  ↓
执行 () => setHoveredTo('/courses')
  ↓
React 检测到状态变化（null → '/courses'）
  ↓
重新渲染 Navbar 组件
  ↓
shouldShowActive 重新计算各链接的 className
  ↓
"课程" 链接获得 'app-nav-link--active' 类名
  ↓
CSS 更新视觉样式（高亮效果）
```

**常见事件类型：**

| 事件 | 触发时机 | 项目中的用法 |
|------|----------|-------------|
| `onClick` | 鼠标点击 | 暂未使用（按钮待实现） |
| `onChange` | 表单值变化 | 搜索框输入 |
| `onMouseEnter` | 鼠标进入元素 | 导航链接悬停 |
| `onMouseLeave` | 鼠标离开元素 | 导航栏鼠标移出 |
| `onSubmit` | 表单提交 | 暂未使用（搜索待实现） |

> **注意**：`onChange` 在 React 中是**每次输入都触发**（不同于原生 HTML 的 change 事件只在失焦时触发）。

### 2.6 条件渲染

根据条件决定渲染不同的内容。

**项目示例 — `src/components/Navbar.jsx` 的 `shouldShowActive` 函数：**

```jsx
function shouldShowActive(isRouteActive, hoveredTo, to) {
  if (!isRouteActive) return false     // 如果当前路由不匹配，肯定不高亮
  if (hoveredTo == null) return true    // 如果没有任何悬停，显示当前路由高亮
  return hoveredTo === to              // 否则只有被悬停的链接才高亮
}
```

这个函数的返回值用于决定 CSS 类名：

```jsx
className={({ isActive }) =>
  shouldShowActive(isActive, hoveredTo, to)
    ? 'app-nav-link app-nav-link--active'    // 高亮态
    : 'app-nav-link'                          // 普通态
}
```

**这里用的是三元运算符 `? :` 进行条件渲染。** 完整逻辑是：

```
场景 1：用户在首页，鼠标没有悬停任何链接
→ "首页" 链接：isActive=true, hoveredTo=null → shouldShowActive 返回 true → 高亮

场景 2：用户在首页，鼠标悬停到"课程"
→ "首页" 链接：isActive=true, hoveredTo='/courses', to='/' → false → 不高亮
→ "课程" 链接：isActive=false → false → 不高亮（但 CSS :hover 伪类会生效）

场景 3：用户在课程页，鼠标没有悬停
→ "课程" 链接：isActive=true, hoveredTo=null → true → 高亮
```

**React 中常见的条件渲染方式：**

```jsx
// 1. 三元运算符（本项目使用）
{isActive ? <ActiveIcon /> : <InactiveIcon />}

// 2. && 短路运算（当不需要 else 时）
{error && <ErrorMessage />}

// 3. 提前 return（在组件顶部判断）
if (loading) return <Spinner />
```

### 2.7 列表渲染与 Key

使用 `Array.map()` 将数据数组转换为 JSX 元素列表。

**项目示例 1 — 导航链接 `src/components/Navbar.jsx`：**

```jsx
const links = [
  { to: '/', label: '首页' },
  { to: '/courses', label: '课程' },
  { to: '/plan', label: '学习计划' },
  { to: '/progress', label: '学习进度' },
  { to: '/qa', label: '提问' },
  { to: '/profile', label: '个人中心' },
]

// 在 JSX 中使用：
{links.map(({ to, label }) => (
  <NavLink key={to} to={to} /* ...其他 props */>
    {label}
  </NavLink>
))}
```

**逐步解析：**
1. `links` 是一个对象数组，每个对象有 `to`（路径）和 `label`（显示文字）
2. `.map()` 遍历每个对象，返回一个 `<NavLink>` 元素
3. `({ to, label })` 是**解构参数**，等同于 `(item) => { const to = item.to; ... }`
4. `key={to}` 给每个元素一个唯一标识

**项目示例 2 — 课程列表 `src/pages/Courses.jsx`：**

```jsx
const demoIds = ['1', '2', '3']

{demoIds.map((id) => (
  <li key={id}>
    <Link to={`/courses/${id}`}>课程详情 #{id}</Link>
  </li>
))}
```

这里使用**模板字符串** `` `/courses/${id}` `` 动态拼接路径。

**为什么需要 key？**

Key 帮助 React 识别列表中哪些元素发生了变化：

```
没有 key：
  旧列表：[A, B, C]
  新列表：[A, X, B, C]
  → React 看不出 X 是新插入的，只知道 B 变成了 X，C 变成了 B，然后多了个 C
  → 需要更新 3 个 DOM 节点

有 key：
  旧列表：[A(key=1), B(key=2), C(key=3)]
  新列表：[A(key=1), X(key=4), B(key=2), C(key=3)]
  → React 通过 key 知道只需要在 A 后面插入一个新节点 X
  → 只需要插入 1 个 DOM 节点
```

**Key 的规则：**
1. Key 必须在兄弟元素间**唯一**
2. Key 应该**稳定**（不要用数组索引 `index` 作为 key，除非列表永远不会重排）
3. Key 不会作为 prop 传递给组件

### 2.8 组件组合（Composition）

组合是 React 中构建 UI 的核心模式——将小组件组装成大组件。

**项目示例 — `src/components/Layout.jsx`：**

```jsx
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import './Layout.css'

export default function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
```

**组合关系图：**

```
<Layout>
  ├── <Navbar />         ← 固定的导航栏（所有页面共享）
  └── <main>
        └── <Outlet />   ← 动态的内容区（根据 URL 切换不同页面）
```

这就是**布局组件模式**：把所有页面共享的 UI（导航栏、侧边栏、页脚）放在 Layout 中，只有内容区域跟随路由变化。

> **延伸阅读**：[React 官方文档 - 组合 vs 继承](https://react.dev/learn/thinking-in-react)


---

## 第三章：React Router 路由系统

### 3.1 什么是 SPA 和客户端路由？

**传统多页应用（MPA）：**
```
用户点击 "课程" 链接
  → 浏览器向服务器请求 /courses.html
  → 服务器返回新的完整 HTML
  → 浏览器丢弃当前页面，重新加载、解析、渲染
  → 页面出现白屏闪烁
```

**单页应用（SPA）：**
```
用户点击 "课程" 链接
  → JavaScript 拦截点击事件（阻止默认行为）
  → 使用 History API 更新浏览器地址栏为 /courses
  → React Router 匹配到 /courses 路由
  → 只替换页面中 <Outlet /> 部分的内容
  → 导航栏、布局不变，无白屏闪烁，瞬间切换
```

### 3.2 BrowserRouter 设置

**文件：`src/main.jsx`**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

**逐行解析：**

| 行 | 代码 | 说明 |
|:--:|------|------|
| 1 | `import { StrictMode }` | React 开发模式检查器，帮助发现潜在问题 |
| 2 | `import { createRoot }` | React 18+ 的新渲染 API |
| 3 | `import { BrowserRouter }` | 路由容器，使用浏览器 History API |
| 4 | `import './index.css'` | 导入全局样式（副作用导入） |
| 5 | `import App from './App.jsx'` | 导入根组件 |
| 7 | `createRoot(document.getElementById('root'))` | 找到 HTML 中的 `<div id="root">` 作为挂载点 |
| 8 | `.render(...)` | 将 React 组件树渲染到 DOM |
| 9 | `<StrictMode>` | 开发时双重渲染，帮助发现副作用 bug |
| 10 | `<BrowserRouter>` | 使 App 内所有组件都能使用路由功能 |

**为什么 `BrowserRouter` 要放在最外层？**

React Router 使用 **Context（上下文）** 将路由信息传递给所有子组件。`BrowserRouter` 就是那个 Context Provider。放在 `main.jsx` 最外层确保所有组件都能访问路由。

### 3.3 Routes 和 Route 配置

**文件：`src/App.jsx`**

```jsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Courses from './pages/Courses.jsx'
import CourseDetail from './pages/CourseDetail.jsx'
import Plan from './pages/Plan.jsx'
import Progress from './pages/Progress.jsx'
import QA from './pages/QA.jsx'
import Profile from './pages/Profile.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/qa" element={<QA />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
```

**路由匹配规则：**

| URL | 匹配的 Route | 渲染的组件 |
|-----|-------------|-----------|
| `/` | `path="/"` | `<Home />` |
| `/courses` | `path="/courses"` | `<Courses />` |
| `/courses/42` | `path="/courses/:id"` | `<CourseDetail />` (id=42) |
| `/courses/abc` | `path="/courses/:id"` | `<CourseDetail />` (id=abc) |
| `/plan` | `path="/plan"` | `<Plan />` |
| `/xyz` | `path="*"` | `<NotFound />` |

### 3.4 嵌套路由与 Layout 模式

这是本项目路由架构中**最重要的设计模式**。

```jsx
<Routes>
  <Route element={<Layout />}>        {/* 父路由 —— 没有 path！ */}
    <Route path="/" element={<Home />} />   {/* 子路由 */}
    <Route path="/courses" ... />
    ...
  </Route>
</Routes>
```

**注意**：父 `<Route>` **没有 `path` 属性**，只有 `element={<Layout />}`。

这意味着：所有子路由都会先渲染 `<Layout />`，然后 Layout 内的 `<Outlet />` 渲染匹配到的子路由组件。

```
URL: /courses

渲染结果：
<Layout>
  <Navbar />          ← 始终显示
  <main>
    <Outlet />        ← 被替换为 <Courses />
  </main>
</Layout>

URL: /plan

渲染结果：
<Layout>
  <Navbar />          ← 始终显示（不变）
  <main>
    <Outlet />        ← 被替换为 <Plan />
  </main>
</Layout>
```

**好处**：导航栏只渲染一次，不会因为路由切换而重新挂载。

### 3.5 NavLink vs Link

项目中使用了两种导航组件：

**`NavLink` — 带有活跃状态的导航链接（用于 Navbar）：**

```jsx
// src/components/Navbar.jsx
<NavLink
  to="/courses"
  className={({ isActive }) =>    // ← NavLink 独有的功能！
    isActive ? 'active-class' : 'normal-class'
  }
>
  课程
</NavLink>
```

`NavLink` 会自动检测当前 URL 是否匹配它的 `to`，并通过 `isActive` 参数告诉你。

**`Link` — 普通导航链接（用于页面内容）：**

```jsx
// src/pages/Courses.jsx
<Link to={`/courses/${id}`}>课程详情 #{id}</Link>

// src/pages/NotFound.jsx
<Link to="/">回到首页</Link>

// src/pages/CourseDetail.jsx
<Link to="/courses">← 返回课程列表</Link>
```

`Link` 功能更简单，只负责跳转，没有活跃状态检测。

**选择指南：**
- 导航栏/侧边栏中需要**高亮当前页**的链接 → 用 `NavLink`
- 页面内容中的**普通跳转链接** → 用 `Link`

### 3.6 动态路由参数

**路由定义 — `src/App.jsx`：**

```jsx
<Route path="/courses/:id" element={<CourseDetail />} />
//                    ^^^
//                    冒号开头 = 动态参数
```

`:id` 是一个**占位符**，可以匹配任何值：
- `/courses/1` → id = "1"
- `/courses/react-basics` → id = "react-basics"
- `/courses/42` → id = "42"

**使用参数 — `src/pages/CourseDetail.jsx`：**

```jsx
import { Link, useParams } from 'react-router-dom'

export default function CourseDetail() {
  const { id } = useParams()    // 从 URL 中提取 :id 的值

  return (
    <section>
      <p className="page-back">
        <Link to="/courses">← 返回课程列表</Link>
      </p>
      <h1>课程详情</h1>
      <p>
        当前课程 ID：<code>{id}</code>
      </p>
      <p>此处后续展示章节、简介等。</p>
    </section>
  )
}
```

`useParams()` 返回一个对象，包含 URL 中所有动态参数。使用**解构** `{ id }` 取出 `id` 值。

**实际应用场景：**
```
后续可以用 id 去请求后端 API：

useEffect(() => {
  fetch(`/api/courses/${id}`)
    .then(res => res.json())
    .then(data => setCourse(data))
}, [id])
```

### 3.7 通配路由（Catch-all）

```jsx
<Route path="*" element={<NotFound />} />
```

`path="*"` 匹配所有未被前面路由捕获的 URL。

**必须放在最后**，因为 React Router 会选择最精确的匹配。`*` 是最不精确的，只有没有其他路由匹配时才会使用。

### 3.8 `end` 属性

```jsx
<NavLink to="/" end>首页</NavLink>
//                ^^^
```

**问题**：没有 `end` 时，`to="/"` 会匹配所有以 `/` 开头的路径（即所有路径），导致首页链接在任何页面都显示高亮。

**解决**：添加 `end` 属性表示"必须**完全匹配**"，只有 URL 恰好是 `/` 时才激活。

项目中的使用：

```jsx
// Navbar.jsx 中
end={to === '/'}    // 只有首页链接需要 end 属性
```

> **延伸阅读**：[React Router 官方文档](https://reactrouter.com/)


---

## 第四章：CSS 现代技巧

### 4.1 CSS 自定义属性（变量）

CSS 变量让你在一个地方定义值，在整个样式表中复用。

**项目示例 — `src/index.css`：**

```css
:root {
  --text: #6b6375;               /* 正文文字颜色 */
  --text-h: #08060d;             /* 标题文字颜色 */
  --bg: #fff;                    /* 背景颜色 */
  --border: #e5e4e7;             /* 边框颜色 */
  --accent: #aa3bff;             /* 强调色（紫色） */
  --accent-bg: rgba(170, 59, 255, 0.1);   /* 强调色背景 */
  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;  /* 字体栈 */
}
```

**使用变量：**

```css
h1, h2 {
  color: var(--text-h);          /* 使用变量 */
}

code {
  background: var(--code-bg);
  color: var(--text-h);
}
```

**为什么使用 CSS 变量而不是硬编码值？**

1. **一处修改，全局生效** —— 改 `--accent` 的值就能改所有使用它的地方
2. **支持主题切换** —— 暗色模式只需重新定义变量值（见下节）
3. **语义化** —— `var(--accent)` 比 `#aa3bff` 更有意义

**变量的作用域**：定义在 `:root` 上的变量是**全局**的。也可以在任何选择器上定义**局部变量**：

```css
/* Layout.css 中导航栏的局部变量 */
.app-header {
  --nav-bg: #0b1b2a;
  --nav-text: rgba(255, 255, 255, 0.86);
  --nav-pill: rgba(255, 255, 255, 0.12);
}
```

这些变量只在 `.app-header` 及其子元素中可用，不会影响页面其他部分。

### 4.2 暗色模式

**项目示例 — `src/index.css`：**

```css
/* 默认：亮色主题 */
:root {
  --text: #6b6375;
  --bg: #fff;
  --accent: #aa3bff;
}

/* 用户系统设置为暗色时自动切换 */
@media (prefers-color-scheme: dark) {
  :root {
    --text: #9ca3af;
    --bg: #16171d;
    --accent: #c084fc;
  }
}
```

**原理**：`prefers-color-scheme: dark` 是一个**媒体查询**，当用户的操作系统或浏览器设置为暗色模式时生效。

因为所有样式都使用 `var(--text)`、`var(--bg)` 等变量，只需重新定义变量的值，整个页面的颜色就自动切换了——不需要修改任何组件的样式代码。

**颜色对比：**

| 变量 | 亮色模式 | 暗色模式 |
|------|----------|----------|
| `--text` | `#6b6375`（深灰紫） | `#9ca3af`（浅灰） |
| `--bg` | `#fff`（白） | `#16171d`（深灰蓝） |
| `--accent` | `#aa3bff`（亮紫） | `#c084fc`（淡紫） |

### 4.3 Flexbox 布局

Flexbox 是本项目布局的核心技术。

**导航栏三栏布局 — `src/components/Layout.css`：**

```css
.app-header__inner {
  max-width: 1306px;
  width: 100%;
  margin: 0 auto;          /* 水平居中 */
  display: flex;            /* 启用 Flexbox */
  align-items: center;      /* 垂直居中 */
  justify-content: space-between;  /* 两端对齐 */
  gap: 12px;                /* 子元素间距 */
  padding: 14px 20px;
  box-sizing: border-box;
}
```

**渲染效果：**
```
|  品牌 logo  |      导航链接      |  搜索 + 按钮  |
|   (left)    |     (center)      |    (right)    |
|←──────────→|←───────────────→|←─────────────→|
              justify-content: space-between
```

**三栏的 flex 属性：**

```css
.app-header__left {
  min-width: 220px;         /* 左栏固定最小宽度 */
}

.app-header__center {
  flex: 1;                  /* 中间栏占据剩余空间 */
  display: flex;
  justify-content: center;  /* 导航链接居中 */
}

.app-header__right {
  min-width: 320px;         /* 右栏固定最小宽度 */
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end; /* 右对齐 */
}
```

**Flex 属性速查：**

| 属性 | 值 | 作用 |
|------|------|------|
| `display: flex` | — | 开启 Flex 布局 |
| `flex-direction` | `row`/`column` | 主轴方向（水平/垂直） |
| `justify-content` | `center`/`space-between`/`flex-end` | 主轴对齐 |
| `align-items` | `center`/`stretch`/`flex-start` | 交叉轴对齐 |
| `gap` | `10px` | 子元素间距 |
| `flex: 1` | — | 占据剩余空间 |
| `flex-wrap` | `wrap`/`nowrap` | 是否换行 |
| `flex: 0 0 auto` | — | 不伸缩，保持原始大小 |

**页面整体布局 — `src/components/Layout.css`：**

```css
.app-shell {
  display: flex;
  flex-direction: column;   /* 垂直排列 */
  min-height: 100svh;       /* 至少占满屏幕高度 */
  text-align: left;
}

.app-main {
  flex: 1;                  /* 内容区占满剩余垂直空间 */
  padding: 24px 20px 48px;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;           /* 水平居中 */
  box-sizing: border-box;
}
```

```
┌──────────── .app-shell (flex-direction: column) ─────────────┐
│  ┌──────────── .app-header (sticky) ────────────────────┐    │
│  │  导航栏内容                                            │    │
│  └──────────────────────────────────────────────────────┘    │
│  ┌──────────── .app-main (flex: 1) ─────────────────────┐    │
│  │                                                        │    │
│  │  页面内容（Outlet 渲染的组件）                           │    │
│  │                                                        │    │
│  │  ← max-width: 900px, margin: 0 auto (居中) →         │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

### 4.4 粘性定位（position: sticky）

```css
.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
}
```

**效果**：导航栏在页面顶部。当用户向下滚动时，导航栏**粘在视口顶部**不会消失。

**与 `fixed` 的区别：**
- `fixed`：元素脱离文档流，始终固定在视口位置
- `sticky`：元素保留在文档流中，只有在滚动到特定位置时才固定

`sticky` 更好因为它不会遮挡下面的内容（不需要额外的 margin-top 来补偿）。

### 4.5 CSS 渐变

**导航栏背景 — `src/components/Layout.css`：**

```css
.app-header {
  background:
    radial-gradient(
      1200px 240px at 30% -10%,          /* 椭圆形，中心在左上偏外 */
      rgba(79, 210, 255, 0.25),           /* 青色光晕 */
      transparent 60%                      /* 渐变到透明 */
    ),
    radial-gradient(
      1200px 240px at 70% -20%,          /* 椭圆形，中心在右上偏外 */
      rgba(155, 123, 255, 0.22),          /* 紫色光晕 */
      transparent 58%
    ),
    var(--nav-bg);                         /* 深蓝底色 #0b1b2a */
}
```

这里叠加了**三层背景**（CSS 支持多背景，用逗号分隔）：

```
第 3 层（最底）：纯深蓝色 #0b1b2a
第 2 层：右上方的紫色径向渐变光晕
第 1 层（最顶）：左上方的青色径向渐变光晕

视觉效果：深蓝色底，左上角有淡淡的青色光，右上角有淡淡的紫色光
```

**品牌 Logo 的线性渐变：**

```css
.app-brand__logo {
  background: linear-gradient(135deg, #4fd2ff, #3aa0ff);
  /* 135 度角从青色渐变到蓝色 */
}
```

### 4.6 clamp() 函数

`clamp()` 实现**响应式尺寸**，无需媒体查询。

```css
.app-search__input {
  width: clamp(96px, 16vw, 180px);
}
```

**语法**：`clamp(最小值, 首选值, 最大值)`

```
clamp(96px, 16vw, 180px) 的含义：
- 宽度优先使用 16vw（视口宽度的 16%）
- 但最小不低于 96px
- 最大不超过 180px

在 1200px 宽的屏幕上：16vw = 192px → 超过最大值 → 使用 180px
在 800px 宽的屏幕上：16vw = 128px → 在范围内 → 使用 128px
在 500px 宽的屏幕上：16vw = 80px → 低于最小值 → 使用 96px
```

### 4.7 CSS 过渡动画

```css
.app-nav-link {
  transition:
    color 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease;
}
```

当 `color`、`background-color`、`border-color` 发生变化时（如 hover），不会立即变化，而是在 0.18 秒内平滑过渡。`ease` 是缓动函数（慢-快-慢）。

**触发过渡的交互：**

```css
.app-nav-link:hover,
.app-nav-link:focus-visible {
  color: var(--nav-text-strong);         /* 文字变亮 */
  background-color: var(--nav-pill);     /* 出现背景色 */
  border-color: var(--nav-pill-border);  /* 出现边框 */
}
```

### 4.8 响应式设计（@media）

本项目使用 **desktop-first**（桌面优先）策略：默认样式为大屏设计，通过 `max-width` 逐步适配小屏。

**5 个断点：**

```
1214px+         : 完整布局（品牌文字 + Logo + 导航 + 搜索 + 按钮）
1213px – 981px  : 隐藏品牌文字，只显示 Logo
980px – 818px   : 隐藏品牌区，导航和右侧功能同一行
817px – 641px   : 三段式（导航一行、搜索一行、按钮一行）
640px – 421px   : 移动端全宽布局
420px 以下       : 超小屏，隐藏语言按钮
```

**示例 — 1213px-981px 断点：**

```css
@media (max-width: 1213px) and (min-width: 981px) {
  .app-header__left {
    min-width: 0;            /* 取消左栏最小宽度 */
  }
  .app-brand__text {
    display: none;           /* 隐藏品牌文字，只保留 Logo 图标 */
  }
}
```

**使用 `min-width` 和 `max-width` 组合确保断点互不重叠。**

### 4.9 BEM 命名约定

项目使用类似 **BEM（Block Element Modifier）** 的 CSS 命名：

```
Block:    app-header              （块：独立的组件）
Element:  app-header__inner       （元素：块的组成部分，用 __ 连接）
          app-header__left
          app-header__center
          app-header__right
Modifier: app-nav-link--active    （修饰符：状态变体，用 -- 连接）
          app-btn--ghost
```

**好处：**
- 类名看一眼就知道元素的归属和状态
- 避免全局命名冲突（`.active` 太通用，`.app-nav-link--active` 不会冲突）
- 不需要嵌套选择器，性能更好

### 4.10 实用 CSS 技巧

**胶囊按钮（Pill Shape）：**

```css
.app-nav-link {
  border-radius: 999px;  /* 极大的圆角 → 两端变为半圆 */
  padding: 2px 10px;
}
```

`999px` 是一个大于元素高度一半的值，确保无论内容多高，两端都是完美的半圆。

**`box-sizing: border-box`：**

```css
.app-header__inner {
  box-sizing: border-box;
  padding: 14px 20px;
  width: 100%;
}
```

默认情况下，`width: 100%` 不包含 `padding`，总宽度会变成 `100% + 40px`（溢出）。`border-box` 让 `width` 包含 `padding`，避免溢出。

> **延伸阅读**：[MDN - Flexbox 指南](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox)


---

## 第五章：工程化工具链

### 5.1 Vite 是什么？

Vite 是新一代前端构建工具，由 Vue.js 作者尤雨溪创建。

**Vite vs 传统打包工具（如 Webpack）：**

| 特性 | Webpack | Vite |
|------|---------|------|
| 开发启动 | 打包所有文件后启动（几秒到几十秒） | **立即启动**，按需编译（毫秒级） |
| 热更新 | 重新打包受影响的模块链 | 只更新修改的文件（**极快**） |
| 原理 | 全量打包为 bundle | 利用浏览器原生 ES Modules |
| 配置 | 复杂，需要大量 loader/plugin | 开箱即用，配置极简 |

**Vite 开发模式工作原理：**

```
浏览器请求 main.jsx
  → Vite 拦截请求
  → 将 JSX 实时转换为 JS（使用 Oxc 编译器）
  → 返回浏览器可执行的 ES Module
  → 浏览器遇到 import 语句时再请求下一个文件
  → Vite 按需编译，只编译当前需要的文件
```

### 5.2 vite.config.js 解析

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

**逐行解析：**

| 行 | 代码 | 说明 |
|:--:|------|------|
| 1 | `import { defineConfig }` | 导入配置辅助函数（提供 TypeScript 类型提示） |
| 2 | `import react` | 导入 React 插件，处理 JSX 转换和 Fast Refresh |
| 4 | `export default defineConfig({...})` | 导出配置对象 |
| 5 | `plugins: [react()]` | 启用 React 插件 |

**React 插件提供的功能：**
- **JSX 转换**：将 `<div>` 转为 `React.createElement('div')`
- **Fast Refresh**：修改组件代码后，**保留组件状态**的同时更新 UI
- **自动导入**：无需手动 `import React from 'react'`

### 5.3 ESLint 配置解析

**文件：`eslint.config.js`**

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),        // 忽略构建输出目录
  {
    files: ['**/*.{js,jsx}'],     // 只检查 .js 和 .jsx 文件
    extends: [
      js.configs.recommended,              // ESLint 推荐规则
      reactHooks.configs.flat.recommended, // React Hooks 规则
      reactRefresh.configs.vite,           // Fast Refresh 规则
    ],
    languageOptions: {
      ecmaVersion: 2020,          // 支持 ES2020 语法
      globals: globals.browser,   // 预定义浏览器全局变量（window, document 等）
      parserOptions: {
        ecmaFeatures: { jsx: true }, // 启用 JSX 解析
        sourceType: 'module',        // 使用 ES Modules
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // ↑ 未使用的变量报错，但大写开头或下划线开头的变量豁免
      // 这允许：const API_URL = '...'（常量）和 const _unused = '...'（故意忽略）
    },
  },
])
```

**这是 ESLint 9 的 Flat Config 格式**（扁平配置），与旧版的 `.eslintrc.json` 不同：
- 直接用 JS 导出配置数组
- 每个配置项是一个对象，可以指定 `files` 范围
- 用 `extends` 继承预设规则

**React Hooks 规则检查什么？**
1. `rules-of-hooks` — Hook 只能在组件顶层调用（不能在 if/for 中调用）
2. `exhaustive-deps` — `useEffect` 的依赖数组必须包含所有用到的变量

### 5.4 package.json 结构

```json
{
  "name": "university-student-learning-platform",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-router-dom": "^7.14.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^9.39.4",
    "vite": "^8.0.4"
  }
}
```

**重要字段：**

| 字段 | 值 | 说明 |
|------|------|------|
| `"type": "module"` | — | 项目使用 ES Modules（`import/export`），而非 CommonJS（`require`） |
| `"private": true` | — | 防止意外发布到 npm |
| `"scripts"` | — | 定义可通过 `npm run xxx` 执行的命令 |
| `"dependencies"` | — | **生产依赖**：打包后代码中仍需要的库 |
| `"devDependencies"` | — | **开发依赖**：只在开发时需要，不进入最终打包 |

**版本号语法 `^19.2.4`：**
- `^` 表示允许更新到同一**大版本**内的最新版
- `^19.2.4` → 允许 `19.2.5`、`19.3.0`，但不允许 `20.0.0`

**四个脚本命令：**

```bash
npm run dev      # 启动开发服务器（带 HMR）
npm run build    # 打包生产版本到 dist/ 目录
npm run lint     # 运行 ESLint 检查代码问题
npm run preview  # 本地预览生产构建结果
```

### 5.5 构建产物

运行 `npm run build` 后生成：

```
dist/
├── index.html                     (0.48 KB)
└── assets/
    ├── index-CNggQMCE.css         (7.51 KB, gzip 1.98 KB)
    └── index-DQO0isuE.js         (236.53 KB, gzip 75.59 KB)
```

**文件名中的哈希值**（如 `CNggQMCE`）是内容指纹——文件内容变化时哈希会变，实现**浏览器长期缓存**（内容不变 = 文件名不变 = 使用缓存）。

**JS 体积分析**：236 KB 中绝大部分是 React（~140 KB）和 React Router（~80 KB）的运行时代码，应用自身代码只占很小一部分。

---

## 第六章：无障碍 (Accessibility) 基础

无障碍确保残障用户（视力障碍、运动障碍等）也能使用你的网站。

### 6.1 aria-label

**项目示例 — `src/components/Navbar.jsx`：**

```jsx
<nav className="app-header__center app-nav" aria-label="主导航">
```

`aria-label` 为元素提供**文本描述**。当屏幕阅读器（如 VoiceOver、NVDA）读到 `<nav>` 时，会报读"主导航，导航区域"，帮助视障用户理解这个区域的用途。

```jsx
<label className="app-search" aria-label="搜索">
```

搜索区域没有可见的 `<label>` 文字，`aria-label` 为屏幕阅读器提供了替代描述。

### 6.2 aria-hidden

```jsx
<span className="app-brand__logo" aria-hidden="true" />
```

```jsx
<svg className="app-search__icon" aria-hidden="true" ...>
```

`aria-hidden="true"` 告诉屏幕阅读器**忽略这个元素**。这些纯装饰性的图标（Logo 色块、搜索放大镜）对于视障用户没有意义，读出来反而是干扰。

### 6.3 语义化 HTML

项目中使用了正确的语义标签：

```jsx
<header>    → 页面头部区域（导航栏）
<nav>       → 导航区域
<main>      → 页面主要内容区域
<section>   → 独立的内容章节（各页面）
```

**为什么不全用 `<div>`？**

1. 屏幕阅读器通过标签类型识别内容结构，`<div>` 没有语义
2. 搜索引擎理解 `<main>` 是主要内容，`<nav>` 是导航
3. 键盘用户可以通过标签快速跳转到 `<main>` 区域

### 6.4 focus-visible 样式

```css
.app-nav-link:focus-visible {
  color: var(--nav-text-strong);
  background-color: var(--nav-pill);
  border-color: var(--nav-pill-border);
}
```

`focus-visible` 只在用户**通过键盘**（Tab 键）聚焦元素时显示样式，**鼠标点击不显示**。这比普通 `:focus` 更好——鼠标用户不会看到多余的聚焦框，键盘用户能清晰看到当前位置。

### 6.5 lang 属性

```html
<html lang="zh-CN">
```

告诉浏览器和屏幕阅读器页面内容是简体中文。屏幕阅读器会据此选择正确的语音合成引擎来朗读内容。

---

## 第七章：设计模式与最佳实践

### 7.1 数据驱动渲染

**反模式（手动重复）：**

```jsx
// ❌ 不好的写法
<NavLink to="/">首页</NavLink>
<NavLink to="/courses">课程</NavLink>
<NavLink to="/plan">学习计划</NavLink>
<NavLink to="/progress">学习进度</NavLink>
<NavLink to="/qa">提问</NavLink>
<NavLink to="/profile">个人中心</NavLink>
```

**项目实际写法（数据驱动）：**

```jsx
// ✅ 好的写法
const links = [
  { to: '/', label: '首页' },
  { to: '/courses', label: '课程' },
  { to: '/plan', label: '学习计划' },
  { to: '/progress', label: '学习进度' },
  { to: '/qa', label: '提问' },
  { to: '/profile', label: '个人中心' },
]

{links.map(({ to, label }) => (
  <NavLink key={to} to={to}>{label}</NavLink>
))}
```

**好处：**
1. 新增导航项只需在数组中加一个对象，不用改 JSX 结构
2. 数组可以从 API 获取、根据用户权限动态过滤
3. 减少重复代码，降低 copy-paste 出错风险

### 7.2 关注点分离

项目清晰地分离了不同的关注点：

```
Layout.jsx   → 负责「页面结构」（壳子）
Navbar.jsx   → 负责「导航交互」（链接、搜索、按钮）
Layout.css   → 负责「视觉呈现」（样式）
App.jsx      → 负责「路由映射」（URL → 组件）
pages/*.jsx  → 负责「业务内容」（各页面的具体内容）
```

**每个文件只做一件事**。如果导航栏逻辑太复杂，不会让 Layout 也变复杂——因为它只是 `<Navbar />`。

### 7.3 受控组件（Controlled Component）

**项目中的搜索框 — `src/components/Navbar.jsx`：**

```jsx
const [query, setQuery] = useState('')

<input
  value={query}                         // 显示值由 React 状态控制
  onChange={(e) => setQuery(e.target.value)}  // 每次变化更新状态
  placeholder="搜索课程/问题"
/>
```

**受控组件**：输入框的值完全由 React 状态 (`query`) 控制。

```
用户敲键盘 "高"
  → 触发 onChange
  → setQuery('高')
  → React 重新渲染
  → input 的 value 变为 '高'
  → 屏幕显示 '高'
```

**vs 非受控组件（不推荐）：**

```jsx
// 非受控：React 不知道输入框里有什么
<input placeholder="搜索" />  // 没有 value 和 onChange
```

**受控组件的优势：**
- React 始终知道输入框的当前值
- 可以在 onChange 中做**输入校验**（如限制字符长度）
- 可以用代码**清空/预填**输入框
- 方便实现**实时搜索**（输入时立即过滤结果）

### 7.4 CSS 变量主题模式

本项目使用的主题方案：

```
                 index.css
                 (:root 定义变量)
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓
   Layout.css    index.css    各组件
   var(--xxx)    var(--xxx)   var(--xxx)
```

**优点**：
- **零 JavaScript 开销** —— 纯 CSS 实现主题切换
- **自动跟随系统** —— `prefers-color-scheme` 无需用户手动切换
- **易于扩展** —— 未来可以添加更多主题，只需新增一组变量定义

### 7.5 桌面优先 vs 移动优先

本项目使用**桌面优先**（Desktop-First）策略：

```css
/* 默认样式：为大屏设计 */
.app-header__left {
  min-width: 220px;
}

/* 逐步适配小屏 */
@media (max-width: 1213px) { ... }
@media (max-width: 980px) { ... }
@media (max-width: 817px) { ... }
@media (max-width: 640px) { ... }
@media (max-width: 420px) { ... }
```

**移动优先**（推荐的替代方案）则反过来：

```css
/* 默认样式：为小屏设计 */
.app-header__left {
  display: none;
}

/* 逐步增强大屏 */
@media (min-width: 641px) { ... }
@media (min-width: 818px) { ... }
```

两种策略都可以，关键是**在一个项目中保持一致**。

---

## 第八章：下一步学习路线

### 8.1 状态管理

**当前问题**：每个组件只管理自己的状态（`Navbar` 的 `hoveredTo` 和 `query`），组件之间无法共享数据。

**需要学习的场景**：
- 用户登录后，`Navbar` 要显示用户名，`Profile` 要显示用户信息
- 课程数据在 `Courses` 和 `CourseDetail` 之间共享

**推荐方案：**

```jsx
// 方案 1：React Context（内置，适合简单场景）
const UserContext = createContext(null)

function App() {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>...</Routes>
    </UserContext.Provider>
  )
}

// 任何子组件中使用：
function Navbar() {
  const { user } = useContext(UserContext)
  return <span>{user ? user.name : '未登录'}</span>
}
```

```jsx
// 方案 2：Zustand（第三方，更简洁强大）
import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}))

// 任何组件中使用：
function Navbar() {
  const user = useUserStore((state) => state.user)
  return <span>{user ? user.name : '未登录'}</span>
}
```

> **学习资源**：
> - [React 官方文档 - useContext](https://react.dev/reference/react/useContext)
> - [Zustand GitHub](https://github.com/pmndrs/zustand)

### 8.2 数据获取

**目标**：课程列表、用户信息等数据从后端 API 获取。

**推荐学习 TanStack Query（React Query）：**

```jsx
import { useQuery } from '@tanstack/react-query'

function Courses() {
  const { data: courses, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: () => fetch('/api/courses').then(res => res.json()),
  })

  if (isLoading) return <p>加载中...</p>
  if (error) return <p>加载失败：{error.message}</p>

  return (
    <ul>
      {courses.map(course => (
        <li key={course.id}>
          <Link to={`/courses/${course.id}`}>{course.title}</Link>
        </li>
      ))}
    </ul>
  )
}
```

**TanStack Query 自动处理**：加载状态、错误处理、数据缓存、后台刷新、重试。

> **学习资源**：[TanStack Query 文档](https://tanstack.com/query/latest)

### 8.3 表单处理

**目标**：登录/注册表单、提问表单、学习计划编辑。

**推荐学习 React Hook Form + Zod：**

```jsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('请输入有效邮箱'),
  password: z.string().min(6, '密码至少 6 位'),
})

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = (data) => {
    console.log(data)  // { email: '...', password: '...' }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="邮箱" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('password')} type="password" placeholder="密码" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">登录</button>
    </form>
  )
}
```

> **学习资源**：
> - [React Hook Form 文档](https://react-hook-form.com/)
> - [Zod 文档](https://zod.dev/)

### 8.4 TypeScript

项目已安装 `@types/react`，迁移到 TypeScript 可以获得**编译时类型检查**。

**迁移步骤**：
1. 将 `.jsx` 文件重命名为 `.tsx`
2. 为 props 和 state 添加类型定义

```tsx
// 迁移前（JSX）
const links = [
  { to: '/', label: '首页' },
]

// 迁移后（TSX）
interface NavItem {
  to: string
  label: string
}

const links: NavItem[] = [
  { to: '/', label: '首页' },
]
```

> **学习资源**：[React TypeScript 手册](https://react.dev/learn/typescript)

### 8.5 测试

**推荐工具：**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

**示例测试：**

```jsx
// src/pages/__tests__/Home.test.jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '../Home'

describe('Home', () => {
  it('renders the page title', () => {
    render(<Home />)
    expect(screen.getByText('首页')).toBeInTheDocument()
  })
})
```

> **学习资源**：
> - [Vitest 文档](https://vitest.dev/)
> - [Testing Library 文档](https://testing-library.com/docs/react-testing-library/intro)

### 8.6 性能优化

**路由懒加载（最有价值的优化）：**

```jsx
import { lazy, Suspense } from 'react'

// 替代 import Courses from './pages/Courses.jsx'
const Courses = lazy(() => import('./pages/Courses.jsx'))

// 在路由中使用
<Route path="/courses" element={
  <Suspense fallback={<p>加载中...</p>}>
    <Courses />
  </Suspense>
} />
```

用户访问 `/courses` 时才下载 `Courses` 组件的代码，减少首次加载体积。

### 8.7 部署

**最简方案 — Vercel（免费）：**

1. 将项目推送到 GitHub
2. 在 [vercel.com](https://vercel.com) 导入仓库
3. Vercel 自动检测 Vite 项目并构建部署
4. 获得一个 `https://xxx.vercel.app` 的在线地址

**注意**：SPA 需要配置服务器将所有路径都返回 `index.html`，否则直接访问 `/courses` 会 404。Vercel 会自动处理这个问题。

---

## 学习路线总结

```
第 1 阶段（当前）
  ✅ React 组件基础
  ✅ React Router 路由
  ✅ CSS 变量 + Flexbox + 响应式
  ✅ Vite 工程化

第 2 阶段（建议立即开始）
  □ 状态管理（Context 或 Zustand）
  □ 数据获取（TanStack Query）
  □ 表单处理（React Hook Form）
  □ localStorage 持久化

第 3 阶段（功能完善后）
  □ TypeScript 迁移
  □ 测试（Vitest + Testing Library）
  □ 路由懒加载
  □ 错误边界

第 4 阶段（进阶）
  □ 后端对接（Node.js / Express）
  □ 用户认证（JWT）
  □ 部署上线（Vercel）
  □ CI/CD（GitHub Actions）
```

> **最重要的建议**：不要只读文档，要**动手改代码**。从给 Home 页面添加一个课程推荐列表开始，一步步把占位页面变成真实功能。每实现一个功能，就会自然地学到新知识。

