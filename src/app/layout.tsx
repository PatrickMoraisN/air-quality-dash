import { Provider } from '../components/ui/provider'
import { ThemeProvider } from '../context/ThemeContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <ThemeProvider>{children}</ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}
