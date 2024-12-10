// app/layout.tsx
import './globals.css'
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <main className="min-h-screen min-w-screen bg-background p-5">
            {children}
        </main>
        </body>
        </html>
    );
}
