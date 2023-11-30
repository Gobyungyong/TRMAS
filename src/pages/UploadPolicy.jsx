import { useLocation, useNavigate } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/24/outline";
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

function UploadPolicy({ template = null }) {
  const [isLoading, setIsLoading] = useState(false);
  const [quillContent, setQuillContent] = useRecoilState(quillValue);
  const [quillImageFiles, setQuillImageFiles] = useRecoilState(quillImages);
  const { state } = useLocation();
  const navigate = useNavigate();
  const subjectRef = useRef();

  useEffect(() => {
    if (!(template === "modify")) return;

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

  async function onUploadPolicyToFirebase() {
    if (subjectRef.current.value === "") return;

    setIsLoading((prev) => !prev);
    try {
      compareImageUrls(extractBlobUrl());
      const urls = [];

      for (let file of quillImageFiles) {
        for (let key in file) {
          const contentImageRef = ref(
            storage,
            `policies/images/${file[key].name}`
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
          template === "modify" ? `policies/${state.id}` : `policies/${id}`
        ),
        {
          subject: subjectRef.current.value,
          content: newContent,
          createdAt: new Date().toLocaleString(),
          id: template === "modify" ? state.id : id,
        }
      );

      alert("성공적으로 등록되었습니다.");
      setQuillContent("");
      setQuillImageFiles([]);
      navigate(
        template === "modify"
          ? `/admin/policy/detail/${state.id}`
          : routes.policyAdmin
      );
    } catch (e) {
      alert("등록이 실패했습니다. 잠시 후 다시 시도해 주세요.");
      console.error(e);
    } finally {
      setIsLoading((prev) => !prev);
    }
  }

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="bg-white py-8 sm:pb-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto  lg:mx-0 flex justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Policy
            </h2>
            <Button
              name="등록하기"
              onClick={onUploadPolicyToFirebase}
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

            <Editor />
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadPolicy;
