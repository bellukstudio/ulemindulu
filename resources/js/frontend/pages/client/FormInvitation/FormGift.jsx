import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { giftAPI } from "../../../action/gift";
import Loading from "../../Loading";
import { toast } from "react-toastify";
FormGift.propTypes = {
    order: PropTypes.object,
    template: PropTypes.object,
};
/**
 * A form component for adding and managing bank accounts for a wedding
 * invitation. This component allows users to add, edit, and remove bank
 * accounts.
 *
 * The component renders a form with input fields for each bank account,
 * including the bank name, account number, and receiver's name. The user can
 * add new bank accounts by clicking the "Tambah Rekening" button, or remove
 * existing accounts by clicking the "Hapus" button next to each account. The
 * user can also edit the account details by typing in the input fields.
 *
 * When the user submits the form, the component will update the state with
 * the new bank account details.
 */
export default function FormGift({ order, template }) {
    const [bankAccounts, setBankAccounts] = useState([
        { bank_name: "", account_number: "", receiver_name: "" },
    ]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [available, setAvailable] = useState(false);

    /**
     * Update the bank account details in the state
     * @param {number} index The index of the bank account to update
     * @param {React.ChangeEvent<HTMLInputElement>} e The input change event
     */
    const handleChangeGift = (index, e) => {
        const updated = [...bankAccounts];
        updated[index][e.target.name] = e.target.value;
        setBankAccounts(updated);
    };

    /**
     * Add a new bank account to the list of bank accounts
     */

    /**
     * Add a new bank account to the list of bank accounts. This function will
     * not add a new account if the list already has 5 accounts.
     */
    const addBankAccount = () => {
        if (bankAccounts.length >= 5) {
            toast.warn("Anda hanya dapat menambahkan maksimal 5 rekening");
            return;
        }

        setBankAccounts([
            ...bankAccounts,
            { bank_name: "", account_number: "", receiver_name: "" },
        ]);
    };
    /**
     * Remove a bank account at the given index
     * @param {number} index The index of the bank account to remove
     */
    const removeBankAccount = (index) => {
        const accountToDelete = bankAccounts[index];

        if (available && accountToDelete.id) {
            deleteBankAccount(accountToDelete.id);
        }

        const updated = [...bankAccounts];
        updated.splice(index, 1);
        setBankAccounts(updated);
    };

    useEffect(() => {
        checkBankAccount(order.id, template.id);
    }, [order, template]);

    /**
     * Check if bank account is available for the given order and template
     * @param {number} orderId The order ID
     * @param {number} templateId The template ID
     *
     * If the bank account is available, the component will update the state
     * with the bank account details. If not, the component will add a new
     * bank account with empty details to the list.
     */
    const checkBankAccount = async (orderId, templateId) => {
        try {
            const result = await giftAPI.checkBankAccount(orderId, templateId);

            if (result.success) {
                if (result.status) {
                    setBankAccounts(result.data);
                    setAvailable(true);
                } else {
                    setBankAccounts([
                        ...bankAccounts,
                        {
                            bank_name: "",
                            account_number: "",
                            receiver_name: "",
                        },
                    ]);
                }
            } else {
                setError(result.error);
                setBankAccounts([
                    ...bankAccounts,
                    { bank_name: "", account_number: "", receiver_name: "" },
                ]);
            }
        } catch (err) {
            console.log(err);
            setBankAccounts([
                ...bankAccounts,
                { bank_name: "", account_number: "", receiver_name: "" },
            ]);

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

    /**
     * Handles the form submission for bank accounts.
     * Prevents default form submission behavior, sets loading state, and resets error and success states.
     * Determines whether to create or update bank accounts based on their availability.
     * If bank accounts are not available, it calls the createBankAccount function.
     * Otherwise, it calls the updateBankAccount function.
     * @param {React.FormEvent<HTMLFormElement>} e The form submission event
     */

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        const orderId = order.id;
        const templateId = template.id;

        if (!available) {
            createBankAccount(orderId, templateId);
        } else {
            updateBankAccount(orderId, templateId);
        }
    };

    /**
     * Create a new bank account for the given order and invitation template.
     * Calls the createBankAccount API and reloads the page on success.
     * Otherwise, sets the error message.
     * @param {number} orderId The ID of the order
     * @param {number} templateId The ID of the invitation template
     */
    const createBankAccount = async (orderId, templateId) => {
        try {
            const result = await giftAPI.createBankAccount({
                bank_accounts: bankAccounts,
                order_id: orderId,
                invitation_template_id: templateId,
            });

            if (result.success) {
                setSuccess(true);
                setTimeout(async () => {
                    await checkBankAccount(orderId, templateId);
                }, 500);
            } else {
                setError(result.error);
            }
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.errors ||
                    err.response?.data?.message ||
                    "Terjadi kesalahan."
            );
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

    /**
     * Update the bank account information
     * @param {number} orderId The ID of the order
     * @param {number} templateId The ID of the invitation template
     * Calls the updateBankAccount API and reloads the page on success.
     * Otherwise, sets the error message.
     */
    const updateBankAccount = async (orderId, templateId) => {
        try {
            const result = await giftAPI.updateBankAccount({
                bank_accounts: bankAccounts,
                order_id: orderId,
                invitation_template_id: templateId,
            });

            if (result.success) {
                setSuccess(true);
                setTimeout(async () => {
                    await checkBankAccount(orderId, templateId);
                }, 500);
            } else {
                setError(result.error);
            }
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.errors ||
                    err.response?.data?.message ||
                    "Terjadi kesalahan."
            );
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

    /**
     * Deletes a bank account by its ID.
     * @param {number} bankAccount - The ID of the bank account to be deleted.
     * Calls the deleteBankAccount API and reloads the page on success.
     * On failure, it sets an error message.
     */

    const deleteBankAccount = async (bankAccount) => {
        setLoading(true);
        try {
            const result = await giftAPI.deleteBankAccount(bankAccount);
            if (result.success) {
                setTimeout(async () => {
                    await checkBankAccount(orderId, templateId);
                }, 500);
                setSuccess(true);
            } else {
                setError(result.error);
            }
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.errors ||
                    err.response?.data?.message ||
                    "Terjadi kesalahan."
            );
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
            {success && (
                <div
                    className="p-4 mb-4 text-sm text-green-800 rounded-lg shadow-md bg-green-50 dark:bg-gray-800 dark:text-green-400"
                    role="alert"
                >
                    <span className="font-medium">Successfully</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {bankAccounts.map((account, index) => (
                    <div
                        key={index}
                        className="mb-6 p-4 rounded-md bg-white shadow-md "
                    >
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Nama Bank
                            </label>
                            <input
                                type="text"
                                name="bank_name"
                                value={account.bank_name}
                                onChange={(e) => handleChangeGift(index, e)}
                                className="w-full border border-gray-300 px-3 py-2 rounded uppercase"
                            />
                            {error?.[`bank_accounts.${index}.bank_name`] && (
                                <p className="text-red-500 text-sm mt-1">
                                    {
                                        error[
                                            `bank_accounts.${index}.bank_name`
                                        ][0]
                                    }
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Nomor Rekening
                            </label>
                            <input
                                type="text"
                                name="account_number"
                                value={account.account_number}
                                onChange={(e) => handleChangeGift(index, e)}
                                className="w-full border border-gray-300 px-3 py-2 rounded"
                            />
                            {error?.[
                                `bank_accounts.${index}.account_number`
                            ] && (
                                <p className="text-red-500 text-sm mt-1">
                                    {
                                        error[
                                            `bank_accounts.${index}.account_number`
                                        ][0]
                                    }
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Nama Penerima
                            </label>
                            <input
                                type="text"
                                name="receiver_name"
                                value={account.receiver_name}
                                onChange={(e) => handleChangeGift(index, e)}
                                className="w-full border border-gray-300 px-3 py-2 rounded"
                            />
                            {error?.[
                                `bank_accounts.${index}.receiver_name`
                            ] && (
                                <p className="text-red-500 text-sm mt-1">
                                    {
                                        error[
                                            `bank_accounts.${index}.receiver_name`
                                        ][0]
                                    }
                                </p>
                            )}
                        </div>

                        {bankAccounts.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeBankAccount(index)}
                                className="text-red-600 text-sm"
                            >
                                Hapus
                            </button>
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addBankAccount}
                    disabled={bankAccounts.length >= 5}
                    className={`mb-4 ${
                        bankAccounts.length >= 5
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-blue-600"
                    }`}
                >
                    + Tambah Rekening
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mb-10 mt-4 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    {loading ? "Menyimpan..." : "Simpan"}
                </button>
            </form>
        </div>
    );
}
