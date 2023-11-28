import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/24/outline";
import { ref, onValue, remove } from "firebase/database";
import { SwiperSlide } from "swiper/react";

import routes from "../routes";
import Button from "../components/Button";
import { db } from "../firebase";
import Modal from "../components/Modal";
import Swiper from "../components/Swiper";

function Project({ template = null }) {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const projectsRef = ref(db, "projects/");
    onValue(projectsRef, (snapshot) => {
      const projectsData = Object.values(snapshot.val());
      setProjects(projectsData);
    });
  }, []);

  function toggleIsOpen(project) {
    setIsOpen((prev) => !prev);
    setProject(project);
  }

  async function modifyProject(project) {
    await setProject(project);
    navigate(routes.projectModify, { state: project });
  }

  function deleteProject(project) {
    const targetProject = ref(db, `projects/${project.subject}`);
    remove(targetProject);
  }

  return (
    <div className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto  lg:mx-0 flex justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Project
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
              onClick={() => navigate(routes.projectUpload)}
            />
          ) : null}
        </div>
        <div className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {projects.map((project, i) => (
            <div
              key={i}
              className="max-w-l overflow-hidden rounded-sm shadow-md shadow-black relative z-40 group cursor-pointer"
            >
              <img
                src={project.images[0]}
                alt={project.subject}
                onClick={() => toggleIsOpen(project)}
                key={i}
                className="max-w-l items-center bg-slate-400 h-96 brightness-100 duration-150 group-hover:brightness-75 group-hover:scale-110"
              />

              <div
                onClick={() => toggleIsOpen(project)}
                className="group-hover:block group-hover:text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:text-white group-hover:z-40 group-hover:font-bold group-hover:text-opacity-80 hidden"
              >
                {project.subject}
              </div>
              {template === "admin" ? (
                <div className="group-hover:block group-hover:text-xl absolute top-5 right-5 space-x-4 group-hover:text-white group-hover:z-50 group-hover:font-bold group-hover:text-opacity-80 hidden">
                  <button onClick={() => modifyProject(project)}>수정</button>
                  <button onClick={() => deleteProject(project)}>삭제</button>
                </div>
              ) : null}
            </div>
          ))}
          <Modal
            title={project?.subject}
            size="xl"
            isOpen={isOpen}
            onClose={toggleIsOpen}
          >
            <Swiper>
              {project?.images?.map((image, i) => (
                <SwiperSlide key={i} className="relative">
                  <img
                    className="w-full h-full max-w-xl object-cover overflow-hidden"
                    src={image}
                    alt={`${image}-${i}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Project;
