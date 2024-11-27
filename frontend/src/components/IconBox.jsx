const IconBox = ({ bgColor, icon, isImg, show }) => {
  return (
    <div
      className="flex justify-center items-center w-10 h-10 rounded-xl"
      style={{ backgroundColor: bgColor, display: show ? "flex" : "none" }}
    >
      {isImg ? <img src={icon} alt="Icon" /> : icon}
    </div>
  );
};

export default IconBox;
