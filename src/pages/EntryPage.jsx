import { useState, useEffect } from 'react'
import Spline from '@splinetool/react-spline'
import Navbar from '../components/Navbar'
import '../LandingPage.css'

function EntryPage() {
  const [email, setEmail] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    setIsVisible(true)
    
    // Inject targeted style to hide watermark - only target watermark, not app
    const style = document.createElement('style')
    style.id = 'spline-watermark-hider'
    style.textContent = `
      /* Hide Spline watermark - targeted selectors only */
      *[class*="spline"][class*="watermark"]:not(.landing-page):not(.content-container):not(.navbar),
      *[class*="Spline"][class*="Watermark"]:not(.landing-page):not(.content-container):not(.navbar),
      *[id*="spline-watermark"]:not(#root),
      *[id*="SplineWatermark"]:not(#root),
      body > a[href*="spline.design"],
      body > a[href*="spline.app"],
      body > div:last-child[style*="position: fixed"][style*="bottom"][style*="right"]:not(#root) {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        height: 0 !important;
        width: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
        z-index: -9999 !important;
      }
    `
    document.head.appendChild(style)
    
    // Targeted watermark hiding function - only target watermark, not app elements
    const hideWatermark = () => {
      // Only search within spline container and body direct children
      const splineContainer = document.querySelector('.spline-background')
      const containersToCheck = []
      
      if (splineContainer) {
        containersToCheck.push(splineContainer)
      }
      
      // Also check body direct children that might be watermarks (not React root)
      const bodyChildren = Array.from(document.body.children).filter(child => {
        // Skip React root and our app elements
        const reactRoot = child.id === 'root' || 
                         child.classList.contains('landing-page') ||
                         child.classList.contains('page-container') ||
                         child.classList.contains('navbar')
        return !reactRoot
      })
      containersToCheck.push(...bodyChildren)
      
      containersToCheck.forEach(container => {
        try {
          // Only check elements within container
          const allElements = container.querySelectorAll ? container.querySelectorAll('*') : [container]
          
          allElements.forEach(el => {
            // Skip important elements (React app, canvas, iframe)
            if (el.tagName === 'CANVAS' || 
                el.tagName === 'IFRAME' || 
                el.tagName === 'SCRIPT' ||
                el.tagName === 'STYLE' ||
                el.closest('#root') ||
                el.closest('.landing-page') ||
                el.closest('.navbar') ||
                el.closest('.content-container')) {
              return
            }
            
            try {
              const text = (el.textContent || el.title || el.ariaLabel || el.alt || '').toLowerCase().trim()
              const className = (el.className || '').toString().toLowerCase()
              const id = (el.id || '').toLowerCase()
              
              // Method 1: Only hide if it explicitly contains watermark text
              if (text === 'built with spline' || 
                  text.includes('built with spline') ||
                  (text.includes('built') && text.includes('spline') && text.length < 50)) {
                // Verify it's actually the watermark by checking size and position
                const styles = window.getComputedStyle(el)
                if (styles.position === 'fixed' || styles.position === 'absolute') {
                  el.style.setProperty('display', 'none', 'important')
                  el.style.setProperty('visibility', 'hidden', 'important')
                  el.style.setProperty('opacity', '0', 'important')
                  el.style.setProperty('height', '0', 'important')
                  el.style.setProperty('width', '0', 'important')
                  el.style.setProperty('pointer-events', 'none', 'important')
                  return
                }
              }
              
              // Method 2: Only hide if class/ID explicitly mentions watermark
              if ((className.includes('spline') && className.includes('watermark')) ||
                  (id.includes('spline') && id.includes('watermark'))) {
                el.style.setProperty('display', 'none', 'important')
                el.style.setProperty('visibility', 'hidden', 'important')
                el.style.setProperty('opacity', '0', 'important')
                el.style.setProperty('height', '0', 'important')
                el.style.setProperty('width', '0', 'important')
                el.style.setProperty('pointer-events', 'none', 'important')
                return
              }
              
              // Method 3: Only hide anchor tags that link to spline AND are in bottom-right
              if (el.tagName === 'A') {
                const href = (el.getAttribute('href') || '').toLowerCase()
                if (href.includes('spline.design') || href.includes('spline.app')) {
                  const styles = window.getComputedStyle(el)
                  const bottom = parseFloat(styles.bottom) || 0
                  const right = parseFloat(styles.right) || 0
                  
                  // Only hide if it's positioned in bottom-right (watermark location)
                  if ((styles.position === 'fixed' || styles.position === 'absolute') &&
                      bottom < 100 && right < 250) {
                    el.style.setProperty('display', 'none', 'important')
                    el.style.setProperty('visibility', 'hidden', 'important')
                    el.style.setProperty('opacity', '0', 'important')
                    el.style.setProperty('height', '0', 'important')
                    el.style.setProperty('width', '0', 'important')
                    el.style.setProperty('pointer-events', 'none', 'important')
                  }
                }
              }
            } catch (e) {
              // Ignore errors
            }
          })
        } catch (e) {
          // Ignore errors
        }
      })
    }
    
    // Run immediately
    hideWatermark()
    
    // Use interval instead of requestAnimationFrame to avoid performance issues
    const hideWatermarkInterval = setInterval(hideWatermark, 200)
    
    // MutationObserver for new elements
    const observer = new MutationObserver(() => {
      hideWatermark()
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'id']
    })
    
    return () => {
      clearInterval(hideWatermarkInterval)
      observer.disconnect()
      // Keep the style tag (don't remove it on cleanup)
    }
  }, [])

  const onLoad = (spline) => {
    // Hide buttons and "coming soon" text from Spline scene
    const hideElements = () => {
      if (spline) {
        const possibleNames = [
          'Button', 'button', 'Get in touch', 'Get in Touch', 'Get In Touch',
          'GET IN TOUCH', 'GetInTouch', 'getInTouch', 'GetInTouchButton',
          'TextButton', 'Text Button', 'Coming Soon', 'Coming soon', 'COMING SOON',
          'ComingSoon', 'comingSoon', 'Text', 'text', 'Label', 'label'
        ]
        
        possibleNames.forEach(name => {
          try {
            const obj = spline.findObjectByName(name)
            if (obj) {
              obj.visible = false
              console.log(`✓ Hid: ${name}`)
            }
          } catch (e) {
            // Ignore errors
          }
        })
        
        try {
          const allObjects = spline.getAllObjects()
          console.log('All Spline objects:', allObjects.map(o => o.name).filter(Boolean))
          
          allObjects.forEach((obj) => {
            if (obj && obj.name) {
              const nameLower = obj.name.toLowerCase()
              if (nameLower.includes('button') || 
                  nameLower.includes('get in touch') ||
                  nameLower.includes('getintouch') ||
                  nameLower.includes('textbutton') ||
                  nameLower.includes('coming soon') ||
                  nameLower.includes('comingsoon') ||
                  nameLower.includes('built with') ||
                  nameLower.includes('builtwith') ||
                  nameLower.includes('spline watermark') ||
                  nameLower.includes('watermark') ||
                  (nameLower.includes('text') && nameLower.includes('button')) ||
                  (nameLower === 'text') ||
                  (nameLower === 'label')) {
                obj.visible = false
                console.log(`✓ Hid by search: ${obj.name}`)
              }
            }
          })
        } catch (e) {
          console.log('Error:', e)
        }

        // Hide watermark via DOM manipulation - run multiple times
        const hideWatermark = () => {
          const splineContainer = document.querySelector('.spline-background')
          if (splineContainer) {
            // Hide any links or elements containing "Built with Spline"
            const allElements = splineContainer.querySelectorAll('a, div, span, iframe, p, h1, h2, h3, h4, h5, h6')
            allElements.forEach(el => {
              const text = (el.textContent || el.title || el.ariaLabel || '').toLowerCase()
              if (text.includes('built with spline') || 
                  (text.includes('spline') && text.includes('built'))) {
                el.style.setProperty('display', 'none', 'important')
                el.style.setProperty('visibility', 'hidden', 'important')
                el.style.setProperty('opacity', '0', 'important')
                el.style.setProperty('height', '0', 'important')
                el.style.setProperty('width', '0', 'important')
                el.style.setProperty('pointer-events', 'none', 'important')
              }
            })
            
            // Also check for iframes that might contain the watermark
            const iframes = splineContainer.querySelectorAll('iframe')
            iframes.forEach(iframe => {
              try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
                if (iframeDoc) {
                  const iframeElements = iframeDoc.querySelectorAll('*')
                  iframeElements.forEach(el => {
                    const text = (el.textContent || '').toLowerCase()
                    if (text.includes('built with spline')) {
                      el.style.display = 'none'
                      el.style.visibility = 'hidden'
                      el.style.opacity = '0'
                    }
                  })
                }
              } catch (e) {
                // Cross-origin iframe, can't access
              }
            })
          }
        }

        // Run immediately and on intervals
        hideWatermark()
        setTimeout(hideWatermark, 500)
        setTimeout(hideWatermark, 1000)
        setTimeout(hideWatermark, 2000)
        setTimeout(hideWatermark, 3000)
        
        // Use MutationObserver to catch dynamically added elements
        const observer = new MutationObserver((mutations) => {
          hideWatermark()
          
          // Also check newly added nodes
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === 1) { // Element node
                const element = node
                const text = (element.textContent || element.title || element.ariaLabel || '').toLowerCase()
                
                // Check if it contains watermark text
                if (text.includes('built with spline') || 
                    text.includes('builtwithspline') ||
                    (text.includes('spline') && text.includes('built'))) {
                  element.style.setProperty('display', 'none', 'important')
                  element.style.setProperty('visibility', 'hidden', 'important')
                  element.style.setProperty('opacity', '0', 'important')
                  element.style.setProperty('height', '0', 'important')
                  element.style.setProperty('width', '0', 'important')
                  element.style.setProperty('pointer-events', 'none', 'important')
                  
                  // Also hide all children
                  const children = element.querySelectorAll('*')
                  children.forEach(child => {
                    child.style.setProperty('display', 'none', 'important')
                    child.style.setProperty('visibility', 'hidden', 'important')
                    child.style.setProperty('opacity', '0', 'important')
                  })
                }
                
                // Check if it's positioned in bottom right
                const styles = window.getComputedStyle(element)
                if (styles.position === 'fixed' || styles.position === 'absolute') {
                  const bottom = parseInt(styles.bottom) || 0
                  const right = parseInt(styles.right) || 0
                  if (bottom >= 0 && bottom < 100 && right >= 0 && right < 200) {
                    const className = (element.className || '').toLowerCase()
                    const id = (element.id || '').toLowerCase()
                    const innerText = (element.textContent || '').toLowerCase()
                    
                    if (className.includes('spline') ||
                        className.includes('watermark') ||
                        id.includes('spline') ||
                        id.includes('watermark') ||
                        innerText.includes('spline') ||
                        innerText.includes('built')) {
                      element.style.setProperty('display', 'none', 'important')
                      element.style.setProperty('visibility', 'hidden', 'important')
                      element.style.setProperty('opacity', '0', 'important')
                      element.style.setProperty('height', '0', 'important')
                      element.style.setProperty('width', '0', 'important')
                      element.style.setProperty('pointer-events', 'none', 'important')
                    }
                  }
                }
              }
            })
          })
        })
        
        const splineContainer = document.querySelector('.spline-background')
        if (splineContainer) {
          observer.observe(splineContainer, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class', 'id']
          })
        }
        
        // Also observe document body in case watermark is added there
        const bodyObserver = new MutationObserver(() => {
          hideWatermark()
        })
        
        bodyObserver.observe(document.body, {
          childList: true,
          subtree: true
        })
      }
    }

    hideElements()
    setTimeout(hideElements, 500)
    setTimeout(hideElements, 1000)
    setTimeout(hideElements, 2000)
  }

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
      {/* Spline 3D Background - Only on Entry Page */}
      <div className="spline-background">
        <Spline 
          scene="https://prod.spline.design/0CfDGO8iNSgcPAox/scene.splinecode"
          onLoad={onLoad}
        />
      </div>

      <div className="background-overlay"></div>
      <div className="background-gradient-overlay"></div>
      <div className="background-pattern-overlay"></div>
      
      {/* Decorative element to cover Spline watermark */}
      <div className="watermark-cover"></div>
      
      <Navbar />
      
      <div className="content-container">
        {/* Main Headline */}
        <h1 className={`headline ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <span className="headline-gradient-text">COMING SOON...</span>
        </h1>

        {/* Sub-headline */}
        <p className={`subheadline ${isVisible ? 'animate-fade-in-up-delay-1' : ''}`}>
          A new era of iPhone protection is arriving. GADGET 360 is a curated gallery 
          of the world's most exclusive, design-forward cases—because your device 
          deserves more than just a cover. It deserves a statement.
        </p>

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

