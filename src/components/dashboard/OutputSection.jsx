import React, { useEffect, useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";
import { Check, Copy } from "lucide-react";

const OutputSection = ({aiOutput,setAiOutput}) => {
    const editorRef = useRef();
    const [copyStatus, setCopyStatus] = useState(false); 

    useEffect(()=>{
        const  editor = editorRef.current.getInstance();
        editor.setMarkdown(aiOutput);
    
    },[aiOutput])

    const handleCopy = () => {
        navigator.clipboard.writeText(editorRef.current.getInstance().getMarkdown()).then(() => {
          setCopyStatus(true);
          setTimeout(() => {
            setCopyStatus(false);
          }, 500);
        });
    }    

      

  return (
    <div className=" shadow-lg  rounded-lg bg-whiten dark:bg-boxdark border-stroke dark:border-strokedark">
      <div className="flex justify-between items-center p-5">
        <h2 className="dark:text-white font-medium text-lg">Your Result</h2>
        <button
          disabled={!aiOutput}
          className={`flex items-center gap-1 border rounded-lg text-white  py-2 px-4 ${aiOutput?"bg-[#7E5FF9]":"bg-[#D0D0D0]"}`}
          onClick={handleCopy}

        >
          {copyStatus ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copyStatus ? "Copied" : "Copy"}
        </button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result will appear here"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        className=" bg-whiten dark:bg-boxdark"
      />
    </div>
  );
};

export default OutputSection;
