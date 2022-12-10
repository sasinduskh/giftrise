import { FC, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

const IdeaBox: FC<{ close: () => void }> = ({ close }) => {
  const [inputData, setInputData] = useState<any>(null);
  const [result, setResult] = useState<any>("");
  const [loadin, setLoading] = useState<boolean>(false);

  const fetchIdea = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/getidea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea: inputData }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.error);
        return;
      }

      setResult(data.data.replaceAll("\n", "<br/>"));
    } catch (er) {}

    setLoading(false);
  };

  return (
    <div>
      <button className="flex items-center space-x-[10px]" onClick={close}>
        {" "}
        <BiArrowBack /> <span>Back to Home</span>
      </button>

      {result && <p dangerouslySetInnerHTML={{ __html: result && result }}></p>}
      {!result && (
        <div className="mt-[50px]">
          <div>
            <p>What you want know</p>
            <textarea
              onChange={(e) => setInputData(e.target.value)}
              id=""
              className="w-full px-[20px] py-[20px] bg-black/10 h-[250px] rounded-lg"
              placeholder="I want to surprise my gf, she likes dogs"
            ></textarea>
          </div>
          <div>
            <button
              disabled={loadin || !inputData ? true : false}
              onClick={fetchIdea}
              className="bg-black dark:bg-white dark:text-black disabled:opacity-50 text-white w-full py-[10px] rounded-lg shadow-md mt-[25px]"
            >
              {loadin ? "Loading...." : "Get Some Idea"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaBox;
