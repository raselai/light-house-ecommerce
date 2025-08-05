
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIndoorDropdownOpen, setIsIndoorDropdownOpen] = useState(false);
  const [isOutdoorDropdownOpen, setIsOutdoorDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const indoorCategories = [
    'Hanging lights',
    'Spotlight',
    'Pendant lights',
    'Magnetic light',
    'LED tube',
    'Office lights',
    'Warehouse light',
    'LED strip',
    'Aluminum profile',
    'Mirror light',
    'LED track lights'
  ];

  const outdoorCategories = [
    'Wall',
    'Stand',
    'Garden light',
    'Floodlight',
    'Solar light'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search after submission
    }
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search after submission
      setIsMobileMenuOpen(false); // Close mobile menu after search
    }
  };

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false); // Close mobile menu when any link is clicked
  };

  const handleDropdownToggle = (dropdownType: 'indoor' | 'outdoor') => {
    if (dropdownType === 'indoor') {
      setIsIndoorDropdownOpen(!isIndoorDropdownOpen);
    } else {
      setIsOutdoorDropdownOpen(!isOutdoorDropdownOpen);
    }
    // Don't close mobile menu when toggling dropdowns
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <Image
            src="/images/Logo/Logo.png"
            alt="SK Lights"
            width={200}
            height={80}
            style={{ objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-desktop">
          <Link href="/" className="navbar-link">Home</Link>
          
          {/* Indoor Lights Dropdown */}
          <div className="navbar-dropdown-container">
            <button 
              className="navbar-dropdown-btn"
              onMouseEnter={() => setIsIndoorDropdownOpen(true)}
              onMouseLeave={() => setIsIndoorDropdownOpen(false)}
            >
              Indoor Lights
              <span className="dropdown-arrow">▼</span>
            </button>
            {isIndoorDropdownOpen && (
              <div 
                className="navbar-dropdown"
                onMouseEnter={() => setIsIndoorDropdownOpen(true)}
                onMouseLeave={() => setIsIndoorDropdownOpen(false)}
              >
                {indoorCategories.map((category) => (
                  <Link 
                    key={category} 
                    href={`/categories/${category.toLowerCase().replace(' ', '-')}`}
                    className="dropdown-link"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Outdoor Lights Dropdown */}
          <div className="navbar-dropdown-container">
            <button 
              className="navbar-dropdown-btn"
              onMouseEnter={() => setIsOutdoorDropdownOpen(true)}
              onMouseLeave={() => setIsOutdoorDropdownOpen(false)}
            >
              Outdoor Lights
              <span className="dropdown-arrow">▼</span>
            </button>
            {isOutdoorDropdownOpen && (
              <div 
                className="navbar-dropdown"
                onMouseEnter={() => setIsOutdoorDropdownOpen(true)}
                onMouseLeave={() => setIsOutdoorDropdownOpen(false)}
              >
                {outdoorCategories.map((category) => (
                  <Link 
                    key={category} 
                    href={`/categories/${category.toLowerCase().replace(' ', '-')}`}
                    className="dropdown-link"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" className="navbar-link">About</Link>
          <Link href="/contact" className="navbar-link">Contact</Link>
          <Link href="/faq" className="navbar-link">FAQ</Link>
          <Link href="/others" className="navbar-link">Others</Link>
          

        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="navbar-search">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">🔍</button>
        </form>

        {/* Mobile Menu Button */}
        <button 
          className="navbar-mobile-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <form onSubmit={handleMobileSearch} className="mobile-search">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">🔍</button>
          </form>
          
          <Link href="/" className="mobile-link" onClick={handleMobileMenuClick}>Home</Link>
          
          <div className="mobile-dropdown">
            <button 
              className="mobile-dropdown-btn"
              onClick={() => handleDropdownToggle('indoor')}
            >
              Indoor Lights
              <span className="dropdown-arrow">▼</span>
            </button>
            {isIndoorDropdownOpen && (
              <div className="mobile-dropdown-content">
                {indoorCategories.map((category) => (
                  <Link 
                    key={category} 
                    href={`/categories/${category.toLowerCase().replace(' ', '-')}`}
                    className="mobile-dropdown-link"
                    onClick={handleMobileMenuClick}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mobile-dropdown">
            <button 
              className="mobile-dropdown-btn"
              onClick={() => handleDropdownToggle('outdoor')}
            >
              Outdoor Lights
              <span className="dropdown-arrow">▼</span>
            </button>
            {isOutdoorDropdownOpen && (
              <div className="mobile-dropdown-content">
                {outdoorCategories.map((category) => (
                  <Link 
                    key={category} 
                    href={`/categories/${category.toLowerCase().replace(' ', '-')}`}
                    className="mobile-dropdown-link"
                    onClick={handleMobileMenuClick}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" className="mobile-link" onClick={handleMobileMenuClick}>About</Link>
          <Link href="/contact" className="mobile-link" onClick={handleMobileMenuClick}>Contact</Link>
          <Link href="/faq" className="mobile-link" onClick={handleMobileMenuClick}>FAQ</Link>
          <Link href="/others" className="mobile-link" onClick={handleMobileMenuClick}>Others</Link>
          

        </div>
      )}
    </nav>
  );
}
