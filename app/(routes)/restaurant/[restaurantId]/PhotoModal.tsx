import { Photo } from "@/app/_utils/interfaces/Interfaces";
import {
  Modal,
  ModalBody,
  ModalContent
} from "@nextui-org/react";
import Image from "next/image";

export default function PhotoModal({
  photo,
  isOpen, 
  onOpenChange, 
}: {
  photo: Photo;
  isOpen: boolean; 
  onOpenChange?: () => void; 
}) {

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        wrapper: "",
        body: "p-1 w-fit",
        closeButton: "hidden",
      }}
    >
      <ModalContent>
        <ModalBody>
          <Image
            src={photo.url}
            alt={photo.url}
            className="rounded-xl"
            width={photo.width}
            height={photo.height}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
