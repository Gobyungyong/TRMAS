import { useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { quillValue, quillImages } from "../atoms";
import ImageResize from "quill-image-resize";

function Editor() {
  const [content, setContent] = useRecoilState(quillValue);
  const setQuillImageFiles = useSetRecoilState(quillImages);
  const quillRef = useRef();

  Quill.register("modules/ImageResize", ImageResize);
  useEffect(() => {
    function imageHandler() {
      console.log("이미지핸들러");
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      input.addEventListener("change", async () => {
        const file = input.files[0];

        const fileExt = file.name.split(".").pop();

        if (!["jpeg", "png", "jpg", "JPG", "PNG", "JPEG"].includes(fileExt)) {
          alert("jpg, png, jpeg 파일만 업로드가 가능합니다.");
          return;
        }

        const imageURL = URL.createObjectURL(file);
        setQuillImageFiles((prev) => [...prev, { [imageURL]: file }]);

        const editor = quillRef.current.getEditor();
        const range = editor.getSelection(true);
        const Image = Quill.import("formats/image");
        Image.sanitize = function (url) {
          return url;
        };

        editor.insertEmbed(range.index, "image", imageURL);
        editor.setSelection(range.index + 1);
      });
    }

    if (quillRef.current) {
      const toolbar = quillRef.current.getEditor().getModule("toolbar");
      toolbar.addHandler("image", imageHandler);
    }
  }, [setQuillImageFiles]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }],
      ["clean"],
    ],
    ImageResize: {
      parchment: Quill.import("parchment"),
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  return (
    <div className="w-full h-full  border-indigo-400 rounded-md focus:outline-none focus:border-indigo-700">
      <ReactQuill
        theme="snow"
        className="h-screen pb-20 md:pb-10"
        modules={modules}
        formats={formats}
        value={content || ""}
        ref={quillRef}
        onChange={setContent}
      />
    </div>
  );
}

export default Editor;
