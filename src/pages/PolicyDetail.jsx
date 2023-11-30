import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ref, onValue, remove } from "firebase/database";
import { CalendarIcon } from "@heroicons/react/20/solid";

import { db } from "../firebase";
import routes from "../routes";
import Button from "../components/Button";

function PolicyDetail({ template = null }) {
  const [policy, setPolicy] = useState(null);
  const navigate = useNavigate();
  const { policySubject } = useParams();

  useEffect(() => {
    const policyRef = ref(db, `policies/${policySubject}`);
    onValue(policyRef, (snapshot) => {
      if (!snapshot.val()) return;
      const policyData = snapshot.val();
      setPolicy(policyData);
    });
  }, [policySubject]);

  function modifyPolicy(policy) {
    navigate(routes.policyModify, { state: policy });
  }

  function deletePolicy(policy) {
    if (!window.confirm("삭제하시겠습니까?")) return;
    const targetPolicy = ref(db, `policies/${policy.id}`);
    remove(targetPolicy);
    navigate(routes.policyAdmin);
  }

  return (
    <>
      <div className="w-full text-center space-y-4 py-5 relative">
        {template === "admin" ? (
          <div className="absolute bottom-5 right-5 space-x-3">
            <Button onClick={() => modifyPolicy(policy)} name="수정" />
            <Button onClick={() => deletePolicy(policy)} name="삭제" />
          </div>
        ) : null}
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {policy?.subject}
        </h2>
        <div className="mt-1 sm:mt-0 flex flex-row-reverse justify-around">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {policy?.createdAt}
          </div>
        </div>
      </div>
      <div className="h-full bg-white min-h-screen">
        <div className="py-5 px-2 mb-6 w-full max-w-7xl bg-white">
          <div className="p-0 w-full max-w-4xl mx-auto">
            <div
              className="m-0 p-0"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(policy?.content),
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PolicyDetail;
