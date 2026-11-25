import { Suspense } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function TabelBuku({ cari }: { cari?: string }) {
  const daftar = await prisma.buku.findMany({
    where: cari
      ? {
          OR: [
            { judul: { contains: cari } },
            { penulis: { contains: cari } },
          ],
        }
      : undefined,
    orderBy: { judul: "asc" },
  });

  if (daftar.length === 0) {
    return <p className="mt-6 text-gray-500">Buku tidak ditemukan.</p>;
  }

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3">No</th>
            <th className="p-3">Judul</th>
            <th className="p-3">Penulis</th>
            <th className="p-3">Kategori</th>
            <th className="p-3">Stok</th>
            <th className="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {daftar.map((b, i) => (
            <tr key={b.id}>
              <td className="p-3">{i + 1}</td>
              <td className="p-3">{b.judul}</td>
              <td className="p-3">{b.penulis}</td>
              <td className="p-3">{b.kategori}</td>
              <td className="p-3">
                <span
                  className={
                    b.tersedia === 0
                      ? "rounded-full bg-red-100 px-2 py-0.5 text-red-700"
                      : ""
                  }
                >
                  {b.tersedia}/{b.stok}
                </span>
              </td>
              <td className="p-3">
                <Link
                  href={`/buku/${b.id}`}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-1 shadow-sm hover:bg-gray-50"
                >
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

async function PencarianBuku({
  searchParams,
}: {
  searchParams: Promise<{ cari?: string | string[] }>;
}) {
  const { cari: nilaiCari } = await searchParams;
  const cari = Array.isArray(nilaiCari) ? nilaiCari[0] : nilaiCari;

  return (
    <>
      <form action="/buku" method="get" className="mt-4 flex gap-2">
        <input
          name="cari"
          defaultValue={cari}
          placeholder="Cari judul atau penulis"
          className="w-full rounded-lg border border-gray-300 bg-white p-2 text-sm shadow-sm"
        />
        <button className="rounded-lg bg-black px-4 text-sm text-white shadow-sm">
          Cari
        </button>
      </form>

      <Suspense
        key={cari}
        fallback={<p className="mt-6 text-gray-500">Memuat data...</p>}
      >
        <TabelBuku cari={cari} />
      </Suspense>
    </>
  );
}

export default function DaftarBukuPage({
  searchParams,
}: {
  searchParams: Promise<{ cari?: string | string[] }>;
}) {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">Daftar buku</h1>
          <Link
            href="/buku/baru"
            className="rounded-lg bg-black px-4 py-2 text-sm text-white shadow-sm"
          >
            + Tambah buku
          </Link>
        </div>

        <Suspense
          fallback={<p className="mt-6 text-gray-500">Memuat data...</p>}
        >
          <PencarianBuku searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}