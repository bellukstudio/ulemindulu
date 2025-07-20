"use client";

import { useRef, useState, Suspense } from "react";
import LandingWrapperBasicWedding from "./LandingWrapperBasicWedding";
import Invitation from "./Invitation";
import PropTypes from "prop-types";

HomeBasicWedding.propTypes = {
    data: PropTypes.object,
};
export default function HomeBasicWedding({ data }) {
    const [showInvitation, setShowInvitation] = useState(false);
    const audioRef = useRef(null);

    const handleStart = () => {
        if (audioRef.current) {
            audioRef.current.play().catch((err) => {
                console.warn("Autoplay diblokir oleh browser:", err);
            });
        }
        setShowInvitation(true);
    };

    return (
        <>
            <audio
                ref={audioRef}
                className="hidden"
                src="https://res.cloudinary.com/ducsvvqsy/video/upload/v1752224949/template/asset/music/pure-love-304010_f6ytwz.mp3"
                autoPlay
                loop
            />
            {!showInvitation && (
                <Suspense fallback={<div>Loading...</div>}>
                    <LandingWrapperBasicWedding onFinish={handleStart} data={data} />
                </Suspense>
            )}
            {showInvitation && <Invitation data={data} />}
        </>
    );
}
