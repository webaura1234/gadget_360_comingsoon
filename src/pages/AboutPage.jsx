import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../LandingPage.css'

function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="page-container">
      <Navbar />
      
      <div className="page-content">
        <div className={`about-section-full ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h1 className="page-headline">
            <span className="page-headline-gradient">About GADGET 360</span>
          </h1>
          
          <div className="about-content">
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

            <p className="section-text">
              At GADGET 360, we believe that your iPhone deserves the finest protection available. 
              Every case in our collection is meticulously selected, ensuring that it meets our 
              standards of excellence in both form and function.
            </p>

            <p className="section-text">
              We partner with the world's most innovative designers and manufacturers to bring 
              you cases that are not just accessories, but extensions of your personal style 
              and taste.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

