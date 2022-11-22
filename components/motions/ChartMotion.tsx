import { motion } from 'framer-motion';

const Bar = ({ x, y, height }: { x: string; y: string; height: string }) => {
  return (
    <motion.rect
      animate={{
        translateX: [
          -17, -34, -34, -51, -51, -68, -68, -85, -85, -102, -102, -119, -119, -136, -136, -153, -153, -170, -170, -187,
          -187, -204, -204, -221, -221, -238, -238, -255, -255, -272, -272, -289, -289, -306, -306, -323, -323, -340,
          -340, -357, -357, -374, -374, -391, -391, -408, -408, -425, -425, -442, -442,
        ],
      }}
      transition={{
        duration: 24,
        ease: 'easeInOut',
        repeat: Infinity,
        times: [
          0.024, 0.4, 0.064, 0.08, 0.096, 0.112, 0.128, 0.144, 0.16, 0.176, 0.192, 0.208, 0.224, 0.24, 0.256, 0.272,
          0.288, 0.304, 0.32, 0.336, 0.352, 0.368, 0.384, 0.4, 0.416, 0.432, 0.448, 0.464, 0.48, 0.496, 0.512, 0.528,
          0.544, 0.56, 0.576, 0.592, 0.608, 0.624, 0.64, 0.656, 0.672, 0.688, 0.704, 0.72, 0.736, 0.752, 0.768, 0.784,
          0.8, 0.816, 0.832, 0.848, 0.864, 0.88, 0.896, 0.912, 0.928, 0.944, 0.96, 0.976, 1,
        ],
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
        <Bar x="486.77" y="59" height="128" />
        <Bar x="519.539" y="139" height="48" />
        <Bar x="552.309" y="139" height="48" />
        <Bar x="585.076" y="123" height="64" />
        <Bar x="617.846" y="123" height="64" />
        <Bar x="651" y="99" height="88" />
        <Bar x="683.77" y="29" height="158" />
        <Bar x="716.539" y="59" height="128" />
        <Bar x="749.309" y="115" height="72" />
        <Bar x="782.076" y="59" height="128" />
        <Bar x="814.846" y="29" height="158" />
        <Bar x="847.615" y="115" height="72" />
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
