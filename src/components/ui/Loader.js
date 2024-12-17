export default function Spinner() {
  return (
    <div className="min-h-60 flex flex-col bg-white border shadow-sm rounded-xl">
      <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
        <div className="flex justify-center">
          <div
            className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Загрузка...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
