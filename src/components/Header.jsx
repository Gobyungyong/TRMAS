import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import routes from "../routes";
import { cls } from "../utils/classUtil";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname: params } = useLocation();
  const regex = /^\/admin/;

  return (
    <header className="bg-white">
      <nav
        className={cls(
          "mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8",
          regex.test(params) ? "bg-blue-200" : null
        )}
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            to={regex.test(params) ? routes.projectAdmin : routes.index}
            aria-current="page"
            className="-m-1.5 p-1.5 flex space-x-2"
          >
            <span className="sr-only">TMRAS</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
            {regex.test(params) ? (
              <span className="text-lg font-bold">Admin</span>
            ) : null}
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            to={routes.index}
            aria-current="page"
            className={cls(
              "text-sm font-semibold leading-6 text-gray-900",
              regex.test(params) ? "hidden" : null
            )}
          >
            Home
          </Link>

          <Link
            to={routes.index}
            aria-current="page"
            className={cls(
              "text-sm font-semibold leading-6 text-gray-900",
              regex.test(params) ? "hidden" : null
            )}
          >
            About
          </Link>
          <Link
            to={regex.test(params) ? routes.projectAdmin : routes.project}
            aria-current="page"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Project
          </Link>
          <Link
            to={regex.test(params) ? routes.storyAdmin : routes.story}
            aria-current="page"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Story
          </Link>
          <Link
            to={regex.test(params) ? routes.policyAdmin : routes.policy}
            aria-current="page"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Policy
          </Link>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              to={routes.index}
              aria-current="page"
              className="-m-1.5 p-1.5 flex space-x-2"
            >
              <span className="sr-only">TMRAS</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
              {regex.test(params) ? (
                <span className="text-lg font-bold">Admin</span>
              ) : null}
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to={routes.index}
                  aria-current="page"
                  className={cls(
                    "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50",
                    regex.test(params) ? "hidden" : null
                  )}
                >
                  Home
                </Link>
                <Link
                  to={routes.index}
                  aria-current="page"
                  className={cls(
                    "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50",
                    regex.test(params) ? "hidden" : null
                  )}
                >
                  About
                </Link>
                <Link
                  to={regex.test(params) ? routes.projectAdmin : routes.project}
                  aria-current="page"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Project
                </Link>
                <Link
                  to={regex.test(params) ? routes.storyAdmin : routes.story}
                  aria-current="page"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Story
                </Link>
                <Link
                  to={regex.test(params) ? routes.policyAdmin : routes.policy}
                  aria-current="page"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Policy
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
