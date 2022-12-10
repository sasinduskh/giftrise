import Image from "next/image";
import Link from "next/link";
import { FC, FormEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { AiFillGift } from "react-icons/ai";

const GiftItems: FC<{ close: () => void }> = ({ close }) => {
  const [result, setResult] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [inputData, setInputData] = useState<any>({
    gender: "male",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (form: FormEvent) => {
    form.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/getgiftitems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const data = await res.json();

      console.log(data);

      setResult(data.result.replaceAll("\n", "<br/> "));
    } catch (err) {}

    setLoading(false);
  };


  

  return (
    <div>
      <button className="flex items-center space-x-[10px]" onClick={close}>
        {" "}
        <BiArrowBack /> <span>Back to Home</span>
      </button>
      {result && !loading && (
        <div>
          <p
            className=" text-[18px]"
            dangerouslySetInnerHTML={{ __html: result && result }}
          ></p>
          <div className="w-full flex flex-col items-center mt-[25px]">
            <button
              className="flex items-center space-x-[10px] text-[20px] border-dotted border-[2px] px-[10px] py-[10px] border-black dark:border-white rounded-lg"
              onClick={submitHandler}
            >
              <AiFillGift /> <span>Give a another idea</span>
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="w-full flex flex-col items-center mt-[34px] justify-center">
          <div className="relative  w-[200px] h-[250px]">
            <Image
              className="object-cover rounded-lg"
              src="/images/santa.gif"
              fill
              alt="santa"
            />
          </div>
          <p>Santa is looking for your gift</p>
        </div>
      )}

      {!result && !loading && (
        <form onSubmit={submitHandler} className="mt-[50px]">
          <div className="border-b-[2px] pb-[20px] border-black dark:border-white/40">
            <h2>Gender</h2>
            <div className="flex mt-[20px] space-x-[20px] justify-between">
              <div
                onClick={() => setInputData({ ...inputData, gender: "male" })}
                className={[
                  "w-full flex cursor-pointer justify-center py-[10px] rounded-xl items-center",
                  inputData.gender == "male"
                    ? "bg-black  dark:bg-white dark:text-black text-white"
                    : "bg-white dark:bg-bgCardDark dark:text-white text-black",
                ].join(" ")}
              >
                <span>Male</span>
              </div>
              <div
                onClick={() => setInputData({ ...inputData, gender: "female" })}
                className={[
                  "w-full flex cursor-pointer justify-center py-[10px] rounded-xl items-center",
                  inputData.gender == "female"
                    ? "bg-black dark:bg-white dark:text-black text-white"
                    : "bg-white dark:bg-bgCardDark dark:text-white text-black",
                ].join(" ")}
              >
                <span>Female</span>
              </div>
            </div>
          </div>

          <div className="py-[20px] border-b-[2px]  border-black dark:border-white/40">
            <h2>Age</h2>
            <div className="mt-[20px]">
              <input
                required
                name="age"
                onChange={changeHandler}
                type="text"
                placeholder="21"
                className="bg-black/10 shadow-md px-[20px] w-full py-[10px] rounded-md"
              />
            </div>
          </div>
          <div className="py-[20px] border-b-[2px]  border-black dark:border-white/40">
            <h2>$ Price</h2>
            <div className="mt-[20px] space-x-[10px] flex justify-between items-center">
              <div>
                <span>Min Price</span>
                <input
                  required
                  name="priceMin"
                  onChange={changeHandler}
                  type="text"
                  placeholder="Min"
                  className="bg-black/10 shadow-md px-[20px] w-full py-[10px] rounded-md"
                />
              </div>
              <div>
                <span>Max Price</span>
                <input
                  required
                  name="priceMax"
                  onChange={changeHandler}
                  type="text"
                  placeholder="Max"
                  className="bg-black/10 shadow-md px-[20px] w-full py-[10px] rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="py-[20px] border-b-[2px]  border-black dark:border-white/40">
            <h2>Hobbies </h2>
            <div className="mt-[20px]">
              <input
                required
                name="hobbies"
                onChange={changeHandler}
                type="text"
                placeholder="Football, Gaming, Software Developing, Game Developing"
                className="bg-black/10 shadow-md px-[20px] w-full py-[10px] rounded-md"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-black dark:bg-white dark:text-black text-white w-full py-[10px] rounded-lg shadow-md mt-[25px]"
            >
              Get Gift Items
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default GiftItems;
