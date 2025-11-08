import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function PhoneAnimationSection() {
  const sectionRef = useRef(null)
  const phoneContainerRef = useRef(null)
  const phoneRef = useRef(null)
  const caseMainRef = useRef(null)
  const case1Ref = useRef(null)
  const case2Ref = useRef(null)
  const case3Ref = useRef(null)
  const case4Ref = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const phoneContainer = phoneContainerRef.current
    const phone = phoneRef.current
    const caseMain = caseMainRef.current
    const case1 = case1Ref.current
    const case2 = case2Ref.current
    const case3 = case3Ref.current
    const case4 = case4Ref.current

    if (!section || !phoneContainer || !phone) return

    // Initial state - phone centered
    gsap.set(phoneContainer, {
      scale: 1,
      z: 0,
      rotationY: 0,
      transformPerspective: 1000,
    })

    gsap.set(phone, {
      opacity: 1,
    })

    gsap.set(caseMain, {
      scale: 0.8,
      opacity: 0,
    })

    // Set initial positions for surrounding cases
    gsap.set(case1, {
      opacity: 0,
      scale: 0.8,
      x: -200,
      y: 0,
    })
    gsap.set(case2, {
      opacity: 0,
      scale: 0.8,
      x: 200,
      y: 0,
    })
    gsap.set(case3, {
      opacity: 0,
      scale: 0.8,
      x: 0,
      y: -200,
    })
    gsap.set(case4, {
      opacity: 0,
      scale: 0.8,
      x: 0,
      y: 200,
    })

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    // Step 1: Phone pops up and comes forward (0-25%)
    tl.to(phoneContainer, {
      scale: 1.2,
      z: 200,
      duration: 1,
      ease: 'power2.out',
    })

    // Step 2: Phone rotates 360 degrees on Y axis (25-60%)
    tl.to(phoneContainer, {
      rotationY: 360,
      duration: 1.5,
      ease: 'power1.inOut',
    })

    // Step 3: Case fades in and scales to fit phone (60-75%)
    tl.to(caseMain, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.3')

    // Step 4: Phone returns to original position (75-90%)
    tl.to(phoneContainer, {
      scale: 1,
      z: 0,
      rotationY: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    })

    // Step 5: Reveal 4 case images around phone with slide + fade (90-100%)
    tl.to(case1, {
      opacity: 1,
      scale: 1,
      x: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.2')
    tl.to(case2, {
      opacity: 1,
      scale: 1,
      x: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.5')
    tl.to(case3, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.5')
    tl.to(case4, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.5')

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="phone-animation-section">
      <div className="phone-animation-container">
        {/* Center Phone */}
        <div className="phone-wrapper">
          <div ref={phoneContainerRef} className="phone-container">
            <img 
              ref={phoneRef}
              src="https://icon2.cleanpng.com/lnd/20240416/vry/transparent-iphone-15-pro-max-iphone-11-smartphone-camera-tech-black-iphone-11-with-camera-in-focus661f10098bf4a3.98402135.webp" 
              alt="iPhone" 
              className="phone-image"
            />
            <img 
              ref={caseMainRef}
              src="https://icon2.cleanpng.com/lnd/20240416/vry/transparent-iphone-15-pro-max-iphone-11-smartphone-camera-tech-black-iphone-11-with-camera-in-focus661f10098bf4a3.98402135.webp" 
              alt="Case" 
              className="case-main-image"
            />
          </div>
        </div>

        {/* Surrounding Cases */}
        <div className="cases-surrounding">
          <img 
            ref={case1Ref}
            src="https://icon2.cleanpng.com/lnd/20240416/vry/transparent-iphone-15-pro-max-iphone-11-smartphone-camera-tech-black-iphone-11-with-camera-in-focus661f10098bf4a3.98402135.webp" 
            alt="Case 1" 
            className="case-image case-left"
          />
          <img 
            ref={case2Ref}
            src="https://icon2.cleanpng.com/lnd/20240416/vry/transparent-iphone-15-pro-max-iphone-11-smartphone-camera-tech-black-iphone-11-with-camera-in-focus661f10098bf4a3.98402135.webp" 
            alt="Case 2" 
            className="case-image case-right"
          />
          <img 
            ref={case3Ref}
            src="https://icon2.cleanpng.com/lnd/20240416/vry/transparent-iphone-15-pro-max-iphone-11-smartphone-camera-tech-black-iphone-11-with-camera-in-focus661f10098bf4a3.98402135.webp" 
            alt="Case 3" 
            className="case-image case-top"
          />
          <img 
            ref={case4Ref}
            src="https://icon2.cleanpng.com/lnd/20240416/vry/transparent-iphone-15-pro-max-iphone-11-smartphone-camera-tech-black-iphone-11-with-camera-in-focus661f10098bf4a3.98402135.webp" 
            alt="Case 4" 
            className="case-image case-bottom"
          />
        </div>
      </div>
    </section>
  )
}

export default PhoneAnimationSection

