import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ref, onValue } from "firebase/database";

import { db } from "../firebase";

function StoryDetail() {
  const [story, setStory] = useState(null);
  const { storySubject } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const storyRef = ref(db, `stories/${storySubject}`);
    onValue(storyRef, (snapshot) => {
      if (!snapshot.val()) return;
      const storyData = snapshot.val();
      setStory(storyData);
    });
  }, [storySubject]);

  return (
    <>
      {/* 사진 */}
      <div className="fixed w-full top-16 z-0">
        <div
          style={{ backgroundImage: `url(${story?.thumbnail})` }}
          className={`h-56 bg-cover bg-center`}
        >
          <dl className="absolute bottom-1/3 left-0 w-full px-7 z-20">
            <dt className="text-4xl text-center font-medium mb-1 text-white text-opacity-90">
              {story?.subject}
            </dt>
          </dl>
        </div>
      </div>
      {/* 본문 */}
      <div className="relative z-10 h-full bg-white min-h-screen">
        <div className="py-5 px-2 mb-6 w-full  mt-96 max-w-7xl bg-white relative">
          <div className="p-0 w-full max-w-4xl mx-auto">
            <div
              className="m-0 p-0"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(story?.content),
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default StoryDetail;
