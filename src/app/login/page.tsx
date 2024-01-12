import { LoginForm } from '@/components/login/LoginForm'
import { authOptions } from '@/lib/next-auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const getSession = async () => {
  const session = await getServerSession(authOptions)
  if (session) redirect('/')
}

const LoginPage = async () => {
  await getSession()
  return <LoginForm />
}
export default LoginPage
