import { useState, useEffect } from "react";
import { invitationAPI } from "../../../action/invitation";
import PropTypes from "prop-types";
import Loading from "../../Loading";

FormSettings.propTypes = {
    order: PropTypes.object,
    template: PropTypes.object,
};
/**
 * The FormSettings component is a page for the client to edit their invitation
 * settings. It fetches the available settings for the given order id and
 * displays the form to edit the settings. The form includes fields for the
 * event date, event time, timezone, description, location, and address. The
 * component also handles the submission of the form, saving the settings to
 * the database.
 *
 * The component takes two props: order and template. The order prop is an
 * object containing the order's id and invitation_template_id. The template
 * prop is an object containing the invitation template's id and type.
 *
 * The component has several states: loading, error, invitationData, and
 * customData. The loading state is a boolean that indicates whether the
 * component is currently fetching the available settings. The error state is
 * a string that contains the error message if there is an error. The
 * invitationData state is an object containing the invitation settings. The
 * customData state is an object containing the custom data for the invitation
 * template.
 *
 * The component has several functions: handleChange, fetchAvailableSettings,
 * handleInvitationTypeChange, and handleSaveSettings. The handleChange
 * function updates the custom data by setting the value of the given input
 * field to the state. The fetchAvailableSettings function fetches the
 * available settings for a given order id. The handleInvitationTypeChange
 * function handles the change event of the invitation settings input fields.
 * It updates the state by spreading the previous state and updating the
 * property with the new value. The handleSaveSettings function handles the
 * submission of the form, saving the settings to the database.
 */
