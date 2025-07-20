import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { CircleX } from "lucide-react";
import Sortable from "sortablejs";


FormUploadAlbum.propTypes = {
    activeTab: PropTypes.string,
    order: PropTypes.object,
};
/**
 * A React component for uploading multiple photos to an album.
 *
 * It uses the {@link https://github.com/SortableJS/Sortable | SortableJS} library to enable drag-and-drop reordering of the photos.
 *
 * @param {string} activeTab - The active tab in the parent component.
 *
 * @returns {React.ReactElement} The component.
 */
export default function FormUploadAlbum({ activeTab, order }) {
    const [files, setFiles] = useState([]);
    const [sortedIds, setSortedIds] = useState([]);
    const previewRef = useRef(null);

    /**
     * Handles the change event for file input.
     * It processes the selected files, assigns each a unique ID and a preview URL,
     * and updates the state with the new files.
     *
     * @param {Event} e - The change event triggered by file input.
     */

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files).map((file, index) => ({
            id: `${Date.now()}-${index}`,
            file,
            preview: URL.createObjectURL(file),
        }));
        setFiles((prev) => [...prev, ...selectedFiles]);
    };

    const handleSubmitMultiplePhoto = async (e) => {
        e.preventDefault();
        const orderId = order.id;
        const formData = new FormData();
        formData.append("order_id", orderId);
        files.forEach((item) => {
            formData.append("photos[]", item.file);
        });
        formData.append("sorted_ids", sortedIds.join(","));

        try {
            const response = await axios.post("/album/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Uploaded:", response.data);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    /**
     * Handles the removal of a photo from the album.
     * @param {string} id The id of the photo to be removed.
     * @returns {void}
     */
    const handleRemovePhoto = (id) => {
        setFiles((prev) => prev.filter((item) => item.id !== id));
        setSortedIds((prev) => prev.filter((itemId) => itemId !== id));
    };

    useEffect(() => {
        if (activeTab === "album") {
            if (!previewRef.current || files.length === 0) return;

            const sortable = Sortable.create(previewRef.current, {
                animation: 150,
                onEnd: () => {
                    const ids = Array.from(previewRef.current.children).map(
                        (el) => el.getAttribute("data-id")
                    );
                    setSortedIds(ids);
                },
            });

            return () => sortable.destroy();
        }
    }, [files]);

    return (
        <div className="p-4">
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
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-2xl hover:bg-blue-700"
                    >
                        Upload Photos
                    </button>
                </form>
            </div>

            <ul ref={previewRef} className="grid grid-cols-3 gap-2 mb-10 mt-10">
                {files.map((item) => (
                    <li
                        key={item.id}
                        data-id={item.id}
                        className="relative group border rounded overflow-hidden"
                    >
                        <img
                            src={item.preview}
                            alt="Preview"
                            className="w-full h-36 object-cover"
                        />
                        {/* Tombol Hapus */}
                        <button
                            type="button"
                            onClick={() => handleRemovePhoto(item.id)}
                            className="absolute top-1 right-1 bg-red-700  text-white text-xs rounded-full transition"
                        >
                            <CircleX />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
