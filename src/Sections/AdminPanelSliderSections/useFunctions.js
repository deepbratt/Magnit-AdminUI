
const useFunctions = (setArr,setEditing,setEditingText,editingText,arr) =>{
    function submitEdits(id) {
        const updatedData = [...arr].map((text, index) => {
          if (index === id) {
            text = editingText;
          }
          return text;
        });
        setArr(updatedData);
        setEditing(null);
      }

      
  function handleEditInputChange(e) {
    setEditingText(e.target.value);
  }

  function handleCancelClick( todo) {
    setEditingText(todo);
    setEditing(false);
  }

  function handleEditClick(id, todo) {
    setEditing(id);
    setEditingText(todo);
  }
  function handleDeleteClick(id) {
    setArr((prev) => {
      return prev.filter((array, index) => {
        return index !== id;
      });
    });
  }

  return{submitEdits,handleDeleteClick,handleEditClick,handleEditInputChange,handleCancelClick}
}


export default useFunctions