import { Suspense, useMemo, useRef, useState } from "react";

import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";

import { Html, Line, OrbitControls } from "@react-three/drei";

import * as THREE from "three";

import type {
  CustomizationCallout,
} from "../../../features/services/BespokeCustomizationPage/data/customization.data";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface Product3DViewerProps {
  image: string;
  imageAlt: string;
  callouts?: CustomizationCallout[];

  /**
   * Original Figma stage ratio.
   * Example: "624.76/1143"
   */
  aspectRatio?: string;

  /**
   * "contain" keeps the complete image visible.
   */
  objectFit?: "contain" | "cover";

  objectPosition?: string;

  /**
   * Show customization callouts on desktop.
   */
  showCallouts?: boolean;

  /**
   * Enable the debug coordinate picker.
   */
  debug?: boolean;

  /**
   * Called when user clicks the stage.
   */
  onDebugPoint?: (point: { x: number; y: number }) => void;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function parseAspectRatio(value?: string) {
  if (!value) {
    return 1;
  }

  const [width, height] = value.split("/").map(Number);

  if (!width || !height) {
    return 1;
  }

  return width / height;
}

/**
 * Converts a CSS/object-position string into normalized coordinates.
 *
 * Examples:
 * "50% 50%"
 * "50% 38%"
 * "center center"
 */
function parseObjectPosition(value = "50% 50%") {
  const parts = value.split(" ");

  const parsePart = (
    part: string | undefined,
    fallback: number
  ) => {
    if (!part) {
      return fallback;
    }

    if (part === "center") {
      return 50;
    }

    if (part === "left" || part === "top") {
      return 0;
    }

    if (part === "right" || part === "bottom") {
      return 100;
    }

    const number = parseFloat(part);

    return Number.isFinite(number)
      ? number
      : fallback;
  };

  return {
    x: parsePart(parts[0], 50),
    y: parsePart(parts[1], 50),
  };
}

/* -------------------------------------------------------------------------- */
/* Product plane                                                              */
/* -------------------------------------------------------------------------- */

function ProductArtwork({
  image,
  callouts = [],
  aspectRatio = 1,
  objectFit = "contain",
  objectPosition = "50% 50%",
  showCallouts = true,
}: {
  image: string;
  callouts?: CustomizationCallout[];
  aspectRatio?: number;
  objectFit?: "contain" | "cover";
  objectPosition?: string;
  showCallouts?: boolean;
}) {
  const texture = useLoader(THREE.TextureLoader, image);

  const groupRef = useRef<THREE.Group>(null);
  const artworkRef = useRef<THREE.Group>(null);

  const { viewport } = useThree();

  const [hovered, setHovered] = useState(false);

  /*
   * Mouse target.
   *
   * This produces a subtle "product reacts to your cursor" effect
   * without making the garment spin wildly.
   */
  const pointerTarget = useRef({
    x: 0,
    y: 0,
  });

  const pointerCurrent = useRef({
    x: 0,
    y: 0,
  });

  /*
   * Drag rotation.
   */
  const dragTarget = useRef({
    x: 0,
    y: 0,
  });

  const dragCurrent = useRef({
    x: 0,
    y: 0,
  });

  const dragging = useRef(false);

  /*
   * Texture configuration.
   */
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;

    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    texture.anisotropy = 4;

    texture.needsUpdate = true;

    return texture;
  }, [texture]);

  /*
   * Determine the actual image dimensions.
   */
  const imageAspect =
    texture.image?.width && texture.image?.height
      ? texture.image.width / texture.image.height
      : aspectRatio;

  /*
   * Fit the artwork inside the Three.js stage.
   *
   * This keeps your existing PNG proportions intact.
   */
  const dimensions = useMemo(() => {
    let width = 2.65;
    let height = width / imageAspect;

    const stageAspect = aspectRatio;

    if (objectFit === "cover") {
      if (imageAspect < stageAspect) {
        height = 2.9;
        width = height * imageAspect;
      } else {
        width = 2.65;
        height = width / imageAspect;
      }
    } else {
      /*
       * contain
       */
      if (imageAspect > stageAspect) {
        width = 2.65;
        height = width / imageAspect;
      } else {
        height = 3.65;
        width = height * imageAspect;
      }
    }

    return {
      width,
      height,
    };
  }, [
    aspectRatio,
    imageAspect,
    objectFit,
  ]);

  /*
   * Convert existing percentage callout coordinates into
   * the local Three.js coordinate system.
   */
  const calloutData = useMemo(() => {
    const position = parseObjectPosition(objectPosition);

    return callouts.map((callout) => {
      const targetX =
        ((callout.target.x / 100) - 0.5) *
        dimensions.width;

      const targetY =
        (0.5 - callout.target.y / 100) *
        dimensions.height;

      /*
       * Labels sit further outside the product.
       */
      const dotX =
        ((callout.dot.x / 100) - 0.5) *
        dimensions.width;

      const dotY =
        (0.5 - callout.dot.y / 100) *
        dimensions.height;

      /*
       * Small correction from object-position.
       *
       * This isn't intended to recreate CSS object-position perfectly;
       * it simply keeps the callout geometry aligned with your existing
       * coordinate system.
       */
      const positionOffsetX =
        ((position.x - 50) / 100) * 0.15;

      const positionOffsetY =
        ((50 - position.y) / 100) * 0.15;

      return {
        ...callout,

        targetPosition: [
          targetX + positionOffsetX,
          targetY + positionOffsetY,
          0.08,
        ] as [number, number, number],

        dotPosition: [
          dotX + positionOffsetX,
          dotY + positionOffsetY,
          0.1,
        ] as [number, number, number],
      };
    });
  }, [
    callouts,
    dimensions.height,
    dimensions.width,
    objectPosition,
  ]);

  /* ------------------------------------------------------------------------ */
  /* Animation                                                                */
  /* ------------------------------------------------------------------------ */

  useFrame((state) => {
    const group = groupRef.current;

    if (!group) {
      return;
    }

    const time = state.clock.getElapsedTime();

    /*
     * Smooth cursor movement.
     */
    pointerCurrent.current.x = THREE.MathUtils.lerp(
      pointerCurrent.current.x,
      pointerTarget.current.x,
      0.045
    );

    pointerCurrent.current.y = THREE.MathUtils.lerp(
      pointerCurrent.current.y,
      pointerTarget.current.y,
      0.045
    );

    /*
     * Smooth drag movement.
     */
    dragCurrent.current.x = THREE.MathUtils.lerp(
      dragCurrent.current.x,
      dragTarget.current.x,
      0.08
    );

    dragCurrent.current.y = THREE.MathUtils.lerp(
      dragCurrent.current.y,
      dragTarget.current.y,
      0.08
    );

    /*
     * Gentle floating animation.
     */
    const floatY =
      Math.sin(time * 1.05) * 0.035;

    const floatZ =
      Math.cos(time * 0.75) * 0.018;

    group.position.y = floatY;

    group.position.z = floatZ;

    /*
     * Cursor parallax.
     */
    const cursorRotationX =
      -pointerCurrent.current.y * 0.08;

    const cursorRotationY =
      pointerCurrent.current.x * 0.13;

    /*
     * Hover gives a tiny extra depth response.
     */
    const hoverScale = hovered ? 1.012 : 1;

    const breathing =
      1 +
      Math.sin(time * 0.8) * 0.004;

    const scale =
      hoverScale * breathing;

    /*
     * Main rotation.
     */
    group.rotation.x =
      cursorRotationX +
      dragCurrent.current.x;

    group.rotation.y =
      cursorRotationY +
      dragCurrent.current.y;

    /*
     * Very subtle Z movement.
     */
    group.rotation.z =
      Math.sin(time * 0.65) * 0.006;

    /*
     * Smooth scaling.
     */
    group.scale.x = THREE.MathUtils.lerp(
      group.scale.x,
      scale,
      0.06
    );

    group.scale.y = THREE.MathUtils.lerp(
      group.scale.y,
      scale,
      0.06
    );

    group.scale.z = THREE.MathUtils.lerp(
      group.scale.z,
      scale,
      0.06
    );

    /*
     * Keep the artwork nicely framed when viewport changes.
     */
    if (artworkRef.current) {
      artworkRef.current.position.x =
        THREE.MathUtils.lerp(
          artworkRef.current.position.x,
          0,
          0.05
        );
    }

    /*
     * Prevent unused viewport warning from future changes.
     */
    void viewport;
  });

  /* ------------------------------------------------------------------------ */
  /* Pointer handlers                                                         */
  /* ------------------------------------------------------------------------ */

  const handlePointerMove = (
    event: THREE.Event & {
      pointer?: THREE.Vector2;
      stopPropagation?: () => void;
    }
  ) => {
    const pointer = event.pointer;

    if (!pointer) {
      return;
    }

    pointerTarget.current.x = pointer.x;
    pointerTarget.current.y = pointer.y;

    if (event.stopPropagation) {
      event.stopPropagation();
    }
  };

  const handlePointerDown = (
    event: THREE.Event & {
      stopPropagation?: () => void;
    }
  ) => {
    dragging.current = true;

    if (event.stopPropagation) {
      event.stopPropagation();
    }
  };

  const handlePointerUp = (
    event: THREE.Event & {
      stopPropagation?: () => void;
    }
  ) => {
    dragging.current = false;

    if (event.stopPropagation) {
      event.stopPropagation();
    }
  };

  return (
    <group
      ref={groupRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Soft shadow                                                        */}
      {/* ------------------------------------------------------------------ */}

      <mesh
        position={[
          0,
          -dimensions.height * 0.49,
          -0.08,
        ]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[
          dimensions.width * 0.42,
          dimensions.height * 0.12,
          1,
        ]}
      >
        <circleGeometry args={[1, 64]} />

        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.28}
          depthWrite={false}
        />
      </mesh>

      {/* ------------------------------------------------------------------ */}
      {/* Very subtle depth/back layer                                      */}
      {/* ------------------------------------------------------------------ */}

      <mesh
        position={[0, 0, -0.025]}
        scale={[1.008, 1.008, 1]}
      >
        <planeGeometry
          args={[
            dimensions.width,
            dimensions.height,
          ]}
        />

        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0.16}
          color="#111111"
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* ------------------------------------------------------------------ */}
      {/* Main artwork                                                       */}
      {/* ------------------------------------------------------------------ */}

      <group ref={artworkRef}>
        <mesh
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <planeGeometry
            args={[
              dimensions.width,
              dimensions.height,
            ]}
          />

          <meshStandardMaterial
            map={texture}
            transparent
            alphaTest={0.01}
            roughness={0.68}
            metalness={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* ------------------------------------------------------------------ */}
      {/* Callouts                                                           */}
      {/* ------------------------------------------------------------------ */}

      {showCallouts &&
        calloutData.map((callout) => (
          <group
            key={`${callout.label}-${callout.sublabel}`}
          >
            <Line
              points={[
                callout.dotPosition,
                callout.targetPosition,
              ]}
              color="#E51B24"
              lineWidth={1}
              transparent
              opacity={0.95}
            />

            {/* Target dot */}
            <mesh
              position={callout.targetPosition}
            >
              <circleGeometry args={[0.035, 24]} />

              <meshBasicMaterial
                color="#E51B24"
                transparent
                opacity={0.95}
                depthWrite={false}
              />
            </mesh>

            {/* Outer target ring */}
            <mesh
              position={[
                callout.targetPosition[0],
                callout.targetPosition[1],
                callout.targetPosition[2] - 0.001,
              ]}
            >
              <ringGeometry
                args={[
                  0.05,
                  0.06,
                  24,
                ]}
              />

              <meshBasicMaterial
                color="#E51B24"
                transparent
                opacity={0.35}
                depthWrite={false}
              />
            </mesh>

            {/* Label dot */}
            <mesh
              position={callout.dotPosition}
            >
              <circleGeometry args={[0.045, 24]} />

              <meshBasicMaterial
                color="#E51B24"
                depthWrite={false}
              />
            </mesh>

            {/* HTML label */}
            <Html
              position={[
                callout.dotPosition[0],
                callout.dotPosition[1],
                callout.dotPosition[2] + 0.02,
              ]}
              center
              distanceFactor={5}
              style={{
                pointerEvents: "none",
              }}
            >
              <div
                className={`w-max ${
                  callout.side === "left"
                    ? "pr-4 text-right"
                    : "pl-4 text-left"
                }`}
              >
                <p className="font-space-grotesk text-[11px] font-medium leading-[14px] text-white xl:text-[13px]">
                  {callout.label}
                </p>

                <p className="mt-0.5 font-space-grotesk text-[9px] font-light leading-[12px] text-white/50 xl:text-[10px]">
                  {callout.sublabel}
                </p>
              </div>
            </Html>
          </group>
        ))}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Camera / environment                                                       */
