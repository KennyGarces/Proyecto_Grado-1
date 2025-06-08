'use server'

import { redirect } from 'next/navigation'
import { prisma } from '@/prisma'
import { signInSchema } from '@/app/lib/parsers'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'
import { createClient } from '@/supabase/server'

type CreateUser = {
  fisrtName: string
  lastName: string
  email: string
  password: string
  role: 'student' | 'teacher'
}

export async function signUp(user: CreateUser) {
  try {
    const supabase = await createClient()

    if (user.email === '') {
      return {
        success: false,
        error: 'Patient email is not registered.',
      }
    }

    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    })

    if (error) {
      console.error(error)
      return {
        success: false,
        error: 'Error creating user.',
      }
    }

    const { user: supabaseUser } = data

    if (!supabaseUser) {
      return {
        success: false,
        error: 'Error creating user.',
      }
    }

    if (user.role === 'teacher') {
      const newTeacher = await prisma.teacherProfile.create({
        data: {
          authId: supabaseUser?.id,
          firstName: user.fisrtName,
          lastName: user.lastName,
        },
      })

      return {
        success: true,
        data: newTeacher,
      }
    }

    const newStudent = await prisma.studentProfile.create({
      data: {
        authId: supabaseUser?.id,
        firstName: user.fisrtName,
        lastName: user.lastName,
      },
    })

    return {
      success: true,
      data: newStudent,
    }
  } catch (error) {
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const supabase = await createClient()

        await supabase.auth.admin.deleteUser(user.email)

        return {
          success: false,
          error: 'Patient id already exists.',
        }
      }
    }
    return {
      success: false,
      error: 'Error creating user.',
    }
  }
}

export async function signIn(credentials: { email: string; password: string }) {
  try {
    const supabase = await createClient()

    const sanitizedCredentials = await signInSchema.safeParseAsync(credentials)

    if (!sanitizedCredentials.success) {
      return { success: false, error: 'Invalid credentials.' }
    }

    const { email, password } = sanitizedCredentials.data

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error(error)
      if (error.code === 'email_not_confirmed') {
        return {
          success: false,
          error: 'Email not confirmed.',
        }
      }
      return { success: false, error: 'Invalid credentials.' }
    }

    const { user: supabaseUser } = data

    if (!supabaseUser) {
      return { success: false, error: 'Invalid credentials.' }
    }

    const teacher = await prisma.teacherProfile.findUnique({
      where: {
        authId: supabaseUser.id,
      },
    })

    const student = await prisma.studentProfile.findUnique({
      where: {
        authId: supabaseUser.id,
      },
    })

    if (!student && !teacher) {
      return { success: false, error: 'An error has ocurred.' }
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e.code, e.message)
      return { success: false, error: 'Invalid credentials.' }
    }
    if (e instanceof ZodError) {
      return { success: false, error: 'Invalid credentials.' }
    }
    console.error(e)
    return { success: false, error: 'Somethin went wrong.' }
  }

  redirect('/home')
}

export async function signOut() {
  const supabase = await createClient()

  await supabase.auth.signOut({ scope: 'local' })
  redirect('/login')
}
