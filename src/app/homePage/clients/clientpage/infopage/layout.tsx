// const inter = Inter({ subsets: ['latin'] })

export default function InfoPageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            {children}
        </div>
    )
}
