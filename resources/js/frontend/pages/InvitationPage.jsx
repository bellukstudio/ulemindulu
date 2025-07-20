import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { invitationAPI } from "../action/invitation";
import HomeBasicWedding from "../templates/basic-wedding/HomeBasicWedding";
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
    const [data, setData] = useState(null);
    const [invitationSettings, setInvitationSettings] = useState(null);

    useEffect(() => {
        const fetchSubdomain = async () => {
            try {
                const result = await invitationAPI.getSubDomainInvitation(slug);
                if (result.success) {
                    setData(result.data.data);
                    setInvitationSettings(result.data.invitationSettings);
                }
            } catch (error) {
                console.error("Error fetching subdomain:", error);
            }
        };

        fetchSubdomain();
    }, [slug]);

    if (!data) return <Loading />;

    const template = data.slug;

    switch (template) {
        case "basic-wedding":
            return <HomeBasicWedding data={invitationSettings} />;
        default:
            return <p>Template not found</p>;
    }
}

export default InvitationPage;
