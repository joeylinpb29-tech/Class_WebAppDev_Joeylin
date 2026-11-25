"use client";

import Link from "next/link";
import { useActionState } from "react";
import { tambahBuku, type BukuFormState } from "@/app/action";
import { KATEGORI } from "@/lib/kategori";

const awal: BukuFormState = { pesan: "" };

const labelStyle = "block text-xs font-medium";
const inputStyle =
  "mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm shadow-sm placeholder:text-gray-400";
const galatStyle = "mt-1 text-xs text-red-800";

export default function FormBuku() {
  const [state, formAction, pending] = useActionState(tambahBuku, awal);

  return (
    <form action={formAction} className="space-y-3">
      {}
      <div>
        <label htmlFor="judul" className={labelStyle}>
          Judul *
        </label>
        <input
          id="judul"
          name="judul"
          placeholder="Judul buku"
          defaultValue={state.values?.judul}
          className={inputStyle}
        />
        {state.galat?.judul && <p className={galatStyle}>{state.galat.judul}</p>}
      </div>

      {}
      <div>
        <label htmlFor="penulis" className={labelStyle}>
          Penulis *
        </label>
        <input
          id="penulis"
          name="penulis"
          placeholder="Nama penulis"
          defaultValue={state.values?.penulis}
          className={inputStyle}
        />
        {state.galat?.penulis && (
          <p className={galatStyle}>{state.galat.penulis}</p>
        )}
      </div>

      {}
      <div>
        <label htmlFor="kategori" className={labelStyle}>
          Kategori *
        </label>
        <select
          id="kategori"
          name="kategori"
          defaultValue={state.values?.kategori ?? ""}
          className={inputStyle}
        >
          <option value="">Pilih kategori</option>
          {KATEGORI.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        {state.galat?.kategori && (
          <p className={galatStyle}>{state.galat.kategori}</p>
        )}
      </div>

      {}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="tahun" className={labelStyle}>
            Tahun terbit
          </label>
          <input
            id="tahun"
            name="tahun"
            type="number"
            placeholder="2005"
            defaultValue={state.values?.tahun}
            className={inputStyle}
          />
          {state.galat?.tahun && <p className={galatStyle}>{state.galat.tahun}</p>}
        </div>
        <div>
          <label htmlFor="stok" className={labelStyle}>
            Jumlah stok *
          </label>
          <input
            id="stok"
            name="stok"
            type="number"
            placeholder="5"
            defaultValue={state.values?.stok}
            className={inputStyle}
          />
          {state.galat?.stok && <p className={galatStyle}>{state.galat.stok}</p>}
        </div>
      </div>

      {}
      <div>
        <label htmlFor="deskripsi" className={labelStyle}>
          Deskripsi
        </label>
        <textarea
          id="deskripsi"
          name="deskripsi"
          rows={3}
          placeholder="Deskripsi buku"
          defaultValue={state.values?.deskripsi}
          className={inputStyle}
        />
      </div>

      {}
      <div className="flex items-center justify-between pt-1">
        <Link
          href="/buku"
          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs shadow-sm hover:bg-gray-50"
        >
          Batal
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-black px-4 py-1.5 text-xs text-white shadow-sm disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Simpan"}
        </button>
      </div>

      {state.pesan && <p className={galatStyle}>{state.pesan}</p>}
    </form>
  );
}