import { AdminLoginForm } from '@/components/admin/AdminLoginForm'

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto w-12 h-12 rounded-xl bg-navy-800 border border-gold-500/30 flex items-center justify-center mb-4">
          <span className="text-gold-500 font-bold text-xl" style={{ fontFamily: 'var(--font-sora)' }}>F</span>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-white" style={{ fontFamily: 'var(--font-sora)' }}>
          Admin Login
        </h2>
        <p className="mt-2 text-center text-sm text-navy-300">
          Sign in to access the Flowtaris management dashboard.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-navy-900 py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-navy-800">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  )
}
