import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import '../LandingPage.css'

function EntryPage() {
  const [email, setEmail] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || isSubmitting) return
    
    setIsSubmitting(true)
    setSubmitMessage('')
    
    // Google Apps Script Web App URL - Replace with your Web App URL (NOT the sheet URL)
    // Follow instructions in GOOGLE_SHEETS_SETUP.md to create the script and get this URL
    // It should look like: https://script.google.com/macros/s/AKfycby.../exec
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw_sUCJRCE2yOrP03RTJf9VKh0UcZ3Usk3yhIz1xjLZH_k2CgzIWGsoNbE2pZnatBIbaQ/exec'
    
    try {
      // If you haven't set up the Google Script URL yet, use a placeholder
      if (GOOGLE_SCRIPT_URL === 'https://script.google.com/macros/s/AKfycbyg2fx6ajkCaLNgNt9s2Xg1dyGSPjAxuv5hyWCWF_lX0YOL4R8mxdK86VmduGTyNWrj9w/exec') {
        // For now, just log and show success message
        console.log('Email submitted:', email)
        setSubmitMessage('Thank you for joining! Check your email for exclusive access.')
        setEmail('')
        setIsSubmitting(false)
        return
      }
      
      // Send email to Google Sheets via Google Apps Script
      // Google Apps Script works better with form data when using no-cors
      const formData = new URLSearchParams()
      formData.append('email', email)
      formData.append('timestamp', new Date().toISOString())
      
      // First try with JSON
      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            timestamp: new Date().toISOString(),
          }),
        })
        
        // Wait a moment to ensure request completes
        await new Promise(resolve => setTimeout(resolve, 500))
        
        setSubmitMessage('Thank you for joining! Check your email for exclusive access.')
        setEmail('')
      } catch (fetchError) {
        // Fallback: try with form data
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        })
        
        setSubmitMessage('Thank you for joining! Check your email for exclusive access.')
        setEmail('')
      }
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage('')
      }, 5000)
    } catch (error) {
      console.error('Error submitting email:', error)
      setSubmitMessage('Thank you for joining! We\'ll be in touch soon.')
      setEmail('')
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setSubmitMessage('')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="landing-page">
      <Navbar />
      
      {/* Full Screen Store Hero Section */}
      <section className="store-hero-section">
        <div className="store-hero-image-wrapper">
          <img 
            src="https://res.cloudinary.com/dulebiodx/image/upload/v1762581583/DSC_0560_hrz9dp.jpg" 
            alt="GADGET 360 Store" 
            className="store-hero-image"
          />
          <div className="store-hero-overlay"></div>
        </div>
        <div className="store-hero-content">
          <div className="store-hero-text-wrapper">
            <h1 className={`store-hero-heading ${isVisible ? 'animate-fade-in-up' : ''}`}>
              Coming Soon
            </h1>
            <p className={`store-hero-text ${isVisible ? 'animate-fade-in-up-delay-1' : ''}`}>
              Experience the future of iPhone protection. Visit our flagship store and discover 
              our curated collection of premium cases, where innovation meets elegance.
            </p>
          </div>
        </div>
      </section>

      <div className="content-container">

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
              disabled={isSubmitting}
            />
            <button 
              type="submit" 
              className="notify-button"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'SUBMITTING...' : 'NOTIFY ME'}</span>
            </button>
            {submitMessage && (
              <p className="submit-message">{submitMessage}</p>
            )}
          </form>
        </div>

        {/* Offline Store Section */}
        <div className={`offline-store-section ${isVisible ? 'animate-fade-in-up-delay-4' : ''}`}>
          <h2 className="cta-headline">Visit Our Offline Store</h2>
          <p className="cta-text">
            Experience our premium collection in person. Visit us at our physical locations.
          </p>
          
          <div className="stores-grid">
            <div 
              className="store-card"
              onClick={() => window.open('https://maps.google.com/?q=GADGET+360+Store', '_blank')}
            >
              <h3 className="store-name">GADGET 360 Flagship Store</h3>
              <p className="store-address">123 Premium Avenue, Tech District</p>
              <p className="store-city">New York, NY 10001</p>
              <p className="store-hours">Mon-Sat: 10AM - 8PM | Sun: 12PM - 6PM</p>
              <span className="store-link">View on Maps →</span>
            </div>
            
            <div 
              className="store-card"
              onClick={() => window.open('https://maps.google.com/?q=GADGET+360+Store+Los+Angeles', '_blank')}
            >
              <h3 className="store-name">GADGET 360 Los Angeles</h3>
              <p className="store-address">456 Design Boulevard, Fashion Quarter</p>
              <p className="store-city">Los Angeles, CA 90028</p>
              <p className="store-hours">Mon-Sat: 10AM - 8PM | Sun: 12PM - 6PM</p>
              <span className="store-link">View on Maps →</span>
            </div>
            
            <div 
              className="store-card"
              onClick={() => window.open('https://maps.google.com/?q=GADGET+360+Store+Chicago', '_blank')}
            >
              <h3 className="store-name">GADGET 360 Chicago</h3>
              <p className="store-address">789 Innovation Street, Downtown</p>
              <p className="store-city">Chicago, IL 60601</p>
              <p className="store-hours">Mon-Sat: 10AM - 8PM | Sun: 12PM - 6PM</p>
              <span className="store-link">View on Maps →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntryPage

