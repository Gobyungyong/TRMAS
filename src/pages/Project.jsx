import { PencilIcon } from "@heroicons/react/24/outline";

function Project({ template = null }) {
  const projects = [1, 2, 3, 4, 5, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto  lg:mx-0 flex justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Project
          </h2>
          <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <PencilIcon
              className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            등록
          </button>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {projects.map((project, i) => (
            <article
              key={i}
              className="flex max-w-xl flex-col items-start justify-between bg-slate-500  h-96"
            ></article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Project;
