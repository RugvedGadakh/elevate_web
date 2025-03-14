import Image from "next/image";

const Block1 = () => {
  const blockContent = [
    {
      id: 1,
      icon: "/images/resource/work-1.png",
      title: "Free Resume Builder",
      text: `Your resume is your first impression. Make it count with our easy-to-use Resume Builder:`,
    },
    {
      id: 2,
      icon: "/images/resource/work-2.png",
      title: "Autofill Application Extension",
      text: `Applying for jobs shouldn’t feel like a full-time job. Our Chrome extension takes care of the heavy lifting.`,
    },
    {
      id: 3,
      icon: "/images/resource/work-3.png",
      title: "Help Every Step of the Way",
      text: `Let Elevate handle the tedious work, so you can focus on landing the job you deserve. Get started today!`,
    },
  ];
  return (
    <>
      {blockContent.map((item) => (
        <div className="work-block col-lg-4 col-md-6 col-sm-12" key={item.id}>
          <div className="inner-box">
            <figure className="image">
              <Image
                width={105}
                height={113}
                src={item.icon}
                alt="how it works"
              />
            </figure>
            <h5>{item.title}</h5>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Block1;
