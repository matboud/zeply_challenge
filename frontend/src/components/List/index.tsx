"use client";

const deployments: number[] = [1, 2, 3];

const List: React.FC = () => {
  return (
    <ul role="list" className="divide-y divide-white/5">
      {deployments.map((index: number) => (
        <li key={index} className="relative flex items-center space-x-4 py-4">
          <div className="min-w-0 flex-auto">
            <div className="flex items-center gap-x-3">
              <div
                className={
                  "flex-none rounded-full p-1 text-green-400 bg-green-400/10"
                }
              >
                <div className="h-2 w-2 rounded-full bg-current" />
              </div>
              <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                <div className="flex gap-x-2">
                  <span className="truncate">h12l123lkn3k12jn..</span>

                  <span className="absolute inset-0" />
                </div>
              </h2>
            </div>
            <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
              <p className="whitespace-nowrap ml-7">Initiated 1m 32s ago</p>
            </div>
          </div>
          <div
            className={
              "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset text-gray-400 bg-gray-400/10 ring-gray-400/20"
            }
          >
            Done
          </div>
        </li>
      ))}
    </ul>
  );
};

export default List;
