import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { CircleX, Loader2, CheckCircle, XCircle } from "lucide-react";
import Sortable from "sortablejs";
import { toast } from "react-toastify";
import { albumAPI } from "../../../action/album";
import Loading from "../../Loading";
import { useNavigate } from "react-router-dom";
import { s } from "framer-motion/client";
FormUploadAlbum.propTypes = {
    activeTab: PropTypes.string,
    order: PropTypes.object,
};

/**
 * Form to upload album photos
 *
 * @param {string} activeTab - currently active tab
 * @param {object} order - order object
 *
 * @returns {ReactElement} Form with input field and button to upload photos
 * @example
 * <FormUploadAlbum activeTab="album" order={order} />
 */
export default function FormUploadAlbum({ activeTab, order }) {
    const [files, setFiles] = useState([]);
    const [sortedIds, setSortedIds] = useState([]);
    const previewRef = useRef(null);
    const [myAlbum, setMyAlbum] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [totalFile, setTotalFile] = useState(0);
    // Get files in display order
    const displayFilesServer = myAlbum.map((item) => ({
        id: item.id,
        preview: item.image_path,
        status: "done",
        progress: 100,
        source: "server",
    }));

    const displayFilesLocal = sortedIds.length
        ? sortedIds.map((id) => files.find((f) => f.id === id)).filter(Boolean)
        : files;

    const displayFiles = [...displayFilesServer, ...displayFilesLocal];

    // Function to get current position based on DOM order
    const getCurrentPosition = (itemId) => {
        if (previewRef.current) {
            const children = Array.from(previewRef.current.children);
            const index = children.findIndex(
                (child) => child.getAttribute("data-id") === itemId
            );
            return index >= 0
                ? index + 1
                : displayFiles.findIndex((file) => file.id === itemId) + 1;
        }
        return displayFiles.findIndex((file) => file.id === itemId) + 1;
    };

    /**
     * Handles the change event for file input. Extracts files from the event,
     * generates a preview URL for each file, assigns a unique ID, and sets an
     * initial status and progress. Updates the files state with the new files.
     *
     * @param {Event} e - The change event from the file input element.
     */
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files).map((file, index) => ({
            id: `${Date.now()}-${index}`,
            file,
            preview: URL.createObjectURL(file),
            status: "pending",
            progress: 0,
            source: "local",
        }));

        if (
            files.length + selectedFiles.length > 7 ||
            totalFile + selectedFiles.length > 7
        ) {
            toast.warn("Anda hanya dapat mengunggah maksimal 7 foto.");
            e.target.value = null;
            return;
        }

        const newFiles = [...files, ...selectedFiles];
        setFiles(newFiles);
        // Initialize sortedIds with the current order
        setSortedIds(newFiles.map((f) => f.id));
    };

    /**
     * Handles the submission of multiple photos. Iterates over the files array,
     * creates a FormData object, and makes a POST request to the server for each
     * file. Also updates the files state with the progress of each file.
     *
     * @param {Event} e - The event triggered by the submit button.
     *
     * @returns {Promise<void>}
     */
    const handleSubmitMultiplePhoto = async (e) => {
        e.preventDefault();
        const orderId = order.id;

        // Get files in the correct order based on sortedIds
        const orderedFiles = sortedIds.length
            ? sortedIds
                  .map((id) => files.find((f) => f.id === id))
                  .filter(Boolean)
            : files;

        // Create FormData with all files and their positions
        const formData = new FormData();
        formData.append("order_id", orderId);

        orderedFiles.forEach((item, index) => {
            formData.append("photos[]", item.file);
            formData.append("sorted_ids[]", index); // Position starts from 0
        });

        // Update all files status to uploading
        setFiles((prev) =>
            prev.map((f) => ({ ...f, status: "uploading", progress: 0 }))
        );

        try {
            const { success } = await albumAPI.uploadMultiplePhoto(
                formData,
                (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    // Update progress for all files
                    setFiles((prev) =>
                        prev.map((f) => ({ ...f, progress: percent }))
                    );
                }
            );

            // Update final status
            setFiles((prev) =>
                prev.map((f) => ({
                    ...f,
                    status: success ? "done" : "failed",
                    progress: success ? 100 : 0,
                }))
            );

            if (success) {
                toast.success("Semua foto telah diunggah dengan sukses!");
                await getMyAlbum();
                setFiles([]);
                // Optionally clear files after successful upload
                // setFiles([]);
                // setSortedIds([]);
            } else {
                toast.error("Failed to upload photos");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload photos");

            setFiles((prev) =>
                prev.map((f) => ({
                    ...f,
                    status: "failed",
                    progress: 0,
                }))
            );
        }
    };

    /**
     * Removes a photo from the list of files and sorted IDs.
     *
     * @param {string} id The ID of the photo to remove.
     */
    const handleRemovePhoto = (id) => {
        const newFiles = files.filter((item) => item.id !== id);
        const newSortedIds = sortedIds.filter((itemId) => itemId !== id);

        setFiles(newFiles);
        setSortedIds(newSortedIds);
    };

    useEffect(() => {
        if (activeTab !== "album") return;

        const shouldEnableSortable =
            (myAlbum.length > 1 && files.length === 0) || totalFile === 0;

        if (!shouldEnableSortable || !previewRef.current) return;
        const orderId = order?.id;
        const sortable = Sortable.create(previewRef.current, {
            animation: 150,
            onEnd: async () => {
                const ids = Array.from(previewRef.current.children).map((el) =>
                    el.getAttribute("data-id")
                );
                setSortedIds(ids);

                if (totalFile !== 0) {
                    const response = await albumAPI.reorderPosition({
                        order_id: orderId,
                        ordered_ids: ids,
                    });
                    if (!response.success) {
                        toast.error("Gagal menyimpan urutan album");
                    } else {
                        toast.success("Urutan album disimpan");
                        await getMyAlbum();
                    }
                }
            },
            // Update position numbers during drag
            onSort: () => {
                // Force re-render position indicators
                const children = Array.from(previewRef.current.children);
                children.forEach((child, index) => {
                    const positionIndicator = child.querySelector(
                        ".position-indicator"
                    );
                    if (positionIndicator) {
                        positionIndicator.textContent = index + 1;
                    }
                });
            },
        });

        return () => sortable.destroy();
    }, [activeTab, files, myAlbum, totalFile]);

    useEffect(() => {
        if (order?.id) getMyAlbum();
    }, [order?.id]);

    const getMyAlbum = async () => {
        setLoading(true);
        try {
            const response = await albumAPI.getMyAlbum(order.id);
            if (response.success) {
                setMyAlbum(response.data);
                setTotalFile(response.total);
            } else {
                setError(response.error);
            }
        } catch (err) {
            console.error("Error saving invitation setting:", error);
            setError(err.message);
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

    const deletePhotoAlbum = async (idPhoto) => {
        setLoading(true);
        try {
            const response = await albumAPI.deletePhotoAlbum(idPhoto);
            if (response.success) {
                await getMyAlbum();
            } else {
                setError(response.error);
            }
        } catch (err) {
            console.error("Error saving invitation setting:", error);
            setError(err.message);
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

    if (loading) return <Loading />;
    return (
        <div className="p-4">
            <div
                className="p-4 mb-4 text-sm text-yellow-800 rounded-lg shadow-sm bg-yellow-50 dark:bg-yellow-800 dark:text-yellow-400"
                role="alert"
            >
                <span className="font-medium block mb-1">
                    📸 Panduan Upload Foto:
                </span>
                <ul className="list-disc list-inside space-y-1">
                    <li>
                        <strong>Foto urutan pertama</strong>: Foto berdua
                        mempelai. Ini akan menjadi tampilan utama mempelai pria.
                    </li>
                    <li>
                        <strong>Foto urutan kedua</strong>: Foto mempelai pria
                        sendiri. Akan ditampilkan sebagai foto utama mempelai
                        pria.
                    </li>
                    <li>
                        <strong>Foto urutan ketiga</strong>: Foto mempelai
                        wanita sendiri. Akan ditampilkan sebagai foto utama
                        mempelai wanita.
                    </li>
                    <li>
                        <strong>Foto urutan ke-4 sampai ke-7</strong>: Foto
                        landscape atau suasana (misal pre-wedding, venue, dll).
                    </li>
                    <li>
                        Maksimal <strong>7 foto</strong> yang dapat diunggah.
                    </li>
                    <li>
                        Ukuran maksimal tiap file adalah <strong>3 MB</strong>.
                    </li>
                    <li>
                        <strong>
                            Foto yang sudah terunggah dapat dihapus permanent
                            atau diurutkan sesuai keinginan
                        </strong>
                        .
                    </li>
                </ul>
            </div>

            <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmitMultiplePhoto}>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mb-4 block w-full border border-gray-300 p-2 rounded"
                    />

                    <button
                        type="submit"
                        disabled={files.length === 0 || totalFile == 7}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-2xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {totalFile == 0
                            ? `Upload Photos (${files.length}/7)`
                            : `Upload Foto (${files.length}/${7 - totalFile})`}
                    </button>
                </form>
            </div>

            <ul ref={previewRef} className="grid grid-cols-3 gap-2 mb-10 mt-10">
                {displayFiles.map((item, index) => (
                    <li
                        key={item.id}
                        data-id={item.id}
                        className="relative group border rounded overflow-hidden"
                    >
                        {/* Position indicator - menggunakan class untuk targeting */}
                        <div className="position-indicator absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded z-10">
                            {index + 1}
                        </div>

                        <img
                            src={item.preview}
                            alt="Preview"
                            className="w-full h-36 object-cover"
                        />

                        {/* Tombol hapus hanya untuk file lokal */}
                        {item.source !== "server" ? (
                            <button
                                type="button"
                                onClick={() => handleRemovePhoto(item.id)}
                                className="absolute top-1 right-1 bg-red-700 text-white text-xs rounded-full transition"
                            >
                                <CircleX />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => deletePhotoAlbum(item.id)}
                                className="absolute top-1 right-1 bg-red-700 text-white text-xs rounded-full transition"
                            >
                                <CircleX />
                            </button>
                        )}

                        {/* Progress bar */}
                        {item.source !== "server" && (
                            <div className="absolute bottom-0 left-0 w-full bg-gray-200 h-2">
                                <div
                                    className="bg-blue-600 h-2"
                                    style={{ width: `${item.progress}%` }}
                                />
                            </div>
                        )}

                        {/* Icon status */}
                        {item.source !== "server" && (
                            <div className="absolute bottom-2 right-2 text-white">
                                {item.status === "uploading" && (
                                    <Loader2 className="animate-spin text-blue-600" />
                                )}
                                {item.status === "done" && (
                                    <CheckCircle className="text-green-500" />
                                )}
                                {item.status === "failed" && (
                                    <XCircle className="text-red-500" />
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
