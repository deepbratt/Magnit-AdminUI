const useContentTable = (updateItem, removeItem) =>{

    const editItem = (id) =>{
      updateItem(id)
    }
    
    const deleteItem = (id) =>{
      removeItem(id)
  }

  return {editItem, deleteItem}
}

export default useContentTable