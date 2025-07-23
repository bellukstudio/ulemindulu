import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { invitationAPI } from "../action/invitation";
import HomeBasicWedding from "../templates/basic-wedding/HomeBasicWedding";

function normalizeInvitationSettings(settings) {
    if (!settings) return null;

    let parsedCustomData = settings.custom_data;

    if (typeof parsedCustomData === "string") {
        try {
            parsedCustomData = JSON.parse(parsedCustomData);
        } catch (error) {
            console.warn("custom_data bukan JSON valid:", error);
            parsedCustomData = {};
        }
    }

    return {
        ...settings,
        custom_data: parsedCustomData,
    };
}
/**
 * InvitationPage is a React component that renders an invitation page based on
 * the template type. It fetches the invitation details using the slug from URL
 * parameters and displays the appropriate template.
 *
 * The component shows a loading indicator while fetching data and handles errors
 * during the fetch operation. If the template type is not recognized, it displays
 * a fallback message.
 *
 * @returns {React.ReactElement} The rendered invitation page component.
 */

/**
 * Renders an invitation page based on the template type. It fetches the invitation
 * details using the slug from URL parameters and displays the appropriate template.
 *
 * The component shows a loading indicator while fetching data and handles errors
 * during the fetch operation. If the template type is not recognized, it displays
 * a fallback message.
 *
 * @returns {React.ReactElement} The rendered invitation page component.
 */

function InvitationPage() {
    const { slug } = useParams();
    const [template, setTemplate] = useState(null);
    const [invitationSettings, setInvitationSettings] = useState(null);
    const [gift, setGift] = useState([]);
    const [album, setAlbum] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubdomain = async () => {
            try {
                const result = await invitationAPI.getSubDomainInvitation(slug);
                if (result.success) {
                    setTemplate(result.data.template);
                    setInvitationSettings(
                        normalizeInvitationSettings(
                            result.data.invitationSettings ?? null
                        )
                    );
                    setGift(
                        Array.isArray(result.data.gift) ? result.data.gift : []
                    );
                    setAlbum(
                        Array.isArray(result.data.album) ? result.data.album : []
                    );
                } else {
                    navigate("/404");
                }
            } catch (error) {
                console.error("Error fetching subdomain:", error);
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

        fetchSubdomain();
    }, [slug]);
    if (!template) return <Loading />;

    const templateData= template.slug;

    switch (templateData) {
        case "basic-wedding":
            return (
                <HomeBasicWedding
                    data={invitationSettings}
                    gift={gift}
                    isPreview={false}
                    album={album}
                />
            );
        default:
            return <p>Template not found</p>;
    }
}

export default InvitationPage;
