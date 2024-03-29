import type { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} viewBox="0 0 24 24" {...props}>
    <path d="M18 13v-2h4v2Zm1.2 7L16 17.6l1.2-1.6 3.2 2.4Zm-2-12L16 6.4 19.2 4l1.2 1.6ZM5 19v-4H4q-.825 0-1.412-.588Q2 13.825 2 13v-2q0-.825.588-1.413Q3.175 9 4 9h4l5-3v12l-5-3H7v4Zm9-3.65v-6.7q.675.6 1.088 1.463.412.862.412 1.887t-.412 1.887q-.413.863-1.088 1.463Z" />
  </svg>
);

export default SvgComponent;
