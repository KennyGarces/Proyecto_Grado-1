'use server'

import { prisma } from '@/prisma'
import { createClient } from '@/supabase/server'
import { Prisma } from '@prisma/client'
import { Response, Student, Teacher } from './definitions'

export async function getUser(): Promise<Response<Student | Teacher>> {
  try {
    const supabase = await createClient()
    const session = await supabase.auth.getUser()

    if (!session.data.user) {
      return {
        success: false,
        error: 'User not found.',
      }
    }

    const [studentProfile, teacherProfile] = await prisma.$transaction([
      prisma.studentProfile.findFirst({
        where: {
          authId: session.data.user.id,
        },
      }),
      prisma.teacherProfile.findFirst({
        where: {
          authId: session.data.user.id,
        },
      }),
    ])

    const entity: Student | Teacher | null = studentProfile
      ? {
          ...studentProfile,
          role: 'student',
        }
      : teacherProfile
        ? {
            ...teacherProfile,
            role: 'teacher',
          }
        : null

    if (!entity) {
      return {
        success: false,
        error: 'User not found.',
      }
    }

    return {
      success: true,
      data: entity,
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma Error:', error.message)
      return {
        success: false,
        error: 'Error fetching user.',
      }
    }
    console.error(error)
    return {
      success: false,
      error: 'Error fetching user.',
    }
  }
}
