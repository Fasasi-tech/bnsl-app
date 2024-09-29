
'use client';

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";

// Custom hook to configure the editor
const useTextEditor = (editorContent, onChange) => {
  return useEditor({
    extensions: [
      StarterKit,
      ListItem,
      Heading.configure({
        HTMLAttributes: {
          class: "text-3xl font-bold capitalize",
          levels: [ 1],
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-2",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-2",
        },
      }),
      Underline.configure({
        HTMLAttributes: {
          class: "underline", // Custom class for underline
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "shadow appearance-none min-h-[150px] border rounded w-full py-2 px-3 bg-white text-black text-sm mt-0 md:my-3 leading-tight focus:outline-none focus:shadow-outline min-h-[400px]",
      },
    },
    content: editorContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });
};

// TextEditor component
const TextEditor = ({ editorContent, onChange }) => {
  const editor = useTextEditor(editorContent, onChange);

  // If the editor hasn't been initialized yet, return null
  if (!editor) return null;

  return (
    <div className="flex flex-col justify-stretch min-h-[200px]  rounded ">
      {/* Toolbar with buttons */}
      <div className="flex items-center gap-2">
        {/* Bold Button */}
        <EditorButton
          editor={editor}
          action="toggleBold"
          isActive={editor.isActive("bold")}
          label={<b className='text-gray-500'>B</b>}
          title="Bold (Ctrl+B)"
        />

        {/* Italic Button */}
        <EditorButton
          editor={editor}
          action="toggleItalic"
          isActive={editor.isActive("italic")}
          label={<i className='text-gray-500'>I</i>}
          title="Italic (Ctrl+I)"
        />
         <EditorButton
          editor={editor}
          action="toggleUnderline"
          isActive={editor.isActive("underline")}
          label={<u className='text-gray-500'>U</u>}
          title="Underline (Ctrl+U)"
        />

        {/* Heading Button */}
        <EditorButton
          editor={editor}
          action="toggleHeading"
          options={{ level: 2 }}
          isActive={editor.isActive("heading", { level: 2 })}
          label={
            <h2 className='text-gray-500'>H2</h2>
          }
          title="Heading 2"
        />
       
        {/* Bullet List Button */}
        <EditorButton
          editor={editor}
          action="toggleBulletList"
          isActive={editor.isActive("bulletList")}
          label={
            <h2 className='text-gray-500'>Bullet List</h2>
          }
          title="Bullet List"
        />

        {/* Ordered List Button */}
        <EditorButton
          editor={editor}
          action="toggleOrderedList"
          isActive={editor.isActive("orderedList")}
          label={ <h2 className='text-gray-500'>Ordered List</h2>
          }
          title="Ordered List"
        />
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
};

// Reusable button component for editor toolbar
const EditorButton = ({ editor, action, options = {}, isActive, label, title }) => {
  return (
    <button
      type="button"
      onClick={() => editor.chain().focus()[action](options).run()}
      className={`px-2 pt-2 rounded ${isActive ? "bg-gray-200" : ""}`}
      title={title}
    >
      {label}
    </button>
  );
};

export default TextEditor;
