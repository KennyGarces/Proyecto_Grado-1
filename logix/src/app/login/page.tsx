'use client'

import Image from 'next/image'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { signIn } from '@/app/lib/auth'
import Link from 'next/link'

export default function RegisterPage() {
  const [loading, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(async () => {
      const isError = Object.values(formData).some(value => value === '')

      if (isError) {
        toast.error('Por favor, completa todos los campos.')
        return
      }

      const response = await signIn({
        email: formData.email,
        password: formData.password,
      })

      if (!response.success) {
        toast.error(response.error || 'Error al iniciar sesión.')
        return
      }
    })
  }

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='flex w-full max-w-6xl items-center justify-center gap-10'>
        <div className='bg-gray-light flex w-1/2 max-w-2xl flex-col rounded-3xl p-20'>
          <h1 className='text-dark mb-8 text-center text-3xl font-bold'>
            ACCESO
          </h1>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='text-dark mb-2 block text-sm font-medium'>
                Correo electrónico
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                placeholder='correo@electronico.com'
                className='focus:ring-accent text-gray-dark bg-light border-gray-light w-full rounded-lg border px-4 py-3 focus:border-transparent focus:ring-2 focus:outline-none'
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='text-dark mb-2 block text-sm font-medium'>
                Contraseña
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                placeholder='Contraseña'
                className='focus:ring-accent text-gray-dark bg-light border-gray-light w-full rounded-lg border px-4 py-3 focus:border-transparent focus:ring-2 focus:outline-none'
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='bg-accent hover:bg-accent-dark text-ligbg-light w-full cursor-pointer rounded-lg px-4 py-3 font-bold transition-colors duration-200 disabled:opacity-50'>
              LOGIN
            </button>

            <div className='mt-4 text-center'>
              <p className='text-dark text-sm'>
                ¿No tienes cuenta?{' '}
                <Link
                  href='/register'
                  className='text-accent font-semibold hover:underline'>
                  Regístrate
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className='w-1/2'>
          <Image
            src={'/LogiXLogo.webp'}
            alt='Logo LOGIX'
            width={283}
            height={283}
            quality={100}
            priority
            className='h-auto w-full rounded-3xl'
          />
        </div>
      </div>
    </div>
  )
}
