import InvitationCard from "./components/InvitationCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarClient from "./components/SidebarClient";

export default function InvitationClient() {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const [templates, setTemplates] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
    });

    const fetchTemplates = async (page = 1) => {
        try {
            const res = await axios.get(
                `${baseURL}/v1/templates/me/invitation?page=${page}&per_page=20`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            setTemplates(res.data.data);
            setPagination({
                current_page: res.data.current_page,
                last_page: res.data.last_page,
            });
        } catch (err) {
            console.error("Gagal fetch data:", err);
        }
    };

    useEffect(() => {
        fetchTemplates(pagination.current_page);
    }, [pagination.current_page]);
    const nextPage = () => {
        if (pagination.current_page < pagination.last_page) {
            setPagination((prev) => ({
                ...prev,
                current_page: prev.current_page + 1,
            }));
        }
    };

    const prevPage = () => {
        if (pagination.current_page > 1) {
            setPagination((prev) => ({
                ...prev,
                current_page: prev.current_page - 1,
            }));
        }
    };
    return (
        <>
            <SidebarClient />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div
                        className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                        role="alert"
                    >
                        <span className="font-medium">
                            Template undangan yang kamu punya
                        </span>{" "}
                        Sekali pakai untuk satu acara saja.
                    </div>

                    <InvitationCard invitations={templates} />
                </div>
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-10 gap-4">
                <button
                    onClick={prevPage}
                    disabled={pagination.current_page === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-600 font-semibold mt-1">
                    Page {pagination.current_page} of {pagination.last_page}
                </span>
                <button
                    onClick={nextPage}
                    disabled={pagination.current_page === pagination.last_page}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </>
    );
}
