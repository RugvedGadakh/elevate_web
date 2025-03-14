import Image from "next/image";
import Link from "next/link";

const About6 = () => {
  return (
    <>
      {/* <!-- About Section --> */}
      <section
        id="section-1"
        className="about-section-two style-two pt-0 layout-pb-60 js-tab-menu-content"
      >
        <div className="auto-container">
          <div className="row grid-base justify-content-between align-items-center">
            {/* <!-- Content Column --> */}
            <div className="content-column col-xl-4 col-lg-5 col-md-12 col-sm-12 order-2 order-lg-1">
              <div className="inner-column -no-padding" data-aos="fade-right">
                <div className="sec-title">
                  <h2 className="fw-700">
                  Skip the Forms,

                    <br /> Focus on the Jobs
                  </h2>
                  <div className="text mt-30">
                  Manually filling out the same information for every job application is outdated. Stop wasting hours typing the same stuff over and over. Auto-fill your details on boring forms on any job site. Reclaim your time for things you actually enjoy
                  </div>
                </div>
              
                <Link href="/about" className="theme-btn -blue">
                  Start Applying
                </Link>
              </div>
            </div>

            {/* <!-- Image Column --> */}
            <div
              className="image-column -no-margin col-lg-6 col-md-12 col-sm-12 order-1 order-lg-2"
              data-aos="fade-left"
            >
              <figure className="image-box">
                <Image
                  width={625}
                  height={497}
                  src="/images/index-12/images/1.png"
                  alt="about"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End About Section --> */}
    </>
  );
};

export default About6;
