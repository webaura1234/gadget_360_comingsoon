import { useNavigate, useLocation } from 'react-router-dom'
import '../LandingPage.css'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleAboutClick = () => {
    navigate('/about')
  }

  const handleContactClick = () => {
    navigate('/contact')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={handleLogoClick}>
          <img src="https://res.cloudinary.com/dzzcifdll/image/upload/v1762027548/gadget_360_logo_ilc9yr.jpg" alt="GADGET 360" className="navbar-logo-image" />
          <span className="navbar-logo-text">GADGET <span className="navbar-logo-number">360</span></span>
        </div>
        <div className="navbar-links">
          <button 
            onClick={handleAboutClick} 
            className={`navbar-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            About
          </button>
          <button 
            onClick={handleContactClick} 
            className={`navbar-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

