import Check from "@/app/_icons/check";
import Times from "@/app/_icons/times";
import TrashAlt from "@/app/_icons/trash-alt";
import { ImagePreview } from "@/app/_utils/interfaces/Interfaces";
import { Button } from "@nextui-org/react";
import { isDragActive } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from 'uuid';
import ConfirmDeleteBox from "./ConfirmDeleteBox";

export default function FilesDropzone({  }: any) {
  // *TODO - : refers to gpt for the below 2 types anno 
  const [files, setFiles] = useState<ImagePreview[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<ImagePreview[]>([]);
  const [imgPendingDeletion, setImgPendingDeletion] = useState<string|null>(null);
  // to keep track of image that WILL be deleted for the conditional transition to work
  const [imgToBeDeleted, setImgToBeDeleted] = useState<string|null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxFiles: 5,
    onDrop: acceptedFiles => {
      console.log(acceptedFiles);
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file),
        // assign a unique id 
        id: uuidv4(),
      })));
    }
  });

  // when trash icon is clicked 
  const reqDeleteImgPreview = (fileId: string) => {
    // toggle the confirm delete box 
    imgPendingDeletion ? setImgPendingDeletion(null) : setImgPendingDeletion(fileId)
  }

  const deleteImgPreview = (fileId: string) => {
    setImgToBeDeleted(fileId);
    setTimeout(() => {
      setUploadedFiles(uploadedFiles => uploadedFiles.filter(file => file.id !== fileId))
    }, 300); // ms shall match the duration of the Tailwind opacity transition
  };

  useEffect(() => {
    // update uploaded files when new files are being dropped
    setUploadedFiles(prevFiles => [...prevFiles, ...files]);
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))

  }, [files]);

  const imagePreview = uploadedFiles?.map((file) => (
    <div
      key={file.id}
      className={`inline-flex rounded-sm border border-slate-300 mb-2 mr-2 w-[100px] h-[100px] p-1 box-border relative transition-opacity duration-300
      ${imgToBeDeleted === file.id ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex min-w-0 overflow-hidden relative w-full h-full">
        <Image
          src={file.preview}
          alt={file.name}
          fill={true}
          objectFit="contain"
          onLoad={() => URL.revokeObjectURL(file.preview)}
        />
      </div>
      <Button
        className="absolute -top-2 -right-2 cursor-pointer z-20 bg-opacity-90"
        variant="solid"
        color="danger"
        size="sm"
        isIconOnly
        onClick={() => reqDeleteImgPreview(file.id)}
      >
        <TrashAlt size={14} />
      </Button>

      {imgPendingDeletion === file.id && (
        <ConfirmDeleteBox
          file={file}
          deleteImgPreview={deleteImgPreview}
          setImgPendingDeletion={setImgPendingDeletion}
        />
      )}
    </div>
  ));
  
  return (
    <>
      <label htmlFor="" className="text-sm font-medium">
        Add some photos
      </label>
      <div
        {...getRootProps()}
        className="flex justify-center items-center w-full h-[100px] px-6 py-3 border-2 border-dashed border-gray-300 rounded-md bg-slate-200 cursor-pointer hover:border-gray-400 focus:border-blue-500"
      >
        <input {...getInputProps()} type="file" />
        {isDragActive ? (
          <p className="text-gray-500">Drop the files here ...</p>
        ) : (
          <p className="text-gray-500">
            Drag and drop some files here, or click to select files
          </p>
        )}
      </div>
      <div className="flex flex-row flex-wrap mt-4">
        { imagePreview }
      </div>
    </>
  );
}
