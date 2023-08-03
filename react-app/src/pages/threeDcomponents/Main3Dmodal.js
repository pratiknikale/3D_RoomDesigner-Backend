import React, { useState, useEffect } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { angleRadians } from "../utils/angle";
import { feetToThreeD } from "../utils/unitMaping";
import { useDispatch, useSelector } from "react-redux";


const Main3Dmodal = () => {
    const elements = useSelector((state) => state.projects.currentProjectDetails.elements)
    return (
        <>
            <PerspectiveCamera position={[-2, 4, 5]} makeDefault />
            <OrbitControls
                // enablePan={false}
                enableZoom={true} maxPolarAngle={angleRadians(85)} minPolarAngle={angleRadians(20)} />

            {/* flooring */}
            <mesh rotation={[-angleRadians(90), 0, 0]}
                position={[0, 0, 0]}
                receiveShadow>
                <planeGeometry attach="geometry" args={[feetToThreeD(elements?.Floor?.length), feetToThreeD(elements?.Floor?.width)]} />
                <meshStandardMaterial attach="material" color="lightgrey" />
            </mesh>
            {/* flooring */}

            <ambientLight args={["#ffffff", 0.3]} />
            <directionalLight args={["#ffffff", 1]} position={[-3, 3, 2]} castShadow />
        </>
    );
};

export default Main3Dmodal;
