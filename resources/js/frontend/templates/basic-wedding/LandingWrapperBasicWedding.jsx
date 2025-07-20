import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import BasicWedding from "./BasicWedding";

/**
 * LandingWrapperBasicWedding is a React component that wraps the BasicWedding component,
 * extracting the "to" parameter from the URL's search parameters. If the "to" parameter
 * is not present, it defaults to "Teman teman semua".
 *
 * @param {Object} props
 * @param {Function} props.onFinish - Callback function to be called when the wedding
 *                                    event is finished.
 * @param {Object} props.data - Additional data passed to the BasicWedding component.
 *
 * @returns {React.ReactElement} - The rendered BasicWedding component with the extracted
 *                                 "to" parameter and other props.
 */

export default function LandingWrapperBasicWedding({ onFinish, data }) {
    const [searchParams] = useSearchParams();
    const to = searchParams.get("to") || "Teman teman semua";

    return <BasicWedding onFinish={onFinish} to={to} data={data} />;
}

LandingWrapperBasicWedding.propTypes = {
    onFinish: PropTypes.func.isRequired,
    data: PropTypes.object,
};
