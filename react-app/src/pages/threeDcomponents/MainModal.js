import React, { useState, useEffect } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { angleRadians } from "./utils/angle";


const MainModal = () => {
    return (
        <>
            <PerspectiveCamera position={[-1, 4, 5]} makeDefault />
            <OrbitControls enablePan={false} enableZoom={true} maxPolarAngle={angleRadians(85)} minPolarAngle={angleRadians(20)} />


            <mesh rotation={[-angleRadians(90), 0, 0]}
                position={[0, 0, 0]}
                receiveShadow>
                <planeGeometry attach="geometry" args={[3, 3]} />
                <meshStandardMaterial attach="material" color="lightgrey" />
            </mesh>
            {/* flooring */}

            <ambientLight args={["#ffffff", 0.3]} />
            <directionalLight args={["#ffffff", 1]} position={[-3, 3, 2]} castShadow />
        </>
    );
};

export default MainModal;
