"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import { button as buttonStyles, input as inputStyles } from "@heroui/theme";
import { addToast } from "@heroui/toast";
import { IoFilterOutline, IoCloudUploadSharp } from "react-icons/io5";

import api from "@/services/http/api";

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    transactionId: "",
    customer: "",
    cpfCnpj: "",
    startDate: "",
    endDate: "",
    value: "",
  });
  const [showFilter, setShowFilter] = useState(false);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    if (file) {
      uploadFile();
    }
  }, [file]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      addToast({
        title: "Erro ao enviar arquivo",
        description: "Tente novamente.",
        color: "danger",
      });

      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    setUploading(true);
    setError(null);

    try {
      const { data } = await api.post("/transaction/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.duration) setDuration(data.duration);

      setUploading(false);
      addToast({
        title: "Arquivo processado com sucesso",
        description: "Clientes e Transações cadastrados com sucesso.",
        color: "success",
      });
      setFile(null);
      loadTransactions();
    } catch (error: any) {
      setUploading(false);
      setError(error.message || "Erro desconhecido.");
      addToast({
        title: "Erro ao enviar arquivo",
        description: error.message || "Erro desconhecido.",
        color: "danger",
      });
    }
  };

  const loadTransactions = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v)),
      });

      const { data } = await api.get(`/transaction?${queryParams.toString()}`);

      setTransactions(data.data);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (error: any) {
      addToast({
        title: "Erro ao carregar transações",
        description: error.message || "Erro desconhecido.",
        color: "danger",
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    loadTransactions();
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClearFilters = () => {
    setFilters({
      transactionId: "",
      customer: "",
      cpfCnpj: "",
      startDate: "",
      endDate: "",
      value: "",
    });
    setPage(1);
    loadTransactions();
    setShowFilter(false);
  };

  const handleFilterSubmit = () => {
    setPage(1);
    loadTransactions();
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className="text-4xl font-bold text-white-900">Dashboard</span>
        <div className="text-lg text-gray-500 mt-4">
          Upload de arquivos e visualização de transações.
        </div>
      </div>

      <div className="flex flex-col items-center mb-6">
        <label
          className={`${buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })} flex items-center gap-2 ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
          htmlFor="file-upload"
        >
          {uploading ? (
            <>
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  fill="none"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  d="M4 12a8 8 0 0116 0h-2a6 6 0 00-12 0H4z"
                  fill="currentColor"
                />
              </svg>
              Enviando...
            </>
          ) : (
            <>
              <IoCloudUploadSharp className="w-5 h-5 text-white" />
              Carregar Arquivo TXT
            </>
          )}
        </label>
        <input
          accept=".txt"
          className="hidden"
          id="file-upload"
          type="file"
          onChange={handleFileUpload}
        />
        {file && <div className="mt-2 text-sm text-gray-600">{file.name}</div>}
        {duration && (
          <div className="mt-2 text-m text-gray-500">
            Tempo de processamento: {duration}s
          </div>
        )}
      </div>

      <div className="flex justify-end mb-4">
        <button
          className="flex items-center gap-2 mb-4"
          onClick={() => setShowFilter(!showFilter)}
        >
          <IoFilterOutline className="w-5 h-5 text-white" />
          <span className="text-lg font-semibold text-white">Filtros</span>
        </button>
      </div>

      {showFilter && (
        <div className="w-full max-w-4xl mx-auto mt-6 p-4 bg-zinc-900 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-zinc-800 p-4 rounded-lg">
            {Object.keys(filters).map((key) => (
              <input
                key={key}
                className={inputStyles({}).base()}
                name={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                type={key.includes("Date") ? "date" : "text"}
                value={filters[key as keyof typeof filters]}
                onChange={handleFilterChange}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <button
              className={buttonStyles({ color: "primary" })}
              onClick={handleFilterSubmit}
            >
              Filtrar
            </button>
            <button
              className={buttonStyles({ color: "danger" })}
              onClick={handleClearFilters}
            >
              Limpar
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl mx-auto mt-8">
        <Table>
          <TableHeader>
            <TableColumn>Transação</TableColumn>
            <TableColumn>Cliente</TableColumn>
            <TableColumn>CPF/CNPJ</TableColumn>
            <TableColumn>Data</TableColumn>
            <TableColumn>Valor</TableColumn>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.transactionId}</TableCell>
                <TableCell>{transaction.customer}</TableCell>
                <TableCell>{transaction.cpfCnpj}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center gap-4">
        <Pagination
          showControls
          page={page}
          total={totalPages}
          onChange={handlePageChange}
        />
      </div>
    </section>
  );
}
