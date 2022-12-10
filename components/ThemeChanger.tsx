import { FC, useEffect } from "react";
import { useTheme } from "next-themes";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { motion } from "framer-motion";
const ThemeChanger: FC<{}> = () => {
  const { theme, setTheme } = useTheme();

  const themeHandler = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  useEffect(() => {}, []);
  return (
    <div className="group">
      <div
        onClick={themeHandler}
        className={[
          "cursor-pointer group  text-[25px] flex justify-center",
        ].join(" ")}
      >
        <span className="dark:text-white  flex items-center space-x-[10px]">
          <div className="group-hover:-translate-y-1 group-focus:translate-y-7 text-[18px]  duration-300">
            <p className="flex items-center space-x-[5px]">
              {theme === "light" ? <BsFillSunFill /> : <BsFillMoonFill />}
            </p>
          </div>
        </span>
      </div>
    </div>
  );
};

export default ThemeChanger;
