import React from 'react'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/actions/user.actions'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import MobileNavigation from '@/components/MobileNavigation'
import { Toaster } from '@/components/ui/toaster'

// Force-dynamic configuration -> to ensure that the route is dynamically rendered at request time rather than being statically generated.
export const dynamic = 'force-dynamic'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) return redirect('/sign-in')

  return (
    <main className='flex h-screen'>
      <Sidebar {...currentUser} />

      <section className='flex h-full flex-1 flex-col'>
        <MobileNavigation {...currentUser} />
        <Header userId={currentUser.$id} accountId={currentUser.accountId} />
        <div className='main-content'>{children}</div>
      </section>

      <Toaster />
    </main>
  )
}

export default Layout
