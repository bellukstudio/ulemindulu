import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    Calendar,
    CreditCard,
    DownloadCloud,
    Banknote,
} from "lucide-react";
import { invoiceAPI } from "../../action/invoice";
import SidebarClient from "./components/SidebarClient";
import { formatRupiah, formatDateID } from "../../core/util";
export default function Invoices() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 10,
    });
    const [selectedFilter, setSelectedFilter] = useState("all");
    const navigate = useNavigate();
    const fetchInvoices = async (page = 1, search = "") => {
        setLoading(true);
        try {
            const result = await invoiceAPI.fetchMyInvoice(
                page,
                pagination.per_page,
                search
            );
            if (result.success) {
                setInvoices(result.data);
                setPagination(result.pagination);
            }
        } catch (error) {
            console.error("Error fetching invoices:", error);
            navigate("/error", {
                state: {
                    error:
                        err.response?.data?.errors ||
                        err.response?.data?.message ||
                        "Terjadi kesalahan.",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "paid":
                return "bg-green-100 text-green-800 border-green-200";
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "failed":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case "wedding":
                return "bg-pink-100 text-pink-800";
            case "birthday":
                return "bg-blue-100 text-blue-800";
            case "graduation":
                return "bg-purple-100 text-purple-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const filteredInvoices =
        selectedFilter === "all"
            ? invoices
            : invoices.filter(
                  (invoice) => invoice.payment_status === selectedFilter
              );

    return (
        <>
            <SidebarClient />
            <div className="p-4 sm:ml-64 mt-30 ">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Invoice Management
                        </h1>
                        <p className="text-gray-600">
                            Manage and track your invoice payments
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by subdomain, template, or status..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="flex items-center gap-2">
                                <Filter className="w-5 h-5 text-gray-400" />
                                <select
                                    value={selectedFilter}
                                    onChange={(e) =>
                                        setSelectedFilter(e.target.value)
                                    }
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">All Status</option>
                                    <option value="paid">Paid</option>
                                    <option value="pending">Pending</option>
                                    <option value="failed">Failed</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <span className="ml-3 text-gray-600">
                                    Loading invoices...
                                </span>
                            </div>
                        ) : (
                            <>
                                {/* Desktop Table */}
                                <div className="hidden lg:block overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Invoice Details
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Template
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Amount
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {filteredInvoices.map((invoice) => (
                                                <tr
                                                    key={invoice.id}
                                                    className="hover:bg-gray-50 transition-colors duration-200"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                                                {
                                                                    invoice.subdomain
                                                                }
                                                            </div>
                                                            <div className="text-xs text-gray-500 font-mono">
                                                                {invoice.id.substring(
                                                                    0,
                                                                    8
                                                                )}
                                                                ...
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                src={
                                                                    invoice
                                                                        .invitation_template
                                                                        .thumbnail
                                                                }
                                                                alt={
                                                                    invoice
                                                                        .invitation_template
                                                                        .template_name
                                                                }
                                                                className="w-12 h-12 rounded-lg object-cover"
                                                            />
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {
                                                                        invoice
                                                                            .invitation_template
                                                                            .template_name
                                                                    }
                                                                </div>
                                                                <span
                                                                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(
                                                                        invoice
                                                                            .invitation_template
                                                                            .type
                                                                    )}`}
                                                                >
                                                                    {
                                                                        invoice
                                                                            .invitation_template
                                                                            .type
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {formatRupiah(
                                                                invoice
                                                                    .invitation_template
                                                                    .final_price
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                                                                invoice.payment_status
                                                            )}`}
                                                        >
                                                            {
                                                                invoice.payment_status
                                                            }
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center text-sm text-gray-900">
                                                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                                            {formatDateID(
                                                                invoice.order_date
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {invoice.payment_status ==
                                                        "pending" ? (
                                                            <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                                                                <Banknote className="w-4 h-4 mr-1" />
                                                                Bayar
                                                            </button>
                                                        ) : (
                                                            <div></div>
                                                        )}
                                                        <a
                                                            href={`/app/client/invoices/download/${invoice.id}`}
                                                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors duration-200"
                                                        >
                                                            <DownloadCloud className="w-4 h-4 mr-1" />
                                                            Download
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Cards */}
                                <div className="lg:hidden divide-y divide-gray-200">
                                    {filteredInvoices.map((invoice) => (
                                        <div
                                            key={invoice.id}
                                            className="p-6 hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <h3 className="text-sm font-medium text-gray-900 truncate">
                                                        {invoice.subdomain}
                                                    </h3>
                                                    <p className="text-xs text-gray-500 font-mono mt-1">
                                                        {invoice.id.substring(
                                                            0,
                                                            8
                                                        )}
                                                        ...
                                                    </p>
                                                </div>
                                                <span
                                                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                                                        invoice.payment_status
                                                    )}`}
                                                >
                                                    {invoice.payment_status}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3 mb-4">
                                                <img
                                                    src={
                                                        invoice
                                                            .invitation_template
                                                            .thumbnail
                                                    }
                                                    alt={
                                                        invoice
                                                            .invitation_template
                                                            .template_name
                                                    }
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {
                                                            invoice
                                                                .invitation_template
                                                                .template_name
                                                        }
                                                    </div>
                                                    <span
                                                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${getTypeColor(
                                                            invoice
                                                                .invitation_template
                                                                .type
                                                        )}`}
                                                    >
                                                        {
                                                            invoice
                                                                .invitation_template
                                                                .type
                                                        }
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center text-sm text-gray-900">
                                                    <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                                                    {formatRupiah(
                                                        invoice
                                                            .invitation_template
                                                            .final_price
                                                    )}
                                                </div>
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                                                    {formatDateID(
                                                        invoice.order_date
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                                                    <Banknote className="w-4 h-4 mr-1" />
                                                    Lihat
                                                </button>
                                                <a
                                                    href={`/app/client/invoices/download/${invoice.id}`}
                                                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors duration-200"
                                                >
                                                    <DownloadCloud className="w-4 h-4 mr-1" />
                                                    Download
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Empty State */}
                        {!loading && filteredInvoices.length === 0 && (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <CreditCard className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No invoices found
                                </h3>
                                <p className="text-gray-500">
                                    {searchTerm || selectedFilter !== "all"
                                        ? "Try adjusting your search or filters."
                                        : "You don't have any invoices yet."}
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {!loading && filteredInvoices.length > 0 && (
                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Showing{" "}
                                        <span className="font-medium">
                                            {(pagination.current_page - 1) *
                                                pagination.per_page +
                                                1}
                                        </span>{" "}
                                        to{" "}
                                        <span className="font-medium">
                                            {Math.min(
                                                pagination.current_page *
                                                    pagination.per_page,
                                                pagination.total
                                            )}
                                        </span>{" "}
                                        of{" "}
                                        <span className="font-medium">
                                            {pagination.total}
                                        </span>{" "}
                                        results
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                handlePageChange(
                                                    pagination.current_page - 1
                                                )
                                            }
                                            disabled={
                                                pagination.current_page === 1
                                            }
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ChevronLeft className="w-4 h-4 mr-1" />
                                            Previous
                                        </button>

                                        <div className="flex gap-1">
                                            {Array.from(
                                                {
                                                    length: Math.min(
                                                        5,
                                                        pagination.last_page
                                                    ),
                                                },
                                                (_, i) => {
                                                    const page = i + 1;
                                                    return (
                                                        <button
                                                            key={page}
                                                            onClick={() =>
                                                                handlePageChange(
                                                                    page
                                                                )
                                                            }
                                                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                                                pagination.current_page ===
                                                                page
                                                                    ? "bg-blue-600 text-white"
                                                                    : "text-gray-700 hover:bg-gray-100"
                                                            }`}
                                                        >
                                                            {page}
                                                        </button>
                                                    );
                                                }
                                            )}
                                        </div>

                                        <button
                                            onClick={() =>
                                                handlePageChange(
                                                    pagination.current_page + 1
                                                )
                                            }
                                            disabled={
                                                pagination.current_page ===
                                                pagination.last_page
                                            }
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