export default function FormSettings({ order, template }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    const [settingsId, setSettingsId] = useState("");

    const [invitationData, setInvitationData] = useState({
        description:
            "Tanpa Mengurangi Rasa Hormat. Kami Bermaksud Mengundang Bapak/Ibu/Saudara/i Untuk Hadir pada Acara Berikut:",
        order_id: "",
        invitation_template_id: "",
        event_date: "",
        event_time: "",
        timezone: "",
        address: "",
        location: "",
        custom_data: {},
    });
    const [customData, setCustomData] = useState({});

    /**
     * Updates the custom data by setting the value of the given input field
     * to the state.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
     */
    const handleChange = (e) => {
        setCustomData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    /**
     * Fetches the available settings for a given order id.
     * @param {number} orderId The order id to fetch the settings from.
     * @returns {Promise<void>} A promise that resolves when the data is fetched
     *   successfully or is rejected if an error occurs.
     */
    const fetchAvailableSettings = async (orderId) => {
        try {
            const result = await invitationAPI.checkInvitationSetting(orderId);

            if (result.data.status) {
                setIsUpdate(true);
                const data = result.data.data;

                setSettingsId(data.id);

                const parsedCustomData = data.custom_data
                    ? JSON.parse(data.custom_data)
                    : {};

                setInvitationData((prev) => ({
                    ...data,
                    custom_data: parsedCustomData,
                }));

                setCustomData(parsedCustomData); // supaya tampil di form bagian customData
            } else {
                setIsUpdate(false);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    /**
     * Handles the change event of the invitation settings input fields.
     * It updates the state by spreading the previous state and updating
     * the property with the new value.
     * @param {Event} e - The change event triggered by the input field.
     * @returns {void}
     */
    const handleChangeSaveInvitationSettings = (e) => {
        const { name, value } = e.target;
        setInvitationData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleInvitationTypeChange = (type) => {
        let customData = {};

        switch (type) {
            case "wedding":
                customData = {
                    mempelaiPria: "",
                    mempelaiWanita: "",
                    bpkMempelaiPria: "",
                    ibuMempelaiPria: "",
                    bpkMempelaiWanita: "",
                    ibuMempelaiWanita: "",
                    ayatQuran: "",
                    isiAyat: "",
                    tanggalAkad: "",
                    jamAkad: "",
                    tanggalResepsi: "",
                    jamResepsi: "",
                };
                break;
            case "aqiqah":
                customData = { namaAnak: "", jenisKelamin: "" };
                break;
            case "tahlil":
                customData = { namaAlmarhum: "" };
                break;
            case "birthday":
                customData = {
                    namaYangBerulangTahun: "",
                    usia: "",
                };
                break;
            case "event":
            case "syukuran":
                customData = {
                    namaAcara: "",
                    deskripsiAcara: "",
                };
                break;
            default:
                customData = {};
        }

        setCustomData(customData);

        setInvitationData((prevData) => ({
            ...prevData,
            custom_data: customData,
        }));
    };

    useEffect(() => {
        handleInvitationTypeChange(order.invitation_template?.type);
        fetchAvailableSettings(order.id);
    }, [order]);

    const handleSaveSettings = async () => {
        try {
            setLoading(true);
            const orderId = order.id;
            const templateId = template.id;
            const payload = {
                description: invitationData.description,
                event_date: invitationData.event_date,
                event_time: invitationData.event_time,
                timezone: invitationData.timezone,
                address: invitationData.address,
                location: invitationData.location,
                order_id: orderId,
                invitation_template_id: templateId,
                custom_data: customData,
            };

            if (!isUpdate) {
                const result = await invitationAPI.createInvitationSetting(
                    payload
                );
                if (result.success) {
                    location.reload();
                } else {
                    setError(result.error || "Terjadi kesalahan saat edit.");
                }
            } else {
                const result = await invitationAPI.updateInvitationSetting(
                    settingsId,
                    payload
                );

                if (result.success) {
                    location.reload();
                } else {
                    setError(result.error || "Terjadi kesalahan saat edit.");
                }
            }
        } catch (err) {
            console.error(err);
            setError("Terjadi kesalahan saat edit.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="p-3">
            {error && (
                <p className="text-red-500 mb-4 text-sm text-center">{error}</p>
            )}
            <form onSubmit={handleSaveSettings}>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="mb-4">
                        <label
                            htmlFor="eventDate"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Tanggal Acara Utama
                        </label>
                        <input
                            type="date"
                            name="event_date"
                            value={invitationData.event_date}
                            onChange={handleChangeSaveInvitationSettings}
                            id="event_date"
                            className="w-full border  border-blue-200 rounded-md py-2 px-3"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="eventTime"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Waktu Acara Utama
                        </label>
                        <input
                            type="time"
                            name="event_time"
                            value={invitationData.event_time}
                            onChange={handleChangeSaveInvitationSettings}
                            id="event_time"
                            className="w-full border border-blue-200 rounded-md py-2 px-3"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="timezone"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Select an option
                        </label>
                        <select
                            id="timezone"
                            name="timezone"
                            value={invitationData.timezone}
                            onChange={handleChangeSaveInvitationSettings}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">Choose a timezone</option>
                            <option value="wit">WIT</option>
                            <option value="wita">WITA</option>
                            <option value="wib">WIB</option>
                        </select>
                    </div>
                </div>
                {/* Second Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-5 mb-5">
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows="4"
                            name="description"
                            value={invitationData.description}
                            onChange={handleChangeSaveInvitationSettings}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Tulis sanjungan anda ..."
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="location"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Lokasi Acara
                        </label>
                        <input
                            type="url"
                            name="location"
                            value={invitationData.location}
                            onChange={handleChangeSaveInvitationSettings}
                            id="location"
                            placeholder={"https://maps.app.goo.gl"}
                            className="w-full border border-blue-200 rounded-md py-2 px-3 "
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="address"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Alamat acara
                        </label>
                        <textarea
                            id="address"
                            rows="4"
                            name="address"
                            value={invitationData.address}
                            onChange={handleChangeSaveInvitationSettings}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={
                                "Jl. Pemuda No. 1, Jakarta Selatan, DKI Jakarta, Indonesia"
                            }
                        ></textarea>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-5 mb-5">
                    {Object.entries(customData).map(([key, value]) => {
                        let inputElement;

                        if (key.toLowerCase().includes("tanggal")) {
                            inputElement = (
                                <input
                                    type="date"
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 px-3 py-2 rounded"
                                />
                            );
                        } else if (key.toLowerCase().includes("jam")) {
                            inputElement = (
                                <input
                                    type="time"
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 px-3 py-2 rounded"
                                />
                            );
                        } else {
                            inputElement = (
                                <textarea
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 px-3 py-2 rounded"
                                />
                            );
                        }

                        return (
                            <div className="mb-4" key={key}>
                                <label className="block text-sm font-medium mb-1 capitalize">
                                    {key.replace(/([A-Z])/g, " $1")}
                                </label>
                                {inputElement}
                            </div>
                        );
                    })}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mb-10 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition"
                >
                    {loading ? "Proses Simpan..." : "Simpan"}
                </button>
            </form>
        </div>
    );
}
