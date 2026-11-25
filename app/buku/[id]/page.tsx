import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

async function DataBuku({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const nomor = Number(id);
  if (!Number.isInteger(nomor)) notFound();

  const buku = await prisma.buku.findUnique({ where: { id: nomor } });
  if (!buku) notFound();

  const habis = buku.tersedia === 0;

  return (
    <div className="mt-4 flex gap-5">
      {}
      <div className="flex h-48 w-36 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-500">
        Sampul
      </div>

      {}
      <div className="space-y-1.5">
        <h1 className="text-base font-bold">{buku.judul}</h1>
        <p className="text-xs text-gray-700">Penulis: {buku.penulis}</p>
        <p className="text-xs text-gray-700">
          Kategori: {buku.kategori}
          {buku.tahun ? ` · Tahun: ${buku.tahun}` : ""}
        </p>
        <p className="text-xs">
          Stok:{" "}
          <span
            className={`rounded-full border px-2 py-0.5 ${
              habis
                ? "border-red-200 bg-red-100 text-red-700"
                : "border-green-200 bg-green-100 text-green-800"
            }`}
          >
            {buku.tersedia} dari {buku.stok} tersedia
          </span>
        </p>
        <p className="pt-1 text-xs text-gray-700">
          {buku.deskripsi ?? "Belum ada deskripsi."}
        </p>
      </div>
    </div>
  );
}

export default function DetailBukuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-md">
        <Link href="/buku" className="text-xs text-gray-600 hover:underline">
          &lsaquo; Kembali ke daftar
        </Link>
        <Suspense
          fallback={<p className="mt-4 text-xs text-gray-500">Memuat data...</p>}
        >
          <DataBuku params={params} />
        </Suspense>
      </div>
    </main>
  );
}