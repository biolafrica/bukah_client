import Image from "next/image";

export default function ImagePreviewCont({closePreview, previewImage}){
  return(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative bg-white p-4 rounded shadow-lg max-w-lg">
        <button
          onClick={closePreview}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <Image
          src={previewImage}
          alt="Preview"
          width={500}
          height={400}
          className="rounded"
        />
      </div>
    </div>
  )
}