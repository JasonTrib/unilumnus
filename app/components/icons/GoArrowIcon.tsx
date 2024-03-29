import type { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} viewBox="0 0 24 24" {...props}>
    <path d="M5.4 20 4 18.6 15.6 7H9V5h10v10h-2V8.4Z" />
  </svg>
);

export default SvgComponent;
