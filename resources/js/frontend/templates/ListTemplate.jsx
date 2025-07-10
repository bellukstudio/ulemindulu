import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import TemplateSection from "../components/TemplateSection";
import FooterSection from "../components/FooterSection";
export default function ListTemplate() {
    const [templates, setTemplates] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
    });

    const fetchTemplates = async (page = 1) => {
        try {
            const res = await axios.get(
                `http://127.0.0.1:8000/api/v1/template/all?page=${page}&per_page=20`
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
            <Navbar />
            <TemplateSection
                templates={templates}
                pagination={pagination}
                onNext={nextPage}
                onPrev={prevPage}
            />
            <FooterSection />
        </>
    );
}
