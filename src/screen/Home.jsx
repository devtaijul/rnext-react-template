import { Post } from "../components/Post";

export const Home = () => {
  return (
    <>
      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto w-full py-10  ">
        {/* Posts Feed */}
        <div>
          {Array.from([0, 1, 2, 3]).map((element) => (
            <Post key={element} />
          ))}
        </div>
      </div>
    </>
  );
};
