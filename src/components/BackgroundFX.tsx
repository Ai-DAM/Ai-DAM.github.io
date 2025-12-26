import { motion } from "framer-motion";

export default function BackgroundFX() {
  return (
    <div className="bgFX" aria-hidden>
      {/* Purple blob */}
      <motion.div
        className="bgBlob bgBlob1"
        initial={{ x: -20, y: -10, scale: 1, opacity: 0.65 }}
        animate={{
          x: [-20, 30, -10, -20],
          y: [-10, 20, 35, -10],
          scale: [1, 1.08, 1.02, 1],
          opacity: [0.55, 0.75, 0.62, 0.65],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cyan blob */}
      <motion.div
        className="bgBlob bgBlob2"
        initial={{ x: 10, y: 10, scale: 1, opacity: 0.55 }}
        animate={{
          x: [10, -25, 20, 10],
          y: [10, 25, -10, 10],
          scale: [1, 1.06, 1.1, 1],
          opacity: [0.5, 0.72, 0.58, 0.55],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pink blob */}
      <motion.div
        className="bgBlob bgBlob3"
        initial={{ x: 0, y: 0, scale: 1, opacity: 0.5 }}
        animate={{
          x: [0, 18, -14, 0],
          y: [0, -18, 12, 0],
          scale: [1, 1.12, 1.04, 1],
          opacity: [0.45, 0.68, 0.54, 0.5],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* subtle vignette */}
      <div className="bgVignette" />
    </div>
  );
}
