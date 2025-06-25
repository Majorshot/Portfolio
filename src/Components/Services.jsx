import React from 'react'
import CardSwap, { Card } from './Animations/CardSwap'
import assets from '../assets/assets'
import ShinyText from './Animations/ShinyText'
import AnimatedContent from './Animations/AnimatedContent'

const Services = () => {
  return (
    <div id='services' className='bg-black text-white pt-24 overflow-hidden w-screen h-full min-h-screen  items-center'>
      <div className='text-center mb-6'>
            <ShinyText
              text="My Services"
              disabled={false}
              speed={3}
              className="text-5xl lg:text-7xl font-bold"
            />
          </div>
      <div className='container mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-12'>
        {/* Left side - Services Content */}
        <div className='flex-1 max-w-2xl'>
          
          <p className='text-xl text-gray-300 mb-8 leading-relaxed'>
            Transforming ideas into digital experiences with cutting-edge technology and creative expertise. 
            Let me bring your vision to life through innovative solutions.
          </p>
          <h2 className='text-3xl font-semibold mb-6 text-white'>
            What I Offer
          </h2>
          
          {/* Services Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <AnimatedContent
              distance={100}
              direction="horizontal"
              reverse={true}
              config={{ tension: 50, friction: 25 }}
              initialOpacity={0.2}
              animateOpacity
              scale={1}
              threshold={0.1}
            >
              <div className='bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-gray-600 transition-all duration-300 h-full flex flex-col'>
              <div className='w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 flex-shrink-0'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold mb-2 text-white flex-shrink-0'>Web Development</h3>
              <p className='text-gray-400 text-sm flex-grow'>Modern, responsive websites and web applications built with the latest technologies.</p>
            </div>
            </AnimatedContent>
            
            <AnimatedContent
              distance={100}
              direction="horizontal"
              reverse={true}
              config={{ tension: 50, friction: 25 }}
              initialOpacity={0.2}
              animateOpacity
              scale={1}
              threshold={0.1}
            >
              <div className='bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-gray-600 transition-all duration-300 h-full flex flex-col'>
              <div className='w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4 flex-shrink-0'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold mb-2 text-white flex-shrink-0'>Graphic Design</h3>
              <p className='text-gray-400 text-sm flex-grow'>Creative visual solutions including branding, logos, and digital graphics.</p>
            </div>
            </AnimatedContent>

              <AnimatedContent
              distance={100}
              direction="horizontal"
              reverse={true}
              config={{ tension: 50, friction: 25 }}
              initialOpacity={0.2}
              animateOpacity
              scale={1}
              threshold={0.1}
            >
               <div className='bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-gray-600 transition-all duration-300 h-full flex flex-col'>
              <div className='w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4 flex-shrink-0'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 13a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold mb-2 text-white flex-shrink-0'>Photography</h3>
              <p className='text-gray-400 text-sm flex-grow'>Professional photography services for events, portraits, and commercial projects.</p>
            </div>

            </AnimatedContent>

            <AnimatedContent
              distance={100}
              direction="horizontal"
              reverse={true}
              config={{ tension: 50, friction: 25 }}
              initialOpacity={0.2}
              animateOpacity
              scale={1}
              threshold={0.1}
            >
              <div className='bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-gray-600 transition-all duration-300 h-full flex flex-col'>
              <div className='w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4 flex-shrink-0'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold mb-2 text-white flex-shrink-0'>Video Editing</h3>
              <p className='text-gray-400 text-sm flex-grow'>Professional video editing and post-production for marketing and creative content.</p>
            </div>
            </AnimatedContent>
            

           
            
          </div>
        </div>

        {/* Right side - Card Swap Animation */}
        
         <div className='relative h-[200px] lg:h-[500px]'>
  <CardSwap
    cardDistance={60}
    verticalDistance={70}
    delay={3000}
    pauseOnHover={false}
  >
    <Card>
      <div className="h-full flex flex-col border border-gray-300 rounded-xl overflow-hidden bg-white">
        <h3 className='border-b border-gray-300 pl-3 py-2 text-black font-medium'>Web development</h3>
        <div className="flex-1 overflow-hidden">
          <img src={assets.web} alt="web" className="w-full h-full object-cover" />
        </div>
      </div>
    </Card>
    <Card>
      <div className="h-full flex flex-col border border-gray-300 rounded-xl overflow-hidden bg-white">
        <h3 className='border-b border-gray-300 pl-3 py-2 text-black font-medium'>Graphic designing</h3>
        <div className="flex-1 overflow-hidden">
          <img src={assets.graphic} alt="graphic" className="w-full h-full object-cover" />
        </div>
      </div>
    </Card>
    <Card>
      <div className="h-full flex flex-col border border-gray-300 rounded-xl overflow-hidden bg-white">
        <h3 className='border-b border-gray-300 pl-3 py-2 text-black font-medium'>Photography & Video editing</h3>
        <div className="flex-1 overflow-hidden">
          <img src={assets.editing} alt="editing" className="w-full h-full object-cover" />
        </div>
      </div>
    </Card>
  </CardSwap>
</div>
        
      </div>
    </div>
  )
}

export default Services