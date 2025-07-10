import React, { useState } from "react";

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
                        className="bg-white rounded-4xl h-auto shadow hover:shadow-xl transition overflow-hidden"
                    >
                        <div className="relative">
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
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                {template.template_name}
                            </h3>
                            <a
                                href={`/template/${template.slug}`}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 text-center rounded-3xl mt-5"
                            >
                                Lihat Template
                            </a>
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
