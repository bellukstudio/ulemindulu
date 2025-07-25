import { useState, useRef, useEffect } from "react";
import { Download, FileText, Calendar, Mail } from "lucide-react";
import { invoiceAPI } from "../../../action/invoice";
import { useParams } from "react-router-dom";
import { formatDateID, formatRupiah } from "../../../core/util";
import { toast } from "react-toastify";

const InvoiceDownloader = () => {
    const invoiceRef = useRef();
    const [myInvoice, setMyInvoice] = useState(null);
    const { id } = useParams();

    const fetchInvoice = async () => {
        try {
            const response = await invoiceAPI.downloadInvoice(id);
            if (response.success) {
                setMyInvoice(response.data);
            } else {
                console.error("Error fetching invoice:", response.error);
                setMyInvoice(null);
            }
        } catch (error) {
            console.error("Error fetching invoice:", error);
            setMyInvoice(null);
        }
    };

    useEffect(() => {
        fetchInvoice();
    }, [id]);

    const processInvoiceData = (apiData) => {
        if (!apiData) return null;

        const invoice = myInvoice;
        const template = invoice.invitation_template;

        const originalPrice = parseFloat(template.price);
        const discountPrice = parseFloat(template.priceDiscount || 0);
        const finalPrice = template.isDiscount ? discountPrice : originalPrice;
        const discountAmount = template.isDiscount
            ? originalPrice - discountPrice
            : 0;

        return {
            invoiceNumber: `INV-${myInvoice.id}`,
            date: invoice.order_date,
            paymentStatus: invoice.payment_status,
            subdomain: invoice.subdomain,
            company: {
                name: "Ulemindulu",
                city: "Jakarta 12190",
                phone: "+62 21 1234 5678",
                email: "info@ulemindulu.my.id",
                website: "www.ulemindulu.my.id",
            },
            client: {
                name: invoice.subdomain
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase()),
                address: "-",
                city: "-",
                phone: "-",
                email: "-",
            },
            items: [
                {
                    id: 1,
                    description: `${template.template_name} Wedding Invitation Template`,
                    details: `Template Type: ${template.type} | Subdomain: ${invoice.subdomain}`,
                    quantity: 1,
                    rate: originalPrice,
                    amount: originalPrice,
                    thumbnail: template.thumbnail,
                },
            ],
            notes: `Thank you for choosing our ${template.template_name} wedding invitation template. Your custom invitation is ready at ulemindulu.my.id/${invoice.subdomain}`,
            discountAmount: discountAmount,
            originalAmount: originalPrice,
            finalAmount: finalPrice,
        };
    };

    const invoiceData = myInvoice ? processInvoiceData(myInvoice) : null;

    if (!invoiceData) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading invoice...</p>
                </div>
            </div>
        );
    }

    const subtotal =
        invoiceData.originalAmount ||
        invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
    const discountAmount = invoiceData.discountAmount || 0;
    const total = subtotal - discountAmount;

    const downloadInvoice = async () => {
        try {
            const element = invoiceRef.current;

            const printWindow = window.open("", "_blank");

            const cloned = element.cloneNode(true);

            const removeSelectors = [
                ".company-info p",
                ".notes",
                ".text-center.text-gray-500.text-sm",
            ];
            removeSelectors.forEach((selector) => {
                const nodes = cloned.querySelectorAll(selector);
                nodes.forEach((node) => node.remove());
            });

            const invoiceHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Invoice ${invoiceData.invoiceNumber}</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                @media print {
                    .no-print { display: none !important; }
                }
            </style>
        </head>
        <body class="bg-white text-gray-900">
            ${cloned.outerHTML}
        </body>
        </html>
        `;

            printWindow.document.open();
            printWindow.document.write(invoiceHTML);
            printWindow.document.close();
            setTimeout(() => {
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            }, 500);
        } catch (error) {
            console.error("Error downloading invoice:", error);
            toast.error(
                "Terjadi kesalahan saat mendownload invoice. Silakan coba lagi."
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Download Button */}
                <div className="mb-6 flex justify-end no-print">
                    <button
                        onClick={downloadInvoice}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                    >
                        <Download className="w-5 h-5" />
                        <span>Download Invoice</span>
                    </button>
                </div>

                {/* Invoice Container */}
                <div
                    ref={invoiceRef}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                    <div className="p-8">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-200">
                            <div className="company-info">
                                <h1 className="text-3xl font-bold mb-2">
                                    <span className="text-blue-900">
                                        Ulemin
                                    </span>
                                    <span className="text-blue-400">dulu</span>
                                </h1>
                                <div className="text-gray-600 space-y-1">
                                    <p className="flex items-center">
                                        <Mail className="w-4 h-4 mr-2" />
                                        {invoiceData.company.email}
                                    </p>
                                </div>
                            </div>

                            <div className="invoice-info text-right">
                                <h2 className="text-2xl font-bold text-green-600 mb-3 flex items-center justify-end">
                                    <FileText className="w-6 h-6 mr-2" />
                                    INVOICE
                                </h2>
                                <div className="space-y-2">
                                    <p>
                                        <strong>Invoice #:</strong>{" "}
                                        {invoiceData.invoiceNumber}
                                    </p>
                                    <p className="flex items-center justify-end">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <strong>Date:</strong>{" "}
                                        {formatDateID(invoiceData.date)}
                                    </p>
                                    <div className="mt-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                invoiceData.paymentStatus ===
                                                "paid"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                            }`}
                                        >
                                            {invoiceData.paymentStatus ===
                                            "paid"
                                                ? "PAID"
                                                : "PENDING"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="mb-8">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left p-4 border-b-2 border-gray-200 font-semibold">
                                            Description
                                        </th>
                                        <th className="text-center p-4 border-b-2 border-gray-200 font-semibold">
                                            Qty
                                        </th>
                                        <th className="text-right p-4 border-b-2 border-gray-200 font-semibold">
                                            Rate
                                        </th>
                                        <th className="text-right p-4 border-b-2 border-gray-200 font-semibold">
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoiceData.items.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="p-4 border-b border-gray-200">
                                                <div className="flex items-start space-x-3">
                                                    {item.thumbnail && (
                                                        <img
                                                            src={item.thumbnail}
                                                            alt="Template Preview"
                                                            className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                                        />
                                                    )}
                                                    <div>
                                                        <p className="font-medium text-gray-800">
                                                            {item.description}
                                                        </p>
                                                        {item.details && (
                                                            <p className="text-sm text-gray-500 mt-1">
                                                                {item.details}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 border-b border-gray-200 text-center">
                                                {item.quantity}
                                            </td>
                                            <td className="p-4 border-b border-gray-200 text-right">
                                                {formatRupiah(item.rate)}
                                            </td>
                                            <td className="p-4 border-b border-gray-200 text-right font-medium">
                                                {formatRupiah(item.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals */}
                        <div className="flex justify-end mb-8">
                            <div className="w-80">
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <td className="py-2 text-right pr-4">
                                                Subtotal:
                                            </td>
                                            <td className="py-2 text-right font-medium">
                                                {formatRupiah(subtotal)}
                                            </td>
                                        </tr>
                                        {discountAmount > 0 && (
                                            <tr>
                                                <td className="py-2 text-right pr-4">
                                                    Discount:
                                                </td>
                                                <td className="py-2 text-right font-medium text-red-600">
                                                    -
                                                    {formatRupiah(
                                                        discountAmount
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                        <tr className="border-t-2 border-gray-800">
                                            <td className="py-3 text-right pr-4 text-lg font-bold">
                                                Total:
                                            </td>
                                            <td className="py-3 text-right text-lg font-bold text-blue-600">
                                                {formatRupiah(total)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Notes */}
                        {invoiceData.notes && (
                            <div className="border-t border-gray-200 pt-6">
                                <h4 className="font-semibold text-gray-700 mb-3">
                                    Notes:
                                </h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {invoiceData.notes}
                                </p>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
                            <p>Thank you for your business!</p>
                            <p className="mt-2">
                                This is a computer-generated invoice and does
                                not require a signature.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDownloader;
