import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: '首页' },
  { to: '/courses', label: '课程' },
  { to: '/plan', label: '学习计划' },
  { to: '/progress', label: '学习进度' },
  { to: '/qa', label: '提问' },
  { to: '/profile', label: '个人中心' },
]

/** 当悬停其他链接时，暂时隐藏当前路由的活跃态，让悬停目标获得唯一高亮 */
function shouldShowActive(isRouteActive, hoveredTo, to) {
  if (!isRouteActive) return false
  if (hoveredTo == null) return true
  return hoveredTo === to
}

export default function Navbar() {
  const [hoveredTo, setHoveredTo] = useState(null)
  const [query, setQuery] = useState('')

  return (
    <header
      className="app-header"
      onMouseLeave={() => setHoveredTo(null)}
    >
      <div className="app-header__inner">
        <div className="app-header__left">
          <NavLink
            to="/"
            className="app-brand"
            end
            onMouseEnter={() => setHoveredTo('/')}
          >
            <span className="app-brand__logo" aria-hidden="true" />
            <span className="app-brand__text">
              <span className="app-brand__title">学习辅导平台</span>
              <span className="app-brand__subtitle">University Study</span>
            </span>
          </NavLink>
        </div>

        <nav className="app-header__center app-nav" aria-label="主导航">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                shouldShowActive(isActive, hoveredTo, to)
                  ? 'app-nav-link app-nav-link--active'
                  : 'app-nav-link'
              }
              end={to === '/'}
              onMouseEnter={() => setHoveredTo(to)}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="app-header__right">
          <div className="app-header__searchRow">
            <label className="app-search" aria-label="搜索">
              <svg className="app-search__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                className="app-search__input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索课程/问题"
              />
            </label>
          </div>

          <div className="app-header__authRow">
            <button className="app-pill" type="button">
              English
            </button>
            <button className="app-btn app-btn--ghost" type="button">
              登录
            </button>
            <button className="app-btn" type="button">
              注册
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
