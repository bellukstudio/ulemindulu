import InvitationCard from "./components/InvitationCard";
import { useState, useEffect } from "react";
import SidebarClient from "./components/SidebarClient";
import { invitationAPI } from "../../action/invitation";

/**
 * Renders a page for user to view their own created invitation templates.
 *
 * Fetches the templates from the API and displays them in a paginated list.
 * The user can navigate through the pages using the pagination buttons.
 *
 * @returns {React.ReactElement} The rendered component.
 */
export default function InvitationClient() {
    const [templates, setTemplates] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 20,
    });

    const fetchTemplates = async (page = 1, search = "") => {
        try {
            const result = await invitationAPI.fetchMyTemplate(
                page,
                pagination.per_page,
                search
            );

            if (result.success) {
                setTemplates(result.data);
                setPagination(result.pagination);
            } else {
                console.error(result.error);
            }
        } catch (err) {
            console.error("Gagal fetch data:", err);
            navigate("/error", {
                state: {
                    error:
                        err.response?.data?.errors ||
                        err.response?.data?.message ||
                        "Terjadi kesalahan.",
                },
            });
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
            <div className="p-4 sm:ml-64 mt-10">
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
                        disabled={
                            pagination.current_page === pagination.last_page
                        }
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
