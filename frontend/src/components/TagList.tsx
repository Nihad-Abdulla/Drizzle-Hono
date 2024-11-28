import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchTags, addTag, updateTag, deleteTag } from "../api/api";

interface Tag {
  id: number;
  name: string;
}

const TagList = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<"add" | "edit">("add");
  const [currentTag, setCurrentTag] = useState<Partial<Tag>>({});
  const [tagName, setTagName] = useState("");

  const { data: tags, refetch, isLoading, isError, error } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const addTagMutation = useMutation({
    mutationFn: addTag,
    onSuccess: () => {
      refetch();
      closePopup();
    },
  });

  const updateTagMutation = useMutation({
    mutationFn: updateTag,
    onSuccess: () => {
      refetch();
      closePopup();
    },
  });

  const deleteTagMutation = useMutation({
    mutationFn: deleteTag,
    onSuccess: () => refetch(),
  });

  const openPopup = (type: "add" | "edit", tag?: Tag) => {
    setPopupType(type);
    if (type === "edit" && tag) {
      setCurrentTag(tag);
      setTagName(tag.name);
    } else {
      setCurrentTag({});
      setTagName("");
    }
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setTagName("");
  };

  const handleAddOrUpdate = () => {
    if (popupType === "add") {
      addTagMutation.mutate({ name: tagName });
    } else if (popupType === "edit" && currentTag.id) {
      updateTagMutation.mutate({ id: currentTag.id, name: tagName });
    }
  };

  const handleDelete = (id: number) => {
    deleteTagMutation.mutate(id);
  };

  if (isLoading) return <p>Loading tags...</p>;
  if (isError) return <p>Error loading tags: {(error as Error).message}</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded shadow-lg w-2/3 p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Tag List</h2>
        <button
          onClick={() => openPopup("add")}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
        >
          Add Tag
        </button>
        <table className="table-auto w-full text-center border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tags?.map((tag) => (
              <tr key={tag.id} className="border">
                <td className="px-4 py-2 border">{tag.id}</td>
                <td className="px-4 py-2 border">{tag.name}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => openPopup("edit", tag)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(tag.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded shadow-lg w-1/3 p-6 relative">
            <h2 className="text-xl font-bold mb-4">
              {popupType === "add" ? "Add Tag" : "Update Tag"}
            </h2>
            <input
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="Enter tag name"
              className="w-full border border-gray-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={closePopup}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {popupType === "add" ? "Add" : "Update"}
              </button>
            </div>
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagList;
