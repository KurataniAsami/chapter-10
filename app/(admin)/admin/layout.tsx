// 管理者
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1 className="bg-gray-600 text-white px-5 py-5 font-bold text-2xl">blog(管理者ページ)</h1>
      <div className="flex">
        <aside className="w-64 bg-gray-200 min-h-screen flex flex-col">
          <Link href={'/admin'}>
            記事一覧
          </Link>

          <Link href={"/admin/categories"}>
            カテゴリー一覧
          </Link>
        </aside>

        <main className="w-full">
          {children}
        </main>
      </div>
    </div>
  );
}



