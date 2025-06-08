'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Users,
  Award,
  Brain,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'
import { useUser } from '@/app/hooks/useUser'
import { getUser } from '@/app/lib/data'
import { cn } from './lib/utils'

export default function Home() {
  const { user, setUser } = useUser()

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser()

      if (!response.success) return

      setUser(response.data)
    }

    fetchUser()
  }, [setUser])

  return (
    <div className='from-gray-light to-highlight-light min-h-screen bg-gradient-to-br'>
      {/* Header */}
      <header className='border-gray/50 bg-light/80 sticky top-0 z-50 border-b px-6 py-4 backdrop-blur-md lg:px-12'>
        <div className='mx-auto flex max-w-7xl items-center justify-between'>
          <Link href='/' className='flex items-center space-x-2'>
            <Image
              src='/LogiXLogo.webp'
              alt='Logo LOGIX'
              width={283}
              height={283}
              quality={100}
              priority
              className='h-16 w-auto'
            />
          </Link>
          <nav className='hidden items-center space-x-8 md:flex'>
            <Link
              href='#features'
              className='text-gray-dark hover:text-dark transition-colors'>
              Features
            </Link>
            <Link
              href='#how-it-works'
              className='text-gray-dark hover:text-dark transition-colors'>
              How it Works
            </Link>
            <Link
              href='#about'
              className='text-gray-dark hover:text-dark transition-colors'>
              About
            </Link>
          </nav>
          <div className='flex items-center space-x-4'>
            {user ? (
              <Link
                href='/home'
                className='bg-primary hover:bg-primary-dark text-light inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'>
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href='/login'
                  className='hover:bg-accent/10 hover:text-accent-dark text-gray-dark inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'>
                  Sign In
                </Link>
                <Link
                  href='/register'
                  className='bg-primary hover:bg-primary-dark text-light inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='relative overflow-hidden'>
        <div className='from-primary via-secondary to-primary-dark absolute inset-0 bg-gradient-to-br'></div>
        <div className='bg-grid-light/[0.05] absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,light,transparent)]'></div>

        <div className='relative mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32'>
          <div className='grid items-center gap-12 lg:grid-cols-2'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-center lg:text-left'>
              <div className='bg-accent/20 text-light border-accent/30 mb-6 inline-flex rounded-full border px-3 py-1 text-sm font-medium'>
                🚀 New Platform Launch
              </div>
              <h1 className='mb-6 text-4xl leading-tight font-bold text-white lg:text-6xl'>
                Master{' '}
                <span className='from-highlight to-accent bg-gradient-to-r bg-clip-text text-transparent'>
                  Computational Thinking
                </span>{' '}
                Through Play
              </h1>
              <p className='text-highlight-light mb-8 max-w-2xl text-xl'>
                Develop essential 21st century skills with our gamified learning
                platform designed for university students. Learn, compete, and
                grow with engaging challenges.
              </p>
              <div className='flex flex-col justify-center gap-4 sm:flex-row lg:justify-start'>
                {user ? (
                  <Link
                    href='/dashboard'
                    className='text-primary hover:bg-gray-light inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'>
                    Go to Dashboard <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                ) : (
                  <>
                    <Link
                      href='/register'
                      className='text-primary hover:bg-gray-light inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'>
                      Get Started Free <ArrowRight className='ml-2 h-4 w-4' />
                    </Link>
                    <Link
                      href='/login'
                      className='inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'>
                      Sign In
                    </Link>
                  </>
                )}
              </div>
              <div className='text-highlight mt-8 flex items-center justify-center space-x-6 lg:justify-start'>
                <div className='flex items-center space-x-2'>
                  <CheckCircle className='h-5 w-5' />
                  <span>Free to start</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <CheckCircle className='h-5 w-5' />
                  <span>No credit card</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='relative'>
              <div className='relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-sm'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-accent/20 rounded-lg p-4 text-center'>
                    <div className='text-2xl font-bold text-white'>1000+</div>
                    <div className='text-highlight text-sm'>
                      Active Students
                    </div>
                  </div>
                  <div className='bg-secondary/20 rounded-lg p-4 text-center'>
                    <div className='text-2xl font-bold text-white'>50+</div>
                    <div className='text-highlight text-sm'>Challenges</div>
                  </div>
                  <div className='bg-gray/20 rounded-lg p-4 text-center'>
                    <div className='text-2xl font-bold text-white'>95%</div>
                    <div className='text-gray-light text-sm'>Success Rate</div>
                  </div>
                  <div className='bg-primary-light/20 rounded-lg p-4 text-center'>
                    <div className='text-2xl font-bold text-white'>24/7</div>
                    <div className='text-highlight-light text-sm'>Support</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className='absolute right-0 bottom-0 left-0'>
          <svg viewBox='0 0 1440 120' className='h-auto w-full'>
            <path
              fill='#f8fafc'
              d='M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z'
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className='bg-gray-light py-24'>
        <div className='mx-auto max-w-7xl px-6 lg:px-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='mb-16 text-center'>
            <div className='bg-primary/10 text-primary border-primary/20 mb-4 inline-flex rounded-full border px-3 py-1 text-sm font-medium'>
              Core Features
            </div>
            <h2 className='text-dark mb-6 text-4xl font-bold lg:text-5xl'>
              Develop Critical Skills Through{' '}
              <span className='text-primary'>Gamification</span>
            </h2>
            <p className='text-gray-dark mx-auto max-w-3xl text-xl'>
              Our platform combines proven educational methodologies with
              engaging game mechanics to make learning computational thinking
              fun and effective.
            </p>
          </motion.div>

          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {[
              {
                icon: Brain,
                title: 'Computational Thinking',
                description:
                  'Learn to break down complex problems into manageable parts and design effective solutions.',
                color: 'primary',
                delay: 0,
              },
              {
                icon: Award,
                title: 'Gamified Learning',
                description:
                  'Earn XP, level up, unlock badges, and compete on leaderboards as you master new concepts.',
                color: 'accent',
                delay: 0.1,
              },
              {
                icon: BookOpen,
                title: 'Engaging Challenges',
                description:
                  'Tackle diverse challenges designed to develop your problem-solving and analytical skills.',
                color: 'secondary',
                delay: 0.2,
              },
              {
                icon: Users,
                title: 'Community Learning',
                description:
                  'Join a community of learners and educators passionate about computational thinking.',
                color: 'highlight',
                delay: 0.3,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className='group'>
                <div className='h-full border-0 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl'>
                  <div
                    className={cn(
                      `mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-${feature.color}/10 group-hover:bg-${feature.color}/20 transition-colors`
                    )}>
                    <feature.icon
                      className={cn(`text h-8 w-8 text-${feature.color}`)}
                    />
                  </div>
                  <h3 className='text-dark mb-4 text-xl font-bold'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-dark leading-relaxed'>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id='how-it-works' className='bg-white py-24'>
        <div className='mx-auto max-w-7xl px-6 lg:px-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='mb-16 text-center'>
            <div className='bg-gray/10 text-gray-dark border-gray/20 mb-4 inline-flex rounded-full border px-3 py-1 text-sm font-medium'>
              Simple Process
            </div>
            <h2 className='text-dark mb-6 text-4xl font-bold lg:text-5xl'>
              How It Works
            </h2>
            <p className='text-gray-dark mx-auto max-w-3xl text-xl'>
              Our step-by-step approach makes learning computational thinking
              skills engaging and effective for students at all levels.
            </p>
          </motion.div>

          <div className='grid gap-8 md:grid-cols-3 lg:gap-12'>
            {[
              {
                step: '1',
                title: 'Create Your Account',
                description:
                  'Sign up as a student or teacher and set up your personalized profile to begin your learning journey with us.',
                color: 'primary',
              },
              {
                step: '2',
                title: 'Take on Challenges',
                description:
                  'Complete interactive challenges that test and develop your computational thinking skills through engaging gameplay.',
                color: 'accent',
              },
              {
                step: '3',
                title: 'Level Up & Earn Rewards',
                description:
                  'Gain experience points, earn achievement badges, and climb the leaderboard as you develop your skills.',
                color: 'secondary',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className='relative text-center'>
                <div className='relative'>
                  <div className='from-primary to-secondary mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br text-2xl font-bold text-white shadow-lg'>
                    {item.step}
                  </div>
                  {index < 2 && (
                    <div className='from-gray absolute top-10 left-full -z-10 hidden h-0.5 w-full bg-gradient-to-r to-transparent md:block'></div>
                  )}
                </div>
                <h3 className='text-dark mb-4 text-2xl font-bold'>
                  {item.title}
                </h3>
                <p className='text-gray-dark leading-relaxed'>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='from-primary via-secondary to-primary-dark relative overflow-hidden bg-gradient-to-br py-24'>
        <div className='bg-grid-white/[0.05] absolute inset-0'></div>
        <div className='relative mx-auto max-w-4xl px-6 text-center lg:px-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            <h2 className='mb-6 text-4xl font-bold text-white lg:text-5xl'>
              Ready to Develop Your{' '}
              <span className='from-highlight to-accent bg-gradient-to-r bg-clip-text text-transparent'>
                Computational Thinking
              </span>{' '}
              Skills?
            </h2>
            <p className='text-highlight-light mx-auto mb-10 max-w-2xl text-xl'>
              Join thousands of students already enhancing their problem-solving
              abilities through our gamified platform.
            </p>
            <div className='flex flex-col justify-center gap-4 sm:flex-row'>
              {user ? (
                <Link
                  href='/home'
                  className='text-primary hover:bg-gray-light inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'>
                  Go to Dashboard <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              ) : (
                <>
                  <Link
                    href='/register'
                    className='text-primary hover:bg-gray-light inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'>
                    Get Started Today <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                  <Link
                    href='/about'
                    className='inline-flex items-center justify-center rounded-md border border-white/20 px-4 px-6 py-2 py-3 text-base text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'>
                    Learn More
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
