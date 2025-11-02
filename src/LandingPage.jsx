import { useState, useEffect } from 'react'
import Spline from '@splinetool/react-spline'
import './LandingPage.css'

function LandingPage() {
  const [email, setEmail] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const onLoad = (spline) => {
    // Hide the "Get in touch" button from Spline scene
    const hideButton = () => {
      if (spline) {
        // Try multiple possible button names
        const possibleNames = [
          'Button',
          'button',
          'Get in touch',
          'Get in Touch',
          'Get In Touch',
          'GET IN TOUCH',
          'GetInTouch',
          'getInTouch',
          'GetInTouchButton',
          'TextButton',
          'Text Button'
        ]
        
        possibleNames.forEach(name => {
          try {
            const obj = spline.findObjectByName(name)
            if (obj) {
              obj.visible = false
              console.log(`✓ Hid object: ${name}`)
            }
          } catch (e) {
            // Ignore errors
          }
        })
        
        // Hide all objects that might be buttons - more comprehensive search
        try {
          const allObjects = spline.getAllObjects()
          console.log('All objects:', allObjects.map(o => o.name))
          
          allObjects.forEach((obj) => {
            if (obj && obj.name) {
              const nameLower = obj.name.toLowerCase()
              if (nameLower.includes('button') || 
                  nameLower.includes('get in touch') ||
                  nameLower.includes('getintouch') ||
                  nameLower.includes('textbutton') ||
                  (nameLower.includes('text') && nameLower.includes('button'))) {
                obj.visible = false
                console.log(`✓ Hid object by search: ${obj.name}`)
              }
            }
          })
        } catch (e) {
          console.log('Error accessing objects:', e)
        }
      }
    }

    // Try immediately
    hideButton()
    
    // Also try after a delay to ensure scene is fully loaded
    setTimeout(hideButton, 500)
    setTimeout(hideButton, 1000)
    setTimeout(hideButton, 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle email submission here
    console.log('Email submitted:', email)
    alert('Thank you for joining! Check your email for exclusive access.')
    setEmail('')
  }

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="landing-page">
      {/* Spline 3D Background */}
      <div className="spline-background">
        <Spline 
          scene="https://prod.spline.design/0CfDGO8iNSgcPAox/scene.splinecode"
          onLoad={onLoad}
        />
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo" onClick={handleLogoClick}>
            <img src="/logo.svg" alt="GADGET 360" className="navbar-logo-image" />
            <span className="navbar-logo-text">GADGET 360</span>
          </div>
          <div className="navbar-links">
            <button onClick={scrollToAbout} className="navbar-link">About</button>
            <button onClick={scrollToContact} className="navbar-link">Contact Us</button>
          </div>
        </div>
      </nav>

      <div className="background-overlay"></div>
      
      <div className="content-container">
        {/* Main Headline */}
        <h1 className={`headline ${isVisible ? 'animate-fade-in-up' : ''}`}>
          Protection is an art.<br />
          Your case is the canvas.
        </h1>

        {/* Sub-headline */}
        <p className={`subheadline ${isVisible ? 'animate-fade-in-up-delay-1' : ''}`}>
          A new era of iPhone protection is arriving. GADGET 360 is a curated gallery 
          of the world's most exclusive, design-forward cases—because your device 
          deserves more than just a cover. It deserves a statement.
        </p>

        {/* Demo Cases Gallery */}
        <div className={`cases-gallery ${isVisible ? 'animate-fade-in-up-delay-2' : ''}`}>
          <div className="case-item">
            <img src="/cases/case-1.svg" alt="Luxury Leather Case" className="case-image" />
            <div className="case-overlay">
              <p className="case-name">Luxury Leather</p>
            </div>
          </div>
          <div className="case-item" style={{ animationDelay: '0.1s' }}>
            <img src="/cases/case-2.svg" alt="Brushed Titanium Case" className="case-image" />
            <div className="case-overlay">
              <p className="case-name">Titanium Elite</p>
            </div>
          </div>
          <div className="case-item" style={{ animationDelay: '0.2s' }}>
            <img src="/cases/case-3.svg" alt="Marble Design Case" className="case-image" />
            <div className="case-overlay">
              <p className="case-name">Marble Collection</p>
            </div>
          </div>
        </div>

        {/* Email Capture Section */}
        <div className={`email-section ${isVisible ? 'animate-fade-in-up-delay-3' : ''}`}>
          <h2 className="cta-headline">BE THE FIRST</h2>
          <p className="cta-text">
            Join our private list for exclusive launch-day access and a 15% discount 
            on your first piece.
          </p>
          
          <form className="email-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
              required
            />
            <button type="submit" className="notify-button">
              <span>NOTIFY ME</span>
            </button>
          </form>
        </div>

        {/* About Section */}
        <div className={`about-section ${isVisible ? 'animate-fade-in-up-delay-4' : ''}`} id="about-section">
          <h2 className="section-headline">About GADGET 360</h2>
          <p className="section-text">
            GADGET 360 represents the pinnacle of iPhone protection. We curate only the most 
            exclusive, design-forward cases from around the world. Each piece is more than 
            just protection—it's a statement of style, craftsmanship, and innovation.
          </p>
          <p className="section-text">
            Our collection celebrates the fusion of art and technology, offering cases that 
            reflect your unique aesthetic while providing uncompromising protection for your 
            device.
          </p>
        </div>

        {/* Contact Us Section */}
        <div className={`contact-section ${isVisible ? 'animate-fade-in-up-delay-5' : ''}`} id="contact-section">
          <h2 className="section-headline">Contact Us</h2>
          <p className="section-text">
            Have questions? We'd love to hear from you. Get in touch with our team.
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <h3 className="contact-label">Email</h3>
              <a href="mailto:info@gadget360.com" className="contact-link">info@gadget360.com</a>
            </div>
            <div className="contact-item">
              <h3 className="contact-label">Follow Us</h3>
              <div className="social-links">
                <a href="#" className="social-link" onClick={(e) => { e.preventDefault(); alert('Coming Soon'); }}>Instagram</a>
                <a href="#" className="social-link" onClick={(e) => { e.preventDefault(); alert('Coming Soon'); }}>Twitter</a>
                <a href="#" className="social-link" onClick={(e) => { e.preventDefault(); alert('Coming Soon'); }}>LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
