import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import BasicWedding from "./BasicWedding";

export default function LandingWrapper({ onFinish }) {
    const [searchParams] = useSearchParams();
    const to = searchParams.get("to") || "Teman teman semua";

    return <BasicWedding onFinish={onFinish} to={to} />;
}

LandingWrapper.propTypes = {
    onFinish: PropTypes.func.isRequired,
};
