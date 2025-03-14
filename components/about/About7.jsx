import Image from "next/image";
import Link from "next/link";

const About7 = () => {
  return (
    <>
      

      {/* About Section */}
      <section
        id="section-2"
        className="about-section-two style-two layout-pt-60 layout-pb-60 js-tab-menu-content"
      >
        <div className="auto-container">
          <div className="row grid-base align-items-center">
            
            {/* Image Column */}
            <div
              className="image-column -no-margin col-xl-5 col-lg-6 col-md-12 col-sm-12"
              data-aos="fade-left"
            >
              <figure className="image-box">
                <Image
                  width={516}
                  height={552}
                  src="/images/index-12/images/2.png"
                  alt="A job seeker applying quickly with Elevate"
                />
              </figure>
            </div>

            {/* Content Column */}
            <div className="content-column col-xl-5 offset-xl-2 col-lg-5 offset-lg-1 col-md-12 col-sm-12">
              <div data-aos="fade-right">
                <div className="sec-title">
                  <h2 className="fw-700">
                    Elevate Your Job Hunt:
                    <br /> Apply 10x Faster!
                  </h2>
                  <p className="text mt-30">
                    Want to seriously boost your job search game? Elevate lets you blitz through applications at lightning speed. Apply to way more jobs in way less time.
                  </p>
                </div>
                <Link href="/resumebuilder" className="theme-btn -blue">
                  Boost Your Job Search
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* End About Section */}
    </>
  );
};

export default About7;
