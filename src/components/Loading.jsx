import { Spinner } from "@chakra-ui/react";

function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center absolute">
      <div className="w-full h-full absolute z-10 bg-slate-100 opacity-60" />
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        className="z-20"
      />
    </div>
  );
}

export default Loading;
