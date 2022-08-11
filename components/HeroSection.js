import Image from 'next/image'
import React from 'react'
import Navbar from './Navbar'

const HeroSection = () => {
    return (
        <div>
            <div className='hero-bg'>
                <div className="hero-navbar">
                    <Navbar />
                </div>
                <div className="sm-ornament-curve">
                    <div className="lg-ornament-curve">
                        <Image src="/images/ornaments/curve.png" alt="Top Arrow" width={690} height={582} />
                    </div>
                    <div className="hero-info">
                        <div className='hero-text-outer'>
                            <div className='hero-heading'>
                                <div className="ornament">
                                    <Image src="/images/ornaments/sketch.png" alt="Top Arrow" width={55} height={52} />
                                </div>
                                React
                            </div>
                            <div className='hero-heading'>Conference</div>
                            <div className='hero-text-bottom'>
                                <p className="hero-description">
                                    Lorem uis diam turpis quam id fermentum.In quis diam turpis quam id fermentum..id fermentum.In quis diam turpis quam id fermentum.
                                </p>
                                <button className='hero-btn'>
                                    <span>Buy Tickets</span>
                                    <Image src="/images/top-arrow.png" alt="Top Arrow" width={15} height={15} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="hero-images">
                        <div className="hero-img-left">
                            <div className='hero-img-inner'>
                                <div className='main'>
                                    <Image src="/images/hero-left.png" alt="Top Arrow" layout='fill' className="hero-left" />
                                </div>
                                <div className='ornament'>
                                    <Image src="/images/ornaments/web.png" alt="Top Arrow" width={96} height={89} />
                                </div>
                            </div>
                        </div>
                        <div className="hero-img-right">
                            <div className="main">
                                <Image src="/images/hero-right.png" alt="Hero" layout='fill' className="hero-right" />
                            </div>
                            <div className='ornament'>
                                <Image src="/images/ornaments/star.png" alt="Top Arrow" width={80} height={80} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection