import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../LandingPage.css'

// Generate unique request ID for idempotency
function generateRequestId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function ContactPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' or 'error'

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (isSubmitting) return
    
    setIsSubmitting(true)
    setSubmitMessage('')
    setMessageType('')
    
    const ENDPOINT = import.meta.env.VITE_CONTACT_API || 'http://localhost:3001/api/contact'
    
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 
          'Content-Type': 'text/plain;charset=UTF-8' // Use text/plain to avoid CORS preflight
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          requestId: generateRequestId() // Add unique ID for idempotency
        }),
      })
      
      const data = await res.json()
      
      if (!data || !data.ok) {
        throw new Error(data?.error || 'Failed to send message')
      }
      
      setSubmitMessage('Thank you! Your message has been sent successfully.')
      setMessageType('success')
      setFormData({
        name: '',
        email: '',
        message: ''
      })
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage('')
        setMessageType('')
      }, 5000)
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setSubmitMessage('Sorry, something went wrong. Please try again.')
      setMessageType('error')
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitMessage('')
        setMessageType('')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
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
            <span className="page-headline-gradient">Contact Us</span>
          </h1>
          
          <p className="section-text" style={{ marginBottom: '3rem' }}>
            Have questions? We'd love to hear from you. Get in touch with our team.
          </p>

          <div className="contact-grid">
            <div className="contact-info-section">
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

            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                className="contact-input"
                required
                disabled={isSubmitting}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email Address *"
                value={formData.email}
                onChange={handleChange}
                className="contact-input"
                required
                disabled={isSubmitting}
              />
              <textarea
                name="message"
                placeholder="Your Message *"
                value={formData.message}
                onChange={handleChange}
                className="contact-textarea"
                rows="6"
                required
                disabled={isSubmitting}
              ></textarea>
              <button type="submit" className="contact-submit-button" disabled={isSubmitting}>
                <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
              </button>

              {submitMessage && (
                <p className={`submit-message ${messageType}`}>
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage

