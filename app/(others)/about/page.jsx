import dynamic from "next/dynamic";

import About from "@/components/pages-menu/about";

export const metadata = {
  title: 'Elevate About',
  description:
    'Superio - Job Borad React NextJS Template',
  
}



const index = () => {
  return (
    <>
      <About />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
