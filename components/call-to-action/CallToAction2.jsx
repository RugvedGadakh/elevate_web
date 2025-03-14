import Link from "next/link";
import Image from "next/image";
import { FileText, Puzzle } from "lucide-react"; // Importing icons

const CallToAction2 = () => {
  return (
    <section className="call-to-action-two relative">
      <Image
        src="/images/background/1.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="-z-10"
      />

      <div className="auto-container text-center" data-aos="fade-up">
        <div className="sec-title light">
          <h2>Automate Your Job Applications</h2>
          <p className="text">With our features</p>
        </div>

        <div className="btn-box flex justify-center gap-4 mt-4">
          <Link href="/resumebuilder" aria-label="Resume Builder">
            <span className="theme-btn btn-style-three flex items-center gap-2">
              <FileText size={18} /> Resume Builder
            </span>
          </Link>
          <Link href="/" aria-label="Autofill Extension">
            <span className="theme-btn btn-style-two flex items-center gap-2">
              <Puzzle size={18} /> Autofill Extension
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction2;
