import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ref as DBref, set } from "firebase/database";

import Button from "../components/Button";
import { storage, db } from "../firebase";
import Loading from "../components/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../routes";
import Swiper from "../components/Swiper";

function UploadProject({ template = null }) {
  const [imageSrc, setImageSrc] = useState([]);
  const [imageFiles, setImageFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const subjectRef = useRef();
  const imageLimit = 10;

  useEffect(() => {
    if (!(template === "modify")) return;

    setImageSrc(state?.images);
    subjectRef.current.value = state?.subject;
  }, [template, state]);

  async function onUploadProjectToFirebase() {
    if (
      (!(template === "modify") ||
        !imageFiles ||
        subjectRef.current.value === "") &&
      !imageSrc &&
      !imageFiles
    )
      return;

    setIsLoading((prev) => !prev);
    try {
      const urls = [];

      if (imageFiles) {
        for (let i = 0; i < imageFiles.length; i++) {
          const storageRef = ref(
            storage,
            `projects/images/${imageFiles[i].name}`
          );
          await uploadBytes(storageRef, imageFiles[i]);
          const url = await getDownloadURL(storageRef);
          urls.push(url);
        }
      }

      const id = Date.now();

      await set(
        DBref(
          db,
          template === "modify" ? `projects/${state.id}` : `projects/${id}`
        ),
        {
          subject: subjectRef.current.value,
          images: template === "modify" ? state.images : urls,
          createdAt: new Date().toLocaleString(),
          id: template === "modify" ? state.id : id,
        }
      );
      alert("성공적으로 등록되었습니다.");
      navigate(routes.projectAdmin);
    } catch (e) {
      alert("등록이 실패했습니다. 잠시 후 다시 시도해 주세요.");
      console.error(e);
    } finally {
      setIsLoading((prev) => !prev);
    }
  }

  function onUploadImages(e) {
    const files = e.target.files;
    const fileExts = [];
    let imageURLs = [];

    for (let i = 0; i < files.length; i++) {
      const fileExt = files[i].name.split(".").pop();
      fileExts.push(fileExt);
    }

    for (let i = 0; i < fileExts.length; i++) {
      if (!["jpeg", "png", "jpg", "JPG", "PNG", "JPEG"].includes(fileExts[i])) {
        alert("jpg, png, jpeg 파일만 업로드가 가능합니다.");
        return;
      }
    }

    for (let i = 0; i < files.length; i++) {
      const imageURL = URL.createObjectURL(files[i]);
      imageURLs.push(imageURL);
    }

    if (imageURLs.length > imageLimit) {
      imageURLs = imageURLs.slice(0, imageLimit);
      alert(`사진은 최대 ${imageLimit}장 업로드 가능합니다.`);
    }

    setImageSrc(imageURLs);
    setImageFiles(files);
  }

  function deleteImage(index) {
    setImageSrc((prev) => prev.filter((_, i) => index !== i));
  }

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="bg-white py-8 sm:pb-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto  lg:mx-0 flex justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Project
            </h2>
            <Button
              name="등록하기"
              onClick={onUploadProjectToFirebase}
              icon={
                <PencilIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              }
            />
          </div>
          <div className="flex items-center flex-col mx-auto mt-10 max-w-xl border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 sm:max-w-none space-y-10">
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
                {imageSrc.map((image, i) => (
                  <SwiperSlide key={i} className="relative">
                    <img
                      className="w-full h-full max-w-xl object-cover overflow-hidden"
                      src={image}
                      alt={`${image}-${i}`}
                    />
                    <button
                      className="absolute right-2 top-2 w-8 h-8"
                      onClick={() => deleteImage(i)}
                    >
                      <TrashIcon />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <label
                htmlFor="images"
                className="w-full max-w-xl border border-indigo-400 p-2 rounded-md focus:outline-none focus:border-indigo-700 focus:border-2 h-96 flex items-center justify-center text-9xl text-gray-400 cursor-pointer"
              >
                +
                <input
                  id="images"
                  type="file"
                  onChange={onUploadImages}
                  multiple
                  hidden
                  accept="image/*"
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadProject;