/* -------------------------------------------------------------------------- */

function Scene({
  image,
  callouts,
  aspectRatio,
  objectFit,
  objectPosition,
  showCallouts,
}: {
  image: string;
  callouts?: CustomizationCallout[];
  aspectRatio: number;
  objectFit: "contain" | "cover";
  objectPosition: string;
  showCallouts: boolean;
}) {
  return (
    <>
      {/* Soft lighting */}
      <ambientLight intensity={1.15} />

      <directionalLight
        position={[2, 3, 5]}
        intensity={1.3}
      />

      <directionalLight
        position={[-3, 0, 2]}
        intensity={0.35}
      />

      <Suspense fallback={null}>
        <ProductArtwork
          image={image}
          callouts={callouts}
          aspectRatio={aspectRatio}
          objectFit={objectFit}
          objectPosition={objectPosition}
          showCallouts={showCallouts}
        />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom
        enableRotate
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.32}
        zoomSpeed={0.45}
        minDistance={3.9}
        maxDistance={6.5}
        minPolarAngle={Math.PI / 2 - 0.38}
        maxPolarAngle={Math.PI / 2 + 0.38}
        minAzimuthAngle={-0.48}
        maxAzimuthAngle={0.48}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Main component                                                             */
/* -------------------------------------------------------------------------- */

export default function Product3DViewer({
  image,
  imageAlt,
  callouts = [],
  aspectRatio: aspectRatioString,
  objectFit = "contain",
  objectPosition = "50% 50%",
  showCallouts = true,
  debug = false,
  onDebugPoint,
}: Product3DViewerProps) {
  const aspectRatio =
    parseAspectRatio(aspectRatioString);

  const [loading, setLoading] = useState(true);

  /*
   * The debug overlay is intentionally kept outside Three.js.
   * This allows you to click anywhere and continue using the
   * exact same x/y percentages you already use in your data file.
   */
  const handleDebugClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!debug || !onDebugPoint) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      Math.round(
        ((event.clientX - rect.left) /
          rect.width) *
          1000
      ) / 10;

    const y =
      Math.round(
        ((event.clientY - rect.top) /
          rect.height) *
          1000
      ) / 10;

    onDebugPoint({ x, y });

    console.log(
      `{ x: ${x}, y: ${y} }`
    );
  };

  return (
    <div
      className="relative h-full w-full"
      aria-label={imageAlt}
    >
      {/* Loading glow */}
      <div
        className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 ${
          loading
            ? "opacity-100"
            : "opacity-0"
        }`}
      >
        <div className="absolute left-1/2 top-1/2 h-[45%] w-[35%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E51B24]/10 blur-[80px]" />
      </div>

      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 34,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={() => {
          setLoading(false);
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          touchAction: "none",
        }}
      >
        <Scene
          image={image}
          callouts={callouts}
          aspectRatio={aspectRatio}
          objectFit={objectFit}
          objectPosition={objectPosition}
          showCallouts={showCallouts}
        />
      </Canvas>

      {/* Debug coordinate picker */}
      {debug && (
        <div
          onClick={handleDebugClick}
          className="absolute inset-0 z-50 cursor-crosshair"
        />
      )}

      {/* Small interaction hint */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
        <span className="font-space-grotesk text-[9px] uppercase tracking-[0.16em] text-white/45">
          Drag · Move · Scroll
        </span>
      </div>
    </div>
  );
}