// app/admin/tools/shortener/layout.tsx
export default function ShortenerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-6">{children}</div>;
}
