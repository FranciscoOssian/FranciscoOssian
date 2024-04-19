import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Item {
  image?: string;
  title: string;
  description: string;
  tags?: String[];
  link?: string;
}

const List = ({
  list,
  title,
  background,
}: {
  list: Item[];
  title?: string;
  background?: string;
}) => {
  return (
    <div className="p-1">
      <h2
        className={`${
          title ? "" : "hidden"
        } text-4xl bg-primary w-min p-4 rounded-t-2xl`}
      >
        {title}
      </h2>
      <div
        className={`p-5 ${background ? background : "bg-white"} rounded-r-2xl ${
          title ? "rounded-b-2xl" : "rounded-l-2xl"
        } text-black`}
      >
        <ul className="w-full">
          {list.map((item, index) => {
            const isOdd = index % 2 === 0;
            return (
              <li
                key={index}
                className={`p-2 my-2 flex items-center justify-between rounded-xl ${
                  isOdd ? "bg-slate-100" : "bg-primary"
                }`}
              >
                <Link className="w-full" href={item?.link ?? "/#"}>
                  <div className="flex w-full justify-center items-center gap-2 lg:text-xs">
                    <div className="max-sm:hidden size-[50px] relative">
                      <Image
                        fill
                        objectFit="cover"
                        className="rounded-full"
                        src={item.image ?? "/bg-placeholder.jpg"}
                        alt={item.title}
                      />
                    </div>
                    <div className="w-full">
                      <div className="flex items-center justify-between w-full">
                        <div className="font-bold">{item.title}</div>
                        <div className="w-1/2 flex justify-end max-lg:hidden h-8 overflow-visible">
                          {item?.tags &&
                            item.tags.map((tag, index) => (
                              <div
                                className={`${
                                  isOdd
                                    ? "base-button"
                                    : "base-button-active hover:border border-current"
                                } py-1 px-2 m-1`}
                                key={index}
                              >
                                {tag}
                              </div>
                            ))}
                        </div>
                      </div>
                      <div>{item.description}</div>
                      <div className="flex flex-wrap justify-end lg:hidden">
                        {item?.tags &&
                          item.tags.map((tag, index) => (
                            <div
                              className={`${
                                isOdd
                                  ? "base-button"
                                  : "base-button-active hover:border"
                              } p-1 m-1 text-xs`}
                              key={index}
                            >
                              {tag}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default List;
