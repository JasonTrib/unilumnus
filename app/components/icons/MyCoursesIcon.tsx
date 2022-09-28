import type { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} viewBox="0 0 24 24" {...props}>
    <path d="M4 22q-.825 0-1.412-.587Q2 20.825 2 20V6h2v14h14v2Zm4-4q-.825 0-1.412-.587Q6 16.825 6 16V4q0-.825.588-1.413Q7.175 2 8 2h12q.825 0 1.413.587Q22 3.175 22 4v12q0 .825-.587 1.413Q20.825 18 20 18Zm5-7 2.5-1.5L18 11V4h-5Z" />
  </svg>
);

export default SvgComponent;
