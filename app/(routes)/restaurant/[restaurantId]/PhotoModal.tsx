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
  onOpenChange: () => void; 
}) {

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      classNames={{
        body: "p-1",
        closeButton: "hidden"
      }}
    >
      <ModalContent>
        <ModalBody>
          <Image
            src={photo.url}
            alt="image"
            className="rounded-xl"
            width={photo.width}
            height={photo.height}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
