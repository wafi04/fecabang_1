export function Steps(){
    return (
           <ol role="list" className="flex w-full justify-between overflow-hidden">
          <li className="pb-5 relative w-full">
            <div
              className="absolute left-0 top-4 -ml-px mt-0.5 h-0.5 w-full bg-success bg-muted"
              aria-hidden="true"
            ></div>
            <div className="group relative flex flex-col items-start">
              <span className="flex h-9 items-center">
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-success group-hover:bg-success">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.5209 6.87109H8.47891C5.67599 6.87109 3.91895 8.8558 3.91895 11.6636V16.206C3.91895 19.0148 5.66724 20.9985 8.47891 20.9985H16.5199C19.3316 20.9985 21.0818 19.0148 21.0818 16.206V11.6636C21.0818 8.8558 19.3316 6.87109 16.5209 6.87109Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M9.38477 11.1445C9.45871 11.8684 9.79338 12.5173 10.275 13.0096C10.8509 13.5748 11.639 13.928 12.5019 13.928C14.116 13.928 15.443 12.7119 15.6191 11.1445"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M16.3702 6.87115C16.3702 4.7337 14.6375 3 12.4991 3C10.3616 3 8.62891 4.7337 8.62891 6.87115"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </span>
              </span>
              <span className="ml-4 hidden w-full min-w-0 flex-col text-left lg:ml-0 lg:mt-2 lg:flex lg:text-left">
                <span className="text-base font-semibold text-success">
                  Transaksi Dibuat
                </span>
                <span className="text-xs text-foreground">
                  Transaksi telah berhasil dibuat
                </span>
              </span>
            </div>
          </li>
          <li className="pb-5 relative w-full ">
            <div
              className="absolute left-0 top-4 -ml-px mt-0.5 h-0.5 w-full  bg-muted"
              aria-hidden="true"
            ></div>
            <div
              className="group relative flex flex-col items-center"
              aria-current="step"
            >
              <span className="flex h-9 items-center">
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 20.4826H20.8841"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.3002 4.09329L5.13195 10.2616C3.64047 11.7531 3.76111 13.7456 5.25649 15.241L9.2902 19.2757C10.7856 20.771 12.7732 20.8956 14.2706 19.3992L20.4379 13.2319C21.9352 11.7346 21.8097 9.74691 20.3143 8.25154L16.2796 4.21685C14.7843 2.72148 12.7966 2.59695 11.3002 4.09329Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M5.94727 15.9343L16.9714 4.91016"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M11.7734 16.6426L13.5918 14.8242"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </span>
              </span>
              <span className="ml-4 hidden w-full min-w-0 flex-col text-left lg:ml-0 lg:mt-2 lg:flex lg:text-center">
                <span className="text-base font-semibold text-primary">
                  Pembayaran
                </span>
                <span className="text-xs text-foreground">
                  Silakan melakukan pembayaran
                </span>
              </span>
            </div>
          </li>
          <li className="pb-5 relative w-full">
            <div
              className="absolute left-0 top-4 -ml-px mt-0.5 h-0.5 w-full bg-muted"
              aria-hidden="true"
            ></div>
            <div className="group relative flex flex-col items-center">
              <span className="flex h-9 items-center">
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-border/75 bg-background group-hover:border-gray-400">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.31372 14.2912C7.31372 15.9831 8.37255 17.1823 10.0704 17.1823H14.9275C16.626 17.1823 17.6789 15.9831 17.6789 14.2912V9.71345C17.6789 8.01564 16.626 6.81641 14.9275 6.81641H10.0704C8.37775 6.81641 7.31372 8.01564 7.31372 9.71345V14.2912Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M11.5698 9.9043C10.8855 9.9043 10.4005 10.3325 10.4005 11.0191L10.4005 12.9835C10.4005 13.6704 10.8855 14.0962 11.5698 14.0962L13.4211 14.0962C14.1078 14.0962 14.5928 13.6704 14.5928 12.9835L14.5928 11.0191C14.5928 10.3346 14.1078 9.9043 13.4211 9.9043L11.5698 9.9043Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M10.8799 6.81745L10.8799 3.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M14.1191 6.81744V3.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M10.8799 20.4991L10.8799 17.1816"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M14.1191 20.4991V17.1816"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M17.6825 10.3809L21 10.3809"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M17.6826 13.6191L21 13.6191"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M3.99993 10.3809L7.31738 10.3809"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      opacity="0.4"
                      d="M3.99994 13.6191L7.31738 13.6191"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </span>
              </span>
              <span className="ml-4 hidden w-full min-w-0 flex-col text-left lg:ml-0 lg:mt-2 lg:flex lg:text-center">
                <span className="text-base font-semibold text-foreground">
                  Sedang Di Proses
                </span>
                <span className="text-xs text-foreground">
                  Pembelian sedang dalam proses.
                </span>
              </span>
            </div>
          </li>
          <li className="relative w-full">
            <div
              className="absolute left-0 top-4 -ml-px mt-0.5 h-0.5 w-full  bg-muted"
              aria-hidden="true"
            ></div>
            <div className="group relative flex flex-col items-end">
              <span className="flex h-9 items-center">
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-border/75 bg-background group-hover:border-gray-400">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.4"
                      d="M21.2603 11.9986C21.2603 6.88402 17.1145 2.73828 12 2.73828C6.88543 2.73828 2.73969 6.88402 2.73969 11.9986C2.73969 17.1131 6.88543 21.2589 12 21.2589C17.1145 21.2589 21.2603 17.1131 21.2603 11.9986Z"
                      fill="currentColor"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21.9149 5.04003C22.1172 5.40146 21.9883 5.85849 21.6268 6.06082C17.0185 8.64059 14.1371 12.8288 12.7623 15.4113C12.6351 15.6503 12.389 15.8021 12.1183 15.8086C11.8477 15.8152 11.5945 15.6753 11.456 15.4427C10.5334 13.8939 9.36312 12.5155 7.93577 11.3101C7.61932 11.0428 7.57944 10.5696 7.8467 10.2532C8.11396 9.93672 8.58716 9.89684 8.90361 10.1641C10.1225 11.1935 11.1735 12.3432 12.0577 13.6106C13.6781 10.8999 16.5577 7.1795 20.8941 4.75195C21.2556 4.54962 21.7126 4.6786 21.9149 5.04003Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </span>
              <span className="ml-4 hidden w-full min-w-0 flex-col text-left lg:ml-0 lg:mt-2 lg:flex lg:text-right">
                <span className="text-base font-semibold text-foreground">
                  Transaksi Selesai
                </span>
                <span className="text-xs text-foreground">
                  Transaksi telah berhasil dilakukan.
                </span>
              </span>
            </div>
          </li>
        </ol>
    )
}