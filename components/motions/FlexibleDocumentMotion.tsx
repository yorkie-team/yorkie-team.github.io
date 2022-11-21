import { motion } from 'framer-motion';

const transition = {
  duration: 7,
  ease: 'easeInOut',
  times: [0.1, 0.165, 0.265, 0.33, 0.43, 0.495, 0.595, 0.66, 0.76, 0.825, 0.925, 1],
  repeat: Infinity,
};

export const FlexibleDocumentMotion = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="336" height="280" viewBox="0 0 336 280" fill="none">
      <rect
        x="0.25"
        y="0.25"
        width="335.5"
        height="279.5"
        rx="3.75"
        fill="#FEFDFB"
        stroke="#C2BDBA"
        strokeWidth="0.5"
      />
      <motion.g
        animate={{
          translateX: [0, -70, -70, -70, -70, -70, -70, -70, -70, -70, 70, 0],
          opacity: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        }}
        transition={transition}
        filter="url(#filter0_d_6435_209869)"
      >
        <path
          d="M164.128 127.051C165.211 126.63 165.752 126.42 165.904 126.122C166.036 125.864 166.032 125.558 165.893 125.304C165.733 125.01 165.187 124.814 164.093 124.421L136.206 114.411C135.312 114.089 134.865 113.929 134.572 114.03C134.318 114.118 134.118 114.318 134.03 114.572C133.929 114.865 134.089 115.312 134.411 116.206L144.421 144.093C144.814 145.187 145.01 145.734 145.304 145.893C145.558 146.032 145.864 146.036 146.122 145.904C146.42 145.752 146.63 145.211 147.051 144.128L151.609 132.409C151.691 132.196 151.733 132.09 151.796 132.001C151.853 131.922 151.922 131.853 152.001 131.796C152.09 131.733 152.196 131.691 152.408 131.609L164.128 127.051Z"
          fill="url(#paint0_linear_6435_209869)"
          stroke="#FEFDFB"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="166" y="146" width="37" height="24" rx="2" fill="url(#paint1_linear_6435_209869)" />
        <path
          d="M174.445 154.629L177.094 154.629L177.094 162L178.383 162L178.383 154.629L181.02 154.629L181.02 153.516L174.445 153.516L174.445 154.629ZM182.227 162L183.48 162L183.48 155.637L182.227 155.637L182.227 162ZM182.062 153.914C182.068 154.324 182.426 154.658 182.859 154.652C183.287 154.658 183.645 154.324 183.645 153.914C183.645 153.504 183.287 153.176 182.859 153.176C182.426 153.176 182.068 153.504 182.062 153.914ZM185.004 162L186.258 162L186.258 158.074C186.258 157.219 186.855 156.633 187.559 156.633C188.244 156.633 188.719 157.084 188.719 157.781L188.719 162L189.961 162L189.961 157.945C189.961 157.184 190.424 156.633 191.227 156.633C191.883 156.633 192.422 156.99 192.422 157.852L192.422 162L193.676 162L193.676 157.734C193.67 156.275 192.855 155.555 191.707 155.555C190.787 155.555 190.096 155.994 189.797 156.68L189.727 156.68C189.457 155.971 188.865 155.555 188.016 155.555C187.178 155.555 186.551 155.971 186.281 156.68L186.211 156.68L186.211 155.637L185.004 155.637L185.004 162Z"
          fill="#FEFDFB"
        />
      </motion.g>
      <motion.g
        animate={{
          translateX: [70, 0, 0, -70, -70, -70, -70, -70, -70, -70, -70, -70],
          opacity: [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }}
        initial={{ opacity: 0 }}
        transition={transition}
        filter="url(#filter1_d_6435_209869)"
      >
        <rect
          x="144.75"
          y="113.75"
          width="2.5"
          height="32.4999"
          rx="1.25"
          fill="url(#paint2_linear_6435_209869)"
          stroke="#FEFDFB"
          strokeWidth="0.5"
        />
        <rect x="162" y="146" width="41" height="24" rx="2" fill="url(#paint3_linear_6435_209869)" />
        <path
          d="M170.211 153.516L173.281 158.672L173.281 162L174.57 162L174.57 158.672L177.652 153.516L176.187 153.516L173.973 157.359L173.879 157.359L171.676 153.516L170.211 153.516ZM180.266 162.129C182.059 162.129 183.23 160.816 183.23 158.848C183.23 156.867 182.059 155.555 180.266 155.555C178.461 155.555 177.283 156.867 177.289 158.848C177.283 160.816 178.461 162.129 180.266 162.129ZM178.543 158.848C178.543 157.629 179.1 156.592 180.266 156.586C181.414 156.592 181.965 157.629 181.965 158.848C181.965 160.061 181.414 161.086 180.266 161.086C179.1 161.086 178.543 160.061 178.543 158.848ZM184.461 162L185.715 162L185.715 158.121C185.715 157.289 186.359 156.686 187.227 156.691C187.484 156.686 187.777 156.738 187.883 156.762L187.883 155.566C187.754 155.555 187.508 155.537 187.355 155.543C186.611 155.537 185.973 155.965 185.738 156.645L185.668 156.645L185.668 155.637L184.461 155.637L184.461 162ZM188.82 162L190.074 162L190.074 159.738L190.678 159.141L192.84 162L194.375 162L191.627 158.367L194.199 155.637L192.699 155.637L190.18 158.32L190.074 158.32L190.074 153.516L188.82 153.516L188.82 162Z"
          fill="#FEFDFB"
        />
      </motion.g>
      <motion.g
        animate={{
          translateX: [70, 70, 70, 0, 0, -70, -70, -70, -70, -70, -70, -70],
          opacity: [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        }}
        initial={{ opacity: 0 }}
        transition={transition}
        filter="url(#filter2_d_6435_209869)"
      >
        <path
          d="M150.6 146C158.111 146 164.2 140.03 164.2 132.667V123.778C164.2 122.305 162.982 121.111 161.48 121.111C159.978 121.111 158.76 122.305 158.76 123.778V118.444C158.76 116.972 157.542 115.778 156.04 115.778C154.538 115.778 153.32 116.972 153.32 118.444V116.667C153.32 115.194 152.102 114 150.6 114C149.098 114 147.88 115.194 147.88 116.667V118.444C147.88 116.972 146.662 115.778 145.16 115.778C143.658 115.778 142.44 116.972 142.44 118.444V129.111C142.44 127.638 141.222 126.444 139.72 126.444C138.218 126.444 137 127.638 137 129.111V132.667C137 140.03 143.089 146 150.6 146Z"
          fill="url(#paint4_linear_6435_209869)"
        />
        <path
          d="M142.44 129.111V133.556M142.44 129.111V118.444C142.44 116.972 143.658 115.778 145.16 115.778C146.662 115.778 147.88 116.972 147.88 118.444M142.44 129.111C142.44 127.638 141.222 126.444 139.72 126.444C138.218 126.444 137 127.638 137 129.111V132.667C137 140.03 143.089 146 150.6 146C158.111 146 164.2 140.03 164.2 132.667V123.778C164.2 122.305 162.982 121.111 161.48 121.111C159.978 121.111 158.76 122.305 158.76 123.778M147.88 118.444V128.222M147.88 118.444V116.667C147.88 115.194 149.098 114 150.6 114C152.102 114 153.32 115.194 153.32 116.667V118.444M153.32 118.444V128.222M153.32 118.444C153.32 116.972 154.538 115.778 156.04 115.778C157.542 115.778 158.76 116.972 158.76 118.444V123.778M158.76 123.778V128.222"
          stroke="#FEFDFB"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="167" y="146" width="36" height="24" rx="2" fill="url(#paint5_linear_6435_209869)" />
        <path
          d="M179.16 153.516L179.16 159.527C179.154 160.506 178.703 161.016 177.895 161.016C177.15 161.016 176.629 160.576 176.617 159.867L175.34 159.867C175.34 161.309 176.418 162.117 177.859 162.117C179.424 162.117 180.443 161.162 180.449 159.527L180.449 153.516L179.16 153.516ZM181.773 160.207C181.768 161.449 182.711 162.141 183.918 162.141C184.973 162.141 185.559 161.607 185.805 161.133L185.852 161.133L185.852 162L187.07 162L187.07 157.77C187.064 155.924 185.588 155.555 184.574 155.555C183.068 155.555 182.084 156.316 181.973 157.371L183.215 157.371C183.344 156.902 183.789 156.563 184.527 156.563C185.377 156.563 185.822 156.979 185.816 157.699L185.822 158.209C185.529 158.221 184.574 158.273 184.152 158.297C183.004 158.379 181.768 158.754 181.773 160.207ZM182.992 160.219C182.992 159.592 183.508 159.281 184.328 159.223C184.627 159.205 185.535 159.141 185.822 159.123L185.828 159.703C185.828 160.459 185.219 161.139 184.199 161.145C183.496 161.139 182.992 160.828 182.992 160.219ZM189.121 164.391C190.17 164.385 190.814 163.852 191.184 162.844L193.809 155.637L192.461 155.637L190.855 160.57L190.785 160.57L189.18 155.637L187.844 155.637L190.176 162.082L190.023 162.504C189.725 163.307 189.402 163.33 189.016 163.336C188.84 163.33 188.594 163.324 188.453 163.313L188.453 164.355C188.611 164.379 188.863 164.385 189.121 164.391Z"
          fill="#FEFDFB"
        />
      </motion.g>
      <motion.g
        animate={{
          translateX: [70, 70, 70, 70, 70, 0, 0, -70, -70, -70, -70, -70],
          opacity: [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
        }}
        initial={{ opacity: 0 }}
        transition={transition}
        filter="url(#filter3_d_6435_209869)"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M158.8 114C157.916 114 157.2 114.716 157.2 115.6C157.2 116.484 157.916 117.2 158.8 117.2H164.763L141.2 140.763L141.2 134.8C141.2 133.916 140.484 133.2 139.6 133.2C138.716 133.2 138 133.916 138 134.8V144.4C138 144.824 138.169 145.231 138.469 145.531C138.769 145.831 139.176 146 139.6 146H149.2C150.084 146 150.8 145.284 150.8 144.4C150.8 143.516 150.084 142.8 149.2 142.8H143.236L166.8 119.236V125.2C166.8 126.084 167.516 126.8 168.4 126.8C169.284 126.8 170 126.084 170 125.2V115.6C170 114.716 169.284 114 168.4 114H158.8Z"
          fill="url(#paint6_linear_6435_209869)"
        />
        <path
          d="M164.763 117.2L164.94 117.377C165.012 117.305 165.033 117.198 164.994 117.104C164.956 117.011 164.865 116.95 164.763 116.95V117.2ZM141.2 140.763L140.95 140.763C140.95 140.865 141.011 140.956 141.104 140.994C141.198 141.033 141.305 141.012 141.377 140.94L141.2 140.763ZM141.2 134.8L140.95 134.8V134.8L141.2 134.8ZM138.469 145.531L138.292 145.708L138.292 145.708L138.469 145.531ZM143.236 142.8L143.06 142.623C142.988 142.695 142.967 142.802 143.005 142.896C143.044 142.989 143.135 143.05 143.236 143.05V142.8ZM166.8 119.236H167.05C167.05 119.135 166.989 119.044 166.896 119.005C166.802 118.967 166.695 118.988 166.623 119.06L166.8 119.236ZM157.45 115.6C157.45 114.854 158.054 114.25 158.8 114.25V113.75C157.778 113.75 156.95 114.578 156.95 115.6H157.45ZM158.8 116.95C158.054 116.95 157.45 116.346 157.45 115.6H156.95C156.95 116.622 157.778 117.45 158.8 117.45V116.95ZM164.763 116.95H158.8V117.45H164.763V116.95ZM141.377 140.94L164.94 117.377L164.587 117.023L141.023 140.587L141.377 140.94ZM140.95 134.8L140.95 140.763L141.45 140.763L141.45 134.8L140.95 134.8ZM139.6 133.45C140.346 133.45 140.95 134.054 140.95 134.8L141.45 134.8C141.45 133.778 140.622 132.95 139.6 132.95V133.45ZM138.25 134.8C138.25 134.054 138.854 133.45 139.6 133.45V132.95C138.578 132.95 137.75 133.778 137.75 134.8H138.25ZM138.25 144.4V134.8H137.75V144.4H138.25ZM138.645 145.355C138.392 145.101 138.25 144.758 138.25 144.4H137.75C137.75 144.891 137.945 145.361 138.292 145.708L138.645 145.355ZM139.6 145.75C139.242 145.75 138.899 145.608 138.645 145.355L138.292 145.708C138.639 146.055 139.109 146.25 139.6 146.25V145.75ZM149.2 145.75H139.6V146.25H149.2V145.75ZM150.55 144.4C150.55 145.146 149.946 145.75 149.2 145.75V146.25C150.222 146.25 151.05 145.422 151.05 144.4H150.55ZM149.2 143.05C149.946 143.05 150.55 143.654 150.55 144.4H151.05C151.05 143.378 150.222 142.55 149.2 142.55V143.05ZM143.236 143.05H149.2V142.55H143.236V143.05ZM166.623 119.06L143.06 142.623L143.413 142.977L166.977 119.413L166.623 119.06ZM167.05 125.2V119.236H166.55V125.2H167.05ZM168.4 126.55C167.654 126.55 167.05 125.946 167.05 125.2H166.55C166.55 126.222 167.378 127.05 168.4 127.05V126.55ZM169.75 125.2C169.75 125.946 169.146 126.55 168.4 126.55V127.05C169.422 127.05 170.25 126.222 170.25 125.2H169.75ZM169.75 115.6V125.2H170.25V115.6H169.75ZM168.4 114.25C169.146 114.25 169.75 114.854 169.75 115.6H170.25C170.25 114.578 169.422 113.75 168.4 113.75V114.25ZM158.8 114.25H168.4V113.75H158.8V114.25Z"
          fill="#FEFDFB"
        />
        <rect x="170" y="146" width="33" height="24" rx="2" fill="url(#paint7_linear_6435_209869)" />
        <path
          d="M180.156 153.516L178.867 153.516L178.867 162L180.156 162L180.156 153.516ZM181.48 160.207C181.475 161.449 182.418 162.141 183.625 162.141C184.68 162.141 185.266 161.607 185.512 161.133L185.559 161.133L185.559 162L186.777 162L186.777 157.77C186.771 155.924 185.295 155.555 184.281 155.555C182.775 155.555 181.791 156.316 181.68 157.371L182.922 157.371C183.051 156.902 183.496 156.563 184.234 156.563C185.084 156.563 185.529 156.979 185.523 157.699L185.529 158.209C185.236 158.221 184.281 158.273 183.859 158.297C182.711 158.379 181.475 158.754 181.48 160.207ZM182.699 160.219C182.699 159.592 183.215 159.281 184.035 159.223C184.334 159.205 185.242 159.141 185.529 159.123L185.535 159.703C185.535 160.459 184.926 161.139 183.906 161.145C183.203 161.139 182.699 160.828 182.699 160.219ZM189.543 158.227C189.543 157.213 190.158 156.633 191.02 156.633C191.863 156.633 192.361 157.184 192.367 158.109L192.367 162L193.609 162L193.609 157.957C193.615 156.381 192.748 155.555 191.441 155.555C190.492 155.555 189.865 155.994 189.566 156.68L189.496 156.68L189.496 155.637L188.289 155.637L188.289 162L189.543 162L189.543 158.227Z"
          fill="#FEFDFB"
        />
      </motion.g>
      <motion.g
        animate={{
          translateX: [70, 70, 70, 70, 70, 70, 70, 0, 0, -70, -70, -70],
          opacity: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
        }}
        initial={{ opacity: 0 }}
        transition={transition}
        filter="url(#filter4_d_6435_209869)"
      >
        <path
          d="M152.077 121.831C152.726 121.578 153.051 121.452 153.142 121.273C153.221 121.119 153.219 120.935 153.136 120.782C153.04 120.606 152.712 120.488 152.056 120.253L135.324 114.246C134.787 114.054 134.519 113.957 134.343 114.018C134.191 114.071 134.071 114.191 134.018 114.343C133.957 114.519 134.054 114.787 134.246 115.324L140.253 132.056C140.488 132.712 140.606 133.04 140.782 133.136C140.935 133.219 141.118 133.221 141.273 133.142C141.452 133.051 141.578 132.726 141.831 132.077L144.565 125.045C144.615 124.918 144.639 124.854 144.678 124.801C144.712 124.753 144.753 124.712 144.801 124.678C144.854 124.64 144.918 124.615 145.045 124.565L152.077 121.831Z"
          fill="url(#paint8_linear_6435_209869)"
          stroke="#FEFDFB"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="166" y="146" width="38" height="24" rx="2" fill="url(#paint9_linear_6435_209869)" />
        <path
          d="M178.16 153.516L178.16 159.527C178.154 160.506 177.703 161.016 176.895 161.016C176.15 161.016 175.629 160.576 175.617 159.867L174.34 159.867C174.34 161.309 175.418 162.117 176.859 162.117C178.424 162.117 179.443 161.162 179.449 159.527L179.449 153.516L178.16 153.516ZM183.809 162.129C185.209 162.129 186.187 161.438 186.469 160.406L185.203 160.406C184.992 160.793 184.529 161.098 183.82 161.098C182.777 161.098 182.062 160.412 182.027 159.199L186.551 159.199L186.551 158.754C186.551 156.451 185.174 155.555 183.727 155.555C181.951 155.555 180.779 156.902 180.785 158.859C180.779 160.834 181.934 162.129 183.809 162.129ZM182.033 158.262C182.086 157.365 182.736 156.58 183.738 156.586C184.693 156.58 185.32 157.295 185.32 158.262L182.033 158.262ZM190.828 155.637L189.457 155.637L189.457 155.086C189.457 154.465 189.768 154.195 190.43 154.195C190.541 154.195 190.723 154.207 190.957 154.242L190.957 153.199C190.711 153.152 190.4 153.117 190.102 153.117C188.936 153.117 188.209 153.762 188.203 154.898L188.203 155.637L187.219 155.637L187.219 156.633L188.203 156.633L188.203 162L189.457 162L189.457 156.633L190.828 156.633L190.828 155.637ZM195 155.637L193.629 155.637L193.629 155.086C193.629 154.465 193.939 154.195 194.602 154.195C194.713 154.195 194.895 154.207 195.129 154.242L195.129 153.199C194.883 153.152 194.572 153.117 194.273 153.117C193.107 153.117 192.381 153.762 192.375 154.898L192.375 155.637L191.391 155.637L191.391 156.633L192.375 156.633L192.375 162L193.629 162L193.629 156.633L195 156.633L195 155.637Z"
          fill="#FEFDFB"
        />
        <rect x="146.801" y="126.8" width="19.1999" height="19.1999" fill="url(#pattern0)" />
      </motion.g>
      <motion.g
        animate={{
          translateX: [70, 70, 70, 70, 70, 70, 70, 70, 70, 0, 0, -70],
          opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
        }}
        initial={{ opacity: 0 }}
        transition={transition}
      >
        <g filter="url(#filter5_d_6435_209869)">
          <path
            d="M138.843 134.597L139.048 134.715L138.843 134.597C138.426 135.324 138.169 136.133 138.091 136.968C137.856 139.475 139.695 141.699 142.201 141.939L142.222 141.717L142.201 141.939C143.036 142.019 143.878 141.92 144.671 141.646L144.599 141.437L144.671 141.646L153.41 138.635L153.41 138.635C153.858 138.48 154.276 138.246 154.641 137.943L169.119 125.974C170.003 125.243 170.238 123.985 169.677 122.984C167.665 119.394 165.021 116.197 161.874 113.546C160.997 112.806 159.716 112.801 158.832 113.532L144.355 125.501C143.989 125.803 143.68 126.169 143.444 126.58C143.444 126.58 143.444 126.58 143.444 126.58L138.843 134.597Z"
            fill="url(#paint10_linear_6435_209869)"
            stroke="#FEFDFB"
            strokeWidth="0.5"
          />
          <path
            d="M142.869 141.618L142.869 141.618C142.549 141.919 142.35 142.002 142.009 142.142L141.914 141.911L142.009 142.142L141.999 142.146C140.774 142.651 139.844 143.035 139.137 143.273C138.442 143.508 137.907 143.623 137.501 143.532L137.501 143.532C136.442 143.293 135.678 142.369 135.643 141.284L135.876 141.277L135.643 141.284C135.629 140.869 135.844 140.365 136.204 139.726C136.571 139.077 137.123 138.235 137.85 137.127L137.856 137.118L138.065 137.255L137.856 137.118C138.057 136.81 138.176 136.629 138.531 136.372L138.531 136.372C138.729 136.229 139.07 136.11 139.386 136.034C139.701 135.959 140.058 135.91 140.3 135.948C140.494 135.979 140.612 136.001 140.694 136.024C140.789 136.05 140.838 136.077 140.884 136.103L142.869 141.618ZM142.869 141.618C143.047 141.451 143.227 141.138 143.361 140.843C143.494 140.547 143.609 140.205 143.617 139.961C143.624 139.765 143.624 139.644 143.617 139.56C143.61 139.461 143.592 139.409 143.575 139.358L142.869 141.618Z"
            fill="url(#paint11_linear_6435_209869)"
            stroke="#FEFDFB"
            strokeWidth="0.5"
          />
          <path
            d="M153.65 132.904C152.928 133.5 151.842 133.295 151.388 132.476C150.806 131.427 150.035 130.494 149.113 129.725C148.394 129.125 148.397 128.02 149.119 127.423L160.336 118.15C160.845 117.728 161.1 117.518 161.346 117.385C162.359 116.839 163.601 116.957 164.493 117.683C164.71 117.86 164.92 118.115 165.342 118.624C165.763 119.134 165.973 119.388 166.106 119.635C166.652 120.648 166.534 121.889 165.808 122.781C165.631 122.999 165.376 123.209 164.867 123.63L153.65 132.904Z"
            fill="#FEFDFB"
          />
        </g>
        <g filter="url(#filter6_d_6435_209869)">
          <rect
            x="166"
            y="146"
            width="38"
            height="24"
            rx="2"
            fill="url(#paint12_linear_6435_209869)"
            shapeRendering="crispEdges"
          />
          <path
            d="M175.594 162L176.367 159.762L179.672 159.762L180.445 162L181.816 162L178.758 153.516L177.27 153.516L174.223 162L175.594 162ZM176.736 158.684L177.984 155.063L178.043 155.063L179.297 158.684L176.736 158.684ZM184.043 153.516L182.789 153.516L182.789 162L184.043 162L184.043 153.516ZM188.543 155.637L187.242 155.637L187.242 154.113L186 154.113L186 155.637L185.062 155.637L185.062 156.633L186 156.633L186 160.383C185.988 161.543 186.873 162.082 187.852 162.082C188.197 162.082 188.467 162.059 188.637 162.035L188.637 160.945C188.461 160.963 188.186 160.98 188.004 160.98C187.6 160.975 187.248 160.846 187.242 160.125L187.242 156.633L188.543 156.633L188.543 155.637ZM192.387 162.129C194.18 162.129 195.352 160.816 195.352 158.848C195.352 156.867 194.18 155.555 192.387 155.555C190.582 155.555 189.404 156.867 189.41 158.848C189.404 160.816 190.582 162.129 192.387 162.129ZM190.664 158.848C190.664 157.629 191.221 156.592 192.387 156.586C193.535 156.592 194.086 157.629 194.086 158.848C194.086 160.061 193.535 161.086 192.387 161.086C191.221 161.086 190.664 160.061 190.664 158.848Z"
            fill="#FEFDFB"
          />
        </g>
      </motion.g>
      <path
        d="M94 137.266V142.655C100.377 142.695 102.409 144.953 102.449 151.135V163.814C102.409 173.562 106.076 177.96 116 178V173.404C109.663 173.404 107.471 170.432 107.471 163.735V149.55C107.471 144.795 106.036 141.585 100.536 140.278V139.683C106.036 138.415 107.471 135.206 107.471 130.451V116.186C107.471 109.489 109.663 106.557 116 106.517V102C106.076 101.961 102.409 106.359 102.449 116.107V128.866C102.409 135.047 100.377 137.266 94 137.266Z"
        fill="black"
      />
      <path
        d="M242 142.655V137.266C235.623 137.266 233.591 135.047 233.551 128.866V116.107C233.591 106.359 229.924 101.961 220 102V106.517C226.337 106.557 228.529 109.489 228.529 116.186V130.451C228.529 135.206 229.964 138.415 235.464 139.683V140.278C229.964 141.585 228.529 144.795 228.529 149.55V163.735C228.529 170.432 226.337 173.404 220 173.404V178C229.924 177.96 233.591 173.562 233.551 163.814V151.135C233.591 144.953 235.623 142.695 242 142.655Z"
        fill="black"
      />
      <defs>
        <filter
          id="filter0_d_6435_209869"
          x="125"
          y="113.75"
          width="86"
          height="72.25"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6435_209869" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6435_209869" result="shape" />
        </filter>
        <filter
          id="filter1_d_6435_209869"
          x="122"
          y="113.5"
          width="89"
          height="72.5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6435_209869" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6435_209869" result="shape" />
        </filter>
        <filter
          id="filter2_d_6435_209869"
          x="127"
          y="113.75"
          width="84"
          height="72.25"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6435_209869" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6435_209869" result="shape" />
        </filter>
        <filter
          id="filter3_d_6435_209869"
          x="129.75"
          y="113.75"
          width="81.25"
          height="72.25"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6435_209869" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6435_209869" result="shape" />
        </filter>
        <filter
          id="filter4_d_6435_209869"
          x="125.75"
          y="113.75"
          width="86.25"
          height="72.25"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6435_209869" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6435_209869" result="shape" />
        </filter>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_6435_209869" transform="scale(0.00625)" />
        </pattern>
        <filter
          id="filter5_d_6435_209869"
          x="127.393"
          y="112.737"
          width="50.8379"
          height="47.0752"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6435_209869" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6435_209869" result="shape" />
        </filter>
        <filter
          id="filter6_d_6435_209869"
          x="158"
          y="146"
          width="54"
          height="40"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6435_209869" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6435_209869" result="shape" />
        </filter>
        <linearGradient
          id="paint0_linear_6435_209869"
          x1="150"
          y1="114"
          x2="150"
          y2="146"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FC94D8" />
          <stop offset="1" stopColor="#F44954" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_6435_209869"
          x1="184.5"
          y1="146"
          x2="184.5"
          y2="170"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FC94D8" />
          <stop offset="1" stopColor="#F44954" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_6435_209869"
          x1="146"
          y1="114"
          x2="146"
          y2="146"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#84B5FF" />
          <stop offset="1" stopColor="#855CF9" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_6435_209869"
          x1="182.5"
          y1="146"
          x2="182.5"
          y2="170"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#84B5FF" />
          <stop offset="1" stopColor="#855CF9" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_6435_209869"
          x1="150.6"
          y1="114"
          x2="150.6"
          y2="146"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8DECEC" />
          <stop offset="1" stopColor="#3C9AF1" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_6435_209869"
          x1="185"
          y1="146"
          x2="185"
          y2="170"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8DECEC" />
          <stop offset="1" stopColor="#3C9AF1" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_6435_209869"
          x1="154"
          y1="114"
          x2="154"
          y2="146"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF9754" />
          <stop offset="1" stopColor="#F96767" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_6435_209869"
          x1="186.5"
          y1="146"
          x2="186.5"
          y2="170"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF9754" />
          <stop offset="1" stopColor="#F96767" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_6435_209869"
          x1="143.6"
          y1="114"
          x2="143.6"
          y2="133.2"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FDC433" />
          <stop offset="1" stopColor="#FE924D" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_6435_209869"
          x1="185"
          y1="146"
          x2="185"
          y2="170"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FDC433" />
          <stop offset="1" stopColor="#FE924D" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_6435_209869"
          x1="139.311"
          y1="140.144"
          x2="166.008"
          y2="118.072"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D7E38B" />
          <stop offset="1" stopColor="#23C176" />
        </linearGradient>
        <linearGradient
          id="paint11_linear_6435_209869"
          x1="136.381"
          y1="142.566"
          x2="142.322"
          y2="137.654"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D7E38B" />
          <stop offset="1" stopColor="#23C176" />
        </linearGradient>
        <linearGradient
          id="paint12_linear_6435_209869"
          x1="185"
          y1="146"
          x2="185"
          y2="170"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D7E38B" />
          <stop offset="1" stopColor="#23C176" />
        </linearGradient>
        <image
          id="image0_6435_209869"
          width="160"
          height="160"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};
