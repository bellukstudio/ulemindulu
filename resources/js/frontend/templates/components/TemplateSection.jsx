import React, { useState } from "react";
import { formatRupiah } from "../../core/util";
import {isTokenAvailable} from "../../core/token";
export default function TemplateSection({
    templates,
    pagination,
    onNext,
    onPrev,
}) {
    const [filter, setFilter] = useState("Semua");

    const categories = [
        "Semua",
        "Wedding",
        "Birthday",
        "Event",
        "Aqiqah",
        "Syukuran",
        "Tahlil",
    ];

    const categoryCounts = categories.reduce((acc, cat) => {
        acc[cat] =
            cat === "Semua"
                ? templates.length
                : templates.filter((t) => t.type === cat.toLowerCase()).length;
        return acc;
    }, {});

    const filteredTemplates =
        filter === "Semua"
            ? templates
            : templates.filter((t) => t.type === filter.toLowerCase());

    return (
        <section className="py-16 px-4 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-4 text-black-600 mt-20">
                Template <span className="text-blue-700">tinggal pakai</span>,
                langsung jadi!
            </h2>
            <p className="text-center text-gray-600 mb-10">
                <strong>{templates.length} Presets</strong> tersedia.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-full border ${
                            filter === cat
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white text-gray-700 border-gray-300"
                        } transition text-sm`}
                    >
                        {cat}{" "}
                        <span
                            className={
                                filter === cat
                                    ? "font-semibold text-xs ml-1 text-white"
                                    : "font-semibold text-xs ml-1 text-gray-600"
                            }
                        >
                            {categoryCounts[cat]}
                        </span>
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10">
                {filteredTemplates.map((template) => (
                    <div
                        key={template.id}
                        className="bg-white rounded-3xl h-auto shadow hover:shadow-xl transition overflow-hidden"
                    >
                        <div className="relative">
                            {template.isDiscount ? (
                                <span className="absolute top-0 right-0 px-3 py-1 text-md font-bold text-white bg-red-500 rounded-bl-lg">
                                    Diskon
                                </span>
                            ) : (
                                <div></div>
                            )}
                            <img
                                src={template.thumbnail}
                                alt={template.template_name}
                                className="h-60 w-full object-cover"
                            />
                            {template.type && (
                                <span className="absolute bottom-2 left-2 bg-blue-700 text-white text-xs px-3 py-1 rounded-full capitalize">
                                    {template.type}
                                </span>
                            )}
                        </div>
                        <div className="p-4 flex flex-col h-full">
                            <h3 className="text-lg font-serif text-gray-800 mb-1 ">
                                {template.template_name}
                            </h3>
                            <h3
                                className={`text-lg font-semibold text-gray-800 mb-1`}
                            >
                                <span
                                    className={`${
                                        template.isDiscount
                                            ? "line-through"
                                            : ""
                                    }`}
                                >
                                    {formatRupiah(template.price)}
                                </span>{" "}
                                {template.isDiscount
                                    ? `(${formatRupiah(
                                          template.priceDiscount
                                      )})`
                                    : ""}
                            </h3>
                            <div className="flex flex-row justify-between space-x-4">
                                <a
                                    href={`/template/${template.slug}`}
                                    target="_blank"
                                    className="text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 text-center rounded-3xl mt-5 w-full"
                                >
                                    Lihat Template
                                </a>
                                <a
                                    href={isTokenAvailable() ? `/template-order/${template.id}` : '/login'}
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 text-center rounded-3xl mt-5 w-full text-sm"
                                >
                                    <span className="flex flex-row justify-around space-x-2">
                                        <svg
                                            className="w-6 h-6 text-white-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                                            />
                                        </svg>
                                        Order Template
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-10 gap-4">
                <button
                    onClick={onPrev}
                    disabled={pagination.current_page === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-600 font-semibold mt-1">
                    Page {pagination.current_page} of {pagination.last_page}
                </span>
                <button
                    onClick={onNext}
                    disabled={pagination.current_page === pagination.last_page}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </section>
    );
}
