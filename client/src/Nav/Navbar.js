"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import "./components/Navbar.css"

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setDropdownOpen(false)
    navigate("/login")
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  // Check if user is admin
  const isAdmin = user && user.role === "admin"

  return (
    <nav className={`rf-navbar ${scrolled ? "rf-navbar-scrolled" : ""}`}>
      <div className="rf-navbar-container">
        {/* Brand */}
        <a href="/" className="rf-navbar-brand">
          <div className="rf-brand-icon">R</div>
          <span className="rf-brand-text">Recipe Finder</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="rf-navbar-nav">
          <li>
            <a href="/" className="rf-nav-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
              Home
            </a>
          </li>
          <li>
            <a href="/search" className="rf-nav-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Search
            </a>
          </li>
          {/* Only show admin link if user is admin */}
          {isAdmin && (
            <li>
              <a href="/admin" className="rf-nav-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Admin
              </a>
            </li>
          )}
        </ul>

        {/* User Menu */}
        <div className="rf-user-menu">
          {user ? (
            <div className="rf-user-dropdown" ref={dropdownRef}>
              <div className="rf-user-avatar" onClick={toggleDropdown}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className={`rf-dropdown-menu ${dropdownOpen ? "rf-show" : ""}`}>
                <div className="rf-dropdown-user-info">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>{user.username}</span>
                </div>
                <div className="rf-dropdown-divider"></div>
                <a href="/wishlist" className="rf-dropdown-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  Wishlist
                </a>
                {isAdmin && (
                  <a href="/dash" className="rf-dropdown-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Dashboard
                  </a>
                )}
                <div className="rf-dropdown-divider"></div>
                <button onClick={handleLogout} className="rf-dropdown-item rf-logout">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16,17 21,12 16,7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <a href="/login" className="rf-btn rf-btn-primary">
              Login
            </a>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="rf-mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`rf-mobile-menu ${isOpen ? "rf-active" : ""}`}>
        <div className="rf-mobile-nav">
          <a href="/" className="rf-mobile-nav-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9,22 9,12 15,12 15,22" />
            </svg>
            Home
          </a>
          <a href="/search" className="rf-mobile-nav-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            Search
          </a>
          <a href="/wishlist" className="rf-mobile-nav-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Wishlist
          </a>
          {/* Only show admin link if user is admin */}
          {isAdmin && (
            <a href="/admin" className="rf-mobile-nav-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Admin
            </a>
          )}
        </div>

        {user ? (
          <div className="rf-mobile-user-section">
            <div className="rf-mobile-user-info">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>{user.username}</span>
            </div>
            {isAdmin && (
              <a href="/dash" className="rf-mobile-nav-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Dashboard
              </a>
            )}
            <button onClick={handleLogout} className="rf-mobile-logout">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16,17 21,12 16,7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        ) : (
          <div className="rf-mobile-user-section">
            <a href="/login" className="rf-mobile-login">
              Login
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
