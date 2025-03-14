import dynamic from "next/dynamic";
import ResumeBuilder from "@/components/resume-builder/resume-builder";

export const metadata = {
  title: "Elevate Resume Builder",
  description: "",
};

const index = () => {
  return (
    <>
      <ResumeBuilder />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
