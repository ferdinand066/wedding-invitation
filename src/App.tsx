import "./App.css";
import textureImage from "./assets/background/bg-texture.png";
import rightFlower from "./assets/background/right-flower.png";
import leftFlower from "./assets/background/left-flower.png";
import centerGlassFront from "./assets/components/center-glass-front.png";
import centerGlassBack from "./assets/components/center-glass-back.png";

import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";

const colorVariants = {
  initial: { backgroundColor: "rgb(168 85 247 / 0.5)" },
  animate: { backgroundColor: "rgb(88 28 135 / 0.75)" },
};

const colorTransition = {
  duration: 8.0,
  yoyo: Infinity,
  ease: "easeInOut",
};

// Define your animation variants for pop-out
const popOutVariants = {
  initial: { scale: 0 },
  animate: { scale: 1, rotate: 0 }, // You can adjust the rotation angle as needed
};

const leftShakeVariants = {
  shake: {
    x: [5, -5, 5, -5, 5, -5, 5, -5],
    y: [5, 0, -5, 0, 5, 0, -5, 0, 5],
    transition: {
      duration: 30, // Total duration for one cycle of the shake
      repeat: Infinity, // Make it repeat infinitely
      ease: "linear", // Linear easing for a smooth shake
    },
  },
};
const rightShakeVariants = {
  shake: {
    x: [-5, 5, -5, 5, -5, 5, -5, 5],
    y: [-5, 0, 5, 0, -5, 0, 5, 0, -5],
    transition: {
      duration: 30, // Total duration for one cycle of the shake
      repeat: Infinity, // Make it repeat infinitely
      ease: "linear", // Linear easing for a smooth shake
    },
  },
};

export default function App() {
  const [glassTransition, setGlassTransition] = useState<object>({
    type: "tween",
    damping: 10,
    stiffness: 100,
    duration: 2.0,
  });
  const [glassVariantBack, setGlassVariantBack] =
    useState<Variants>(popOutVariants);
  const [glassVariantFront, setGlassVariantFront] =
    useState<Variants>(popOutVariants);
  const [animateState, setAnimateState] = useState<"initial" | "animate">(
    "initial"
  );

  useEffect(() => {
    setAnimateState("animate");
    const timeout = setTimeout(() => {
      console.log("here");
      setGlassTransition({
        duration: 20.0, // Adjust the duration of the rotation animation
        loop: Infinity, // Make it loop infinitely
        ease: "linear", // Set the easing function for the animation
      });
      setGlassVariantBack({
        initial: { rotate: -360 },
        animate: { rotate: 0 },
      });
      setGlassVariantFront({
        initial: { rotate: 360 },
        animate: { rotate: 0 },
      });
      setAnimateState("initial");
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-screen min-h-screen">
      <div className="w-screen h-screen relative overflow-hidden">
        <img
          src={textureImage}
          alt="BG-Texture"
          className="w-full h-full bg-cover absolute rotate sm:hidden"
        />

        <motion.div
          className="w-full h-full absolute inset-0 bg-purple-500/50"
          variants={colorVariants}
          initial="initial"
          animate="animate"
          transition={colorTransition}
        />

        <motion.img
          src={leftFlower}
          alt="Left Flower"
          className="h-full sm:h-[200vh] sm:-top-[50vh] bg-cover absolute -left-10 sm:-left-20"
          variants={leftShakeVariants}
          initial="initial"
          animate="shake"
        />
        <motion.img
          src={rightFlower}
          alt="Right Flower"
          className="h-full sm:h-[200vh] sm:-top-[50vh] bg-cover absolute -right-10"
          variants={rightShakeVariants}
          initial="initial"
          animate="shake"
        />

        <div className="w-full h-full inset-0 absolute inline-flex items-center justify-center overflow-hidden">
          <motion.img
            src={centerGlassBack}
            alt="Center Glass Back"
            className="absolute p-2 md:p-0 max-w-[18rem] sm:max-w-sm w-screen"
            variants={glassVariantBack}
            transition={glassTransition}
            initial="initial"
            animate={animateState}
          />
          <motion.img
            src={centerGlassFront}
            alt="Center Glass Front"
            className="absolute p-2 md:p-0 max-w-[18rem] sm:max-w-sm w-screen"
            variants={glassVariantFront}
            transition={glassTransition}
            initial="initial"
            animate={animateState}
          />
          <div className="absolute uppercase inline-flex flex-col text-center text-[#caaf89] font-serif gap-1">
            <motion.span
              className="text-xs sm:text-md font-extralight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1.5 }}
            >
              The wedding of
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 2 }}
              className="text-2xl sm:text-4xl font-semibold"
            >
              Tandy & Vina
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
}
