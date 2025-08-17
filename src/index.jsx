import './styles/styles.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import * as THREE from 'three'
import CameraAnimation from "./CameraAnimation.jsx";

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        // flat
        // camera={ {
        //     fov: 35,
        //     near: 0.1,
        //     // far: 100,
        //     far: 10000,
        //     position: [ 0,40,0 ]
        // } }
    >
        <Experience />
        <CameraAnimation />
    </Canvas>
)