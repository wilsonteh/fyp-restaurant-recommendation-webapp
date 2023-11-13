import { Photo } from "@/app/_utils/interfaces/Interfaces";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
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

  console.log('🚀 photo: ', photo);

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
            className="rounded-xl border-red-500 border-2"
            width={photo.width}
            height={photo.height}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
