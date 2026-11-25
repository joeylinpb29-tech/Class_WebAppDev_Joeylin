import FormBuku from "@/components/FormBuku";

export default function TambahBukuPage() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h1 className="mb-4 text-base font-bold">Tambah buku baru</h1>
        <FormBuku />
      </div>
    </main>
  );
}