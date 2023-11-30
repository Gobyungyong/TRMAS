import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/24/outline";
import { ref, onValue, query, orderByChild } from "firebase/database";

import routes from "../routes";
import Button from "../components/Button";
import { db } from "../firebase";
import { cls } from "../utils/classUtil";

function Policy({ template = null }) {
  const [policies, setPolicies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const policiesRef = ref(db, "policies/");
    const policiesQuery = query(policiesRef, orderByChild("createdAt"));
    onValue(policiesQuery, (snapshot) => {
      if (!snapshot.val()) return;
      const policiesData = Object.values(snapshot.val()).reverse();
      setPolicies(policiesData);
    });
  }, []);

  return (
    <div className="bg-white py-8">
      <div className="mx-auto max-w-7xl min-h-screen px-6 lg:px-8">
        <div className="mx-auto  lg:mx-0 flex justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Policy
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
              onClick={() => navigate(routes.policyUpload)}
            />
          ) : null}
        </div>
        <div
          className={cls(
            "mx-auto mt-10 grid max-w-xl  gap-x-6 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none  "
          )}
        >
          {policies.length === 0 ? (
            <div className="text-center w-full h-screen">
              아직 게시글이 존재하지 않습니다.
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 pt-6">
              <li className="w-full flex justify-between pb-3 font-bold text-md text-gray-900">
                <div className="w-12 text-center">번호</div>
                <div className="w-3/4 text-center">제목</div>
                <div className="hidden sm:w-48 sm:block text-center">
                  작성일시
                </div>
              </li>
              {policies.map((policy, i) => (
                <li
                  key={policy.subject}
                  className="flex justify-between gap-x-6 py-5 cursor-pointer"
                  onClick={() =>
                    navigate(
                      template === "admin"
                        ? `/admin/policy/detail/${policy.id}`
                        : `/policy/detail/${policy.id}`
                    )
                  }
                >
                  <div className="pl-2 w-12 text-center">{i + 1}</div>
                  <div className="w-3/4 text-center text-sm leading-6 text-gray-900 text-ellipsis">
                    {policy.subject}
                  </div>
                  <time
                    dateTime={policy.createdAt}
                    className="hidden sm:w-48 sm:block text-center text-gray-400 text-sm"
                  >
                    {policy.createdAt}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Policy;
