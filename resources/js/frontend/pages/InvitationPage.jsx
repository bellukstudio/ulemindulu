import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, Suspense } from "react";
import Loading from "./Loading";
import { invitationAPI } from "../action/invitation";
import NotFound from "./NotFound";
import { loadTemplateComponent } from "../core/templateLoader";
import { getCachedTemplate } from "../core/templateCache";
/**
 * Normalize invitation settings by parsing custom_data string to JSON.
 *
 * @param {object} settings Invitation settings
 * @returns {object} Normalized invitation settings
 */
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
 * InvitationPage component.
 *
 * This component fetches and displays an invitation page based on the subdomain slug.
 * It retrieves the template, invitation settings, gifts, and album data associated with the invitation.
 * If the template is not found, it navigates to a 404 page. If there is an error during fetching,
 * it navigates to an error page. The component uses suspense to handle loading states while
 * dynamically importing and rendering the template component.
 *
 * @returns {JSX.Element} The rendered invitation page component.
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
                        Array.isArray(result.data.album)
                            ? result.data.album
                            : []
                    );
                } else {
                    navigate("/404");
                }
            } catch (err) {
                console.error("Error fetching subdomain:", err);
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
    const templateData = template.slug;

    const TemplateComponent = getCachedTemplate(templateData);
    if (!TemplateComponent) return <NotFound />;

    return (
        <Suspense fallback={<Loading />}>
            <TemplateComponent
                data={invitationSettings}
                gift={gift}
                isPreview={false}
                album={album}
            />
        </Suspense>
    );
}

export default InvitationPage;
