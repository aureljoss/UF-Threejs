import './styles/styles.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import * as THREE from 'three'
import React, { Suspense } from "react";
import { Html } from "@react-three/drei"; // for loading progress

const root = ReactDOM.createRoot(document.querySelector('#root'))

function Loader() {
  return (
    <Html center>
      <div id="loader-threejs">Something fun is loading...</div>
    </Html>
  );
}

root.render(
    <>
        <Canvas
            // orthographic
            flat
            // camera={ {
            //     fov: 55,
            //     zoom:100,
            //     near: 0.01,
            //     // far: 100,
            //     // far: 10000,
            //     position: [ 0,0,16 ]
            // } }
            camera={ {
                fov: 35,
                near: 0.01,
                // far: 100,
                // far: 10000,
                position: [ -10,10,30 ]
            } }
        >
            <Suspense fallback={<Loader />}>
                <Experience />
            </Suspense>
        </Canvas>
    </>
)