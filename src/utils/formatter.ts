const sanitizeNumber = (stringNumber: string) => {
  return Number(stringNumber.replace(/\D/g, ""));
};

function formatRupiah(angka: number | string, prefix: string = "Rp.") {
  if (angka) {
    const tempAngka = angka.toString();
    var number_string = tempAngka.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return `${prefix} ${rupiah}`;
  } else {
    return `${prefix} 0`;
  }
}

export {sanitizeNumber, formatRupiah}
