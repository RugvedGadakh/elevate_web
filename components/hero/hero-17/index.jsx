import Image from "next/image";
import SearchForm5 from "../../common/job-search/SearchForm5";
import PopularSearch from "../PopularSearch";

const index = () => {
  return (
    <section
      className="banner-section-three -type-17"
      style={{ backgroundImage: "url(/images/index-17/header/bg.png)" }}
    >
      <div className="auto-container">
        <div className="row align-items-center">
          <div className="content-column col-lg-7 col-md-12 col-sm-12">
            <div className="inner-column">
              <div
                className="title-box"
                data-wow-delay="500"
                data-aos="fade-up"
              >
                <h3>
                Automate Job Applications
                  <br /> Elevate Your Career
                </h3>
                <div className="text col-6">
                The ultimate tool that helps you to skip the tedious forms, apply faster by autofilling applications, attach resumes instantly, and build great CVs.
                </div>
              </div>
              {/* End title-box */}

              {/* <div
                className="job-search-form"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <SearchForm5 />
              </div> */}
              {/* <!-- Job Search Form --> */}

              {/* <PopularSearch /> */}
              {/* <!-- End Popular Search --> */}
            </div>
          </div>
          {/* End .col */}

          <div className="image-column col-lg-5 col-md-12">
            <div className="image-box">
              <figure
                className="main-image"
                data-aos="fade-left"
                data-aos-delay="1500"
              >
                <Image
                  width={572}
                  height={560}
                  src="/images/index-17/header/1.png"
                  alt="heor image"
                />
              </figure>
            </div>
          </div>
          {/* End .col */}
        </div>
        {/* End row align-items-center */}
      </div>
      {/* End auto-container */}
    </section>
    // <!-- End Banner Section-->
  );
};

export default index;
