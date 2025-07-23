import { useState } from "react";
import PropTypes from "prop-types";

LoveGift.propTypes = {
    gift: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            bank_name: PropTypes.string.isRequired,
            account_number: PropTypes.string.isRequired,
            receiver_name: PropTypes.string.isRequired,
        })
    ),
};
export default function LoveGift({ gift }) {
    const [copiedIndex, setCopiedIndex] = useState(null);

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        });
    };

    return (
        <div className="w-full relative bg-cover bg-center bg-blue-900">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 px-6 py-16 text-center text-white">
                <h1 className="text-5xl font-dancing mb-6">Love Gift</h1>
                <h2 className="text-md font-mono">
                    Dengan hormat, bagi Anda yang ingin memberikan tanda kasih
                    kepada kami, dapat melalui:
                </h2>

                <div className="space-y-6 max-w-md mx-auto mt-10">
                    {gift.map((data, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
                        >
                            <p className="text-lg font-semibold text-gray-800 mb-1">
                                {data.receiver_name}
                            </p>
                            <div className="flex items-center justify-between bg-gray-100 rounded-md p-2 mb-2">
                                <span className="text-sm font-mono text-black">
                                    {data.account_number}
                                </span>
                                <button
                                    onClick={() =>
                                        copyToClipboard(
                                            data.account_number,
                                            index
                                        )
                                    }
                                    className="text-xs font-mono text-blue-500 hover:underline"
                                >
                                    {copiedIndex === index
                                        ? "Tersalin!"
                                        : "Salin"}
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 font-mono">
                                {data.bank_name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
