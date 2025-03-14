import Image from "next/image";
import Link from "next/link";

const About8 = () => {
  const listItem = [
    {
      id: 1,
      icon: "/images/index-12/icons/1.svg",
      title: "One-Click Autofill",
      text: (
        <>
          Automatically fill out applications
          <br /> in seconds.
        </>
      ),
    },
    {
      id: 2,
      icon: "/images/index-12/icons/2.svg",
      title: " Smarter, Faster Applications",
      text: (
        <>
          Skip the repetitive work and
          <br />apply stress-free.
        </>
      ),
    },
  ];
  return (
    <>
      {/* <!-- About Section --> */}
      <section
        id="section-3"
        className="about-section-two style-two layout-pt-60 layout-pb-60 js-tab-menu-content"
      >
        <div className="auto-container">
          <div className="row grid-base justify-content-between align-items-center">
            {/* <!-- Content Column --> */}
            <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 order-2 order-lg-1">
              <div className="content-column">
                <div className="inner-column -no-padding" data-aos="fade-right">
                  <div className="sec-title">
                    <h2 className="color-blue-dark fw-700">
                      Build a Resume That Gets Noticed

                      <br />
                    </h2>
                  </div>
                  {/* End sec-title */}

                  <div className="mt-30 mb-30">


                    <div className="content">

                      <p>
                        Your CV is your first impression. Make it count. Elevate helps you create an optimized, ATS-friendly CV that stands out in any hiring process. Craft a modern, professional CV that highlights your skills and experience perfectly.
                      </p>
                    </div>


                  </div>
                  {/* blcok item */}

                  <Link
                    href="/resumebuilder"
                    className="theme-btn -blue"
                  >
                    Build Your Resume

                  </Link>
                </div>
              </div>
            </div>
            {/* End .col */}

            {/* <!-- Image Column --> */}
            <div
              className="image-column -no-margin col-lg-6 col-md-12 col-sm-12 order-1 order-lg-2"
              data-aos="fade-left"
            >
              <figure className="image-box -wide-right">
                <Image
                  width={665}
                  height={552}
                  src="/images/index-12/images/3.png"
                  alt="images"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End About Section -->  */}
    </>
  );
};

export default About8;
