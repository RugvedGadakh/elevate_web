import Link from "next/link";

const CallToAction11 = () => {
  return (
    <>
      <section className="subscribe-section-two -type-5">
        <div className="auto-container" data-aos="fade-up">
          <div
            className="background-image"
            style={{ backgroundImage: "url(/images/index-17/cta/bg.png)" }}
          ></div>
          {/* End bg-image */}

          <div className="row align-items-center justify-content-between">
            <div className="col-lg-5 offset-lg-1">
              <div className="sec-title pb-16">
                <h2 className="">Looking for a Job? Let’s Make It Effortless.</h2>
                <div className="text">
                Elevate is here to revolutionize your job search. Our tools help you apply faster, skip manual form-filling, and create polished resumes with ease—so you can spend less time applying and more time getting hired
                  {/* <br /> users and search 15.8 million CVs in our
                  <br /> database. */}
                </div>

                <div className="mt-20">
                  <Link
                    href="/employers-dashboard/post-jobs"
                    className="theme-btn"
                  >
                    Download Extension
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End auto-container */}
      </section>
    </>
  );
};

export default CallToAction11;
