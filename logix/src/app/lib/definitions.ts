export interface ServerActionResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export type SuccessResponse<T> = ServerActionResponse<T> & {
  success: true
  data: T
  error?: never
}
export type ErrorResponse = ServerActionResponse<never> & {
  success: false
  data?: never
  error: string
}

export type Response<T> = SuccessResponse<T> | ErrorResponse

export interface StudentProfile {
  id?: string
  authId: string
  firstName: string
  lastName: string
  experience: number
  level: number
  createdAt?: Date
  updatedAt?: Date
}

export interface TeacherProfile {
  id?: string
  authId: string
  firstName: string
  lastName: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Student extends StudentProfile {
  role: 'student'
}

export interface Teacher extends TeacherProfile {
  role: 'teacher'
}

export interface UserState {
  user: Student | Teacher | null
}

export interface UserActions {
  setUser: (user: Student | Teacher) => void
  clearUser: () => void
}
