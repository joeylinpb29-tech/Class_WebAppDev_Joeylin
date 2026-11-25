"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { KATEGORI } from "@/lib/kategori";

export type BukuFormState = {
  pesan: string;
  galat?: {
    judul?: string;
    penulis?: string;
    kategori?: string;
    tahun?: string;
    stok?: string;
  };
  values?: {
    judul: string;
    penulis: string;
    kategori: string;
    tahun: string;
    stok: string;
    deskripsi: string;
  };
};

export async function tambahBuku(
  _prev: BukuFormState,
  formData: FormData
): Promise<BukuFormState> {

  const judul = String(formData.get("judul") ?? "").trim();
  const penulis = String(formData.get("penulis") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "").trim();
  const tahunTeks = String(formData.get("tahun") ?? "").trim();
  const stokTeks = String(formData.get("stok") ?? "").trim();
  const deskripsi = String(formData.get("deskripsi") ?? "").trim();
  const values = { judul, penulis, kategori, tahun: tahunTeks, stok: stokTeks, deskripsi };

 
  const galat: NonNullable<BukuFormState["galat"]> = {};

  if (!judul) galat.judul = "Judul wajib diisi.";
  if (!penulis) galat.penulis = "Penulis wajib diisi.";
  if (!(KATEGORI as readonly string[]).includes(kategori)) {
    galat.kategori = "Kategori wajib dipilih.";
  }

  const tahunMaks = new Date().getFullYear();
  let tahun: number | null = null;
  if (tahunTeks) {
    tahun = Number(tahunTeks);
    if (!Number.isInteger(tahun) || tahun < 1000 || tahun > tahunMaks) {
      galat.tahun = `Tahun harus antara 1000 dan ${tahunMaks}.`;
    }
  }

  const stok = Number(stokTeks);
  if (!stokTeks) {
    galat.stok = "Jumlah stok wajib diisi.";
  } else if (!Number.isInteger(stok) || stok < 1) {
    galat.stok = "Stok harus bilangan bulat minimal 1.";
  }

  if (Object.keys(galat).length > 0) {
    return { pesan: "Periksa kembali isian Anda.", galat, values };
  }

  let baru: { id: number };
  try {
    baru = await prisma.buku.create({
      data: {
        judul,
        penulis,
        kategori,
        tahun,
        stok,
        tersedia: stok,
        deskripsi: deskripsi || null,
      },
    });
  } catch {
    return { pesan: "Terjadi kesalahan di server.", values };
  }

  revalidatePath("/buku");
  redirect(`/buku/${baru.id}`);
}