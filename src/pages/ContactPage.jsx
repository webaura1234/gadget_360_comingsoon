import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../LandingPage.css'

function ContactPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="page-container">
      <Navbar />
      
      <div className="page-content">
        <div className={`contact-section-full ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h1 className="page-headline">
            <span className="page-headline-gradient">CONTACT US</span>
          </h1>
          
          <p className="section-text" style={{ marginBottom: '3rem' }}>
            Have questions? We'd love to hear from you. Get in touch with our team.
          </p>

          <div className="contact-grid">
            <div className={`contact-info-section ${isVisible ? 'animate-fade-in-up-delay-1' : ''}`}>
              <div className="contact-item-detailed">
                <h3 className="contact-label">Email</h3>
                <a href="mailto:info@gadget360.com" className="contact-link-large">
                  info@gadget360.com
                </a>
              </div>
              
              <div className="contact-item-detailed">
                <h3 className="contact-label">Follow Us</h3>
                <div className="social-links">
                  <a href="#" className="social-link" onClick={(e) => { e.preventDefault(); alert('Coming Soon'); }}>
                    Instagram
                  </a>
                  <a href="#" className="social-link" onClick={(e) => { e.preventDefault(); alert('Coming Soon'); }}>
                    Twitter
                  </a>
                  <a href="#" className="social-link" onClick={(e) => { e.preventDefault(); alert('Coming Soon'); }}>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <form className={`contact-form ${isVisible ? 'animate-fade-in-up-delay-2' : ''}`} onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="contact-input"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={handleChange}
                className="contact-input"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="contact-textarea"
                rows="6"
                required
              ></textarea>
              <button type="submit" className="contact-submit-button">
                <span>SEND MESSAGE</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage

