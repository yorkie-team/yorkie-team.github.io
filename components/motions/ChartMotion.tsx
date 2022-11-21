import { motion } from 'framer-motion';

const Bar = ({ x, y, height }: { x: string; y: string; height: string }) => {
  return (
    <motion.rect
      animate={{
        translateX: [-17, -17, -34, -34, -51, -51, -68, -68, -85, -85, -102, -102, -119, -119, -136, -136],
      }}
      transition={{
        duration: 8,
        ease: 'easeInOut',
        times: [0.085, 0.125, 0.21, 0.25, 0.335, 0.375, 0.46, 0.5, 0.585, 0.625, 0.71, 0.75, 0.835, 0.875, 0.96, 1],
        repeat: Infinity,
      }}
      x={x}
      y={y}
      width="16.7692"
      height={height}
      fill="#FDA36A"
    />
  );
};

export const ChartMotion = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="466" height="216" viewBox="0 0 466 216" fill="none">
      <g clipPath="url(#clip0_6339_210185)">
        <Bar x="28" y="123" height="64" />
        <Bar x="60.7695" y="59" height="128" />
        <Bar x="93.5391" y="139" height="48" />
        <Bar x="126.309" y="139" height="48" />
        <Bar x="159.076" y="123" height="64" />
        <Bar x="191.846" y="123" height="64" />
        <Bar x="224.615" y="99" height="88" />
        <Bar x="257.385" y="29" height="158" />
        <Bar x="290" y="59" height="128" />
        <Bar x="322.924" y="115" height="72" />
        <Bar x="355.691" y="59" height="128" />
        <Bar x="388.461" y="29" height="158" />
        <Bar x="421.23" y="115" height="72" />
        <Bar x="454" y="123" height="64" />
        <Bar x="486.77" y="139" height="128" />
        <Bar x="519.539" y="139" height="48" />
        <Bar x="552.309" y="139" height="48" />
        <Bar x="585.076" y="123" height="64" />
        <Bar x="617.846" y="123" height="64" />
      </g>
      <path d="M28 187H438" stroke="#E93D47" />
      <rect x="0.5" y="0.5" width="465" height="215" rx="7.5" stroke="#C2BDBA" />
      <defs>
        <clipPath id="clip0_6339_210185">
          <rect width="410" height="158" fill="white" transform="translate(28 29)" />
        </clipPath>
      </defs>
    </svg>
  );
};
