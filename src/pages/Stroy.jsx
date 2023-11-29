import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/24/outline";
import { ref, onValue, remove } from "firebase/database";
import DOMPurify from "dompurify";

import routes from "../routes";
import Button from "../components/Button";
import { db } from "../firebase";

function Story({ template = null }) {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storiesRef = ref(db, "stories/");
    onValue(storiesRef, (snapshot) => {
      if (!snapshot.val()) return;
      const storiesData = Object.values(snapshot.val());
      setStories(storiesData);
    });
  }, []);

  console.log(stories);

  function reduceImage(html) {
    const regex = /<img[^>]*>/g;
    return html.replace(regex, "");
  }

  async function modifyStory(story) {
    navigate(routes.storyModify, { state: story });
  }

  function deleteStory(story) {
    if (!window.confirm("삭제하시겠습니까?")) return;
    const targetStory = ref(db, `stories/${story.subject}`);
    remove(targetStory);
  }

  return (
    <div className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto  lg:mx-0 flex justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Story
          </h2>
          {template === "admin" ? (
            <Button
              name="등록"
              icon={
                <PencilIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              }
              onClick={() => navigate(routes.storyUpload)}
            />
          ) : null}
        </div>
        <div className="mx-auto mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 md:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {stories?.map((story, i) => (
            <div
              key={i}
              className="max-w-l p-2 relative rounded-sm shadow-sm shadow-black z-40 group cursor-pointer"
              onClick={() => navigate(routes.storyDetail, { state: story })}
            >
              <div className="relative h-0 pb-[100%]">
                <img
                  src={story.thumbnail}
                  alt={story.subject}
                  key={i}
                  className="max-w-full w-full h-full items-center absolute top-0 left-0"
                />
                {template === "admin" ? (
                  <div className="group-hover:block group-hover:text-xl absolute top-5 right-5 space-x-4 group-hover:text-yellow-400 group-hover:z-50 group-hover:font-bold group-hover:text-opacity-80 hidden">
                    <button onClick={() => modifyStory(story)}>수정</button>
                    <button onClick={() => deleteStory(story)}>삭제</button>
                  </div>
                ) : null}
              </div>
              <dl className="mt-3 mb-14">
                <dt className="text-sm overflow-hidden w-11/12 mb-2 font-bold text-ellipsis">
                  {story.subject}
                </dt>
                <dd
                  className="h-11 text-sm overflow-hidden text-gray-400 text-ellipsis break-all"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(reduceImage(story.content)),
                  }}
                />
              </dl>
              <div className="right-2 bottom-2 text-sm absolute text-right font-bold">
                TMRAS
              </div>
            </div>
          ))}
          {/* {stories?.map((story, i) => (
            <div
              key={i}
              className="max-w-l overflow-hidden rounded-sm shadow-md shadow-black relative z-40 group cursor-pointer"
            >
              <img
                src={story.thumbnail}
                alt={story.subject}
                key={i}
                className="max-w-l items-center bg-slate-400 h-96 brightness-100 duration-150 group-hover:brightness-75 group-hover:scale-110"
              />

              <div className="group-hover:block group-hover:text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:text-white group-hover:z-40 group-hover:font-bold group-hover:text-opacity-80 hidden">
                {story.subject}
              </div>
              {template === "admin" ? (
                <div className="group-hover:block group-hover:text-xl absolute top-5 right-5 space-x-4 group-hover:text-white group-hover:z-50 group-hover:font-bold group-hover:text-opacity-80 hidden">
                  <button onClick={() => modifyStory(story)}>수정</button>
                  <button onClick={() => deleteStory(story)}>삭제</button>
                </div>
              ) : null}
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Story;
