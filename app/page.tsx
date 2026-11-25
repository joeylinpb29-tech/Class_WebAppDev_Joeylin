import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md">
        {}
        <section className="py-8 text-center">
          <h1 className="text-3xl font-bold">PustakaKu</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">
            Aplikasi web sederhana untuk mencatat buku-buku perpustakaan
            sekolah. Menggantikan pencatatan manual agar data buku lebih rapi,
            mudah dicari, dan stok buku selalu terpantau.
          </p>
          <Link
            href="/buku"
            className="mt-5 inline-block rounded-lg bg-black px-4 py-2 text-sm text-white shadow-sm"
          >
            Lihat Daftar Buku
          </Link>
        </section>

        {}
        <section className="grid gap-4 border-t border-gray-100 pt-6 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold">Daftar Buku</h2>
            <p className="mt-1 text-xs text-gray-600">
              Lihat seluruh koleksi buku beserta stok yang tersedia.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold">Cari Cepat</h2>
            <p className="mt-1 text-xs text-gray-600">
              Temukan buku berdasarkan judul atau nama penulis.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold">Tambah Buku</h2>
            <p className="mt-1 text-xs text-gray-600">
              Catat buku baru ke dalam database perpustakaan.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}