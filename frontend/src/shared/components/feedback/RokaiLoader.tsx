
import {rokailogo} from "@/assets";

interface RokaiLoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function RokaiLoader({
  size = "md",
  text = "Preparing experience",
}: RokaiLoaderProps) {
  const scale =
    size === "sm"
      ? "scale-[0.8]"
      : size === "lg"
        ? "scale-[1.2]"
        : "scale-100";

  return (
    <>
      <style>
        {`
          @keyframes rokaiAmbientRotate {
            from {
              transform: translate(-50%, -50%) rotate(0deg) scale(1);
            }
            50% {
              transform: translate(-50%, -50%) rotate(180deg) scale(1.06);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg) scale(1);
            }
          }

          @keyframes rokaiOrbitSpin {
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes rokaiOrbitSpinReverse {
            to {
              transform: rotate(-360deg);
            }
          }

          @keyframes rokaiLogoEnter {
            0% {
              opacity: 0;
              transform: scale(0.72);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes rokaiLogoPulse {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.045);
            }
          }

          @keyframes rokaiSignalMove {
            0% {
              transform: translateX(-45px);
            }
            50% {
              transform: translateX(95px);
            }
            100% {
              transform: translateX(-45px);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .rokai-motion,
            .rokai-motion::before,
            .rokai-motion::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
            }
          }
        `}
      </style>

      <div
        className="
          fixed inset-0 z-[9999]
          grid place-items-center
          overflow-hidden
          isolate
          bg-[#080808]
          font-['Space_Grotesk',sans-serif]
        "
        style={{
          background: `
            radial-gradient(
              circle at 50% 42%,
              rgba(230,57,70,.20),
              rgba(230,57,70,.07) 19%,
              transparent 44%
            ),
            radial-gradient(
              circle at 8% 88%,
              rgba(105,25,33,.38),
              transparent 35%
            ),
            linear-gradient(
              135deg,
              #080808 0%,
              #13090b 48%,
              #080808 100%
            )
          `,
        }}
      >
        {/* Ambient rotating glow */}
        <div
          className="
            rokai-motion
            pointer-events-none
            absolute
            left-1/2
            top-[43%]
            -z-20
            h-[65vw]
            w-[65vw]
            min-h-[460px]
            min-w-[460px]
            max-h-[900px]
            max-w-[900px]
            rounded-full
            blur-[36px]
          "
          style={{
            background: `
              conic-gradient(
                from 0deg,
                transparent 0deg,
                rgba(230,57,70,.025) 55deg,
                rgba(230,57,70,.18) 125deg,
                transparent 205deg,
                rgba(230,57,70,.08) 285deg,
                transparent 360deg
              )
            `,
            animation:
              "rokaiAmbientRotate 12s linear infinite",
          }}
        />

        {/* Grid overlay */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            -z-10
            opacity-[0.018]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,.018) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,.018) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "70px 70px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 35%, black 65%, transparent)",
          }}
        />

        {/* Top-left */}
        <div
          className="
            absolute left-[30px] top-[28px]
            text-[8px]
            font-medium
            uppercase
            tracking-[0.22em]
            text-white/25
            max-[600px]:left-[20px]
            max-[600px]:top-[20px]
            max-[600px]:text-[7px]
          "
        >
          SYSTEM <span className="text-[#E63946]">01</span>
        </div>

        {/* Top-right */}
        <div
          className="
            absolute right-[30px] top-[28px]
            text-[8px]
            font-medium
            uppercase
            tracking-[0.22em]
            text-white/25
            max-[600px]:right-[20px]
            max-[600px]:top-[20px]
            max-[600px]:text-[7px]
          "
        >
          ROKAI <span className="text-[#E63946]">/</span> EXPERIENCE
        </div>

        {/* Bottom-left */}
        <div
          className="
            absolute bottom-[28px] left-[30px]
            text-[8px]
            font-medium
            uppercase
            tracking-[0.22em]
            text-white/25
            max-[600px]:bottom-[20px]
            max-[600px]:left-[20px]
            max-[600px]:text-[7px]
          "
        >
          PRECISION / CRAFT
        </div>

        {/* Bottom-right */}
        <div
          className="
            absolute bottom-[28px] right-[30px]
            text-[8px]
            font-medium
            uppercase
            tracking-[0.22em]
            text-white/25
            max-[600px]:bottom-[20px]
            max-[600px]:right-[20px]
            max-[600px]:text-[7px]
          "
        >
          EST. <span className="text-[#E63946]">2026</span>
        </div>

        {/* Loader center */}
        <div
          className={`
            relative
            grid
            h-[230px]
            w-[230px]
            place-items-center
            ${scale}
            max-[600px]:h-[185px]
            max-[600px]:w-[185px]
          `}
        >
          {/* Outer orbit */}
          <div
            className="
              rokai-motion
              absolute
              inset-0
              rounded-full
              border
              border-white/10
            "
            style={{
              animation: "rokaiOrbitSpin 7s linear infinite",
            }}
          >
            {/* Orbit red dot */}
            <div
              className="
                absolute
                left-1/2
                top-[-4px]
                h-2
                w-2
                -translate-x-1/2
                rounded-full
                bg-[#E63946]
              "
              style={{
                boxShadow:
                  "0 0 15px rgba(230,57,70,.85), 0 0 35px rgba(230,57,70,.28)",
              }}
            />
          </div>

          {/* Inner orbit */}
          <div
            className="
              rokai-motion
              absolute
              inset-[20px]
              rounded-full
              border
              border-dashed
              border-[#E63946]/[0.28]
            "
            style={{
              animation:
                "rokaiOrbitSpinReverse 10s linear infinite",
            }}
          />

          {/* Logo wrapper */}
          <div
            className="
              rokai-motion
              relative
              grid
              h-[122px]
              w-[122px]
              place-items-center
              rounded-full
              bg-[radial-gradient(circle,rgba(230,57,70,.13),rgba(17,17,17,.96)_70%)]
              max-[600px]:h-[100px]
              max-[600px]:w-[100px]
            "
            style={{
              boxShadow:
                "0 0 75px rgba(230,57,70,.14), inset 0 0 35px rgba(230,57,70,.07)",
              animation:
                "rokaiLogoEnter .9s cubic-bezier(.22,1,.36,1) forwards",
            }}
          >
            {/* Exact Rokai logo */}
            <img
              src={rokailogo}
              alt="Rokai logo"
              className="
                rokai-motion
                block
                h-[82px]
                w-[82px]
                object-contain
                max-[600px]:h-[68px]
                max-[600px]:w-[68px]
              "
              style={{
                animation:
                  "rokaiLogoPulse 2.8s ease-in-out infinite",
              }}
            />
          </div>

          {/* Loading signal */}
          <div
            className="
              absolute
              bottom-[-76px]
              left-1/2
              flex
              -translate-x-1/2
              flex-col
              items-center
              gap-[13px]
              max-[600px]:bottom-[-65px]
            "
          >
            <div
              className="
                whitespace-nowrap
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.30em]
                text-white/[0.46]
              "
            >
              {text}
            </div>

            <div
              className="
                h-px
                w-[66px]
                overflow-hidden
                bg-white/10
              "
            >
              <div
                className="
                  rokai-motion
                  h-full
                  w-[30%]
                  bg-[#E63946]
                "
                style={{
                  boxShadow:
                    "0 0 12px rgba(230,57,70,.7)",
                  animation:
                    "rokaiSignalMove 1.25s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}