import { useScroll, useVelocity, useSpring, useTransform } from "framer-motion";

export function useScrollVelocity() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  return smoothVelocity;
}
