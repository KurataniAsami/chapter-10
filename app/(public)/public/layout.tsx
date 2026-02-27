export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1 className="bg-gray-600 text-white px-5 py-5 font-bold text-2xl">blog</h1>
      { children }
    </div>
  )
}
