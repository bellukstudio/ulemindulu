import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TemplateSection from "./components/TemplateSection";
import FooterSection from "../components/FooterSection";
import { templateAPI } from "../action/template.js";

export default function ListTemplate() {
    const [templates, setTemplates] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 20,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTemplates = async (page = 1) => {
        setLoading(true);
        setError(null);

        try {
            const result = await templateAPI.fetchTemplates(page, pagination.per_page);

            if (result.success) {
                setTemplates(result.data);
                setPagination(result.pagination);
            } else {
            setError(result.error);
                setTemplates([]);
            }
        } catch (err) {
            setError("Terjadi kesalahan saat memuat template");
            setTemplates([]);
        } finally {
            setLoading(false);
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
            <Navbar />
            <TemplateSection
                templates={templates}
                pagination={pagination}
                onNext={nextPage}
                onPrev={prevPage}
                loading={loading}
                error={error}
            />
            <FooterSection />
        </>
    );
}
