import { useState, useEffect } from "react";
import PropTypes from "prop-types";

InvitationCard.propTypes = {
    invitations: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            subdomain: PropTypes.string,
            created_at: PropTypes.string,
            invitation_template: PropTypes.shape({
                thumbnail: PropTypes.string,
                type: PropTypes.string,
            }),
        })
    ).isRequired,
};

/**
 * InvitationCard is a React component that renders a list of invitations
 * for the client dashboard. It displays the invitation thumbnail, type,
 * and creation date, as well as a dropdown menu with edit and preview
 * links.
 *
 * It accepts an array of invitation objects as a prop, where each
 * invitation object has the following properties:
 * - id: The invitation ID
 * - subdomain: The invitation subdomain
 * - created_at: The invitation creation date
 * - invitation_template: An object containing the invitation template
 *   thumbnail and type
 *
 * @param {object[]} invitations The array of invitation objects
 */
export default function InvitationCard({ invitations }) {
    const [activeMenuId, setActiveMenuId] = useState(null);
    const baseURL = import.meta.env.VITE_APP_URL;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown-container")) {
                setActiveMenuId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {invitations.map((invitation) => (
                <div
                    key={invitation.id}
                    className="flex flex-col justify-between border border-blue-300 rounded-lg p-4 relative shadow-sm bg-white dark:bg-gray-800"
                >
                    {/* Thumbnail dan info */}
                    <div className="flex items-center">
                        <div
                            className="w-12 h-12 bg-cover bg-center rounded-sm mr-3"
                            style={{
                                backgroundImage: `url(${invitation.invitation_template.thumbnail})`,
                            }}
                        />
                        <div>
                            <h2 className="text-sm font-semibold">
                                Undangan {invitation.invitation_template.type} ({" "}
                                {invitation.invitation_template.template_name} )
                            </h2>
                            <p className="text-xs text-gray-400">
                                Dibuat: {" "}
                                {new Date(
                                    invitation.created_at
                                ).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Tombol menu */}
                    <div className="absolute top-3 right-3 dropdown-container">
                        <button
                            onClick={() =>
                                setActiveMenuId(
                                    activeMenuId === invitation.id
                                        ? null
                                        : invitation.id
                                )
                            }
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 6h.01M12 12h.01M12 18h.01"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        {activeMenuId === invitation.id && (
                            <div className="absolute z-50 right-0 mt-2 w-56 bg-white rounded-lg border shadow-md overflow-hidden text-sm dark:bg-gray-800 dark:border-gray-600">
                                <div className="px-4 py-2 text-gray-600 dark:text-white font-medium border-b">
                                    Aksi
                                </div>
                                <ul className="text-gray-700 dark:text-gray-200">
                                    <a
                                        href={`/app/client/invitations/edit/${invitation.id}`}
                                    >
                                        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 cursor-pointer">
                                            ✏️ Edit
                                        </li>
                                    </a>
                                    <a
                                        href={`${baseURL}/${invitation.subdomain}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 cursor-pointer">
                                            👁️ Preview
                                        </li>
                                    </a>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
