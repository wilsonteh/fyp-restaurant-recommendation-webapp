import { User } from "@nextui-org/react";
import Image from "next/image";
import EllipsisV from "./icons/ellipsis-v";
import ReviewStars from "./icons/ReviewStars";
import ThumbsUp from "./icons/thumbs-up";

interface ReviewItemProps {}

export default function ReviewItem() {
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <User
          as="button"
          isFocusable
          name={"Wilson Teh"}
          description={"90 written reviews"}
          avatarProps={{
            src: "https://via.placeholder.com/50x50",
            size: "md",
          }}
          classNames={{
            base: "px-2 py-1",
            name: "font-semibold",
          }}
        />
        <button>
          <EllipsisV />
        </button>
      </div>

      <div className="p-2 flex flex-col gap-3">
        <ReviewStars Nstar={4} />

        <div className="">
          <h2 className="font-semibold"> Delightful Dining Experience! </h2>

          <p className="font-light text-justify text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repellendus placeat corrupti accusamus nobis incidunt. Ad magni
            molestiae aspernatur. Ab repellat cum perspiciatis architecto aut
            earum sint iste aspernatur. Perferendis, nam.
          </p>
        </div>

        <div className="">
          <Image
            src="https://via.placeholder.com/125x125"
            width={125}
            height={125}
            alt="review image"
          />
        </div>

        <div className="p-2 flex justify-between items-center">
          <div className="text-sm flex items-center gap-2">
            <button>
              <ThumbsUp />
            </button>
            <span>3</span>
          </div>

          <div className="text-xs">
            <span>Written: 23 Sept 2023</span>
          </div>
        </div>
      </div>
    </div>
  );
}
