import { useLocation, useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ref as DBref, set } from "firebase/database";
import { useRecoilState } from "recoil";

import Button from "../components/Button";
import { storage, db } from "../firebase";
import Loading from "../components/Loading";
import routes from "../routes";
import Editor from "../components/Editor";
import { quillValue, quillImages } from "../atoms";
import Swiper from "../components/Swiper";
import { SwiperSlide } from "swiper/react";

function UploadStory({ template = null }) {
  const [imageSrc, setImageSrc] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quillContent, setQuillContent] = useRecoilState(quillValue);
  const [quillImageFiles, setQuillImageFiles] = useRecoilState(quillImages);
  const { state } = useLocation();
  const navigate = useNavigate();
  const subjectRef = useRef();
  const imageLimit = 1;

  useEffect(() => {
    if (!(template === "modify")) return;

    setImageSrc(state?.thumbnail);
    setQuillContent(state?.content);
    subjectRef.current.value = state?.subject;
  }, [template, state, setQuillContent]);

  function extractBlobUrl() {
    const regex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const srcs = [];

    while ((match = regex.exec(quillContent)) !== null) {
      srcs.push(match[1]);
    }

    return srcs;
  }

  function compareImageUrls(srcs) {
    let newFiles = [];
    for (let blob of srcs) {
      newFiles.push(
        ...quillImageFiles.filter((file) => file.hasOwnProperty(blob))
      );
    }
    setQuillImageFiles(newFiles);
  }

  function replaceImageUrl(imageUrls) {
    let newContent = quillContent;
    for (let url of imageUrls) {
      for (let key in url) {
        newContent = newContent.replaceAll(key, url[key]);
      }
    }
    newContent = newContent.replaceAll(
      'style="cursor: nwse-resize;"',
      "url[key]"
    );

    return newContent;
  }

  async function onUploadStoryToFirebase() {
    if (
      (!(template === "modify") ||
        !imageFile ||
        subjectRef.current.value === "") &&
      !imageSrc &&
      !imageFile
    )
      return;

    setIsLoading((prev) => !prev);
    try {
      compareImageUrls(extractBlobUrl());
      const urls = [];
      let thumbnailRef;
      let url = null;

      if (!(template === "modify") || imageFile) {
        thumbnailRef = ref(storage, `stories/thumbnail/${imageFile[0].name}`);
        await uploadBytes(thumbnailRef, imageFile[0]);
        url = await getDownloadURL(thumbnailRef);
      }

      for (let file of quillImageFiles) {
        for (let key in file) {
          const contentImageRef = ref(
            storage,
            `stories/images/${file[key].name}`
          );
          await uploadBytes(contentImageRef, file[key]);
          const contentImageUrl = await getDownloadURL(contentImageRef);
          urls.push(...urls, { [key]: contentImageUrl });
        }
      }

      const newContent = replaceImageUrl(urls);

      const id = Date.now();
      await set(
        DBref(
          db,
          template === "modify" ? `stories/${state.id}` : `stories/${id}`
        ),
        {
          subject: subjectRef.current.value,
          thumbnail: url ? url : state.thumbnail,
          content: newContent,
          createdAt: new Date().toLocaleString(),
          id: template === "modify" ? state.id : id,
        }
      );

      alert("성공적으로 등록되었습니다.");
      setQuillContent("");
      setQuillImageFiles([]);
      navigate(
        template === "modify" ? `/story/detail/${state.id}` : routes.storyAdmin
      );
    } catch (e) {
      alert("등록이 실패했습니다. 잠시 후 다시 시도해 주세요.");
      console.error(e);
    } finally {
      setIsLoading((prev) => !prev);
    }
  }

  function onUploadImage(e) {
    const file = e.target.files;

    const fileExt = file[0].name.split(".").pop();

    if (!["jpeg", "png", "jpg", "JPG", "PNG", "JPEG"].includes(fileExt)) {
      alert("jpg, png, jpeg 파일만 업로드가 가능합니다.");
      return;
    }

    const imageURL = URL.createObjectURL(file[0]);

    if (file.length > imageLimit) {
      alert(`썸네일은 최대 ${imageLimit}장 업로드 가능합니다.`);
    }

    setImageSrc(imageURL);
    setImageFile(file);
  }

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="bg-white py-8 sm:pb-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto  lg:mx-0 flex justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Story
            </h2>
            <Button
              name="등록하기"
              onClick={onUploadStoryToFirebase}
              icon={
                <PencilIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              }
            />
          </div>
          <div className="flex items-center flex-col mx-auto mt-10 max-w-xl border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 sm:max-w-none space-y-3">
            <label htmlFor="subject" className="w-full lg:w-2/3">
              <input
                type="text"
                id="subject"
                maxLength={30}
                ref={subjectRef}
                placeholder="제목을 입력하세요"
                className="border border-indigo-400 p-2 rounded-md focus:outline-none focus:border-indigo-700 focus:border-2 w-full"
              />
            </label>

            {imageSrc?.length > 0 ? (
              <Swiper>
                <SwiperSlide className="relative">
                  <img
                    className="w-full h-full max-w-xl object-cover overflow-hidden"
                    src={imageSrc}
                    alt={imageSrc}
                  />
                  <button
                    className="absolute right-2 top-2 w-8 h-8"
                    onClick={() => setImageSrc("")}
                  >
                    <TrashIcon />
                  </button>
                </SwiperSlide>
              </Swiper>
            ) : (
              <label
                htmlFor="images"
                className=" max-w-xl border border-indigo-400 p-2 rounded-md focus:outline-none focus:border-indigo-700 focus:border-2  flex items-center justify-center text-gray-400 cursor-pointer"
              >
                썸네일을 선택해 주세요.
                <input
                  id="images"
                  type="file"
                  onChange={onUploadImage}
                  hidden
                  accept="image/*"
                />
              </label>
            )}
            <Editor />
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadStory;
