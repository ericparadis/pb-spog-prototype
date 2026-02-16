import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrandProvider } from '@/lib/contexts/BrandContext'
import { AuthProvider } from '@/lib/contexts/AuthContext'
import { LocationProvider } from '@/lib/contexts/LocationContext'
import { PrototypeControls } from '@/components/PrototypeControls'
import { AppLayout } from '@/components/AppLayout'
import { routes } from './routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrandProvider>
        <AuthProvider>
          <LocationProvider>
          <PrototypeControls>
            <BrowserRouter>
              <AppLayout>
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-screen">
                      <div className="text-muted-foreground">Loading...</div>
                    </div>
                  }
                >
                  <Routes>
                    {routes.map((route) => {
                      const Component = route.element
                      return <Route key={route.path} path={route.path} element={<Component />} />
                    })}
                  </Routes>
                </Suspense>
              </AppLayout>
            </BrowserRouter>
          </PrototypeControls>
          </LocationProvider>
        </AuthProvider>
      </BrandProvider>
    </QueryClientProvider>
  )
}

export default App
