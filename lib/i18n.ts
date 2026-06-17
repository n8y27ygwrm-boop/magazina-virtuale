import type { Lang } from "./types";

export const LABELS = {
  sq: {
    welcome: "Mirë se vini",
    subtitle:
      "Ju lutem zgjidhni tipologjinë e biznesit tuaj për të parë ofertën e dedikuar:",
    search: "Kërko produkt…",
    all: "Të gjitha",
    change: "Ndrysho tipologjinë",
    offerFor: "Oferta për:",
    brand: "MAGAZINA VIRTUALE",
    noResults: (q: string) => `Asnjë produkt nuk u gjet për "${q}".`,
    businesses: [
      "Restorant",
      "Bar",
      "Hotel",
      "Market",
      "Pizzeri",
      "Mensë",
      "Kreperi",
      "Pastiçeri",
    ],
  },
  tr: {
    welcome: "Hoş Geldiniz",
    subtitle:
      "Özel teklifinizi görmek için lütfen işletme türünüzü seçin:",
    search: "Ürün ara…",
    all: "Tümü",
    change: "İşletme türünü değiştir",
    offerFor: "Teklif:",
    brand: "SANAL DEPO",
    noResults: (q: string) => `"${q}" için ürün bulunamadı.`,
    businesses: [
      "Restoran",
      "Bar",
      "Otel",
      "Market",
      "Pizzacı",
      "Yemekhane",
      "Krep",
      "Pastane",
    ],
  },
} as const;

export const CAT_LABELS: Record<Lang, Record<string, string>> = {
  sq: {
    MIELL: "MIELL",
    EMBELSIRA: "PERBERES EMBELSIRASH",
    KONSERVA: "TE KONSERVUARA",
    GATIM: "PERBERES GATIMI",
    FRUTA: "FRUTA & PERIME",
    BULMET: "BULMET",
    MISHB: "MISH I BARDHE",
    MISHP: "MISH I PERPUNUAR",
    MISHK: "MISH I KUQ",
    PESHKU: "PRODUKTE MISHI & PESHKU",
    BRUME: "BRUME & EMBELSIRA",
    SNACK: "SNACK & USHQIME TE SHPEJTA",
    SALCA: "SALCA",
    PASTA: "PASTA",
    ORIZ: "ORIZ",
    PIJE: "PIJE FRESKUESE",
    UJE: "UJE",
    BIRRA: "BIRRA",
    BIRRAB: "BIRRA BELGE",
    BIRRAV: "BIRRA VENDI",
    PAKETA: "PAKETA & OFERTA",
  },
  tr: {
    MIELL: "UN",
    EMBELSIRA: "TATLI MALZEMELERİ",
    KONSERVA: "KONSERVELER",
    GATIM: "PİŞİRME MALZEMELERİ",
    FRUTA: "MEYVE & SEBZE",
    BULMET: "SÜT ÜRÜNLERİ",
    MISHB: "BEYAZ ET",
    MISHP: "İŞLENMİŞ ET",
    MISHK: "KIRMIZI ET",
    PESHKU: "ET & BALIK ÜRÜNLERİ",
    BRUME: "EKMEK & UNLU MAMULLER",
    SNACK: "ATIŞTIRMALIK & HAZIR YEMEK",
    SALCA: "SOS & KETÇAP",
    PASTA: "MAKARNA",
    ORIZ: "PİRİNÇ",
    PIJE: "ALKOLSÜZ İÇECEKLER",
    UJE: "SU",
    BIRRA: "BİRA",
    BIRRAB: "BELÇIKA BİRASI",
    BIRRAV: "YEREL BİRA",
    PAKETA: "PAKETLER & TEKLİFLER",
  },
};

const ALWAYS_TOP = ["PIJE", "UJE", "BIRRA", "BIRRAB", "BIRRAV"];

const BASE_ORDER: Record<string, string[]> = {
  Restorant: ["PASTA","SALCA","MISHK","MISHB","PESHKU","BULMET","FRUTA","ORIZ","KONSERVA","GATIM","MISHP","SNACK","BRUME","MIELL","EMBELSIRA","PAKETA"],
  Bar:       ["SNACK","BRUME","MISHP","BULMET","EMBELSIRA","KONSERVA","SALCA","FRUTA","GATIM","PASTA","ORIZ","MISHB","PESHKU","MISHK","MIELL","PAKETA"],
  Hotel:     ["BULMET","BRUME","MISHP","EMBELSIRA","FRUTA","PASTA","SALCA","ORIZ","MISHB","PESHKU","MISHK","KONSERVA","GATIM","SNACK","MIELL","PAKETA"],
  Market:    ["BULMET","MISHP","SALCA","PASTA","ORIZ","EMBELSIRA","KONSERVA","FRUTA","BRUME","GATIM","SNACK","MIELL","MISHB","PESHKU","MISHK","PAKETA"],
  Pizzeri:   ["MIELL","BULMET","SALCA","MISHP","KONSERVA","GATIM","FRUTA","PASTA","ORIZ","MISHB","PESHKU","MISHK","BRUME","SNACK","EMBELSIRA","PAKETA"],
  "Mensë":   ["ORIZ","PASTA","MISHB","MISHK","PESHKU","GATIM","FRUTA","SALCA","BULMET","KONSERVA","SNACK","BRUME","MIELL","MISHP","EMBELSIRA","PAKETA"],
  Kreperi:   ["MIELL","EMBELSIRA","BULMET","MISHP","SALCA","FRUTA","BRUME","SNACK","GATIM","KONSERVA","PASTA","ORIZ","MISHB","PESHKU","MISHK","PAKETA"],
  "Pastiçeri":["EMBELSIRA","MIELL","BULMET","BRUME","GATIM","SNACK","KONSERVA","FRUTA","SALCA","PASTA","ORIZ","MISHP","MISHB","PESHKU","MISHK","PAKETA"],
};

const TR_TO_SQ: Record<string, string> = {
  Restoran: "Restorant",
  Bar: "Bar",
  Otel: "Hotel",
  Market: "Market",
  "Pizzacı": "Pizzeri",
  Yemekhane: "Mensë",
  Krep: "Kreperi",
  Pastane: "Pastiçeri",
};

export function getCategoryOrder(business: string): string[] {
  const key = TR_TO_SQ[business] ?? business;
  const base = BASE_ORDER[key] ?? BASE_ORDER.Restorant;
  return [...ALWAYS_TOP, ...base];
}
