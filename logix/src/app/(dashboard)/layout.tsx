'use client'

import { LogOutIcon } from 'lucide-react'
import { signOut } from '@/app/lib/auth'
import { resetAllStores } from '@/app/hooks/store-creator'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex min-h-dvh flex-col gap-4 p-4'>
      <header className='bg-light text-dark flex w-full items-center justify-between rounded-xl px-6 py-4'>
        <h1 className='text-xl font-bold'>Dashboard</h1>
        <div className='flex items-center justify-center gap-4'>
          <div className='flex w-2xl'>
            <div className='relative flex h-8 w-full rounded-xl bg-gray-300'>
              <div className='rounded-xl bg-cyan-500' style={{ width: '3%' }} />
              <span className='text-dark absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 font-bold'>
                XP
              </span>
            </div>
          </div>
          <button
            className='text-dark cursor-pointer rounded-xl px-4 py-2 font-bold hover:bg-gray-200 focus:outline-none'
            onClick={() => {
              resetAllStores()
              signOut()
            }}>
            <LogOutIcon />
          </button>
        </div>
      </header>
      <main className='flex grow'>{children}</main>
    </div>
  )
}
