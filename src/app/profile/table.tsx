import { TransactionUserResponse } from "@/_transactions/hooks/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormatCurrency, formatDate } from "@/shared/utils/format";
import { getStatusBadge } from "../dashboard/orders/table";
import Link from "next/link";

export function TableTransactionsUser({
  data,
}: {
  data: TransactionUserResponse[];
}) {
     if (!data || data.length === 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold border border-gray-600">
              ID Transaksi
            </TableHead>
            <TableHead className="font-semibold border border-gray-600">
              Produk
            </TableHead>
            <TableHead className="font-semibold border border-gray-600">
              Tujuan
            </TableHead>
            <TableHead className="font-semibold border border-gray-600">
              Jumlah
            </TableHead>
            <TableHead className="font-semibold border border-gray-600">
              Fee
            </TableHead>
            <TableHead className="font-semibold border border-gray-600">
              Total
            </TableHead>
            <TableHead className="font-semibold border border-gray-600">
              Keuntungan
            </TableHead>
            <TableHead className="font-semibold border border-gray-600">
              Status
            </TableHead>
            <TableHead className="font-semibold border border-gray-600">
              Tipe
            </TableHead>
            <TableHead className="font-semibold border border-gray-600">
              Metode
            </TableHead>
            <TableHead className="font-semibold border border-gray-600">
              Waktu
            </TableHead>
            <TableHead className="font-semibold border border-gray-600">
              Update Terakhir
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={12} className="text-center py-16">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-muted-foreground font-medium">
                  Tidak ada data transaksi
                </p>
                <p className="text-sm text-muted-foreground">
                  Transaksi akan muncul di sini setelah ada aktivitas
                </p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table className="mt-6">
      <TableHeader>
        <TableRow>
          <TableHead className="border border-gray-600">ID Transaksi</TableHead>
          <TableHead className="border border-gray-600">Produk</TableHead>
          <TableHead className="border border-gray-600 min-w-[130px]">
            Tujuan
          </TableHead>
          <TableHead className="border border-gray-600">Jumlah</TableHead>
          <TableHead className="border border-gray-600 ">Fee</TableHead>
          <TableHead className="border border-gray-600">Total</TableHead>
          <TableHead className="border border-gray-600">Status</TableHead>
          <TableHead className="border border-gray-600">Metode</TableHead>
          <TableHead className="border border-gray-600">Waktu</TableHead>
          <TableHead className="border border-gray-600">
            Update Terakhir
          </TableHead>
               <TableHead className="border border-gray-600">
                Link Invoice
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((transaction, idx) => (
          <TableRow key={idx} className="hover:bg-muted/50">
            <TableCell className="font-semibold border border-gray-600">
              {transaction.reference_id}
            </TableCell>
            <TableCell className="font-semibold border border-gray-600">
              {transaction.product_name}
            </TableCell>
            <TableCell className="font-semibold border border-gray-600">
              {transaction.tujuan}
            </TableCell>
            <TableCell className="font-semibold border border-gray-600">
              {FormatCurrency(transaction.price)}
            </TableCell>
            <TableCell className="font-semibold border border-gray-600">
              {FormatCurrency(transaction.fee)}
            </TableCell>
            <TableCell className="font-semibold border border-gray-600">
              {FormatCurrency(transaction.total)}
            </TableCell>
            <TableCell className="font-semibold border border-gray-600">
              {getStatusBadge(transaction.status)}
            </TableCell>

            <TableCell className="font-semibold border text-center border-gray-600">
              {transaction.payment_name}
            </TableCell>
            <TableCell className="font-semibold border text-center border-gray-600">
              {formatDate(transaction.created_at)}
            </TableCell>
            <TableCell className="font-semibold border text-center border-gray-600">
              {formatDate(transaction.updated_at)}
            </TableCell>
             <TableCell className="font-semibold border border-gray-600 w-[150px] text-center">
              <Link href={`/invoice/${transaction.reference_id}`} className="bg-primary/10 p-2 hover:bg-primary/60 hover:text-white">
                    Link Invoice
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
