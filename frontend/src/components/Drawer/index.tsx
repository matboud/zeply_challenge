"use client";
import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HeartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PencilIcon, PlusIcon } from "@heroicons/react/20/solid";

interface DrawerProps {
  isNotification?: boolean;
  handleDrawer: (state: boolean) => void;
}

const Drawer: FC<DrawerProps> = ({ isNotification = false, handleDrawer }) => {
  return (
    <Transition.Root show={isNotification} as={Fragment}>
      isNotification: {isNotification}
      <Dialog as="div" className="relative z-10" onClose={handleDrawer}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-96">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 ml-8 flex pr-2 pt-4 sm:ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => {
                          handleDrawer(false);
                        }}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-full overflow-y-auto bg-slate-950 p-8 pt-24">
                    <div className="space-y-6">
                      <h3 className="font-medium text-gray-50 mb-10">
                        Notifications
                      </h3>
                      <dl className="divide-y divide-gray-200 border-b border-t border-gray-200">
                        <div className="flex justify-between py-3 text-sm font-medium">
                          <dt className="text-gray-500">2jbfkj23123..</dt>
                          <dd className=" text-green-400">
                            <div
                              className={
                                "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset  bg-green-400/10 ring-green-400/20"
                              }
                            >
                              Status
                            </div>
                          </dd>
                        </div>
                        <div className="flex justify-between py-3 text-sm font-medium">
                          <dt className="text-gray-500">2jbfkj23123..</dt>
                          <dd className=" text-red-400">
                            <div
                              className={
                                "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset  bg-red-400/10 ring-red-400/20"
                              }
                            >
                              Status
                            </div>
                          </dd>
                        </div>
                        <div className="flex justify-between py-3 text-sm font-medium">
                          <dt className="text-gray-500">2jbfkj23123..</dt>
                          <dd className=" text-orange-400">
                            <div
                              className={
                                "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset text-gray-400 bg-gray-400/10 ring-gray-400/20"
                              }
                            >
                              Status
                            </div>
                          </dd>
                        </div>
                        <div className="flex justify-between py-3 text-sm font-medium">
                          <dt className="text-gray-500">2jbfkj23123..</dt>
                          <dd className="text-orange-400">
                            <div
                              className={
                                "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset bg-orange-400/10 ring-orange-400/20"
                              }
                            >
                              Status
                            </div>
                          </dd>
                        </div>
                        <div className="flex justify-between py-3 text-sm font-medium">
                          <dt className="text-gray-500">2jbfkj23123..</dt>
                          <dd className=" text-green-400">
                            <div
                              className={
                                "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset  bg-green-400/10 ring-green-400/20"
                              }
                            >
                              Status
                            </div>
                          </dd>
                        </div>
                        <div className="flex justify-between py-3 text-sm font-medium">
                          <dt className="text-gray-500">2jbfkj23123..</dt>
                          <dd className=" text-orange-400">
                            <div
                              className={
                                "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset text-gray-400 bg-gray-400/10 ring-gray-400/20"
                              }
                            >
                              Status
                            </div>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Drawer;
