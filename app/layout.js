import './globals.css'

export const metadata = {
  title: 'FocusTrack Pro',
  description: 'The ultimate tool for time tracking, deep focus, and seamless team collaboration. Unlock your potential with smarter workflows and real-time insights.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
